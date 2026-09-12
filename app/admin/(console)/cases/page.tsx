import type { Metadata } from "next";
import Link from "next/link";
import CaseQueueTable from "@/components/admin/CaseQueueTable";
import { listCases } from "@/lib/cases/store";
import { CASE_STATUS_LABELS, type CaseStatus } from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";
import { canManageRecords } from "@/lib/staff/permissions";
import { requireAdmin } from "@/lib/staff/session";

export const metadata: Metadata = {
  title: "Case queue",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ status?: string; q?: string }> };

export default async function AdminCasesPage({ searchParams }: Props) {
  const viewer = await requireAdmin();
  const { status: statusFilter, q } = await searchParams;
  const cases = await listCases();
  const query = q?.trim().toLowerCase() ?? "";
  const canEditDelete = canManageRecords(viewer.role);

  let filtered = statusFilter
    ? cases.filter((c) => c.status === statusFilter)
    : cases;

  if (query) {
    filtered = filtered.filter((c) => {
      const hay = [
        c.reference,
        c.applicant.fullName,
        c.applicant.email,
        c.applicant.phone,
        CONSULAR_WORKFLOWS[c.workflowId].title,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }

  const counts = cases.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<CaseStatus, number>>,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Case queue
        </h1>
        <p className="mt-2 text-sm text-muted">
          Review document submissions, payments, and applicant correspondence.
          {canEditDelete
            ? " Master Admin and Director can edit or delete entries."
            : ""}
        </p>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search reference, name, email…"
          className="min-w-[220px] flex-1 border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy"
        />
        {statusFilter ? (
          <input type="hidden" name="status" value={statusFilter} />
        ) : null}
        <button
          type="submit"
          className="bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/cases"
          className={`border px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${
            !statusFilter ? "border-navy bg-navy text-white" : "border-line bg-white"
          }`}
        >
          All ({cases.length})
        </Link>
        {(Object.keys(CASE_STATUS_LABELS) as CaseStatus[]).map((status) => (
          <Link
            key={status}
            href={`/admin/cases?status=${status}`}
            className={`border px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${
              statusFilter === status
                ? "border-navy bg-navy text-white"
                : "border-line bg-white"
            }`}
          >
            {CASE_STATUS_LABELS[status]} ({counts[status] ?? 0})
          </Link>
        ))}
      </div>

      <CaseQueueTable cases={filtered} canEditDelete={canEditDelete} />
    </div>
  );
}
