import {
  createAuditId,
  type AuditEntry,
  type AuditAction,
  type AuditModule,
} from "@/lib/audit/types";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";

const BLOB_KEY = "ops/audit-log.json";
const MAX_ENTRIES = 500;

async function readAll(): Promise<AuditEntry[]> {
  const data = await readOpsJson<AuditEntry[]>(BLOB_KEY, []);
  return Array.isArray(data) ? data : [];
}

async function writeAll(entries: AuditEntry[]): Promise<void> {
  await writeOpsJson(BLOB_KEY, entries.slice(0, MAX_ENTRIES));
}

export async function listAuditEntries(limit = 100): Promise<AuditEntry[]> {
  const all = await readAll();
  return all.slice(0, limit);
}

export async function appendAuditEntry(input: {
  username: string;
  action: AuditAction;
  module: AuditModule;
  summary: string;
  targetId?: string;
  ipAddress?: string;
  metadata?: Record<string, string>;
}): Promise<AuditEntry> {
  const entry: AuditEntry = {
    id: createAuditId(),
    at: new Date().toISOString(),
    username: input.username,
    action: input.action,
    module: input.module,
    summary: input.summary,
    targetId: input.targetId,
    ipAddress: input.ipAddress?.trim() || "unknown",
    metadata: input.metadata,
  };
  const all = await readAll();
  all.unshift(entry);
  await writeAll(all);
  return entry;
}
