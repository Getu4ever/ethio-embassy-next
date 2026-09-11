import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { EmbassyHoliday } from "@/lib/ops/types";

const LOCAL_FILE = path.join(process.cwd(), ".data", "holidays.json");
const BLOB_KEY = "ops/holidays.json";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readAll(): Promise<EmbassyHoliday[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_KEY });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!match) return [];
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as EmbassyHoliday[];
    return Array.isArray(data) ? data : [];
  }
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    const data = JSON.parse(raw) as EmbassyHoliday[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(holidays: EmbassyHoliday[]): Promise<void> {
  const sorted = [...holidays].sort((a, b) => a.date.localeCompare(b.date));
  const payload = JSON.stringify(sorted, null, 2);
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

export async function listHolidays(): Promise<EmbassyHoliday[]> {
  return readAll();
}

export async function getClosedDateSet(): Promise<Set<string>> {
  const holidays = await readAll();
  return new Set(holidays.map((h) => h.date));
}

export async function addHoliday(input: {
  date: string;
  label: string;
  createdBy: string;
}): Promise<EmbassyHoliday> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    throw new Error("Invalid date format.");
  }
  const holidays = await readAll();
  if (holidays.some((h) => h.date === input.date)) {
    throw new Error("That date is already marked closed.");
  }
  const entry: EmbassyHoliday = {
    date: input.date,
    label: input.label.trim() || "Embassy closed / holiday",
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  };
  holidays.push(entry);
  await writeAll(holidays);
  return entry;
}

export async function removeHoliday(date: string): Promise<void> {
  const holidays = await readAll();
  await writeAll(holidays.filter((h) => h.date !== date));
}
