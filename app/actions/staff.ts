"use server";

import { redirect } from "next/navigation";
import { recordStaffAudit } from "@/lib/audit/record";
import {
  authenticateStaff,
  clearStaffSession,
  createStaffSession,
  getSessionStaff,
} from "@/lib/staff/auth";

export async function staffLogin(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  const user = await authenticateStaff(username, password);
  if (!user) {
    return { error: "Invalid username or password." };
  }

  await createStaffSession(user, remember);
  try {
    await recordStaffAudit({
      action: "staff.login",
      module: "auth",
      summary: `${user.displayName} signed in`,
      username: user.displayName,
      metadata: { role: user.role, email: user.email },
    });
  } catch {
    // Audit must not block login
  }
  redirect("/admin");
}

export async function staffLogout(): Promise<void> {
  const user = await getSessionStaff();
  if (user) {
    try {
      await recordStaffAudit({
        action: "staff.logout",
        module: "auth",
        summary: `${user.displayName} signed out`,
        metadata: { role: user.role, email: user.email },
      });
    } catch {
      // ignore
    }
  }
  await clearStaffSession();
  redirect("/admin/login");
}
