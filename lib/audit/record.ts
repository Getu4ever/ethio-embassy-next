import { headers } from "next/headers";
import { appendAuditEntry } from "@/lib/audit/store";
import type { AuditAction, AuditModule } from "@/lib/audit/types";
import { getStaffUsername } from "@/lib/staff/auth";

export async function clientIpAddress(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip")?.trim() || "unknown";
}

export async function recordStaffAudit(input: {
  action: AuditAction;
  module: AuditModule;
  summary: string;
  targetId?: string;
  metadata?: Record<string, string>;
}): Promise<void> {
  try {
    await appendAuditEntry({
      username: getStaffUsername(),
      action: input.action,
      module: input.module,
      summary: input.summary,
      targetId: input.targetId,
      ipAddress: await clientIpAddress(),
      metadata: input.metadata,
    });
  } catch (error) {
    console.error("[audit]", error);
  }
}
