import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Appointments",
};

export default function AdminAppointmentsPage() {
  const calendarConfigured = Boolean(
    process.env.GOOGLE_CALENDAR_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_PRIVATE_KEY?.trim(),
  );
  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Appointments
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Public bookings at <Link href="/booking" className="text-navy underline">/booking</Link>{" "}
          create events on the Embassy Google Calendar and send Resend
          confirmations. Manage day-to-day slots in Calendar itself.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Google Calendar
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-navy">
            {calendarConfigured ? "Connected" : "Not configured"}
          </p>
          <p className="mt-2 text-sm text-muted">
            {calendarConfigured
              ? "New appointment requests will appear on the shared Embassy calendar."
              : "Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_CALENDAR_ID."}
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Resend email
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-navy">
            {resendConfigured ? "Connected" : "Not configured"}
          </p>
          <p className="mt-2 text-sm text-muted">
            Confirmations go to the applicant and BOOKING_NOTIFY_EMAIL.
          </p>
        </div>
      </div>

      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Staff workflow
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted">
          <li>Open the shared Google Calendar used by the booking service account.</li>
          <li>Review new events (service, applicant, phone, notes in the description).</li>
          <li>
            Cross-check document cases in{" "}
            <Link href="/admin/cases" className="text-navy underline">
              Case queue
            </Link>{" "}
            when the visitor also submitted files online.
          </li>
          <li>Reschedule or cancel directly in Calendar; email the applicant if needed.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/booking"
            target="_blank"
            className="bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
          >
            Open public booking form
          </Link>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy"
          >
            Open Google Calendar
          </a>
        </div>
      </section>
    </div>
  );
}
