import Link from "next/link";
import {
  governmentOnlineServices,
  importantLinks,
} from "@/lib/content/navigation";
import type { OfficeHoursContent } from "@/lib/cms/types";
import { contact, site } from "@/lib/content/site";

export default function Footer({
  officeHours = contact.officeHours,
}: {
  officeHours?: OfficeHoursContent;
}) {
  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="gold-rule" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {site.name}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              London · United Kingdom
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Official diplomatic mission of the Federal Democratic Republic of
              Ethiopia to the United Kingdom.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p>{contact.address}</p>
              <p>
                <a href={`tel:${contact.phone}`} className="transition hover:text-gold">
                  Tel.: {contact.phoneDisplay}
                </a>
              </p>
              <p className="break-all">
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-gold"
                >
                  {contact.email}
                </a>
              </p>
            </div>

            <div className="mt-8">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Follow Us
              </p>
              <a
                href="https://x.com/ETEmbassyLDN"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow the Embassy of Ethiopia in London on X"
                className="group mt-3 inline-flex items-center gap-3 border border-white/15 bg-white/[0.04] px-3.5 py-2.5 transition duration-300 hover:border-gold/50 hover:bg-gold/10"
              >
                <span className="flex h-8 w-8 items-center justify-center border border-gold/35 bg-navy-deep text-gold transition duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-current"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </span>
                <span className="pr-1">
                  <span className="block text-sm font-medium text-white transition group-hover:text-gold">
                    @ETEmbassyLDN
                  </span>
                  <span className="mt-0.5 block text-[11px] tracking-wide text-white/45 transition group-hover:text-white/65">
                    Official updates on X
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Government Online Services
              </h2>
              <ul className="space-y-2.5 text-sm text-white/75">
                {governmentOnlineServices.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Important Links
              </h2>
              <ul className="space-y-2.5 text-sm text-white/75">
                {importantLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Office Hour
            </h2>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-display text-sm font-semibold text-white">
                {officeHours.days}
              </p>
              <div className="gold-rule my-3 opacity-50" />
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                Morning
              </p>
              <p className="mt-1 text-sm text-white/85">
                {officeHours.morning}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-white/50">
                Afternoon
              </p>
              <p className="mt-1 text-sm text-white/85">
                {officeHours.afternoon}
              </p>
              <p className="mt-4 text-xs text-white/55">{officeHours.closed}</p>
            </div>
            <Link
              href="/booking"
              className="mt-4 inline-flex w-full items-center justify-center bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.shortName}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/visa-services" className="hover:text-gold">
              Visa Services
            </Link>
            <Link href="/passport-services" className="hover:text-gold">
              Passport Services
            </Link>
            <Link href="/legalization" className="hover:text-gold">
              Legalization
            </Link>
            <Link href="/contact-us" className="hover:text-gold">
              Contact Us
            </Link>
            <Link href="/cookie-policy" className="hover:text-gold">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
