import type { Metadata } from "next";
import EmployeesPanel from "@/components/admin/EmployeesPanel";
import { listEmployees } from "@/lib/cms/employees";
import { canManageEmployees } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "Employees",
};

export const dynamic = "force-dynamic";

export default async function AdminEmployeesPage() {
  const viewer = await requireAdmin();
  const employees = await listEmployees();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Employees
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Maintain diplomatic and desk staff profiles — name, contact, role, and
          biography. Director and Ambassador accounts can edit or remove entries.
        </p>
      </div>

      <EmployeesPanel
        employees={employees}
        canEdit={canManageEmployees(viewer.role)}
      />
    </div>
  );
}
