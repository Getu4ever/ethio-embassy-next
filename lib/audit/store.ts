import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";
import {
  createAuditId,
  type AuditEntry,
  type AuditAction,
  type AuditModule,
} from "@/lib/audit/types";

const LOCAL_FILE = path.join(process.cwd(), ".data", "audit-log.json");
const BLOB_KEY = "ops/audit-log.json";
const MAX_ENTRIES = 500;

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readAll(): Promise<AuditEntry[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_KEY });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!match) return [];
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as AuditEntry[];
    return Array.isArray(data) ? data : [];
  }
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    const data = JSON.parse(raw) as AuditEntry[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(entries: AuditEntry[]): Promise<void> {
  const payload = JSON.stringify(entries.slice(0, MAX_ENTRIES), null, 2);
  if (useBlob()) {
    await put(BLOB_KEY, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, payload, "utf8");
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
