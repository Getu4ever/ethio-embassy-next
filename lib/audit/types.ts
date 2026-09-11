export type AuditModule =
  | "cases"
  | "appointments"
  | "fees"
  | "staff"
  | "auth"
  | "system";

export type AuditAction =
  | "case.approve"
  | "case.reject"
  | "case.request_info"
  | "case.status_update"
  | "case.view"
  | "holiday.add"
  | "holiday.remove"
  | "staff.login"
  | "staff.logout"
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
