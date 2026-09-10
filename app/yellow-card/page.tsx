import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import Link from "next/link";
import { contact } from "@/lib/content/site";

export const metadata = makeConsularMetadata(
  "Ethiopian Origin ID Card (Yellow Card)",
);

export default function YellowCardPage() {
  return (
    <ConsularPageShell
      title="Ethiopian Origin ID Card (Yellow Card)"
      aside={
        <div className="border border-line bg-surface p-5 text-sm text-muted">
          <p className="font-medium text-navy">Service window</p>
          <p className="mt-2">
            {contact.officeHours.days} — Morning {contact.officeHours.morning};{" "}
            Afternoon {contact.officeHours.afternoon}
          </p>
          <Link
            href="/booking"
            className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-emerald"
          >
            Book appointment →
          </Link>
        </div>
      }
    >
      <h2 className="font-display text-2xl font-semibold text-navy">
        Ethiopian Origin ID Card (Yellow Card)
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        The Ethiopian Origin ID Card (Yellow Card) is administered through the
        Embassy of Ethiopia in London. For appointments and document checklists,
        contact the consular desk at {contact.email} or {contact.phone}.
      </p>
      <div className="mt-8 border border-line bg-canvas p-5 text-sm text-muted">
        <p className="font-semibold text-navy">Service window</p>
        <p className="mt-2">
          {contact.officeHours.days} — Morning {contact.officeHours.morning};{" "}
          Afternoon {contact.officeHours.afternoon}
        </p>
      </div>
      <p className="mt-8 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-charcoal">
        Detailed instructional text, application steps, requirements, and fee
        schedules from the WordPress yellow-card page will be filled once a unique
        scrape of <code>yellow-card.html</code> is available (current legacy file
        is a duplicate of the homepage).
      </p>
    </ConsularPageShell>
  );
}
