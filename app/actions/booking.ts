"use server";

import { createBookingCalendarEvent } from "@/lib/booking/google-calendar";
import { sendBookingEmails } from "@/lib/booking/email";
import {
  BOOKING_SERVICE_LABELS,
  type BookingRequest,
  type BookingResult,
  type BookingServiceId,
} from "@/lib/booking/types";
import { getClosedDateSet } from "@/lib/ops/holidays";
import { saveBookingRecord } from "@/lib/ops/bookings";

const SERVICES = new Set<BookingServiceId>([
  "visa",
  "passport",
  "legalization",
]);

function validateBooking(input: BookingRequest): string | null {
  if (!SERVICES.has(input.service)) return "Please select a valid service.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return "Please select a valid date.";
  if (!/^\d{2}:\d{2}$/.test(input.timeSlot)) return "Please select a valid time.";

  const day = new Date(`${input.date}T12:00:00Z`).getUTCDay();
  if (day === 0 || day === 6) {
    return "Appointments are available Monday to Friday only.";
  }

  const name = input.applicant.fullName.trim();
  const email = input.applicant.email.trim();
  const phone = input.applicant.phone.trim();
  if (name.length < 2) return "Please enter your full name.";
  if (!email.includes("@") || email.length < 5) {
    return "Please enter a valid email address.";
  }
  if (phone.length < 6) return "Please enter a valid phone number.";
  return null;
}

export async function submitBooking(
  input: BookingRequest,
): Promise<BookingResult> {
  const validationError = validateBooking(input);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const closed = await getClosedDateSet();
  if (closed.has(input.date)) {
    return {
      ok: false,
      error:
        "The Embassy is closed on that date (holiday / non-working day). Please choose another day.",
    };
  }

  const booking: BookingRequest = {
    service: input.service,
    date: input.date,
    timeSlot: input.timeSlot,
    applicant: {
      fullName: input.applicant.fullName.trim(),
      email: input.applicant.email.trim().toLowerCase(),
      phone: input.applicant.phone.trim(),
      passportNumber: input.applicant.passportNumber.trim(),
      notes: input.applicant.notes.trim(),
    },
  };

  try {
    const event = await createBookingCalendarEvent(booking);
    await sendBookingEmails({
      booking,
      eventId: event.eventId,
      htmlLink: event.htmlLink,
    });
    try {
      await saveBookingRecord({ ...booking, eventId: event.eventId });
    } catch (persistError) {
      console.error("[booking:record]", persistError);
    }

    return {
      ok: true,
      eventId: event.eventId,
      htmlLink: event.htmlLink,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to complete booking. Please try again or contact the Embassy.";

    if (message.startsWith("Missing environment variable:")) {
      return {
        ok: false,
        error: `${message}. Add Google Calendar and Resend keys to your environment.`,
      };
    }

    console.error("[booking]", message, {
      service: BOOKING_SERVICE_LABELS[booking.service],
      date: booking.date,
      timeSlot: booking.timeSlot,
    });

    return { ok: false, error: message };
  }
}
