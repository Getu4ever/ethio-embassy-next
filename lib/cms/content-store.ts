import { contact } from "@/lib/content/site";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";
import {
  STRIPE_FEES,
  type StripeFee,
  type StripeFeeId,
} from "@/lib/stripe/fees";
import type {
  FeeOverride,
  OfficeHoursContent,
  SiteContent,
  SiteNotesContent,
  VitalEventsFeeId,
  VitalEventsFeesContent,
} from "@/lib/cms/types";
import { VITAL_EVENTS_FEE_IDS } from "@/lib/cms/types";

export type {
  FeeOverride,
  OfficeHoursContent,
  SiteContent,
  SiteNotesContent,
  VitalEventsFeeId,
  VitalEventsFeesContent,
} from "@/lib/cms/types";

export {
  VITAL_EVENTS_FEE_IDS,
  VITAL_EVENTS_FEE_LABELS,
} from "@/lib/cms/types";

const BLOB_KEY = "ops/site-content.json";

const DEFAULT_NOTES: SiteNotesContent = {
  visaDocuments:
    "Diplomatic and Service visa applicants should prepare a complete supporting pack before booking. Fees shown online are subject to Embassy confirmation.",
  tinRequest:
    "Criminal record and TIN assistance is available for eligible applicants. Confirm documentary requirements with the consular desk before submission.",
  dutyFreeNotes:
    "Duty-free note requests require residence evidence and a complete goods inventory. The desk issues a support letter to Ethiopian Customs when documents are complete.",
  generalDesk:
    "Office hours and service notes may be updated by authorised staff. Always verify the latest guidance before travelling to Princes Gate.",
};

const DEFAULT_VITAL_EVENTS_FEES: VitalEventsFeesContent = {
  birth: { amountUsd: 30 },
  marriage: { amountUsd: 30 },
  divorce: { amountUsd: 30 },
  death: { amountUsd: 20 },
};

function defaults(): SiteContent {
  return {
    officeHours: { ...contact.officeHours },
    fees: {},
    notes: { ...DEFAULT_NOTES },
    vitalEventsFees: { ...DEFAULT_VITAL_EVENTS_FEES },
  };
}

function mergeVitalEventsFees(
  stored?: Partial<VitalEventsFeesContent> | null,
): VitalEventsFeesContent {
  const result = { ...DEFAULT_VITAL_EVENTS_FEES };
  if (!stored) return result;
  for (const id of VITAL_EVENTS_FEE_IDS) {
    const entry = stored[id];
    if (!entry) continue;
    const amount = Number(entry.amountUsd);
    if (Number.isFinite(amount) && amount >= 0) {
      result[id] = { amountUsd: amount };
    }
  }
  return result;
}

export async function getSiteContent(): Promise<SiteContent> {
  const stored = await readOpsJson<SiteContent | null>(BLOB_KEY, null);
  const base = defaults();
  if (!stored) return base;
  return {
    officeHours: { ...base.officeHours, ...stored.officeHours },
    fees: { ...stored.fees },
    notes: { ...base.notes, ...stored.notes },
    vitalEventsFees: mergeVitalEventsFees(stored.vitalEventsFees),
    updatedAt: stored.updatedAt,
    updatedBy: stored.updatedBy,
  };
}

export async function saveSiteContent(
  next: SiteContent,
  updatedBy: string,
): Promise<SiteContent> {
  const payload: SiteContent = {
    ...next,
    updatedAt: new Date().toISOString(),
    updatedBy,
  };
  await writeOpsJson(BLOB_KEY, payload);
  return payload;
}

export async function getResolvedOfficeHours(): Promise<OfficeHoursContent> {
  const content = await getSiteContent();
  return content.officeHours;
}

export async function getResolvedFees(): Promise<Record<StripeFeeId, StripeFee>> {
  const content = await getSiteContent();
  const result = { ...STRIPE_FEES } as Record<StripeFeeId, StripeFee>;
  for (const id of Object.keys(STRIPE_FEES) as StripeFeeId[]) {
    const override = content.fees[id];
    if (!override) continue;
    result[id] = {
      ...result[id],
      label: override.label ?? result[id].label,
      description: override.description ?? result[id].description,
      amount:
        typeof override.amount === "number" ? override.amount : result[id].amount,
      placeholder:
        typeof override.placeholder === "boolean"
          ? override.placeholder
          : result[id].placeholder,
    };
  }
  return result;
}

export async function getSiteNotes(): Promise<SiteNotesContent> {
  const content = await getSiteContent();
  return content.notes;
}

export async function getResolvedVitalEventsFees(): Promise<VitalEventsFeesContent> {
  const content = await getSiteContent();
  return content.vitalEventsFees;
}
