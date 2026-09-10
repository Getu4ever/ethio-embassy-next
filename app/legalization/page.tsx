import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import Link from "next/link";
import { contact } from "@/lib/content/site";

export const metadata = makeConsularMetadata(
  "Authentication / Legalization and Power of Attorney",
);

export default function LegalizationPage() {
  return (
    <ConsularPageShell
      title="Authentication / Legalization and Power of Attorney"
      aside={
        <div className="border border-line bg-surface p-5 text-sm text-muted">
          <p className="font-medium text-navy">Service desk</p>
          <p className="mt-2">{contact.address}</p>
          <p className="mt-2">{contact.phone}</p>
          <p>{contact.email}</p>
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
        Authentication / Legalization and Power of Attorney
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Document authentication and legalization services, including Power of
        Attorney, are provided by the Embassy consular section at{" "}
        {contact.address}.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>Tel.: {contact.phone}</li>
        <li>Email: {contact.email}</li>
        <li>
          Hours: {contact.officeHours.days}, {contact.officeHours.summary}
        </li>
      </ul>
      <p className="mt-8 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-charcoal">
        Detailed instructional text, application steps, requirements, and fee
        schedules from the WordPress legalization page will be filled once a unique
        scrape of <code>legalization.html</code> is available (current legacy file
        is a duplicate of the homepage).
      </p>
    </ConsularPageShell>
  );
}
