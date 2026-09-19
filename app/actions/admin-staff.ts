"use server";

import { revalidatePath } from "next/cache";
import { recordStaffAudit } from "@/lib/audit/record";
import { readImageFile, storePublicImage } from "@/lib/cms/media";
import {
  assertPermission,
  canManageStaff,
} from "@/lib/staff/permissions";
import { getSessionStaff } from "@/lib/staff/auth";
import {
  STAFF_ROLES,
  type StaffRole,
} from "@/lib/staff/types";
import {
  createStaffUser,
  deleteStaffUser,
  listStaffUsers,
  toPublicStaff,
  updateStaffUser,
} from "@/lib/staff/users";

async function requireManager() {
  const user = await getSessionStaff();
  if (!user) throw new Error("Unauthorized.");
  assertPermission(user, canManageStaff(user.role));
  return user;
}

export async function adminListStaffAccounts() {
  const user = await getSessionStaff();
  if (!user) return { ok: false as const, error: "Unauthorized." };
  const accounts = (await listStaffUsers()).map(toPublicStaff);
  return {
    ok: true as const,
    accounts,
    canManage: canManageStaff(user.role),
    viewerRole: user.role,
  };
}

export async function adminCreateStaffAccount(
  _prev: { ok?: boolean; error?: string; tempPassword?: string; message?: string } | null,
  formData: FormData,
) {
  try {
    const actor = await requireManager();
    const role = String(formData.get("role") ?? "consular") as StaffRole;
    if (!STAFF_ROLES.includes(role) || role === "master") {
      return { ok: false, error: "Invalid role." };
    }
    const password = String(formData.get("password") ?? "");
    const created = await createStaffUser({
      email: String(formData.get("email") ?? ""),
      displayName: String(formData.get("displayName") ?? ""),
      role,
      password,
      createdBy: actor.email,
    });

    const photo = await readImageFile(formData, "photo");
    if (photo) {
      const stored = await storePublicImage({
        folder: "staff",
        fileName: photo.fileName,
        contentType: photo.contentType,
        bytes: photo.bytes,
      });
      await updateStaffUser(created.id, { photoUrl: stored.url });
    }

    await recordStaffAudit({
      action: "staff.create",
      module: "staff",
      summary: `Created staff account ${created.displayName} (${created.role})`,
      targetId: created.id,
      metadata: { email: created.email, role: created.role },
    });
    revalidatePath("/admin/staff");
    return {
      ok: true,
      tempPassword: password,
      message: `Account created for ${created.email}. Share the password securely — no email was sent.`,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create account.",
    };
  }
}

export async function adminUpdateStaffAccount(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  try {
    const actor = await requireManager();
    const id = String(formData.get("id") ?? "");
    const roleRaw = String(formData.get("role") ?? "");
    const password = String(formData.get("password") ?? "").trim();
    const active = String(formData.get("active") ?? "true") === "true";
    const role = roleRaw as StaffRole;

    const photo = await readImageFile(formData, "photo");
    let photoUrl: string | undefined;
    if (photo) {
      const stored = await storePublicImage({
        folder: "staff",
        fileName: photo.fileName,
        contentType: photo.contentType,
        bytes: photo.bytes,
      });
      photoUrl = stored.url;
    }

    const updated = await updateStaffUser(id, {
      displayName: String(formData.get("displayName") ?? ""),
      email: String(formData.get("email") ?? ""),
      role: STAFF_ROLES.includes(role) ? role : undefined,
      active,
      password: password || undefined,
      photoUrl,
    });

    await recordStaffAudit({
      action: "staff.update",
      module: "staff",
      summary: `Updated staff account ${updated.displayName}`,
      targetId: updated.id,
      metadata: {
        by: actor.email,
        role: updated.role,
        active: String(updated.active),
      },
    });
    revalidatePath("/admin/staff");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not update account.",
    };
  }
}

export async function adminDeleteStaffAccount(formData: FormData): Promise<void> {
  try {
    const actor = await requireManager();
    const id = String(formData.get("id") ?? "");
    await deleteStaffUser(id);
    await recordStaffAudit({
      action: "staff.delete",
      module: "staff",
      summary: `Deleted staff account ${id}`,
      targetId: id,
      metadata: { by: actor.email },
    });
    revalidatePath("/admin/staff");
  } catch (error) {
    console.error("[adminDeleteStaffAccount]", error);
  }
}
