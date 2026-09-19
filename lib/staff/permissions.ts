import type { StaffRole, StaffSessionUser } from "@/lib/staff/types";

export function canManageStaff(role: StaffRole): boolean {
  return role === "master" || role === "director";
}

export function canManageEmployees(role: StaffRole): boolean {
  return (
    role === "master" ||
    role === "director" ||
    role === "ambassador"
  );
}

/** Fees, hours, and site notes — not news posts. */
export function canManageContent(role: StaffRole): boolean {
  return (
    role === "master" ||
    role === "director" ||
    role === "ambassador"
  );
}

/** Website news / social posts. */
export function canManageNews(role: StaffRole): boolean {
  return (
    role === "master" ||
    role === "director" ||
    role === "ambassador" ||
    role === "editor"
  );
}

export function canManageCases(role: StaffRole): boolean {
  return (
    role === "master" ||
    role === "director" ||
    role === "ambassador" ||
    role === "consular"
  );
}

/** Edit or permanently delete cases and appointments. */
export function canManageRecords(role: StaffRole): boolean {
  return role === "master" || role === "director";
}

export function canViewAudit(role: StaffRole): boolean {
  return (
    role === "master" ||
    role === "director" ||
    role === "ambassador"
  );
}

export function assertPermission(
  user: StaffSessionUser,
  allowed: boolean,
  message = "You do not have permission for this action.",
): void {
  if (!allowed) throw new Error(message);
}
