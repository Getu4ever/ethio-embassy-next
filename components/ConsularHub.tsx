import Image from "next/image";
import Link from "next/link";
import {
  consularHubServices,
  consularPillars,
} from "@/lib/content/consular";
import { contact } from "@/lib/content/site";

export default function ConsularHub() {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src="/images/consular/passport.jpg"
          alt="Consular documents and travel credentials"
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Consular Services
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Consular Services
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Passports, visas, legalization, and vital documents — delivered with
            clarity from Princes Gate.
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Book appointment
            </Link>
            <Link
              href="/apply"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Submit documents
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,165,114,0.16),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              How it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Prepared documents. Booked time. Confident visits.
            </h2>
          </div>

          <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {consularPillars.map((pillar, index) => (
              <li key={pillar.title}>
                <p className="font-display text-5xl font-semibold text-gold/40">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Choose your pathway
          </h2>
        </div>

        <ul>
          {consularHubServices.map((service, index) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group relative block min-h-[42vh] overflow-hidden text-white sm:min-h-[38vh]"
              >
                <Image
                  src={service.hero.src}
                  alt={service.hero.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-navy-deep via-navy-deep/75 to-transparent"
                      : "bg-gradient-to-l from-navy-deep via-navy-deep/75 to-transparent"
                  }`}
                />
                <div
                  className={`relative mx-auto flex min-h-[42vh] max-w-7xl items-end px-4 py-14 sm:min-h-[38vh] sm:px-6 sm:py-16 lg:px-8 ${
                    index % 2 === 0 ? "" : "justify-end text-right"
                  }`}
                >
                  <div className="max-w-md">
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {service.label}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                      {service.summary}
                    </p>
                    <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-gold transition group-hover:text-gold-bright">
                      View service →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(197,165,114,0.18),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Embassy hours
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              {contact.address}. {contact.officeHours.days}, morning{" "}
              {contact.officeHours.morning}; afternoon{" "}
              {contact.officeHours.afternoon}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/booking"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
            >
              Book appointment
            </Link>
            <Link
              href="/apply"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Submit documents
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
