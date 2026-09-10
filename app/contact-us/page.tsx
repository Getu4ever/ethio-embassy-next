import type { Metadata } from "next";
import { contact } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return (
    <main>
      <section className="diplomatic-mesh px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Embassy of Ethiopia · London
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy">
              Contact Us
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-navy">Address: </span>
                {contact.address}
              </li>
              <li>
                <span className="font-semibold text-navy">Tel.: </span>
                <a href={`tel:${contact.phone}`} className="hover:text-emerald">
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy">Email: </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-emerald"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy">
              Office Hour
            </h2>
            <h3 className="mt-5 text-base font-semibold text-charcoal">
              {contact.officeHours.days}
            </h3>
            <div className="gold-rule my-4 max-w-[12rem]" />
            <p className="font-semibold text-navy">Morning</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-muted">
              <li>{contact.officeHours.morning}</li>
            </ul>
            <p className="mt-4 font-semibold text-navy">Afternoon</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-muted">
              <li>{contact.officeHours.afternoon}</li>
            </ul>
            <p className="mt-6 text-sm text-muted">
              Working hours summary: Monday to Friday,{" "}
              {contact.officeHours.summary}. {contact.officeHours.closed}.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden border border-line bg-surface">
          <iframe
            title={contact.address}
            src={contact.mapEmbedUrl}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
