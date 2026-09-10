"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroIntro } from "@/lib/content/site";

const HERO_SLIDES = [
  {
    src: "/legacy-site/images/hero-images/sofomar.jpg",
    alt: "Sof Omar caves landscape, Ethiopia",
  },
  {
    src: "/legacy-site/images/hero-images/BaleMountain.jpg",
    alt: "Bale Mountains, Ethiopia",
  },
  {
    src: "/legacy-site/images/hero-images/3Terara.jpg",
    alt: "Ethiopian highland scenery",
  },
  {
    src: "/legacy-site/images/hero-images/lalibela.jpg",
    alt: "Rock-hewn churches of Lalibela, Ethiopia",
  },
] as const;

export default function CinematicHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate min-h-[88vh] w-full overflow-hidden bg-[#0B2545]">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className={`object-cover ${i === index ? "animate-soft-pan" : ""}`}
            sizes="100vw"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,37,69,0.35)_55%,rgba(7,21,40,0.82)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071528] via-[#0B2545]/35 to-[#0B2545]/55"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:justify-center lg:px-8 lg:pb-24">
        <div className="max-w-2xl">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a3]">
            {heroIntro.eyebrow}
          </p>
          <h1 className="animate-fade-up-delay mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroIntro.headline}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {heroIntro.body}
          </p>
          <div className="animate-fade-up-delay mt-9 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="bg-[#c5a572] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0B2545] transition hover:bg-[#dbbf8a]"
            >
              Book Appointment
            </Link>
            <Link
              href="/visa-services"
              className="border border-white/35 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#c5a572] hover:text-[#c5a572]"
            >
              Consular Services
            </Link>
          </div>
        </div>

        <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 w-8 transition ${
                i === index ? "bg-[#c5a572]" : "bg-white/35 hover:bg-white/55"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
