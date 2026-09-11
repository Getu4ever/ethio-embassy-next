"use server";

import { revalidatePath } from "next/cache";
import { recordStaffAudit } from "@/lib/audit/record";
import { listAuditEntries } from "@/lib/audit/store";
import type { AuditEntry } from "@/lib/audit/types";
import {
  addHoliday,
  getClosedDateSet,
  listHolidays,
  removeHoliday,
} from "@/lib/ops/holidays";
import { countBookingsByDate, listBookingsForRange } from "@/lib/ops/bookings";
import type { AppointmentDayDensity, EmbassyHoliday } from "@/lib/ops/types";
import { getStaffUsername, isStaffAuthenticated } from "@/lib/staff/auth";

export async function staffListAuditLog(
  limit = 100,
): Promise<{ ok: true; entries: AuditEntry[] } | { ok: false; error: string }> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  return { ok: true, entries: await listAuditEntries(limit) };
}

export async function staffListHolidays(): Promise<
  { ok: true; holidays: EmbassyHoliday[] } | { ok: false; error: string }
> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  return { ok: true, holidays: await listHolidays() };
}

export async function staffAddHoliday(input: {
  date: string;
  label: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  try {
    const holiday = await addHoliday({
      date: input.date,
      label: input.label,
      createdBy: getStaffUsername(),
    });
    await recordStaffAudit({
      action: "holiday.add",
      module: "appointments",
      summary: `Marked ${holiday.date} closed (${holiday.label})`,
      targetId: holiday.date,
    });
    revalidatePath("/admin/appointments");
    revalidatePath("/booking");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to add holiday.",
    };
  }
}

export async function staffRemoveHoliday(
  date: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  await removeHoliday(date);
  await recordStaffAudit({
    action: "holiday.remove",
    module: "appointments",
    summary: `Removed closed day ${date}`,
    targetId: date,
  });
  revalidatePath("/admin/appointments");
  revalidatePath("/booking");
  return { ok: true };
}

/** Public: closed dates for the booking wizard. */
export async function getPublicClosedDates(): Promise<string[]> {
  const set = await getClosedDateSet();
  return [...set];
}

export async function staffAppointmentDensity(input: {
  year: number;
  month: number; // 1-12
}): Promise<
  | {
      ok: true;
      days: AppointmentDayDensity[];
      bookings: Awaited<ReturnType<typeof listBookingsForRange>>;
    }
  | { ok: false; error: string }
> {
  if (!(await isStaffAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }

  const y = input.year;
  const m = input.month;
  const from = `${y}-${String(m).padStart(2, "0")}-01`;
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const to = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const [counts, holidays, bookings] = await Promise.all([
    countBookingsByDate(from, to),
    listHolidays(),
    listBookingsForRange(from, to),
  ]);
  const holidayMap = new Map(holidays.map((h) => [h.date, h.label]));

  const days: AppointmentDayDensity[] = [];
  for (let d = 1; d <= lastDay; d += 1) {
    const date = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isHoliday = holidayMap.has(date);
    days.push({
      date,
      count: counts[date] ?? 0,
      isHoliday,
      holidayLabel: holidayMap.get(date),
    });
  }

  return {
    ok: true,
    days,
    bookings,
  };
}
