import type { Metadata } from "next";
import Link from "next/link";
import { listCases } from "@/lib/cases/store";
import { CASE_STATUS_LABELS, type CaseStatus } from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";

export const metadata: Metadata = {
  title: "Case queue",
};

type Props = { searchParams: Promise<{ status?: string; q?: string }> };

export default async function AdminCasesPage({ searchParams }: Props) {
  const { status: statusFilter, q } = await searchParams;
  const cases = await listCases();
  const query = q?.trim().toLowerCase() ?? "";

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

      <div className="overflow-x-auto border border-navy/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/cases/${record.id}`}
                    className="font-medium text-navy underline decoration-gold/40"
                  >
                    {record.reference}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">
                  {CONSULAR_WORKFLOWS[record.workflowId].shortTitle}
                </td>
                <td className="px-4 py-3">
                  <div>{record.applicant.fullName}</div>
                  <div className="text-xs text-muted">{record.applicant.email}</div>
                </td>
                <td className="px-4 py-3">
                  {CASE_STATUS_LABELS[record.status]}
                </td>
                <td className="px-4 py-3 capitalize text-muted">
                  {record.paymentStatus.replace("_", " ")}
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(record.updatedAt).toLocaleString("en-GB")}
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  No cases match this view.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
