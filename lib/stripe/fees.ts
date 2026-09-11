export type StripeFeeId =
  | "visa-standard"
  | "visa-express"
  | "legalization-standard"
  | "criminal-record"
  | "vital-events"
  | "duty-free";

export type StripeFee = {
  id: StripeFeeId;
  label: string;
  description: string;
  /** Amount in the smallest currency unit (e.g. pence for GBP). */
  amount: number;
  currency: "gbp";
  /**
   * When true, amount is a stand-in until the Embassy publishes the exact
   * schedule for online card payment. Do not treat as an official tariff.
   */
  placeholder: boolean;
};

/**
 * Online fee catalogue for Stripe Checkout.
 * Replace placeholder amounts with the Embassy’s published GBP schedule before go-live.
 */
export const STRIPE_FEES: Record<StripeFeeId, StripeFee> = {
  "visa-standard": {
    id: "visa-standard",
    label: "Visa Processing Fee",
    description: "Diplomatic / Service visa processing fee (placeholder).",
    amount: 5000,
    currency: "gbp",
    placeholder: true,
  },
  "visa-express": {
    id: "visa-express",
    label: "Visa Express Fee",
    description: "Expedited visa processing fee (placeholder).",
    amount: 9000,
    currency: "gbp",
    placeholder: true,
  },
  "legalization-standard": {
    id: "legalization-standard",
    label: "Legalization / Authentication Fee",
    description: "Document authentication fee (placeholder).",
    amount: 4000,
    currency: "gbp",
    placeholder: true,
  },
  "criminal-record": {
    id: "criminal-record",
    label: "Criminal Record / TIN Fee",
    description: "Police clearance / TIN service fee (placeholder).",
    amount: 3500,
    currency: "gbp",
    placeholder: true,
  },
  "vital-events": {
    id: "vital-events",
    label: "Vital Events Fee",
    description:
      "Vital events certificate fee (placeholder — live site quotes USD amounts for some certificates).",
    amount: 3000,
    currency: "gbp",
    placeholder: true,
  },
  "duty-free": {
    id: "duty-free",
    label: "Duty-Free Note Fee",
    description: "Duty-free note fee (placeholder).",
    amount: 2500,
    currency: "gbp",
    placeholder: true,
  },
};

export type CreateCheckoutSessionInput = {
  feeId: StripeFeeId;
  successPath?: string;
  cancelPath?: string;
  caseId?: string;
  customerEmail?: string;
};

export type CreateCheckoutSessionResult =
  | { ok: true; url: string; sessionId: string }
  | { ok: false; error: string };

export function formatFeeAmount(fee: StripeFee): string {
  return `${(fee.amount / 100).toFixed(2)} ${fee.currency.toUpperCase()}`;
}
