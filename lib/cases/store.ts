import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put, list, del } from "@vercel/blob";
import type { ConsularCase } from "@/lib/cases/types";

const LOCAL_ROOT = path.join(process.cwd(), ".data", "cases");

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function ensureLocalDir() {
  await mkdir(LOCAL_ROOT, { recursive: true });
}

function caseJsonKey(id: string) {
  return `cases/${id}.json`;
}

function caseDocKey(caseId: string, requirementId: string, fileName: string) {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `cases/${caseId}/docs/${requirementId}-${safe}`;
}

export async function saveCase(record: ConsularCase): Promise<void> {
  const payload = JSON.stringify(record, null, 2);
  if (useBlob()) {
    await put(caseJsonKey(record.id), payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  await ensureLocalDir();
  await writeFile(path.join(LOCAL_ROOT, `${record.id}.json`), payload, "utf8");
}

export async function getCase(id: string): Promise<ConsularCase | null> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: caseJsonKey(id) });
    const match = blobs.find((b) => b.pathname === caseJsonKey(id));
    if (!match) return null;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as ConsularCase;
  }
  try {
    const raw = await readFile(path.join(LOCAL_ROOT, `${id}.json`), "utf8");
    return JSON.parse(raw) as ConsularCase;
  } catch {
    return null;
  }
}

export async function listCases(): Promise<ConsularCase[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: "cases/" });
    const jsonBlobs = blobs.filter(
      (b) => b.pathname.endsWith(".json") && !b.pathname.includes("/docs/"),
    );
    const cases = await Promise.all(
      jsonBlobs.map(async (blob) => {
        const res = await fetch(blob.url, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as ConsularCase;
      }),
    );
    return cases
      .filter((c): c is ConsularCase => Boolean(c))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  await ensureLocalDir();
  const files = (await readdir(LOCAL_ROOT)).filter((f) => f.endsWith(".json"));
  const cases = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(LOCAL_ROOT, file), "utf8");
      return JSON.parse(raw) as ConsularCase;
    }),
  );
  return cases.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function storeCaseDocument(input: {
  caseId: string;
  requirementId: string;
  fileName: string;
  contentType: string;
  bytes: Buffer;
}): Promise<{ storageKey: string; url?: string }> {
  const key = caseDocKey(input.caseId, input.requirementId, input.fileName);
  if (useBlob()) {
    const blob = await put(key, input.bytes, {
      access: "public",
      contentType: input.contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return { storageKey: key, url: blob.url };
  }

  await ensureLocalDir();
  const dir = path.join(LOCAL_ROOT, input.caseId, "docs");
  await mkdir(dir, { recursive: true });
  const localPath = path.join(dir, path.basename(key));
  await writeFile(localPath, input.bytes);
  return { storageKey: localPath, url: undefined };
}

export async function deleteCase(id: string): Promise<void> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: `cases/${id}` });
    await Promise.all(blobs.map((b) => del(b.url)));
    return;
  }
  await ensureLocalDir();
  const { unlink, rm } = await import("node:fs/promises");
  try {
    await unlink(path.join(LOCAL_ROOT, `${id}.json`));
  } catch {
    // already gone
  }
  try {
    await rm(path.join(LOCAL_ROOT, id), { recursive: true, force: true });
  } catch {
    // no docs folder
  }
}
