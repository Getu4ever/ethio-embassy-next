import Image from "next/image";
import Link from "next/link";
import {
  aboutUsHubPages,
  aboutUsPillars,
  diplomaticStaff,
} from "@/lib/content/about-us";
import { contact } from "@/lib/content/site";

export default function AboutUsHub() {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src="/images/about-us/embassy-building.jpg"
          alt="Embassy of Ethiopia building in London"
          fill
          priority
          sizes="100vw"
          className="animate-soft-pan object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            About Us
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Ethiopia’s mission in the United Kingdom — diplomacy, consular care,
            and partnership from Princes Gate.
          </p>
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <Link
              href="/the-ambassador"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Meet the Ambassador
            </Link>
            <Link
              href="/the-embassy"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              The Embassy
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(197,165,114,0.16),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Our mission
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Represent. Serve. Connect.
            </h2>
          </div>
          <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {aboutUsPillars.map((pillar, index) => (
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

      {/* Leadership portraits */}
      <section className="relative overflow-hidden bg-canvas">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,165,114,0.08),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Leadership
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Diplomatic staff
          </h2>
          <ul className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10 lg:gap-16">
            {diplomaticStaff.map((person) => (
              <li key={person.name} className="group">
                <Link
                  href={
                    person.role === "Head of Mission"
                      ? "/the-ambassador"
                      : "/the-embassy"
                  }
                  className="block"
                >
                  <div className="relative mx-auto aspect-square w-full max-w-[17.5rem] sm:mx-0 sm:max-w-[19rem]">
                    {/* Soft champagne aura */}
                    <div
                      className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(197,165,114,0.32)_0%,transparent_70%)] opacity-80 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
                      aria-hidden
                    />
                    {/* Dual metallic gold rings */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0e0bc] via-[#c5a572] to-[#8a7048] p-[2.5px] shadow-[0_20px_44px_rgba(11,37,69,0.16)] transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_28px_56px_rgba(11,37,69,0.22)]"
                      aria-hidden
                    >
                      <div className="h-full w-full rounded-full bg-canvas p-[6px]">
                        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#e8d5a8] via-[#c5a572] to-[#7a6240] p-[1.5px]">
                          <div className="relative h-full w-full overflow-hidden rounded-full bg-navy/5">
                            <Image
                              src={person.image.src}
                              alt={person.image.alt}
                              fill
                              className="object-cover object-top transition duration-700 group-hover:scale-[1.05]"
                              sizes="(max-width: 640px) 70vw, 304px"
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_45%,rgba(7,21,40,0.28)_100%)]"
                              aria-hidden
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-white/15"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    {person.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-navy transition group-hover:text-navy-deep">
                    {person.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    {person.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Explore
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Inside the mission
          </h2>
        </div>

        <ul>
          {aboutUsHubPages.map((page, index) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="group relative block min-h-[42vh] overflow-hidden text-white sm:min-h-[38vh]"
              >
                <Image
                  src={page.hero.src}
                  alt={page.hero.alt}
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
                      {page.label}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                      {page.summary}
                    </p>
                    <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-gold transition group-hover:text-gold-bright">
                      Open →
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
              Visit us
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              17 Princes Gate
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              {contact.officeHours.days}. Morning {contact.officeHours.morning};
              afternoon {contact.officeHours.afternoon}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact-us"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
            >
              Book appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
