import { Resend } from "resend";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_SERVICE_LABELS,
  BOOKING_TIMEZONE,
  type BookingRequest,
} from "@/lib/booking/types";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function sendBookingEmails(input: {
  booking: BookingRequest;
  eventId: string;
  htmlLink?: string | null;
}) {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("BOOKING_FROM_EMAIL");
  const notify = requireEnv("BOOKING_NOTIFY_EMAIL");
  const resend = new Resend(apiKey);

  const serviceLabel = BOOKING_SERVICE_LABELS[input.booking.service];
  const whenLabel = `${input.booking.date} at ${input.booking.timeSlot} (${BOOKING_TIMEZONE}, ~${BOOKING_DURATION_MINUTES} mins)`;
  const { applicant } = input.booking;

  const staffHtml = `
    <h2>New consular appointment request</h2>
    <p><strong>Service:</strong> ${serviceLabel}</p>
    <p><strong>When:</strong> ${whenLabel}</p>
    <p><strong>Applicant:</strong> ${applicant.fullName}</p>
    <p><strong>Email:</strong> ${applicant.email}</p>
    <p><strong>Phone:</strong> ${applicant.phone}</p>
    <p><strong>Passport / ID:</strong> ${applicant.passportNumber || "—"}</p>
    <p><strong>Notes:</strong> ${applicant.notes || "—"}</p>
    <p><strong>Google Calendar event:</strong> ${input.eventId}</p>
    ${input.htmlLink ? `<p><a href="${input.htmlLink}">Open in Google Calendar</a></p>` : ""}
  `;

  const applicantHtml = `
    <h2>Appointment request received</h2>
    <p>Dear ${applicant.fullName},</p>
    <p>Thank you for booking with the Embassy of Ethiopia in London.</p>
    <p><strong>Service:</strong> ${serviceLabel}</p>
    <p><strong>Requested time:</strong> ${whenLabel}</p>
    <p><strong>Location:</strong> 17 Princes Gate, London SW7 1PZ</p>
    <p>Please bring all required documents for your service. If you need to change or cancel, contact us at ${notify}.</p>
    <p>Embassy of Ethiopia · London</p>
  `;

  const staff = await resend.emails.send({
    from,
    to: notify,
    replyTo: applicant.email,
    subject: `[Booking] ${serviceLabel} — ${applicant.fullName} — ${input.booking.date} ${input.booking.timeSlot}`,
    html: staffHtml,
  });

  if (staff.error) {
    throw new Error(staff.error.message);
  }

  const applicantMail = await resend.emails.send({
    from,
    to: applicant.email,
    subject: `Appointment request received — ${serviceLabel}`,
    html: applicantHtml,
  });

  if (applicantMail.error) {
    throw new Error(applicantMail.error.message);
  }

  return {
    staffEmailId: staff.data?.id ?? null,
    applicantEmailId: applicantMail.data?.id ?? null,
  };
}
