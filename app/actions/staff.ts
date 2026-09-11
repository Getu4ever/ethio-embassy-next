"use server";

import { redirect } from "next/navigation";
import {
  clearStaffSession,
  createStaffSession,
  verifyStaffCredentials,
} from "@/lib/staff/auth";

export async function staffLogin(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!verifyStaffCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  await createStaffSession(remember);
  redirect("/admin");
}

export async function staffLogout(): Promise<void> {
  await clearStaffSession();
  redirect("/admin/login");
}
