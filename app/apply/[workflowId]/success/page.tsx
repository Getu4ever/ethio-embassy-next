import type { Metadata } from "next";
import Link from "next/link";
import { confirmCheckoutReturn } from "@/app/actions/stripe-confirm";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import { getCase } from "@/lib/cases/store";
import { getWorkflow } from "@/lib/consular/workflows";
import type { StripeFeeId } from "@/lib/stripe/fees";

export const metadata: Metadata = {
  title: "Submission received",
};

type Props = {
  params: Promise<{ workflowId: string }>;
  searchParams: Promise<{
    ref?: string;
    case?: string;
    unpaid?: string;
    session_id?: string;
  }>;
};

export default async function ApplySuccessPage({ params, searchParams }: Props) {
  const { workflowId } = await params;
  const query = await searchParams;
  const workflow = getWorkflow(workflowId);

  if (query.session_id && query.case) {
    await confirmCheckoutReturn({
      sessionId: query.session_id,
      caseId: query.case,
    });
  }

  const record = query.case ? await getCase(query.case) : null;
  const unpaid = query.unpaid === "1" && record?.paymentStatus !== "paid";
  const paidViaReturn =
    Boolean(query.session_id) || record?.paymentStatus === "paid";

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
        {paidViaReturn ? "Payment received" : "Case recorded"}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-navy">
        {query.ref ? `Reference ${query.ref}` : "Thank you"}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {workflow
          ? `Your ${workflow.shortTitle} pack is with the consular desk.`
          : "Your documents are with the consular desk."}{" "}
        You will receive email updates as the status changes.
      </p>

      {unpaid && record?.feeId ? (
        <div className="mt-8 border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-navy">
            Complete payment
          </h2>
          <p className="mt-2 text-sm text-muted">
            Your case is saved. Pay the fee to move it into active review.
          </p>
          <div className="mt-4">
            <StripeCheckoutButton
              feeId={record.feeId as StripeFeeId}
              caseId={record.id}
              customerEmail={record.applicant.email}
              successPath={`/apply/${workflowId}/success?ref=${encodeURIComponent(record.reference)}&case=${encodeURIComponent(record.id)}`}
              cancelPath={`/apply/${workflowId}/success?ref=${encodeURIComponent(record.reference)}&case=${encodeURIComponent(record.id)}&unpaid=1`}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/booking"
          className="bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white"
        >
          Book appointment
        </Link>
        <Link
          href="/apply"
          className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Another submission
        </Link>
      </div>
    </main>
  );
}
