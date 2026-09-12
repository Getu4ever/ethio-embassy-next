import { Resend } from "resend";
import { contact } from "@/lib/content/site";
import { CASE_STATUS_LABELS, type ConsularCase } from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";
import { renderBrandedEmail } from "@/lib/notify/email-layout";
import { resolveDeskNotifyEmail } from "@/lib/notify/safe-email";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function mailer() {
  return {
    resend: new Resend(requireEnv("RESEND_API_KEY")),
    from: requireEnv("BOOKING_FROM_EMAIL"),
    notify: resolveDeskNotifyEmail(),
    publicContact: contact.email,
  };
}

export async function sendCaseSubmittedEmails(record: ConsularCase) {
  const { resend, from, notify, publicContact } = mailer();
  const workflow = CONSULAR_WORKFLOWS[record.workflowId];
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  if (notify) {
    const staff = await resend.emails.send({
      from,
      to: notify,
      replyTo: record.applicant.email,
      subject: `[Case ${record.reference}] ${workflow.title} — ${record.applicant.fullName}`,
      html: renderBrandedEmail({
        variant: "staff",
        title: "New consular document case",
        intro: [
          "A new document pack has been submitted through the online consular workflow.",
        ],
        detailsLabel: "Case details",
        details: [
          { label: "Reference", value: record.reference },
          { label: "Service", value: workflow.title },
          { label: "Status", value: CASE_STATUS_LABELS[record.status] },
          { label: "Applicant", value: record.applicant.fullName },
          { label: "Email", value: record.applicant.email },
          { label: "Phone", value: record.applicant.phone },
          { label: "Documents", value: String(record.documents.length) },
        ],
        cta: origin
          ? {
              label: "Open in staff queue",
              href: `${origin}/admin/cases/${record.id}`,
            }
          : undefined,
      }),
    });
    if (staff.error) throw new Error(staff.error.message);
  } else {
    console.info(
      "[case-email] Desk notify skipped — BOOKING_NOTIFY_EMAIL unset or blocked (master MFA inbox).",
    );
  }

  const applicant = await resend.emails.send({
    from,
    to: record.applicant.email,
    subject: `We received your ${workflow.shortTitle} submission (${record.reference})`,
    html: renderBrandedEmail({
      variant: "applicant",
      title: "Document pack received",
      greeting: `Dear ${record.applicant.fullName},`,
      intro: [
        `Your document pack for ${workflow.title} has been received by the Embassy of Ethiopia in London.`,
      ],
      detailsLabel: "Your submission",
      details: [
        { label: "Reference", value: record.reference },
        { label: "Service", value: workflow.title },
        { label: "Status", value: CASE_STATUS_LABELS[record.status] },
      ],
      closing: [
        "The consular desk will review your files. You will receive another email if we need more information or when a decision is ready.",
        `Please keep your reference number for all correspondence. Questions? Contact ${publicContact}.`,
      ],
      cta: origin
        ? { label: "Visit Embassy website", href: origin }
        : undefined,
    }),
  });
  if (applicant.error) throw new Error(applicant.error.message);
}

export async function sendCaseStatusEmail(
  record: ConsularCase,
  staffMessage?: string,
) {
  const { resend, from, publicContact } = mailer();
  const workflow = CONSULAR_WORKFLOWS[record.workflowId];
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const message = staffMessage?.trim();

  const result = await resend.emails.send({
    from,
    to: record.applicant.email,
    subject: `Update on ${record.reference} — ${CASE_STATUS_LABELS[record.status]}`,
    html: renderBrandedEmail({
      variant: "applicant",
      title: "Update on your consular case",
      greeting: `Dear ${record.applicant.fullName},`,
      intro: [
        `There is an update on your case ${record.reference} (${workflow.title}).`,
      ],
      detailsLabel: "Case status",
      details: [
        { label: "Reference", value: record.reference },
        { label: "Service", value: workflow.title },
        { label: "Status", value: CASE_STATUS_LABELS[record.status] },
        ...(message
          ? [{ label: "Message from the desk", value: message }]
          : []),
      ],
      closing: [
        `Questions? Contact ${publicContact} and quote your reference number.`,
      ],
      cta: origin
        ? { label: "Visit Embassy website", href: origin }
        : undefined,
    }),
  });
  if (result.error) throw new Error(result.error.message);
}
