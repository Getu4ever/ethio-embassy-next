import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { aboutUsNav } from "@/lib/content/about-us";
import { contact } from "@/lib/content/site";

function AboutUsTopicNav({ currentHref }: { currentHref: string }) {
  return (
    <nav
      aria-label="About Us topics"
      className="border-y border-white/10 bg-navy-deep/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link
            href="/about-us"
            className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              currentHref === "/about-us"
                ? "bg-gold text-navy-deep"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            Overview
          </Link>
        </li>
        {aboutUsNav.map((link) => {
          const active = currentHref === link.href;
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className={`inline-flex px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-gold text-navy-deep"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.shortLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AboutUsShell({
  title,
  lede,
  currentHref,
  hero,
  children,
}: {
  title: string;
  lede?: string;
  currentHref: string;
  hero: { src: string; alt: string; position?: string };
  children: ReactNode;
}) {
  return (
    <main className="bg-canvas">
      <section className="relative isolate min-h-[58vh] overflow-hidden text-white sm:min-h-[64vh]">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className={`animate-soft-pan object-cover ${hero.position ?? "object-center"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,165,114,0.2),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[64vh] sm:px-6 sm:pb-12 lg:px-8">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            About Us
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {lede ? (
            <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {lede}
            </p>
          ) : null}
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="inline-flex bg-gold px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-deep transition hover:bg-gold-bright"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex border border-white/35 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Book appointment
            </Link>
          </div>
        </div>
      </section>

      <AboutUsTopicNav currentHref={currentHref} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <article className="lg:col-span-8">{children}</article>

        <aside className="lg:col-span-4">
          <div className="bg-navy px-6 py-8 text-white sm:px-8">
            <p className="font-display text-lg font-semibold">
              Embassy of Ethiopia
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {contact.address}
              <br />
              {contact.officeHours.days}
              <br />
              Morning {contact.officeHours.morning}
              <br />
              Afternoon {contact.officeHours.afternoon}
            </p>
            <p className="mt-5 text-sm text-white/90">
              <a
                href={`tel:${contact.phone}`}
                className="transition hover:text-gold"
              >
                {contact.phoneDisplay}
              </a>
              <br />
              <a
                href={`mailto:${contact.email}`}
                className="transition hover:text-gold"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </aside>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted">
            Learn more about the mission in London.
          </p>
          <Link
            href="/about-us"
            className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:text-emerald"
          >
            Back to About Us →
          </Link>
        </div>
      </section>
    </main>
  );
}

export function makeAboutUsMetadata(title: string) {
  return { title };
}
