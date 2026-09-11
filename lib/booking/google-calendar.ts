import { google } from "googleapis";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_SERVICE_LABELS,
  BOOKING_TIMEZONE,
  type BookingRequest,
} from "@/lib/booking/types";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getPrivateKey(): string {
  return requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

/** Convert a Europe/London wall-clock time to a UTC ISO string. */
export function londonWallTimeToIso(date: string, time: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) {
    throw new Error("Invalid appointment date or time.");
  }

  let utc = Date.UTC(y, m - 1, d, hh, mm, 0);
  for (let i = 0; i < 4; i += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: BOOKING_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(utc));

    const get = (type: string) =>
      Number(parts.find((part) => part.type === type)?.value);
    const actual = Date.UTC(
      get("year"),
      get("month") - 1,
      get("day"),
      get("hour"),
      get("minute"),
    );
    const desired = Date.UTC(y, m - 1, d, hh, mm);
    utc += desired - actual;
  }

  return new Date(utc).toISOString();
}

function addMinutesToTime(time: string, minutes: number): string {
  const [hh, mm] = time.split(":").map(Number);
  const total = hh * 60 + mm + minutes;
  const endH = Math.floor(total / 60);
  const endM = total % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}

export async function createBookingCalendarEvent(input: BookingRequest) {
  const calendarId = requireEnv("GOOGLE_CALENDAR_ID");
  const calendar = getCalendarClient();
  const serviceLabel = BOOKING_SERVICE_LABELS[input.service];
  const endTime = addMinutesToTime(input.timeSlot, BOOKING_DURATION_MINUTES);
  const timeMin = londonWallTimeToIso(input.date, input.timeSlot);
  const timeMax = londonWallTimeToIso(input.date, endTime);

  const existing = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    maxResults: 10,
  });

  const busy = (existing.data.items ?? []).some(
    (event) => event.status !== "cancelled",
  );
  if (busy) {
    throw new Error(
      "That time slot is no longer available. Please choose another time.",
    );
  }

  const description = [
    `Service: ${serviceLabel}`,
    `Applicant: ${input.applicant.fullName}`,
    `Email: ${input.applicant.email}`,
    `Phone: ${input.applicant.phone}`,
    input.applicant.passportNumber
      ? `Passport / ID: ${input.applicant.passportNumber}`
      : null,
    input.applicant.notes ? `Notes: ${input.applicant.notes}` : null,
    "",
    "Submitted via the Embassy website booking form.",
    "Applicant confirmation sent by email (Resend).",
  ]
    .filter(Boolean)
    .join("\n");

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${serviceLabel} — ${input.applicant.fullName}`,
      description,
      location: "Embassy of Ethiopia, 17 Princes Gate, London SW7 1PZ",
      start: {
        dateTime: `${input.date}T${input.timeSlot}:00`,
        timeZone: BOOKING_TIMEZONE,
      },
      end: {
        dateTime: `${input.date}T${endTime}:00`,
        timeZone: BOOKING_TIMEZONE,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
  });

  return {
    eventId: event.data.id ?? "",
    htmlLink: event.data.htmlLink ?? null,
    startsAt: timeMin,
    endsAt: timeMax,
  };
}
