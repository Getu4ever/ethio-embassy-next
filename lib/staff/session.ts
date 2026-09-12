import { redirect } from "next/navigation";
import {
  getSessionStaff,
  isStaffAuthenticated,
  staffAuthConfigured,
} from "@/lib/staff/auth";
import type { StaffSessionUser } from "@/lib/staff/types";

export async function requireAdmin(): Promise<StaffSessionUser> {
  if (!staffAuthConfigured()) {
    redirect("/admin/login");
  }
  if (!(await isStaffAuthenticated())) {
    redirect("/admin/login");
  }
  const user = await getSessionStaff();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdminLabel(): Promise<string> {
  const user = await requireAdmin();
  return user.displayName || user.email;
}
