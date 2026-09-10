"use client";

import { useState, useTransition } from "react";
import { createStripeCheckoutSession } from "@/app/actions/stripe";
import { STRIPE_FEES, type StripeFeeId } from "@/lib/stripe/fees";

type StripeCheckoutButtonProps = {
  feeId: StripeFeeId;
  label?: string;
  className?: string;
  successPath?: string;
  cancelPath?: string;
};

export default function StripeCheckoutButton({
  feeId,
  label = "Pay Fee Online via Stripe",
  className,
  successPath,
  cancelPath,
}: StripeCheckoutButtonProps) {
  const fee = STRIPE_FEES[feeId];
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onPay = () => {
    setError(null);
    startTransition(async () => {
      const result = await createStripeCheckoutSession({
        feeId,
        successPath,
        cancelPath,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      window.location.assign(result.url);
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onPay}
        disabled={isPending}
        className={
          className ??
          "inline-flex w-full items-center justify-center gap-2 bg-navy px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-navy-mid disabled:opacity-60 sm:w-auto"
        }
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        {isPending ? "Connecting to Stripe…" : label}
      </button>
      <p className="text-xs text-muted">
        Secure checkout for {fee.label} — {(fee.amount / 100).toFixed(2)}{" "}
        {fee.currency.toUpperCase()}
      </p>
      {error ? (
        <p className="text-xs text-crimson" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
