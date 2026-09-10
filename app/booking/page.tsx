import type { Metadata } from "next";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book Consular Appointment",
  description:
    "Schedule a visa, passport, or legalization appointment at the Embassy of Ethiopia in London.",
};

export default function BookingPage() {
  return (
    <main>
      <section className="diplomatic-mesh px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Consular Booking
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Schedule your embassy appointment
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Select a service, choose an available weekday slot within office
            hours, and submit your details. This wizard is ready to connect to a
            calendar API or database.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <BookingWizard />
      </section>
    </main>
  );
}
