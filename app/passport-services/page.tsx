import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Link from "next/link";
import { contact } from "@/lib/content/site";

export const metadata = makeConsularMetadata("Passport Services");

export default function PassportServicesPage() {
  return (
    <ConsularPageShell
      title="Passport Services"
      aside={
        <div className="space-y-6">
          <div className="border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold text-navy">
              Pay Fee Online via Stripe
            </h2>
            <p className="mt-2 text-sm text-muted">
              Pay passport processing fees securely through Stripe Checkout.
            </p>
            <div className="mt-5 space-y-4">
              <StripeCheckoutButton
                feeId="passport-new"
                label="Pay New Passport Fee"
                successPath="/passport-services?paid=1"
                cancelPath="/passport-services?cancelled=1"
              />
              <StripeCheckoutButton
                feeId="passport-renewal"
                label="Pay Renewal Fee"
                successPath="/passport-services?paid=1"
                cancelPath="/passport-services?cancelled=1"
              />
            </div>
          </div>
          <div className="border border-line bg-canvas p-5 text-sm text-muted">
            <p className="font-medium text-navy">Contact</p>
            <p className="mt-2">{contact.email}</p>
            <p>{contact.phone}</p>
            <Link
              href="/booking"
              className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-emerald"
            >
              Book appointment →
            </Link>
          </div>
        </div>
      }
    >
      <h2 className="font-display text-2xl font-semibold text-navy">
        Passport Services
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Passport services for Ethiopian nationals are handled by the Embassy of
        Ethiopia in London. Contact the consular section at{" "}
        <a
          href={`mailto:${contact.email}`}
          className="font-medium text-navy underline decoration-gold/50 underline-offset-4"
        >
          {contact.email}
        </a>{" "}
        or call{" "}
        <a
          href={`tel:${contact.phone}`}
          className="font-medium text-navy underline decoration-gold/50 underline-offset-4"
        >
          {contact.phone}
        </a>
        .
      </p>

      <div className="mt-8 border border-line bg-canvas p-5 text-sm">
        <p className="font-semibold text-navy">Office hours</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          <li>
            {contact.officeHours.days}: Morning {contact.officeHours.morning};{" "}
            Afternoon {contact.officeHours.afternoon}
          </li>
          <li>{contact.officeHours.closed}</li>
        </ul>
      </div>

      <h3 className="mt-8 font-display text-lg font-semibold text-navy">
        Document submission checklist
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>Current or expired Ethiopian passport (as applicable)</li>
        <li>Completed passport application form</li>
        <li>Recent passport photographs meeting embassy specifications</li>
        <li>Proof of legal residence / status in the United Kingdom</li>
        <li>Proof of fee payment via Stripe or embassy cashier guidance</li>
      </ul>

      <p className="mt-8 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-charcoal">
        Detailed instructional text, application steps, requirements, and fee
        schedules from the WordPress passport page will be filled once a unique
        scrape of <code>passport-services.html</code> is available (current
        legacy file is a duplicate of the homepage). Placeholder Stripe amounts
        must be replaced with the authentic fee table at that time.
      </p>
    </ConsularPageShell>
  );
}
