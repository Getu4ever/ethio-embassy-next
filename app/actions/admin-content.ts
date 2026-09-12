"use server";

import { revalidatePath } from "next/cache";
import { recordStaffAudit } from "@/lib/audit/record";
import {
  getSiteContent,
  saveSiteContent,
  type FeeOverride,
  type SiteContent,
} from "@/lib/cms/content-store";
import { getSessionStaff } from "@/lib/staff/auth";
import {
  assertPermission,
  canManageContent,
} from "@/lib/staff/permissions";
import type { StripeFeeId } from "@/lib/stripe/fees";
import { STRIPE_FEES } from "@/lib/stripe/fees";

async function requireEditor() {
  const user = await getSessionStaff();
  if (!user) throw new Error("Unauthorized.");
  assertPermission(user, canManageContent(user.role));
  return user;
}

export async function adminSaveOfficeHours(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    const actor = await requireEditor();
    const current = await getSiteContent();
    const next: SiteContent = {
      ...current,
      officeHours: {
        days: String(formData.get("days") ?? current.officeHours.days),
        morning: String(formData.get("morning") ?? current.officeHours.morning),
        afternoon: String(
          formData.get("afternoon") ?? current.officeHours.afternoon,
        ),
        summary: String(formData.get("summary") ?? current.officeHours.summary),
        closed: String(formData.get("closed") ?? current.officeHours.closed),
      },
    };
    await saveSiteContent(next, actor.displayName);
    await recordStaffAudit({
      action: "content.update",
      module: "content",
      summary: "Updated office hours / timetable",
    });
    revalidatePath("/");
    revalidatePath("/admin/content");
    revalidatePath("/admin/fees");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function adminSaveSiteNotes(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    const actor = await requireEditor();
    const current = await getSiteContent();
    const next: SiteContent = {
      ...current,
      notes: {
        visaDocuments: String(
          formData.get("visaDocuments") ?? current.notes.visaDocuments,
        ),
        tinRequest: String(formData.get("tinRequest") ?? current.notes.tinRequest),
        dutyFreeNotes: String(
          formData.get("dutyFreeNotes") ?? current.notes.dutyFreeNotes,
        ),
        generalDesk: String(
          formData.get("generalDesk") ?? current.notes.generalDesk,
        ),
      },
    };
    await saveSiteContent(next, actor.displayName);
    await recordStaffAudit({
      action: "content.update",
      module: "content",
      summary: "Updated service desk notes (visa / TIN / duty-free)",
    });
    revalidatePath("/admin/content");
    revalidatePath("/visa-services");
    revalidatePath("/criminal-record");
    revalidatePath("/duty-free-notes");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function adminSaveFees(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    const actor = await requireEditor();
    const current = await getSiteContent();
    const fees: SiteContent["fees"] = { ...current.fees };

    for (const id of Object.keys(STRIPE_FEES) as StripeFeeId[]) {
      const amountPounds = String(formData.get(`amount-${id}`) ?? "").trim();
      const label = String(formData.get(`label-${id}`) ?? "").trim();
      const description = String(formData.get(`description-${id}`) ?? "").trim();
      const placeholder = formData.get(`placeholder-${id}`) === "on";
      const override: FeeOverride = {};
      if (label) override.label = label;
      if (description) override.description = description;
      if (amountPounds) {
        const pounds = Number(amountPounds);
        if (!Number.isFinite(pounds) || pounds < 0) {
          return { ok: false, error: `Invalid amount for ${id}.` };
        }
        override.amount = Math.round(pounds * 100);
      }
      override.placeholder = placeholder;
      fees[id] = override;
    }

    const next: SiteContent = { ...current, fees };
    await saveSiteContent(next, actor.displayName);
    await recordStaffAudit({
      action: "content.update",
      module: "fees",
      summary: "Updated service fee catalogue",
    });
    revalidatePath("/admin/fees");
    revalidatePath("/admin/content");
    revalidatePath("/apply");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}
