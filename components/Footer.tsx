import Link from "next/link";
import {
  governmentOnlineServices,
  importantLinks,
} from "@/lib/content/navigation";
import { contact, site } from "@/lib/content/site";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="gold-rule" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-white">
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
                  Tel.: {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-gold"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
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
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
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
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Office Hour
            </h2>
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="font-display text-sm font-semibold text-white">
                {contact.officeHours.days}
              </p>
              <div className="gold-rule my-3 opacity-50" />
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                Morning
              </p>
              <p className="mt-1 text-sm text-white/85">
                {contact.officeHours.morning}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-white/50">
                Afternoon
              </p>
              <p className="mt-1 text-sm text-white/85">
                {contact.officeHours.afternoon}
              </p>
              <p className="mt-4 text-xs text-white/55">{contact.officeHours.closed}</p>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
