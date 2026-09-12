"use client";

import { useActionState } from "react";
import {
  staffDeleteCase,
  staffUpdateCaseDetails,
} from "@/app/actions/cases";
import {
  CASE_STATUS_LABELS,
  type CaseStatus,
  type ConsularCase,
  type PaymentStatus,
} from "@/lib/cases/types";

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  not_required: "Not required",
  unpaid: "Unpaid",
  paid: "Paid",
  refunded: "Refunded",
};

export default function CaseRecordEditor({ record }: { record: ConsularCase }) {
  const [state, action, pending] = useActionState(staffUpdateCaseDetails, null);

  return (
    <section className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Director controls
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-navy">
            Edit case details
          </h2>
        </div>
        <form action={staffDeleteCase}>
          <input type="hidden" name="caseId" value={record.id} />
          <button
            type="submit"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-crimson hover:underline"
            onClick={(e) => {
              if (
                !confirm(
                  `Permanently delete case ${record.reference}? This cannot be undone.`,
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            Delete case
          </button>
        </form>
      </div>

      <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="caseId" value={record.id} />
        <Field
          name="fullName"
          label="Applicant name"
          defaultValue={record.applicant.fullName}
          required
        />
        <Field
          name="email"
          label="Email"
          type="email"
          defaultValue={record.applicant.email}
          required
        />
        <Field
          name="phone"
          label="Phone"
          defaultValue={record.applicant.phone}
        />
        <Field
          name="passportNumber"
          label="Passport / ID"
          defaultValue={record.applicant.passportNumber}
        />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-charcoal">Status</span>
          <select
            name="status"
            defaultValue={record.status}
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
          >
            {(Object.keys(CASE_STATUS_LABELS) as CaseStatus[]).map((status) => (
              <option key={status} value={status}>
                {CASE_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-charcoal">Payment</span>
          <select
            name="paymentStatus"
            defaultValue={record.paymentStatus}
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
          >
            {(Object.keys(PAYMENT_LABELS) as PaymentStatus[]).map((status) => (
              <option key={status} value={status}>
                {PAYMENT_LABELS[status]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-charcoal">
            Applicant notes
          </span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={record.applicant.notes}
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
          {state?.error ? (
            <p className="text-sm text-crimson">{state.error}</p>
          ) : null}
          {state?.ok ? (
            <p className="text-sm text-emerald">Saved</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-charcoal">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
      />
    </label>
  );
}
