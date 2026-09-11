import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { BookingRequest } from "@/lib/booking/types";

export type BookingRecord = {
  id: string;
  createdAt: string;
  service: BookingRequest["service"];
  date: string;
  timeSlot: string;
  applicantName: string;
  applicantEmail: string;
  eventId?: string;
};

const LOCAL_FILE = path.join(process.cwd(), ".data", "bookings.json");
const BLOB_KEY = "ops/bookings.json";
const MAX = 1000;

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readAll(): Promise<BookingRecord[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_KEY });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!match) return [];
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as BookingRecord[];
    return Array.isArray(data) ? data : [];
  }
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    const data = JSON.parse(raw) as BookingRecord[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(records: BookingRecord[]): Promise<void> {
  const payload = JSON.stringify(records.slice(0, MAX), null, 2);
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

export async function listBookingRecords(): Promise<BookingRecord[]> {
  return readAll();
}

export async function saveBookingRecord(
  input: BookingRequest & { eventId?: string },
): Promise<BookingRecord> {
  const record: BookingRecord = {
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    service: input.service,
    date: input.date,
    timeSlot: input.timeSlot,
    applicantName: input.applicant.fullName,
    applicantEmail: input.applicant.email,
    eventId: input.eventId,
  };
  const all = await readAll();
  all.unshift(record);
  await writeAll(all);
  return record;
}

export async function countBookingsByDate(
  from: string,
  to: string,
): Promise<Record<string, number>> {
  const all = await readAll();
  const counts: Record<string, number> = {};
  for (const row of all) {
    if (row.date < from || row.date > to) continue;
    counts[row.date] = (counts[row.date] ?? 0) + 1;
  }
  return counts;
}
