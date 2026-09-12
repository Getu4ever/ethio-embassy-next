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
const SUPPRESS_KEY = "ops/booking-suppressions.json";
const MAX = 1000;

function sortRecords(records: BookingRecord[]): BookingRecord[] {
  return [...records].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.timeSlot.localeCompare(a.timeSlot);
  });
}

async function listSuppressedEventIds(): Promise<Set<string>> {
  const data = await readOpsJson<string[]>(SUPPRESS_KEY, []);
  return new Set(Array.isArray(data) ? data : []);
}

async function addSuppressedEventId(eventId: string): Promise<void> {
  const current = await listSuppressedEventIds();
  current.add(eventId);
  await writeOpsJson(SUPPRESS_KEY, [...current]);
}

function mergeRecords(
  stored: BookingRecord[],
  fromCalendar: BookingRecord[],
  suppressed: Set<string>,
): BookingRecord[] {
  const byEvent = new Map<string, BookingRecord>();
  const withoutEvent: BookingRecord[] = [];

  for (const row of stored) {
    if (row.eventId && suppressed.has(row.eventId)) continue;
    if (row.eventId) {
      byEvent.set(row.eventId, { ...row, source: "store" });
    } else {
      withoutEvent.push({ ...row, source: "store" });
    }
  }

  for (const row of fromCalendar) {
    if (!row.eventId || suppressed.has(row.eventId)) continue;
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
  const [stored, calendar, suppressed] = await Promise.all([
    listStoredBookingRecords(),
    listCalendarBookingRecords(from, to).catch((error) => {
      console.error("[bookings:calendar]", error);
      return [] as BookingRecord[];
    }),
    listSuppressedEventIds(),
  ]);

  return mergeRecords(stored, calendar, suppressed).filter(
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
  const next = [
    record,
    ...all.filter((row) => !(record.eventId && row.eventId === record.eventId)),
  ].slice(0, MAX);
  await writeOpsJson(BLOB_KEY, next);
  return record;
}

export async function updateBookingRecord(
  id: string,
  patch: Partial<
    Pick<
      BookingRecord,
      | "service"
      | "date"
      | "timeSlot"
      | "applicantName"
      | "applicantEmail"
    >
  >,
): Promise<BookingRecord> {
  const all = await listStoredBookingRecords();
  let idx = all.findIndex((row) => row.id === id);
  let base = idx >= 0 ? all[idx]! : null;

  // Calendar-only rows use CAL-* ids — materialise into the durable store.
  if (!base && id.startsWith("CAL-")) {
    const eventId = id.slice(4);
    base = {
      id,
      createdAt: new Date().toISOString(),
      service: (patch.service ?? "visa") as BookingRecord["service"],
      date: patch.date ?? "",
      timeSlot: patch.timeSlot ?? "",
      applicantName: patch.applicantName ?? "",
      applicantEmail: patch.applicantEmail ?? "",
      eventId,
      source: "store",
    };
    all.unshift(base);
    idx = 0;
  }

  if (!base || idx < 0) {
    throw new Error("Appointment not found.");
  }

  const updated: BookingRecord = {
    ...base,
    ...patch,
    source: "store",
  };
  if (!updated.date || !updated.timeSlot || !updated.applicantName.trim()) {
    throw new Error("Date, time, and applicant name are required.");
  }
  all[idx] = updated;
  await writeOpsJson(BLOB_KEY, all.slice(0, MAX));
  return updated;
}

export async function deleteBookingRecord(id: string): Promise<void> {
  const all = await listStoredBookingRecords();
  const match = all.find((row) => row.id === id);
  const eventId =
    match?.eventId || (id.startsWith("CAL-") ? id.slice(4) : undefined);

  const next = all.filter(
    (row) => row.id !== id && !(eventId && row.eventId === eventId),
  );
  await writeOpsJson(BLOB_KEY, next);

  if (eventId) {
    await addSuppressedEventId(eventId);
  }
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
