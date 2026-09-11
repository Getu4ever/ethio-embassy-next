"use client";

import { useMemo, useState, useTransition } from "react";
import {
  staffAddHoliday,
  staffRemoveHoliday,
} from "@/app/actions/ops";
import type { AppointmentDayDensity } from "@/lib/ops/types";
import type { BookingRecord } from "@/lib/ops/bookings";

type Props = {
  initialYear: number;
  initialMonth: number;
  days: AppointmentDayDensity[];
  bookings: BookingRecord[];
  calendarConfigured: boolean;
  resendConfigured: boolean;
};

function buildGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month - 1, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first
  const lastDay = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: startOffset }, () => null);
  for (let d = 1; d <= lastDay; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function densityClass(count: number, isHoliday: boolean): string {
  if (isHoliday) return "bg-crimson/15 text-crimson border-crimson/30";
  if (count >= 4) return "bg-navy text-white border-navy";
  if (count >= 2) return "bg-navy/20 text-navy border-navy/30";
  if (count === 1) return "bg-gold/25 text-navy border-gold/40";
  return "bg-white text-charcoal border-line hover:border-navy/30";
}

export default function AppointmentOpsPanel({
  initialYear,
  initialMonth,
  days,
  bookings,
  calendarConfigured,
  resendConfigured,
}: Props) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [label, setLabel] = useState("Embassy closed / holiday");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dayMap = useMemo(() => {
    const map = new Map<string, AppointmentDayDensity>();
    for (const day of days) map.set(day.date, day);
    return map;
  }, [days]);

  const grid = useMemo(() => buildGrid(year, month), [year, month]);
  const monthLabel = new Date(year, month - 1, 1).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const selected = selectedDate ? dayMap.get(selectedDate) : null;

  const shiftMonth = (delta: number) => {
    const d = new Date(year, month - 1 + delta, 1);
    // Full reload so server density refreshes for the new month
    window.location.href = `/admin/appointments?year=${d.getFullYear()}&month=${d.getMonth() + 1}`;
  };

  const addClosed = () => {
    if (!selectedDate) return;
    setError(null);
    startTransition(async () => {
      const result = await staffAddHoliday({ date: selectedDate, label });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.reload();
    });
  };

  const removeClosed = () => {
    if (!selectedDate) return;
    setError(null);
    startTransition(async () => {
      const result = await staffRemoveHoliday(selectedDate);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.reload();
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Google Calendar
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {calendarConfigured ? "Connected" : "Not configured"}
          </p>
        </div>
        <div className="border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Resend email
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {resendConfigured ? "Connected" : "Not configured"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="border border-navy/10 bg-white p-5 shadow-sm lg:col-span-8 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-navy">
              {monthLabel}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="border border-line px-3 py-1 text-sm"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="border border-line px-3 py-1 text-sm"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {grid.map((dayNum, idx) => {
              if (!dayNum) {
                return <div key={`e-${idx}`} className="aspect-square" />;
              }
              const date = `${year}-${String(month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const meta = dayMap.get(date);
              const count = meta?.count ?? 0;
              const isHoliday = Boolean(meta?.isHoliday);
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square border p-1 text-left transition ${densityClass(
                    count,
                    isHoliday,
                  )} ${active ? "ring-2 ring-gold ring-offset-1" : ""}`}
                >
                  <span className="text-xs font-semibold">{dayNum}</span>
                  <span className="mt-1 block text-[10px] opacity-80">
                    {isHoliday ? "Closed" : count > 0 ? `${count} apt` : "—"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 border border-line bg-white" /> Free
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 bg-gold/25" /> Light
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 bg-navy/20" /> Busy
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 bg-navy" /> Heavy
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 bg-crimson/30" /> Closed
            </span>
          </div>
        </section>

        <aside className="space-y-4 lg:col-span-4">
          <div className="border border-navy/10 bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-navy">
              Flag closed day
            </h3>
            <p className="mt-2 text-sm text-muted">
              Selected dates block public booking on `/booking`.
            </p>
            <p className="mt-3 text-sm text-charcoal">
              {selectedDate ? (
                <>
                  Selected: <strong>{selectedDate}</strong>
                  {selected?.isHoliday ? ` · ${selected.holidayLabel}` : null}
                </>
              ) : (
                "Select a day on the calendar."
              )}
            </p>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium text-navy">Label</span>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full border border-line bg-canvas px-3 py-2 outline-none focus:border-navy"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!selectedDate || pending || selected?.isHoliday}
                onClick={addClosed}
                className="bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-40"
              >
                Mark closed
              </button>
              <button
                type="button"
                disabled={!selectedDate || pending || !selected?.isHoliday}
                onClick={removeClosed}
                className="border border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy disabled:opacity-40"
              >
                Reopen
              </button>
            </div>
            {error ? (
              <p className="mt-3 text-sm text-crimson" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="border border-navy/10 bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-navy">
              Month bookings
            </h3>
            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm">
              {bookings.map((b) => (
                <li key={b.id} className="border-b border-line pb-2">
                  <p className="font-medium text-navy">
                    {b.date} · {b.timeSlot}
                  </p>
                  <p className="text-muted">
                    {b.applicantName} · {b.service}
                  </p>
                </li>
              ))}
              {bookings.length === 0 ? (
                <li className="text-muted">No recorded bookings this month.</li>
              ) : null}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
