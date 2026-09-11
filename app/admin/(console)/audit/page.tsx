import type { Metadata } from "next";
import AuditLog from "@/components/admin/AuditLog";
import { listAuditEntries } from "@/lib/audit/store";

export const metadata: Metadata = {
  title: "Audit log",
};

export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const entries = await listAuditEntries(200);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Audit log
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Read-only security trail of staff actions across cases, appointments,
          and system modules.
        </p>
      </div>
      <AuditLog entries={entries} />
    </div>
  );
}
