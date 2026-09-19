import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, get, list, put } from "@vercel/blob";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function localPath(key: string): string {
  return path.join(process.cwd(), ".data", key);
}

function versionsPrefix(key: string): string {
  return `${key}.v/`;
}

type OpsEnvelope<T> = {
  __ops: 1;
  writtenAt: string;
  value: T;
};

function isEnvelope(data: unknown): data is OpsEnvelope<unknown> {
  return Boolean(
    data &&
      typeof data === "object" &&
      (data as { __ops?: unknown }).__ops === 1 &&
      "value" in (data as object),
  );
}

function wrapValue(value: unknown): OpsEnvelope<unknown> {
  return {
    __ops: 1,
    writtenAt: new Date().toISOString(),
    value,
  };
}

function unwrapValue<T>(data: unknown): { writtenAt: string | null; value: T } {
  if (isEnvelope(data)) {
    return {
      writtenAt:
        typeof data.writtenAt === "string" ? data.writtenAt : null,
      value: data.value as T,
    };
  }
  return { writtenAt: null, value: data as T };
}

async function readLocalJson<T>(
  key: string,
): Promise<{ writtenAt: string | null; value: T } | null> {
  try {
    const raw = await readFile(localPath(key), "utf8");
    return unwrapValue<T>(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

async function writeLocalJson(key: string, payload: string): Promise<void> {
  const file = localPath(key);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, payload, "utf8");
}

type BlobReadResult<T> =
  | { status: "ok"; writtenAt: string | null; data: T }
  | { status: "missing" }
  | { status: "error"; message: string };

async function fetchJsonUrl<T>(
  url: string,
): Promise<{ writtenAt: string | null; value: T }> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) {
    throw new Error(`Blob fetch HTTP ${res.status}`);
  }
  return unwrapValue<T>(await res.json());
}

/**
 * Read the latest ops JSON. Mutable stores use unique versioned pathnames so
 * overwrites never leave the CDN serving a previous revision for ~60s.
 */
async function readBlobJson<T>(key: string): Promise<BlobReadResult<T>> {
  if (!useBlob()) return { status: "missing" };
  try {
    const { blobs } = await list({
      prefix: versionsPrefix(key),
      limit: 100,
      abortSignal: AbortSignal.timeout(12000),
    });
    if (blobs.length > 0) {
      const latest = [...blobs].sort(
        (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime(),
      )[0]!;
      // Unique URL — never overwritten — so CDN cannot return a prior write.
      const parsed = await fetchJsonUrl<T>(latest.url);
      return {
        status: "ok",
        writtenAt: parsed.writtenAt ?? latest.uploadedAt.toISOString(),
        data: parsed.value,
      };
    }

    // Legacy single-pathname objects (pre-versioning).
    const result = await get(key, {
      access: "public",
      useCache: false,
      abortSignal: AbortSignal.timeout(12000),
    });
    if (!result) return { status: "missing" };
    if (result.statusCode !== 200 || !result.stream) {
      return {
        status: "error",
        message: `Blob get status ${result.statusCode} for ${key}`,
      };
    }
    const raw = await new Response(result.stream).text();
    const parsed = unwrapValue<T>(JSON.parse(raw) as unknown);
    return {
      status: "ok",
      writtenAt: parsed.writtenAt,
      data: parsed.value,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404|does not exist/i.test(message)) {
      return { status: "missing" };
    }
    console.error(`[ops-store:read-blob] ${key}`, message);
    return { status: "error", message };
  }
}

async function pruneOldVersions(key: string): Promise<void> {
  const { blobs } = await list({
    prefix: versionsPrefix(key),
    limit: 100,
  });
  if (blobs.length <= 10) return;
  const sorted = [...blobs].sort(
    (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime(),
  );
  const stale = sorted.slice(10).map((blob) => blob.url);
  if (stale.length > 0) await del(stale);
}

async function writeBlobJson(key: string, payload: string): Promise<void> {
  const versioned = `${versionsPrefix(key)}${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.json`;
  await put(versioned, payload, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  });
  // Best-effort cleanup — never block the write path.
  void pruneOldVersions(key).catch((error) => {
    console.error(`[ops-store:prune] ${key}`, error);
  });
}

/**
 * Read JSON from Blob (preferred) with local fallback.
 * When both exist, prefer the newer writtenAt (local wins ties for same-instance RYW).
 */
export async function readOpsJson<T>(key: string, fallback: T): Promise<T> {
  const fromLocal = await readLocalJson<T>(key);

  if (useBlob()) {
    const fromBlob = await readBlobJson<T>(key);
    if (fromBlob.status === "ok") {
      if (
        fromLocal &&
        fromLocal.writtenAt &&
        fromBlob.writtenAt &&
        fromLocal.writtenAt >= fromBlob.writtenAt
      ) {
        return fromLocal.value;
      }
      if (fromLocal && fromLocal.writtenAt && !fromBlob.writtenAt) {
        return fromLocal.value;
      }
      return fromBlob.data;
    }
    if (fromLocal) return fromLocal.value;
    if (fromBlob.status === "error") {
      throw new Error(
        `Could not load ${key} from Blob or local storage (${fromBlob.message}).`,
      );
    }
    // Blob missing — try local before caller seeds.
  }

  return fromLocal?.value ?? fallback;
}

/**
 * Persist JSON to Blob when configured; also mirror locally when the FS allows.
 * Throws if the durable target (Blob when configured, otherwise local) fails.
 * Local is written first so subsequent reads can fall back to a fresh mirror.
 */
export async function writeOpsJson(key: string, value: unknown): Promise<void> {
  const payload = JSON.stringify(wrapValue(value), null, 2);

  try {
    await writeLocalJson(key, payload);
  } catch {
    if (!useBlob()) throw new Error(`Could not write local store ${key}.`);
  }

  if (useBlob()) {
    await writeBlobJson(key, payload);
  }
}
