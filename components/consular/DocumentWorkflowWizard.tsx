"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { submitConsularCase } from "@/app/actions/cases";
import { createStripeCheckoutSession } from "@/app/actions/stripe";
import type { ConsularWorkflow } from "@/lib/consular/workflows";
import { STRIPE_FEES, formatFeeAmount } from "@/lib/stripe/fees";

type Props = { workflow: ConsularWorkflow };

export default function DocumentWorkflowWizard({ workflow }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{
    caseId: string;
    reference: string;
    needsPayment: boolean;
    feeId?: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const fee = workflow.feeId ? STRIPE_FEES[workflow.feeId] : null;

  const canStep1 =
    fullName.trim().length > 1 &&
    email.includes("@") &&
    phone.trim().length > 5;

  const canStep2 = useMemo(() => {
    return workflow.documents.every((doc) => {
      if (!doc.required) return true;
      return Boolean(files[doc.id]);
    });
  }, [files, workflow.documents]);

  const onSubmit = () => {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("workflowId", workflow.id);
      formData.set("fullName", fullName);
      formData.set("email", email);
      formData.set("phone", phone);
      formData.set("passportNumber", passportNumber);
      formData.set("notes", notes);
      for (const doc of workflow.documents) {
        const file = files[doc.id];
        if (file) formData.set(`doc__${doc.id}`, file);
      }

      const result = await submitConsularCase(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      if (result.needsPayment && result.feeId) {
        const checkout = await createStripeCheckoutSession({
          feeId: result.feeId as keyof typeof STRIPE_FEES,
          caseId: result.caseId,
          customerEmail: email.trim().toLowerCase(),
          successPath: `/apply/${workflow.id}/success?ref=${encodeURIComponent(result.reference)}&case=${encodeURIComponent(result.caseId)}`,
          cancelPath: `/apply/${workflow.id}/success?ref=${encodeURIComponent(result.reference)}&case=${encodeURIComponent(result.caseId)}&unpaid=1`,
        });
        if (checkout.ok) {
          window.location.assign(checkout.url);
          return;
        }
        setDone({
          caseId: result.caseId,
          reference: result.reference,
          needsPayment: true,
          feeId: result.feeId,
        });
        setError(
          `Case saved (${result.reference}), but checkout failed: ${checkout.error}`,
        );
        return;
      }

      setDone({
        caseId: result.caseId,
        reference: result.reference,
        needsPayment: false,
      });
    });
  };

  if (done && !error) {
    return (
      <div className="border border-emerald/30 bg-emerald/5 p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
          Submission received
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy">
          Reference {done.reference}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Your documents are in the consular review queue. You will receive an
          email confirmation shortly.
        </p>
        {workflow.recommendBooking ? (
          <Link
            href="/booking"
            className="mt-6 inline-flex bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white"
          >
            Book an appointment
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface shadow-[0_30px_80px_rgba(11,31,58,0.08)]">
      <div className="border-b border-line px-4 py-4 sm:px-8">
        <ol className="flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs">
          {(
            [
              [1, "Applicant"],
              [2, "Documents"],
              [3, "Review"],
            ] as const
          ).map(([n, label]) => (
            <li
              key={n}
              className={
                step === n ? "text-navy" : step > n ? "text-emerald" : "text-muted/50"
              }
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px]">
                {n}
              </span>
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6 p-4 sm:p-8">
        {workflow.applicantHints?.length ? (
          <ul className="space-y-2 border-l-2 border-gold bg-gold/10 px-4 py-3 text-sm text-charcoal">
            {workflow.applicantHints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ["fullName", "Full name", fullName, setFullName, "text"],
                ["email", "Email", email, setEmail, "email"],
                ["phone", "Phone", phone, setPhone, "tel"],
                [
                  "passportNumber",
                  "Passport / ID number",
                  passportNumber,
                  setPassportNumber,
                  "text",
                ],
              ] as const
            ).map(([key, label, value, setter, type]) => (
              <label key={key} className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{label}</span>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border border-line bg-canvas px-3 py-2.5 outline-none focus:border-navy"
                  required={key !== "passportNumber"}
                />
              </label>
            ))}
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-medium text-navy">Notes</span>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-line bg-canvas px-3 py-2.5 outline-none focus:border-navy"
              />
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            {workflow.documents.map((doc) => (
              <label key={doc.id} className="block border border-line p-4">
                <span className="font-medium text-navy">
                  {doc.label}
                  {doc.required ? (
                    <span className="text-crimson"> *</span>
                  ) : (
                    <span className="text-muted"> (optional)</span>
                  )}
                </span>
                {doc.description ? (
                  <span className="mt-1 block text-sm text-muted">
                    {doc.description}
                  </span>
                ) : null}
                <input
                  type="file"
                  accept={doc.accept}
                  className="mt-3 block w-full text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setFiles((prev) => ({ ...prev, [doc.id]: file }));
                  }}
                />
                {files[doc.id] ? (
                  <span className="mt-2 block text-xs text-emerald">
                    Selected: {files[doc.id]?.name}
                  </span>
                ) : null}
              </label>
            ))}
            <p className="text-xs text-muted">Max 8 MB per file. PDF or images.</p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4 text-sm text-muted">
            <p>
              <strong className="text-navy">Applicant:</strong> {fullName} ·{" "}
              {email} · {phone}
            </p>
            <p>
              <strong className="text-navy">Documents:</strong>{" "}
              {workflow.documents
                .filter((d) => files[d.id])
                .map((d) => d.label)
                .join(", ") || "None"}
            </p>
            {fee ? (
              <p className="border border-line bg-canvas px-4 py-3">
                After submit you will be taken to Stripe to pay{" "}
                <strong className="text-navy">
                  {fee.label} — {formatFeeAmount(fee)}
                </strong>
                {fee.placeholder
                  ? " (placeholder amount until the Embassy confirms the online tariff)."
                  : "."}
              </p>
            ) : (
              <p>No online fee is attached to this workflow.</p>
            )}
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-crimson" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <button
          type="button"
          disabled={step === 1 || isPending}
          onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)))}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted disabled:opacity-30"
        >
          Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            disabled={
              (step === 1 && !canStep1) || (step === 2 && !canStep2) || isPending
            }
            onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))}
            className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={isPending}
            onClick={onSubmit}
            className="bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep disabled:opacity-40"
          >
            {isPending
              ? "Submitting…"
              : fee
                ? "Submit & pay"
                : "Submit for review"}
          </button>
        )}
      </div>
    </div>
  );
}
