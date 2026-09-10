export type StripeFeeId =
  | "visa-standard"
  | "visa-express"
  | "passport-new"
  | "passport-renewal";

export type StripeFee = {
  id: StripeFeeId;
  label: string;
  description: string;
  /** Amount in the smallest currency unit (e.g. pence for GBP). */
  amount: number;
  currency: "gbp";
};

/**
 * Placeholder fee catalogue — replace amounts with exact schedules from
 * legacy consular pages once unique scrapes are available.
 */
export const STRIPE_FEES: Record<StripeFeeId, StripeFee> = {
  "visa-standard": {
    id: "visa-standard",
    label: "Visa Processing Fee",
    description: "Standard visa processing fee (placeholder amount).",
    amount: 5000,
    currency: "gbp",
  },
  "visa-express": {
    id: "visa-express",
    label: "Visa Express Fee",
    description: "Expedited visa processing fee (placeholder amount).",
    amount: 9000,
    currency: "gbp",
  },
  "passport-new": {
    id: "passport-new",
    label: "New Passport Fee",
    description: "New Ethiopian passport processing fee (placeholder amount).",
    amount: 7500,
    currency: "gbp",
  },
  "passport-renewal": {
    id: "passport-renewal",
    label: "Passport Renewal Fee",
    description: "Passport renewal processing fee (placeholder amount).",
    amount: 6500,
    currency: "gbp",
  },
};

export type CreateCheckoutSessionInput = {
  feeId: StripeFeeId;
  successPath?: string;
  cancelPath?: string;
};

export type CreateCheckoutSessionResult =
  | { ok: true; url: string; sessionId: string }
  | { ok: false; error: string };
