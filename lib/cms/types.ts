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

export type SiteContent = {
  officeHours: OfficeHoursContent;
  fees: Partial<Record<StripeFeeId, FeeOverride>>;
  notes: SiteNotesContent;
  updatedAt?: string;
  updatedBy?: string;
};
