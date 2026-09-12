import type { Metadata } from "next";
import AppointmentOpsPanel from "@/components/admin/AppointmentOpsPanel";
import { staffAppointmentDensity } from "@/app/actions/ops";
import { canManageRecords } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "Appointments",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ year?: string; month?: string }>;
};

export default async function AdminAppointmentsPage({ searchParams }: Props) {
  const viewer = await requireAdmin();
  const query = await searchParams;
  const now = new Date();
  const year = Number(query.year) || now.getFullYear();
  const month = Number(query.month) || now.getMonth() + 1;

  const density = await staffAppointmentDensity({ year, month });
  const days = density.ok ? density.days : [];
  const bookings = density.ok ? density.bookings : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Appointments
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Review booking density, mark closed days, and manage appointment
          records.
          {canManageRecords(viewer.role)
            ? " Master Admin and Director can edit or delete bookings."
            : ""}
        </p>
      </div>

      <AppointmentOpsPanel
        initialYear={year}
        initialMonth={month}
        days={days}
        bookings={bookings}
        canEditDelete={canManageRecords(viewer.role)}
      />
    </div>
  );
}
