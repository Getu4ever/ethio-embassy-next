import { redirect } from "next/navigation";
import {
  getStaffUsername,
  isStaffAuthenticated,
  staffAuthConfigured,
} from "@/lib/staff/auth";

export async function requireAdmin(): Promise<string> {
  if (!staffAuthConfigured()) {
    redirect("/admin/login");
  }
  if (!(await isStaffAuthenticated())) {
    redirect("/admin/login");
  }
  return getStaffUsername();
}
