"use server";

import { markCasePaidFromStripe } from "@/app/actions/cases";
import { getStripe } from "@/lib/stripe/client";

/** Confirm Checkout return (useful when webhooks are delayed in local/dev). */
export async function confirmCheckoutReturn(input: {
  sessionId: string;
  caseId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const stripe = getStripe();
  if (!stripe) return { ok: false, error: "Stripe not configured." };

  try {
    const session = await stripe.checkout.sessions.retrieve(input.sessionId);
    if (session.payment_status !== "paid") {
      return { ok: false, error: "Payment not completed." };
    }
    if (session.metadata?.caseId && session.metadata.caseId !== input.caseId) {
      return { ok: false, error: "Session does not match this case." };
    }
    await markCasePaidFromStripe({
      caseId: input.caseId,
      sessionId: session.id,
      paymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not confirm payment.",
    };
  }
}
