import Image from "next/image";
import Link from "next/link";
import {
  AboutUsShell,
  makeAboutUsMetadata,
} from "@/components/AboutUsShell";
import {
  diplomaticStaff,
  embassyContactRows,
} from "@/lib/content/about-us";
import { contact } from "@/lib/content/site";

export const metadata = makeAboutUsMetadata("The Embassy");

export default function TheEmbassyPage() {
  return (
    <AboutUsShell
      title="The Embassy"
      currentHref="/the-embassy"
      lede="Mission contact details and diplomatic leadership at the Embassy of Ethiopia in London."
      hero={{
        src: "/images/about-us/embassy-building.jpg",
        alt: "Embassy of Ethiopia building in London",
        position: "object-center",
      }}
    >
      <div className="relative mb-8 aspect-[16/9] overflow-hidden border border-line">
        <Image
          src="/images/about-us/embassy-building.jpg"
          alt="Embassy of Ethiopia in London"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>

      <p className="border-l-2 border-gold pl-4 text-base leading-relaxed text-charcoal sm:text-lg">
        The Embassy of the Federal Democratic Republic of Ethiopia in London
        represents Ethiopia in the United Kingdom from {contact.address}.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          Mission details
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" />
        <dl className="mt-6 overflow-hidden border border-line">
          {embassyContactRows.map((row, index) => (
            <div
              key={row.label}
              className={`grid gap-1 px-4 py-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-6 ${
                index % 2 === 0 ? "bg-surface" : "bg-canvas/80"
              }`}
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                {row.label}
              </dt>
              <dd className="whitespace-pre-line text-[15px] leading-relaxed text-muted">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          Name and Title of Diplomatic Staff
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" />
        <ul className="mt-6 space-y-4">
          {diplomaticStaff.map((person) => (
            <li
              key={person.name}
              className="flex gap-4 border-l-2 border-gold bg-canvas/70 px-4 py-4 sm:gap-5 sm:px-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-gold ring-offset-2 ring-offset-canvas sm:h-24 sm:w-24">
                <Image
                  src={person.image.src}
                  alt={person.image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 self-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                  {person.role}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-charcoal">
                  {person.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {person.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/the-ambassador"
          className="inline-flex bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid"
        >
          Meet the Ambassador
        </Link>
        <Link
          href="/contact-us"
          className="inline-flex border border-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-canvas"
        >
          Contact Us
        </Link>
      </div>
    </AboutUsShell>
  );
}
