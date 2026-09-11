"use client";

import { useTransition } from "react";
import { staffUpdateCaseStatus } from "@/app/actions/cases";
import {
  CASE_STATUS_LABELS,
  type CaseStatus,
  type ConsularCase,
} from "@/lib/cases/types";

const ACTIONS: { status: CaseStatus; label: string }[] = [
  { status: "in_review", label: "Mark in review" },
  { status: "needs_info", label: "Request more info" },
  { status: "approved", label: "Approve" },
  { status: "rejected", label: "Reject" },
  { status: "completed", label: "Mark completed" },
];

export default function StaffCaseActions({ record }: { record: ConsularCase }) {
  const [pending, startTransition] = useTransition();

  const run = (status: CaseStatus) => {
    const prompted =
      status === "needs_info"
        ? window.prompt("Message to applicant (required for needs info):")
        : window.prompt("Optional note to applicant:");
    if (status === "needs_info" && !prompted?.trim()) return;

    const message = prompted?.trim() || undefined;

    startTransition(async () => {
      const result = await staffUpdateCaseStatus({
        caseId: record.id,
        status,
        message,
      });
      if (!result.ok) {
        window.alert(result.error);
        return;
      }
      window.location.reload();
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Current status:{" "}
        <strong className="text-navy">{CASE_STATUS_LABELS[record.status]}</strong>
      </p>
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.status}
            type="button"
            disabled={pending || record.status === action.status}
            onClick={() => run(action.status)}
            className="border border-line bg-canvas px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy disabled:opacity-40"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
