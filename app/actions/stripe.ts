"use server";

import {
  STRIPE_FEES,
  type CreateCheckoutSessionInput,
  type CreateCheckoutSessionResult,
} from "@/lib/stripe/fees";

/**
 * Initializes a Stripe Checkout Session for a selected consular fee.
 *
 * Wire-up checklist:
 * 1. `npm install stripe`
 * 2. Set `STRIPE_SECRET_KEY` in the environment
 * 3. Replace the stub below with `stripe.checkout.sessions.create(...)`
 */
export async function createStripeCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionResult> {
  const fee = STRIPE_FEES[input.feeId];
  if (!fee) {
    return { ok: false, error: "Unknown fee selection." };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      error:
        "Stripe is not configured. Set STRIPE_SECRET_KEY to enable online fee payment.",
    };
  }

  // Placeholder response shaped like a Checkout Session.
  // Replace with the Stripe SDK when keys are available:
  //
  // const stripe = new Stripe(secret);
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: [{
  //     quantity: 1,
  //     price_data: {
  //       currency: fee.currency,
  //       unit_amount: fee.amount,
  //       product_data: { name: fee.label, description: fee.description },
  //     },
  //   }],
  //   success_url: `${origin}${input.successPath ?? "/booking?paid=1"}`,
  //   cancel_url: `${origin}${input.cancelPath ?? "/booking?cancelled=1"}`,
  //   metadata: { feeId: fee.id },
  // });
  // return { ok: true, url: session.url!, sessionId: session.id };

  return {
    ok: false,
    error: `Stripe Checkout stub ready for “${fee.label}” (${(
      fee.amount / 100
    ).toFixed(2)} ${fee.currency.toUpperCase()}). Install the Stripe SDK to go live.`,
  };
}
