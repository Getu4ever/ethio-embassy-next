"use client";

import { useActionState } from "react";
import {
  adminSaveFees,
  adminSaveOfficeHours,
  adminSaveSiteNotes,
} from "@/app/actions/admin-content";
import type { SiteContent } from "@/lib/cms/content-store";
import type { StripeFee } from "@/lib/stripe/fees";

export default function SiteContentEditor({
  content,
  fees,
  canEdit,
}: {
  content: SiteContent;
  fees: StripeFee[];
  canEdit: boolean;
}) {
  const [hoursState, hoursAction, hoursPending] = useActionState(
    adminSaveOfficeHours,
    null,
  );
  const [notesState, notesAction, notesPending] = useActionState(
    adminSaveSiteNotes,
    null,
  );
  const [feesState, feesAction, feesPending] = useActionState(adminSaveFees, null);

  if (!canEdit) {
    return (
      <p className="border border-navy/10 bg-white p-6 text-sm text-muted shadow-sm">
        Your role can view this catalogue. Editing is limited to Master,
        Director, Ambassador, and Content Editor accounts.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Office hours / timetable
        </h2>
        <p className="mt-1 text-sm text-muted">
          Updates appear in the public footer and mission contact blocks.
        </p>
        <form action={hoursAction} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field name="days" label="Days" defaultValue={content.officeHours.days} />
          <Field
            name="summary"
            label="Summary"
            defaultValue={content.officeHours.summary}
          />
          <Field
            name="morning"
            label="Morning"
            defaultValue={content.officeHours.morning}
          />
          <Field
            name="afternoon"
            label="Afternoon"
            defaultValue={content.officeHours.afternoon}
          />
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-charcoal">Closed note</span>
            <input
              name="closed"
              defaultValue={content.officeHours.closed}
              className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
            />
          </label>
          <SaveRow pending={hoursPending} state={hoursState} />
        </form>
      </section>

      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Service desk notes
        </h2>
        <p className="mt-1 text-sm text-muted">
          Editable guidance for visa documents, TIN requests, and duty-free notes.
        </p>
        <form action={notesAction} className="mt-5 space-y-4">
          <TextArea
            name="visaDocuments"
            label="Visa documents"
            defaultValue={content.notes.visaDocuments}
          />
          <TextArea
            name="tinRequest"
            label="TIN / criminal record"
            defaultValue={content.notes.tinRequest}
          />
          <TextArea
            name="dutyFreeNotes"
            label="Duty-free notes"
            defaultValue={content.notes.dutyFreeNotes}
          />
          <TextArea
            name="generalDesk"
            label="General desk note"
            defaultValue={content.notes.generalDesk}
          />
          <SaveRow pending={notesPending} state={notesState} />
        </form>
      </section>

      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Service fees
        </h2>
        <p className="mt-1 text-sm text-muted">
          Amounts in GBP. Changes apply to Stripe Checkout and the applicant portal.
        </p>
        <form action={feesAction} className="mt-5 space-y-5">
          {fees.map((fee) => (
            <div
              key={fee.id}
              className="grid gap-3 border border-line p-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="sm:col-span-2 lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {fee.id}
                </p>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-muted">Label</span>
                <input
                  name={`label-${fee.id}`}
                  defaultValue={fee.label}
                  className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted">Amount (GBP)</span>
                <input
                  name={`amount-${fee.id}`}
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={(fee.amount / 100).toFixed(2)}
                  className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block text-muted">Description</span>
                <input
                  name={`description-${fee.id}`}
                  defaultValue={fee.description}
                  className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
                />
              </label>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  name={`placeholder-${fee.id}`}
                  defaultChecked={fee.placeholder}
                  className="accent-navy"
                />
                Mark as placeholder (pending official schedule)
              </label>
            </div>
          ))}
          <SaveRow pending={feesPending} state={feesState} />
        </form>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-charcoal">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
      />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-charcoal">{label}</span>
      <textarea
        name={name}
        rows={4}
        defaultValue={defaultValue}
        className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
      />
    </label>
  );
}

function SaveRow({
  pending,
  state,
}: {
  pending: boolean;
  state: { ok?: boolean; error?: string } | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
      {state?.error ? (
        <p className="text-sm text-crimson" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-emerald" role="status">
          Saved
        </p>
      ) : null}
    </div>
  );
}
