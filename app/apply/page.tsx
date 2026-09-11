import type { Metadata } from "next";
import Link from "next/link";
import { WORKFLOW_LIST } from "@/lib/consular/workflows";
import { STRIPE_FEES, formatFeeAmount } from "@/lib/stripe/fees";

export const metadata: Metadata = {
  title: "Submit Consular Documents",
  description:
    "Upload supporting documents for consular services at the Embassy of Ethiopia in London.",
};

export default function ApplyHubPage() {
  return (
    <main>
      <section className="diplomatic-mesh px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Document workflows
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Submit documents for review
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Choose a service, upload your pack, pay any online fee via Stripe,
            and the consular desk will review your case in the staff queue.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {WORKFLOW_LIST.map((workflow) => {
            const fee = workflow.feeId ? STRIPE_FEES[workflow.feeId] : null;
            return (
              <li key={workflow.id}>
                <Link
                  href={workflow.href}
                  className="block border border-line bg-surface p-6 transition hover:border-navy/30"
                >
                  <h2 className="font-display text-xl font-semibold text-navy">
                    {workflow.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {workflow.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                    {fee
                      ? `Fee ${formatFeeAmount(fee)}${fee.placeholder ? " · placeholder" : ""}`
                      : "No online fee"}
                    {" · "}Start →
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center text-sm text-muted">
          Prefer to visit first?{" "}
          <Link href="/booking" className="text-navy underline decoration-gold/50">
            Book an appointment
          </Link>
        </p>
      </section>
    </main>
  );
}
