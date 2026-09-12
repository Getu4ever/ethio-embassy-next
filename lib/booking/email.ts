import { Resend } from "resend";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_SERVICE_LABELS,
  BOOKING_TIMEZONE,
  type BookingRequest,
} from "@/lib/booking/types";
import { contact } from "@/lib/content/site";
import { renderBrandedEmail } from "@/lib/notify/email-layout";
import { resolveDeskNotifyEmail } from "@/lib/notify/safe-email";

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
  const notify = resolveDeskNotifyEmail();
  const publicContact = contact.email;
  const resend = new Resend(apiKey);

  const serviceLabel = BOOKING_SERVICE_LABELS[input.booking.service];
  const whenLabel = `${input.booking.date} at ${input.booking.timeSlot} (${BOOKING_TIMEZONE}, ~${BOOKING_DURATION_MINUTES} mins)`;
  const { applicant } = input.booking;
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://ethioembassy.org.uk";

  const staffHtml = renderBrandedEmail({
    variant: "staff",
    title: "New consular appointment request",
    intro: [
      "A new appointment request has been submitted through the Embassy website.",
    ],
    detailsLabel: "Appointment details",
    details: [
      { label: "Service", value: serviceLabel },
      { label: "When", value: whenLabel },
      { label: "Applicant", value: applicant.fullName },
      { label: "Email", value: applicant.email },
      { label: "Phone", value: applicant.phone },
      { label: "Passport / ID", value: applicant.passportNumber || "—" },
      { label: "Notes", value: applicant.notes || "—" },
      { label: "Calendar event", value: input.eventId },
    ],
    cta: input.htmlLink
      ? { label: "Open in Google Calendar", href: input.htmlLink }
      : { label: "Open admin appointments", href: `${origin}/admin/appointments` },
  });

  const applicantHtml = renderBrandedEmail({
    variant: "applicant",
    title: "Appointment request received",
    greeting: `Dear ${applicant.fullName},`,
    intro: [
      "Thank you for booking with the Embassy of Ethiopia in London. We have received your appointment request for the service below.",
    ],
    detailsLabel: "Appointment details",
    details: [
      { label: "Service", value: serviceLabel },
      { label: "Requested time", value: whenLabel },
      { label: "Location", value: contact.address },
    ],
    closing: [
      "Please bring all required documents for your service. If you need to change or cancel, contact us and quote your requested date and time.",
      `Questions? Email ${publicContact} or call ${contact.phoneDisplay}.`,
    ],
    cta: {
      label: "Visit Embassy website",
      href: origin,
    },
  });

  let staffEmailId: string | null = null;
  if (notify) {
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
    staffEmailId = staff.data?.id ?? null;
  } else {
    console.info(
      "[booking-email] Desk notify skipped — BOOKING_NOTIFY_EMAIL unset or blocked (master MFA inbox).",
    );
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
    staffEmailId,
    applicantEmailId: applicantMail.data?.id ?? null,
  };
}
