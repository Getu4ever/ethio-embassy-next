import {
  ConsularPageShell,
  makeConsularMetadata,
} from "@/components/ConsularPageShell";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Link from "next/link";
import { governmentOnlineServices } from "@/lib/content/navigation";
import { contact } from "@/lib/content/site";

export const metadata = makeConsularMetadata("Visa Services");

export default function VisaServicesPage() {
  return (
    <ConsularPageShell
      title="Visa Services"
      aside={
        <div className="space-y-6">
          <div className="border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold text-navy">
              Pay Fee Online via Stripe
            </h2>
            <p className="mt-2 text-sm text-muted">
              Complete your visa processing fee securely before or after document
              submission.
            </p>
            <div className="mt-5">
              <StripeCheckoutButton
                feeId="visa-standard"
                successPath="/visa-services?paid=1"
                cancelPath="/visa-services?cancelled=1"
              />
            </div>
          </div>
          <div className="border border-line bg-canvas p-5 text-sm text-muted">
            <p className="font-medium text-navy">Office hours</p>
            <p className="mt-2">
              {contact.officeHours.days}: {contact.officeHours.morning};{" "}
              {contact.officeHours.afternoon}
            </p>
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
        Visa Services
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        For Ethiopian visa applications, please use the official online channels
        listed below. In-person and document guidance is available during embassy
        office hours ({contact.officeHours.days},{" "}
        {contact.officeHours.summary}).
      </p>

      <h3 className="mt-8 font-display text-lg font-semibold text-navy">
        Official portals
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {governmentOnlineServices
          .filter((l) =>
            ["Ethiopian e-VISA", "E-Service Ethiopia", "Digital INVEA"].includes(
              l.label,
            ),
          )
          .map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline decoration-gold/50 underline-offset-4 hover:text-emerald"
              >
                {link.label}
              </a>
            </li>
          ))}
      </ul>

      <h3 className="mt-8 font-display text-lg font-semibold text-navy">
        Document submission checklist
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>Completed visa application via the official e-VISA / e-Service portal</li>
        <li>Valid travel document / passport with sufficient validity</li>
        <li>Supporting invitation, itinerary, or business letter as applicable</li>
        <li>Proof of fee payment (use Stripe checkout when available)</li>
      </ul>

      <p className="mt-8 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-charcoal">
        Detailed instructional text, application steps, requirements, and fee
        schedules from the WordPress visa page will be filled once a unique scrape
        of <code>visa-services.html</code> is available (current legacy file is a
        duplicate of the homepage). Placeholder Stripe amounts must be replaced
        with the authentic fee table at that time.
      </p>
    </ConsularPageShell>
  );
}
