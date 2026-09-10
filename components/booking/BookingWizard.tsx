"use client";

import { useMemo, useState, useTransition } from "react";

type ServiceId = "visa" | "passport" | "legalization";

type TimeSlot = {
  id: string;
  label: string;
};

const SERVICES: { id: ServiceId; title: string; description: string }[] = [
  {
    id: "visa",
    title: "Visa Services",
    description: "Tourist, business, and official visa appointments.",
  },
  {
    id: "passport",
    title: "Passport Services",
    description: "New passport, renewal, and replacement appointments.",
  },
  {
    id: "legalization",
    title: "Legalization",
    description: "Authentication, legalization, and Power of Attorney.",
  },
];

const TIME_SLOTS: TimeSlot[] = [
  { id: "09:00", label: "09:00 AM" },
  { id: "10:00", label: "10:00 AM" },
  { id: "11:00", label: "11:00 AM" },
  { id: "14:00", label: "02:00 PM" },
  { id: "15:00", label: "03:00 PM" },
  { id: "16:00", label: "04:00 PM" },
];

type ApplicantDetails = {
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  notes: string;
};

const initialDetails: ApplicantDetails = {
  fullName: "",
  email: "",
  phone: "",
  passportNumber: "",
  notes: "",
};

function buildCalendarDays(anchor: Date): Date[] {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function BookingWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [service, setService] = useState<ServiceId | null>(null);
  const [monthAnchor, setMonthAnchor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [details, setDetails] = useState<ApplicantDetails>(initialDetails);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const days = useMemo(() => buildCalendarDays(monthAnchor), [monthAnchor]);
  const monthLabel = monthAnchor.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const canContinueStep1 = service !== null;
  const canContinueStep2 = Boolean(selectedDate && selectedSlot);
  const canSubmit =
    details.fullName.trim().length > 1 &&
    details.email.includes("@") &&
    details.phone.trim().length > 5;

  const onSubmit = () => {
    startTransition(() => {
      // Structured for future database / calendar API persistence.
      const bookingPayload = {
        service,
        date: selectedDate,
        timeSlot: selectedSlot,
        applicant: details,
        createdAt: new Date().toISOString(),
      };
      console.info("[booking:stub]", bookingPayload);
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <div className="border border-emerald/30 bg-emerald/5 p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
          Request received
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy">
          Your appointment request has been recorded
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          This is a client-side stub. Connect `bookingPayload` to your calendar
          API or database to confirm slots and send confirmation emails.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface shadow-[0_30px_80px_rgba(11,31,58,0.08)]">
      <div className="border-b border-line px-6 py-5 sm:px-8">
        <ol className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
          {(
            [
              [1, "Select Service"],
              [2, "Date & Time"],
              [3, "Applicant Details"],
            ] as const
          ).map(([n, label]) => (
            <li
              key={n}
              className={
                step === n ? "text-navy" : step > n ? "text-emerald" : "text-muted/50"
              }
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px]">
                {n}
              </span>
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-6 sm:p-8">
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {SERVICES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setService(item.id)}
                className={`border p-5 text-left transition ${
                  service === item.id
                    ? "border-gold bg-gold/10"
                    : "border-line hover:border-navy/30"
                }`}
              >
                <h3 className="font-display text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </button>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-navy">
                  {monthLabel}
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="border border-line px-3 py-1 text-sm"
                    onClick={() =>
                      setMonthAnchor(
                        new Date(
                          monthAnchor.getFullYear(),
                          monthAnchor.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="border border-line px-3 py-1 text-sm"
                    onClick={() =>
                      setMonthAnchor(
                        new Date(
                          monthAnchor.getFullYear(),
                          monthAnchor.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const iso = formatISODate(day);
                  const inMonth = day.getMonth() === monthAnchor.getMonth();
                  const weekday = day.getDay();
                  const isWeekend = weekday === 0 || weekday === 6;
                  const disabled = !inMonth || isWeekend;
                  const active = selectedDate === iso;
                  return (
                    <button
                      key={iso + String(inMonth)}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(iso);
                        setSelectedSlot(null);
                      }}
                      className={`aspect-square text-sm transition ${
                        disabled
                          ? "cursor-not-allowed text-muted/30"
                          : active
                            ? "bg-navy text-white"
                            : "hover:bg-canvas text-charcoal"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">
                Available time slots
              </h3>
              <p className="mt-1 text-sm text-muted">
                Monday–Friday only, aligned with embassy office hours.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!selectedDate}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`border px-4 py-3 text-sm transition ${
                      selectedSlot === slot.id
                        ? "border-gold bg-gold/10 text-navy"
                        : "border-line text-muted hover:border-navy/30"
                    } disabled:opacity-40`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (canSubmit) onSubmit();
            }}
          >
            {(
              [
                ["fullName", "Full name", "text"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
                ["passportNumber", "Passport / ID number", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <label key={key} className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{label}</span>
                <input
                  type={type}
                  required={key !== "passportNumber"}
                  value={details[key]}
                  onChange={(e) =>
                    setDetails((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full border border-line bg-canvas px-3 py-2.5 outline-none transition focus:border-navy"
                />
              </label>
            ))}
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-medium text-navy">Notes</span>
              <textarea
                rows={4}
                value={details.notes}
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full border border-line bg-canvas px-3 py-2.5 outline-none transition focus:border-navy"
              />
            </label>
          </form>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-line px-6 py-4 sm:px-8">
        <button
          type="button"
          disabled={step === 1 || isPending}
          onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)))}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-muted disabled:opacity-30"
        >
          Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            disabled={
              (step === 1 && !canContinueStep1) ||
              (step === 2 && !canContinueStep2)
            }
            onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))}
            className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={!canSubmit || isPending}
            onClick={onSubmit}
            className="bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep disabled:opacity-40"
          >
            {isPending ? "Submitting…" : "Submit Request"}
          </button>
        )}
      </div>
    </div>
  );
}
