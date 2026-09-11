import type { Metadata } from "next";
import AppointmentOpsPanel from "@/components/admin/AppointmentOpsPanel";
import { staffAppointmentDensity } from "@/app/actions/ops";

export const metadata: Metadata = {
  title: "Appointments",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ year?: string; month?: string }>;
};

export default async function AdminAppointmentsPage({ searchParams }: Props) {
  const query = await searchParams;
  const now = new Date();
  const year = Number(query.year) || now.getFullYear();
  const month = Number(query.month) || now.getMonth() + 1;

  const density = await staffAppointmentDensity({ year, month });
  const days = density.ok ? density.days : [];
  const bookings = density.ok ? density.bookings : [];

  const calendarConfigured = Boolean(
    process.env.GOOGLE_CALENDAR_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_PRIVATE_KEY?.trim(),
  );
  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Appointment operations
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Review booking density, flag Embassy closed days, and keep public
          `/booking` slots aligned with the mission calendar.
        </p>
      </div>

      <AppointmentOpsPanel
        initialYear={year}
        initialMonth={month}
        days={days}
        bookings={bookings}
        calendarConfigured={calendarConfigured}
        resendConfigured={resendConfigured}
      />
    </div>
  );
}
