"use client";

import { useActionState, useMemo, useState, useTransition } from "react";
import {
  staffAddHoliday,
  staffDeleteBooking,
  staffRemoveHoliday,
  staffUpdateBooking,
} from "@/app/actions/ops";
import {
  BOOKING_SERVICE_LABELS,
  type BookingServiceId,
} from "@/lib/booking/types";
import type { AppointmentDayDensity } from "@/lib/ops/types";
import type { BookingRecord } from "@/lib/ops/bookings";

type Props = {
  initialYear: number;
  initialMonth: number;
  days: AppointmentDayDensity[];
  bookings: BookingRecord[];
  canEditDelete: boolean;
};

function buildGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month - 1, 1);
  const startOffset = (first.getDay() + 6) % 7;
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
  canEditDelete,
}: Props) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [label, setLabel] = useState("Embassy closed / holiday");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);

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
              Selected dates are closed for public booking.
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
        </aside>
      </div>

      <section className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Month appointments
            </h3>
            <p className="mt-1 text-sm text-muted">
              {canEditDelete
                ? "Master Admin and Director can edit or remove bookings."
                : "Open a booking to review applicant details."}
            </p>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-line">
          {bookings.map((booking) => (
            <li key={booking.id} className="py-4">
              {editingId === booking.id && canEditDelete ? (
                <BookingEditForm
                  booking={booking}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-navy">
                      {booking.date} · {booking.timeSlot}
                    </p>
                    <p className="text-sm text-muted">
                      {booking.applicantName}
                      {booking.applicantEmail
                        ? ` · ${booking.applicantEmail}`
                        : ""}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                      {BOOKING_SERVICE_LABELS[
                        booking.service as BookingServiceId
                      ] ?? booking.service}
                    </p>
                  </div>
                  {canEditDelete ? (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingId(booking.id)}
                        className="text-xs font-semibold uppercase tracking-[0.1em] text-navy hover:underline"
                      >
                        Edit
                      </button>
                      <form action={staffDeleteBooking}>
                        <input type="hidden" name="id" value={booking.id} />
                        <button
                          type="submit"
                          className="text-xs font-semibold uppercase tracking-[0.1em] text-crimson hover:underline"
                          onClick={(e) => {
                            if (
                              !confirm(
                                `Delete appointment for ${booking.applicantName} on ${booking.date}?`,
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              )}
            </li>
          ))}
          {bookings.length === 0 ? (
            <li className="py-8 text-center text-sm text-muted">
              No recorded appointments this month.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}

function BookingEditForm({
  booking,
  onCancel,
}: {
  booking: BookingRecord;
  onCancel: () => void;
}) {
  const [state, action, pending] = useActionState(staffUpdateBooking, null);

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="id" value={booking.id} />
      <label className="block text-sm">
        <span className="mb-1 block text-muted">Date</span>
        <input
          type="date"
          name="date"
          required
          defaultValue={booking.date}
          className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">Time</span>
        <input
          type="time"
          name="timeSlot"
          required
          defaultValue={booking.timeSlot}
          className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">Applicant name</span>
        <input
          name="applicantName"
          required
          defaultValue={booking.applicantName}
          className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">Email</span>
        <input
          type="email"
          name="applicantEmail"
          defaultValue={booking.applicantEmail}
          className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
        />
      </label>
      <label className="block text-sm sm:col-span-2">
        <span className="mb-1 block text-muted">Service</span>
        <select
          name="service"
          defaultValue={booking.service}
          className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
        >
          {(Object.keys(BOOKING_SERVICE_LABELS) as BookingServiceId[]).map(
            (service) => (
              <option key={service} value={service}>
                {BOOKING_SERVICE_LABELS[service]}
              </option>
            ),
          )}
        </select>
      </label>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-muted hover:text-navy"
        >
          Cancel
        </button>
        {state?.error ? (
          <p className="text-sm text-crimson">{state.error}</p>
        ) : null}
        {state?.ok ? (
          <p className="text-sm text-emerald">Saved</p>
        ) : null}
      </div>
    </form>
  );
}
