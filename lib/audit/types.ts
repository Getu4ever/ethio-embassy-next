export type AuditModule =
  | "cases"
  | "appointments"
  | "fees"
  | "staff"
  | "auth"
  | "system"
  | "content"
  | "employees"
  | "news";

export type AuditAction =
  | "case.approve"
  | "case.reject"
  | "case.request_info"
  | "case.status_update"
  | "case.view"
  | "case.update"
  | "case.delete"
  | "holiday.add"
  | "holiday.remove"
  | "booking.update"
  | "booking.delete"
  | "staff.login"
  | "staff.logout"
  | "staff.create"
  | "staff.update"
  | "staff.delete"
  | "content.update"
  | "employee.create"
  | "employee.update"
  | "employee.delete"
  | "news.create"
  | "news.update"
  | "news.delete"
  | "system.note";

export type AuditEntry = {
  id: string;
  at: string;
  username: string;
  action: AuditAction;
  module: AuditModule;
  summary: string;
  targetId?: string;
  ipAddress: string;
  metadata?: Record<string, string>;
};

export function createAuditId(): string {
  return `AUD-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}
