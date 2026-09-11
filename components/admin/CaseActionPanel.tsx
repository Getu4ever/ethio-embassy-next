"use client";

import { useMemo, useState, useTransition } from "react";
import {
  approveCase,
  rejectCase,
  requestCaseInfo,
  staffUpdateCaseStatus,
} from "@/app/actions/cases";
import {
  CASE_STATUS_LABELS,
  type CaseStatus,
  type ConsularCase,
} from "@/lib/cases/types";

type Props = {
  record: ConsularCase;
};

export default function CaseActionPanel({ record }: Props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const canAct = useMemo(
    () => !["approved", "rejected", "completed"].includes(record.status),
    [record.status],
  );

  const run = (
    fn: () => Promise<{ ok: true } | { ok: false; error: string }>,
  ) => {
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.reload();
    });
  };

  return (
    <div className="space-y-5 border border-navy/10 bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Decision desk
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold text-navy">
          Case actions
        </h2>
        <p className="mt-2 text-sm text-muted">
          Status:{" "}
          <strong className="text-navy">
            {CASE_STATUS_LABELS[record.status]}
          </strong>
        </p>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">
          Message to applicant
        </span>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Required for Request Info; optional for Approve / Reject"
          className="w-full border border-line bg-canvas px-3 py-2.5 text-sm outline-none focus:border-navy"
        />
      </label>

      <div className="grid gap-2">
        <button
          type="button"
          disabled={pending || record.status === "approved"}
          onClick={() => run(() => approveCase(record.id, message))}
          className="bg-emerald px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={pending || record.status === "needs_info"}
          onClick={() => run(() => requestCaseInfo(record.id, message))}
          className="bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep disabled:opacity-40"
        >
          Request info
        </button>
        <button
          type="button"
          disabled={pending || record.status === "rejected"}
          onClick={() => run(() => rejectCase(record.id, message))}
          className="bg-crimson px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40"
        >
          Reject
        </button>
      </div>

      {canAct ? (
        <div className="border-t border-line pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Workflow
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["in_review", "Mark in review"],
                ["completed", "Mark completed"],
              ] as const
            ).map(([status, label]) => (
              <button
                key={status}
                type="button"
                disabled={pending || record.status === status}
                onClick={() =>
                  run(() =>
                    staffUpdateCaseStatus({
                      caseId: record.id,
                      status: status as CaseStatus,
                      message: message.trim() || undefined,
                    }),
                  )
                }
                className="border border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy disabled:opacity-40"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-crimson" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
