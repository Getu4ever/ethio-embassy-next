import Image from "next/image";
import Link from "next/link";
import {
  AboutUsShell,
  makeAboutUsMetadata,
} from "@/components/AboutUsShell";
import { ambassadorProfile } from "@/lib/content/about-us";
import { ambassadorWelcome } from "@/lib/content/site";

export const metadata = makeAboutUsMetadata("The Ambassador");

export default function TheAmbassadorPage() {
  return (
    <AboutUsShell
      title="The Ambassador"
      currentHref="/the-ambassador"
      lede={ambassadorProfile.title}
      hero={{
        src: "/images/about-ethiopia/ethiopian-london-embassy.jpg",
        alt: "Embassy of Ethiopia in London",
        position: "object-center",
      }}
    >
      <div className="grid gap-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-start">
        <div className="relative aspect-[4/5] overflow-hidden border border-line bg-canvas">
          <Image
            src={ambassadorProfile.image.src}
            alt={ambassadorProfile.image.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 320px"
            priority
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Head of Mission
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            {ambassadorProfile.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {ambassadorProfile.title}
          </p>
          <p className="mt-4 text-sm text-charcoal">
            Appointed{" "}
            <span className="font-semibold">{ambassadorProfile.appointed}</span>
          </p>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-5 text-[15px] leading-[1.75] text-muted sm:text-base">
            {ambassadorProfile.body}
          </p>
        </div>
      </div>

      <section className="mt-12 border border-line bg-canvas/70 px-5 py-6 sm:px-7">
        <h3 className="font-display text-lg font-semibold text-navy">
          {ambassadorWelcome.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
          {ambassadorWelcome.greeting} {ambassadorWelcome.body}
        </p>
        <p className="mt-5 text-sm font-semibold text-navy">
          {ambassadorWelcome.attribution}
        </p>
        <p className="text-sm text-muted">{ambassadorWelcome.role}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/the-embassy"
          className="inline-flex bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-navy-mid"
        >
          The Embassy
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
