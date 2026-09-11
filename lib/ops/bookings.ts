import type { BookingRequest } from "@/lib/booking/types";
import { listCalendarBookingRecords } from "@/lib/booking/google-calendar";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";

export type BookingRecord = {
  id: string;
  createdAt: string;
  service: BookingRequest["service"];
  date: string;
  timeSlot: string;
  applicantName: string;
  applicantEmail: string;
  eventId?: string;
  source?: "store" | "calendar";
};

const BLOB_KEY = "ops/bookings.json";
const MAX = 1000;

function sortRecords(records: BookingRecord[]): BookingRecord[] {
  return [...records].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.timeSlot.localeCompare(a.timeSlot);
  });
}

function mergeRecords(
  stored: BookingRecord[],
  fromCalendar: BookingRecord[],
): BookingRecord[] {
  const byEvent = new Map<string, BookingRecord>();
  const withoutEvent: BookingRecord[] = [];

  for (const row of stored) {
    if (row.eventId) {
      byEvent.set(row.eventId, { ...row, source: "store" });
    } else {
      withoutEvent.push({ ...row, source: "store" });
    }
  }

  for (const row of fromCalendar) {
    if (!row.eventId) continue;
    const existing = byEvent.get(row.eventId);
    if (existing) {
      byEvent.set(row.eventId, {
        ...row,
        ...existing,
        eventId: row.eventId,
        source: "store",
      });
    } else {
      byEvent.set(row.eventId, { ...row, source: "calendar" });
    }
  }

  return sortRecords([...byEvent.values(), ...withoutEvent]);
}

export async function listStoredBookingRecords(): Promise<BookingRecord[]> {
  const data = await readOpsJson<BookingRecord[]>(BLOB_KEY, []);
  return Array.isArray(data) ? data : [];
}

export async function listBookingRecords(): Promise<BookingRecord[]> {
  return listStoredBookingRecords();
}

/** Merge durable store + Google Calendar so admin always sees every booking. */
export async function listBookingsForRange(
  from: string,
  to: string,
): Promise<BookingRecord[]> {
  const [stored, calendar] = await Promise.all([
    listStoredBookingRecords(),
    listCalendarBookingRecords(from, to).catch((error) => {
      console.error("[bookings:calendar]", error);
      return [] as BookingRecord[];
    }),
  ]);

  return mergeRecords(stored, calendar).filter(
    (b) => b.date >= from && b.date <= to,
  );
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
    source: "store",
  };
  const all = await listStoredBookingRecords();
  // Avoid duplicates if the same event is persisted twice.
  const next = [
    record,
    ...all.filter((row) => !(record.eventId && row.eventId === record.eventId)),
  ].slice(0, MAX);
  await writeOpsJson(BLOB_KEY, next);
  return record;
}

export async function countBookingsByDate(
  from: string,
  to: string,
): Promise<Record<string, number>> {
  const all = await listBookingsForRange(from, to);
  const counts: Record<string, number> = {};
  for (const row of all) {
    counts[row.date] = (counts[row.date] ?? 0) + 1;
  }
  return counts;
}
