import Link from "next/link";
import EmailProviderChooser from "@/components/EmailProviderChooser";
import {
  governmentOnlineServices,
  importantLinks,
} from "@/lib/content/navigation";
import type { OfficeHoursContent } from "@/lib/cms/types";
import { contact, site, socialLinks } from "@/lib/content/site";

function SocialIcon({ id }: { id: (typeof socialLinks)[number]["id"] }) {
  switch (id) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.74-1.55 1.49v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 7.05c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM20.44 20h-3.37v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V20h-3.37V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V20z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z" />
        </svg>
      );
  }
}

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
                <EmailProviderChooser
                  label={contact.email}
                  eyebrow="Embassy desk"
                  className="text-left transition hover:text-gold"
                />
              </p>
            </div>

            <div className="mt-8">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                Follow Us
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      title={link.label}
                      className="group flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.03] text-gold transition duration-300 hover:border-gold hover:bg-gold hover:text-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <SocialIcon id={link.id} />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] tracking-wide text-white/40">
                X · Facebook · LinkedIn · YouTube
              </p>
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
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
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
