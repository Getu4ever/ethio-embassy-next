import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { head, put } from "@vercel/blob";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function localPath(key: string): string {
  return path.join(process.cwd(), ".data", key);
}

async function readLocalJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await readFile(localPath(key), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeLocalJson(key: string, payload: string): Promise<void> {
  const file = localPath(key);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, payload, "utf8");
}

async function readBlobJson<T>(key: string): Promise<T | null> {
  if (!useBlob()) return null;
  try {
    const meta = await head(key);
    const cacheKey =
      typeof meta.uploadedAt === "string"
        ? meta.uploadedAt
        : new Date(meta.uploadedAt).toISOString();
    const res = await fetch(`${meta.url}?v=${encodeURIComponent(cacheKey)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // Missing keys are expected until CMS content is saved the first time.
    if (/not found|404|does not exist|aborted|timeout/i.test(message)) {
      return null;
    }
    console.error(`[ops-store:read-blob] ${key}`, message);
    return null;
  }
}

async function writeBlobJson(key: string, payload: string): Promise<void> {
  await put(key, payload, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Read JSON from Blob (preferred) with local fallback. */
export async function readOpsJson<T>(key: string, fallback: T): Promise<T> {
  if (useBlob()) {
    try {
      const fromBlob = await readBlobJson<T>(key);
      if (fromBlob != null) return fromBlob;
    } catch (error) {
      console.error(`[ops-store:read-blob] ${key}`, error);
    }
  }

  const fromLocal = await readLocalJson<T>(key);
  return fromLocal ?? fallback;
}

/**
 * Persist JSON to Blob when configured; also mirror locally when the FS allows.
 * Throws if the durable target (Blob when configured, otherwise local) fails.
 */
export async function writeOpsJson(key: string, value: unknown): Promise<void> {
  const payload = JSON.stringify(value, null, 2);

  if (useBlob()) {
    await writeBlobJson(key, payload);
    try {
      await writeLocalJson(key, payload);
    } catch {
      // Local FS can be read-only on serverless — Blob is the durable store.
    }
    return;
  }

  await writeLocalJson(key, payload);
}
