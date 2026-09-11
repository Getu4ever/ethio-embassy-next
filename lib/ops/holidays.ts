import type { EmbassyHoliday } from "@/lib/ops/types";
import { readOpsJson, writeOpsJson } from "@/lib/ops/json-store";

const BLOB_KEY = "ops/holidays.json";

async function readAll(): Promise<EmbassyHoliday[]> {
  const data = await readOpsJson<EmbassyHoliday[]>(BLOB_KEY, []);
  return Array.isArray(data) ? data : [];
}

async function writeAll(holidays: EmbassyHoliday[]): Promise<void> {
  const sorted = [...holidays].sort((a, b) => a.date.localeCompare(b.date));
  await writeOpsJson(BLOB_KEY, sorted);
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
