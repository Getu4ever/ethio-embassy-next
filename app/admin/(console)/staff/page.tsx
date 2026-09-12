import type { Metadata } from "next";
import StaffAccountsPanel from "@/components/admin/StaffAccountsPanel";
import { canManageStaff } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";
import { STAFF_ROLE_LABELS } from "@/lib/staff/types";
import { listStaffUsers, toPublicStaff } from "@/lib/staff/users";

export const metadata: Metadata = {
  title: "Staff & access",
};

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const viewer = await requireAdmin();
  const accounts = (await listStaffUsers()).map(toPublicStaff);
  const activeCount = accounts.filter((a) => a.active).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Staff & access
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Create and manage who can sign in to the Embassy admin console, and
          assign each person the right role for their duties.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Active accounts
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-navy">
            {activeCount}
          </p>
          <p className="mt-2 text-sm text-muted">
            People with permission to use this console.
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Your role
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-navy">
            {STAFF_ROLE_LABELS[viewer.role]}
          </p>
          <p className="mt-2 text-sm text-muted">
            {canManageStaff(viewer.role)
              ? "You can add, edit, or remove staff accounts."
              : "Only Master Admin and Director can change login accounts."}
          </p>
        </div>
      </section>

      <StaffAccountsPanel
        accounts={accounts}
        canManage={canManageStaff(viewer.role)}
      />
    </div>
  );
}
