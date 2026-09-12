"use client";

import Link from "next/link";
import { staffDeleteCase } from "@/app/actions/cases";
import {
  CASE_STATUS_LABELS,
  type ConsularCase,
} from "@/lib/cases/types";
import { CONSULAR_WORKFLOWS } from "@/lib/consular/workflows";

export default function CaseQueueTable({
  cases,
  canEditDelete,
}: {
  cases: ConsularCase[];
  canEditDelete: boolean;
}) {
  return (
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
            {canEditDelete ? <th className="px-4 py-3">Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {cases.map((record) => (
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
              {canEditDelete ? (
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/admin/cases/${record.id}`}
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-navy hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={staffDeleteCase}>
                      <input type="hidden" name="caseId" value={record.id} />
                      <button
                        type="submit"
                        className="text-xs font-semibold uppercase tracking-[0.1em] text-crimson hover:underline"
                        onClick={(e) => {
                          if (
                            !confirm(
                              `Delete case ${record.reference}? This cannot be undone.`,
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
          {cases.length === 0 ? (
            <tr>
              <td
                colSpan={canEditDelete ? 7 : 6}
                className="px-4 py-10 text-center text-muted"
              >
                No cases match this view.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
