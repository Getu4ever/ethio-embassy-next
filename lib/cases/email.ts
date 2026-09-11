import { Resend } from "resend";
import { CASE_STATUS_LABELS, type ConsularCase } from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function mailer() {
  return {
    resend: new Resend(requireEnv("RESEND_API_KEY")),
    from: requireEnv("BOOKING_FROM_EMAIL"),
    notify: requireEnv("BOOKING_NOTIFY_EMAIL"),
  };
}

export async function sendCaseSubmittedEmails(record: ConsularCase) {
  const { resend, from, notify } = mailer();
  const workflow = CONSULAR_WORKFLOWS[record.workflowId];
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  const staff = await resend.emails.send({
    from,
    to: notify,
    replyTo: record.applicant.email,
    subject: `[Case ${record.reference}] ${workflow.title} — ${record.applicant.fullName}`,
    html: `
      <h2>New consular document case</h2>
      <p><strong>Reference:</strong> ${record.reference}</p>
      <p><strong>Service:</strong> ${workflow.title}</p>
      <p><strong>Status:</strong> ${CASE_STATUS_LABELS[record.status]}</p>
      <p><strong>Applicant:</strong> ${record.applicant.fullName}</p>
      <p><strong>Email:</strong> ${record.applicant.email}</p>
      <p><strong>Phone:</strong> ${record.applicant.phone}</p>
      <p><strong>Documents:</strong> ${record.documents.length}</p>
      ${origin ? `<p><a href="${origin}/admin/cases/${record.id}">Open in staff queue</a></p>` : ""}
    `,
  });
  if (staff.error) throw new Error(staff.error.message);

  const applicant = await resend.emails.send({
    from,
    to: record.applicant.email,
    subject: `We received your ${workflow.shortTitle} submission (${record.reference})`,
    html: `
      <p>Dear ${record.applicant.fullName},</p>
      <p>Your document pack for <strong>${workflow.title}</strong> has been received.</p>
      <p><strong>Reference:</strong> ${record.reference}</p>
      <p>Status: ${CASE_STATUS_LABELS[record.status]}</p>
      <p>The consular desk will review your files. You will receive another email if we need more information or when a decision is ready.</p>
      <p>Embassy of Ethiopia · London</p>
    `,
  });
  if (applicant.error) throw new Error(applicant.error.message);
}

export async function sendCaseStatusEmail(
  record: ConsularCase,
  staffMessage?: string,
) {
  const { resend, from, notify } = mailer();
  const workflow = CONSULAR_WORKFLOWS[record.workflowId];

  const result = await resend.emails.send({
    from,
    to: record.applicant.email,
    subject: `Update on ${record.reference} — ${CASE_STATUS_LABELS[record.status]}`,
    html: `
      <p>Dear ${record.applicant.fullName},</p>
      <p>Your case <strong>${record.reference}</strong> (${workflow.title}) is now: <strong>${CASE_STATUS_LABELS[record.status]}</strong>.</p>
      ${staffMessage ? `<p><strong>Message from the desk:</strong> ${staffMessage}</p>` : ""}
      <p>Questions? Contact ${notify}.</p>
      <p>Embassy of Ethiopia · London</p>
    `,
  });
  if (result.error) throw new Error(result.error.message);
}
