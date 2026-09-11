"use server";

import {
  STRIPE_FEES,
  type CreateCheckoutSessionInput,
  type CreateCheckoutSessionResult,
} from "@/lib/stripe/fees";
import { getStripe, siteOrigin } from "@/lib/stripe/client";
import { getCase, saveCase } from "@/lib/cases/store";

export async function createStripeCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionResult> {
  const fee = STRIPE_FEES[input.feeId];
  if (!fee) {
    return { ok: false, error: "Unknown fee selection." };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      ok: false,
      error:
        "Stripe is not configured. Set STRIPE_SECRET_KEY to enable online fee payment.",
    };
  }

  const origin = siteOrigin();
  const successPath = input.successPath ?? "/apply?paid=1";
  const cancelPath = input.cancelPath ?? "/apply?cancelled=1";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: fee.currency,
            unit_amount: fee.amount,
            product_data: {
              name: fee.label,
              description: fee.placeholder
                ? `${fee.description} — placeholder amount pending Embassy confirmation.`
                : fee.description,
            },
          },
        },
      ],
      success_url: `${origin}${successPath}${successPath.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}`,
      metadata: {
        feeId: fee.id,
        caseId: input.caseId ?? "",
        placeholder: fee.placeholder ? "1" : "0",
      },
    });

    if (!session.url) {
      return { ok: false, error: "Stripe did not return a checkout URL." };
    }

    if (input.caseId) {
      const existing = await getCase(input.caseId);
      if (existing) {
        existing.stripeSessionId = session.id;
        existing.updatedAt = new Date().toISOString();
        await saveCase(existing);
      }
    }

    return { ok: true, url: session.url, sessionId: session.id };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe checkout failed.";
    return { ok: false, error: message };
  }
}
