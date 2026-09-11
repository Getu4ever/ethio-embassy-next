export type BookingServiceId = "visa" | "passport" | "legalization";

export type BookingApplicant = {
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  notes: string;
};

export type BookingRequest = {
  service: BookingServiceId;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm 24h
  applicant: BookingApplicant;
};

export type BookingResult =
  | {
      ok: true;
      eventId: string;
      htmlLink?: string | null;
      startsAt: string;
      endsAt: string;
    }
  | { ok: false; error: string };

export const BOOKING_SERVICE_LABELS: Record<BookingServiceId, string> = {
  visa: "Visa Services",
  passport: "Passport Services",
  legalization: "Legalization / Authentication",
};

/** Consular appointments are 45 minutes within Embassy office hours. */
export const BOOKING_DURATION_MINUTES = 45;

export const BOOKING_TIMEZONE = "Europe/London";
