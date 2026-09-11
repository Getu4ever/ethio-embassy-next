import Link from "next/link";
import {
  AboutEthiopiaShell,
  AboutPageBody,
  makeAboutMetadata,
} from "@/components/AboutEthiopiaShell";
import { aboutEthiopiaPages } from "@/lib/content/about-ethiopia";
import { contact } from "@/lib/content/site";

const page = aboutEthiopiaPages["yellow-card"];

export const metadata = makeAboutMetadata(page.title);

export default function YellowCardPage() {
  return (
    <AboutEthiopiaShell page={page} currentHref="/yellow-card">
      <AboutPageBody page={page} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="border border-line bg-canvas px-5 py-4 text-sm text-muted">
          <p className="font-display text-sm font-semibold text-navy">
            Service window
          </p>
          <p className="mt-2 leading-relaxed">
            {contact.officeHours.days} — Morning {contact.officeHours.morning};{" "}
            Afternoon {contact.officeHours.afternoon}
          </p>
        </div>
        <div className="border border-line bg-canvas px-5 py-4 text-sm text-muted">
          <p className="font-display text-sm font-semibold text-navy">
            Contact consular desk
          </p>
          <p className="mt-2 leading-relaxed">
            {contact.email}
            <br />
            {contact.phone}
          </p>
        </div>
      </div>
      <Link
        href="/booking"
        className="mt-8 inline-flex bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid"
      >
        Book appointment
      </Link>
    </AboutEthiopiaShell>
  );
}
