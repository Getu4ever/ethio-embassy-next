import { MASTER_ADMIN_EMAIL } from "@/lib/staff/types";

/**
 * Addresses that must never receive automated system email
 * (login inbox without mailbox access yet, etc.).
 */
const BLOCKED_NOTIFY = new Set([
  MASTER_ADMIN_EMAIL.toLowerCase(),
]);

export function isOutboundMailBlocked(email: string | null | undefined): boolean {
  if (!email) return true;
  return BLOCKED_NOTIFY.has(email.trim().toLowerCase());
}

/**
 * Resolve the desk notification address. Returns null when the configured
 * notify inbox is blocked (e.g. master MFA address without mailbox access).
 */
export function resolveDeskNotifyEmail(): string | null {
  const notify = process.env.BOOKING_NOTIFY_EMAIL?.trim() || "";
  if (!notify || isOutboundMailBlocked(notify)) return null;
  return notify;
}
