import type { StripeFeeId } from "@/lib/stripe/fees";

export type OfficeHoursContent = {
  days: string;
  morning: string;
  afternoon: string;
  summary: string;
  closed: string;
};

export type FeeOverride = {
  label?: string;
  description?: string;
  /** Amount in pence */
  amount?: number;
  placeholder?: boolean;
};

export type SiteNotesContent = {
  visaDocuments: string;
  tinRequest: string;
  dutyFreeNotes: string;
  generalDesk: string;
};

export const VITAL_EVENTS_FEE_IDS = [
  "birth",
  "marriage",
  "divorce",
  "death",
] as const;

export type VitalEventsFeeId = (typeof VITAL_EVENTS_FEE_IDS)[number];

export type VitalEventsFeeEntry = {
  /** Published certificate fee in US dollars (matches public Vital Events page). */
  amountUsd: number;
};

export type VitalEventsFeesContent = Record<
  VitalEventsFeeId,
  VitalEventsFeeEntry
>;

export const VITAL_EVENTS_FEE_LABELS: Record<VitalEventsFeeId, string> = {
  birth: "Vital Events — Birth registration",
  marriage: "Vital Events — Marriage registration",
  divorce: "Vital Events — Divorce registration",
  death: "Vital Events — Death registration",
};

export type SiteContent = {
  officeHours: OfficeHoursContent;
  fees: Partial<Record<StripeFeeId, FeeOverride>>;
  notes: SiteNotesContent;
  vitalEventsFees: VitalEventsFeesContent;
  updatedAt?: string;
  updatedBy?: string;
};
