"use server";

import { revalidatePath } from "next/cache";
import {
  sendCaseStatusEmail,
  sendCaseSubmittedEmails,
} from "@/lib/cases/email";
import { getCase, listCases, saveCase, storeCaseDocument } from "@/lib/cases/store";
import {
  createCaseId,
  createReference,
  type CaseStatus,
  type ConsularCase,
} from "@/lib/cases/types";
import { getWorkflow, type ConsularWorkflowId } from "@/lib/consular/workflows";
import { STRIPE_FEES } from "@/lib/stripe/fees";
import { isStaffAuthenticated } from "@/lib/staff/auth";

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

export type SubmitCaseResult =
  | { ok: true; caseId: string; reference: string; needsPayment: boolean; feeId?: string }
  | { ok: false; error: string };

export async function submitConsularCase(
  formData: FormData,
): Promise<SubmitCaseResult> {
  const workflowId = String(formData.get("workflowId") ?? "") as ConsularWorkflowId;
  const workflow = getWorkflow(workflowId);
  if (!workflow) {
    return { ok: false, error: "Unknown consular workflow." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const passportNumber = String(formData.get("passportNumber") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (fullName.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!email.includes("@")) return { ok: false, error: "Please enter a valid email." };
  if (phone.length < 6) return { ok: false, error: "Please enter a valid phone number." };

  for (const req of workflow.documents) {
    if (!req.required) continue;
    const file = formData.get(`doc__${req.id}`);
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: `Missing required document: ${req.label}` };
    }
  }

  const now = new Date().toISOString();
  const id = createCaseId();
  const feeId = workflow.feeId;
  const needsPayment = Boolean(feeId && STRIPE_FEES[feeId]);

  const record: ConsularCase = {
    id,
    reference: createReference(workflowId),
    workflowId,
    status: needsPayment ? "awaiting_payment" : "submitted",
    paymentStatus: needsPayment ? "unpaid" : "not_required",
    feeId,
    applicant: { fullName, email, phone, passportNumber, notes },
    documents: [],
    staffNotes: [
      {
        id: `n-${Date.now()}`,
        at: now,
        by: "system",
        body: "Case created from website document workflow.",
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  try {
    for (const req of workflow.documents) {
      const file = formData.get(`doc__${req.id}`);
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_FILE_BYTES) {
        return {
          ok: false,
          error: `${req.label} exceeds the 8 MB upload limit.`,
        };
      }
      const bytes = Buffer.from(await file.arrayBuffer());
      const stored = await storeCaseDocument({
        caseId: id,
        requirementId: req.id,
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        bytes,
      });
      record.documents.push({
        requirementId: req.id,
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        storageKey: stored.storageKey,
        url: stored.url,
        uploadedAt: now,
      });
    }

    await saveCase(record);

    try {
      await sendCaseSubmittedEmails(record);
    } catch (mailError) {
      console.error("[case:email]", mailError);
      // Case is saved; email failure should not lose the submission.
    }

    return {
      ok: true,
      caseId: record.id,
      reference: record.reference,
      needsPayment,
      feeId,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit your case.";
    if (message.startsWith("Missing environment variable:")) {
      return {
        ok: false,
        error: `${message}. Configure Resend (and optionally Blob) in the environment.`,
      };
    }
    return { ok: false, error: message };
  }
}

export async function staffListCases(): Promise<
  { ok: true; cases: ConsularCase[] } | { ok: false; error: string }
> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  const cases = await listCases();
  return { ok: true, cases };
}

export async function staffGetCase(
  id: string,
): Promise<{ ok: true; case: ConsularCase } | { ok: false; error: string }> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  const record = await getCase(id);
  if (!record) return { ok: false, error: "Case not found." };
  return { ok: true, case: record };
}

export async function staffUpdateCaseStatus(input: {
  caseId: string;
  status: CaseStatus;
  message?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }

  const record = await getCase(input.caseId);
  if (!record) return { ok: false, error: "Case not found." };

  const now = new Date().toISOString();
  record.status = input.status;
  record.updatedAt = now;
  if (input.message?.trim()) {
    record.staffNotes.push({
      id: `n-${Date.now()}`,
      at: now,
      by: "staff",
      body: input.message.trim(),
    });
  }

  await saveCase(record);

  try {
    await sendCaseStatusEmail(record, input.message?.trim());
  } catch (error) {
    console.error("[case:status-email]", error);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/cases");
  revalidatePath(`/admin/cases/${record.id}`);
  revalidatePath("/staff");
  revalidatePath(`/staff/cases/${record.id}`);
  return { ok: true };
}

export async function markCasePaidFromStripe(input: {
  caseId: string;
  sessionId: string;
  paymentIntentId?: string;
}): Promise<void> {
  const record = await getCase(input.caseId);
  if (!record) return;
  record.paymentStatus = "paid";
  record.stripeSessionId = input.sessionId;
  if (input.paymentIntentId) {
    record.stripePaymentIntentId = input.paymentIntentId;
  }
  if (record.status === "awaiting_payment") {
    record.status = "in_review";
  }
  record.updatedAt = new Date().toISOString();
  record.staffNotes.push({
    id: `n-${Date.now()}`,
    at: record.updatedAt,
    by: "system",
    body: `Stripe payment recorded (${input.sessionId}).`,
  });
  await saveCase(record);
}
