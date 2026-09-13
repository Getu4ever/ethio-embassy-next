"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroIntro } from "@/lib/content/site";

const HERO_SLIDES = [
  {
    src: "/legacy-site/images/hero-images/lalibela.jpg",
    alt: "Rock-hewn churches of Lalibela, Ethiopia",
  },
  {
    src: "/legacy-site/images/hero-images/ancient-standing-stones.jpg",
    alt: "Ancient standing stones in Ethiopia",
  },
  {
    src: "/legacy-site/images/hero-images/addis-ababa-african-union.jpg",
    alt: "African Union headquarters in Addis Ababa",
    // Pale silver architecture vs sky — keep silhouette readable under hero overlays
    imageClass: "contrast-125 saturate-110 brightness-[1.02]",
  },
  {
    src: "/legacy-site/images/hero-images/london-city-01.jpeg",
    alt: "London city skyline",
  },
] as const;

const INTERVAL_MS = 6500;

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index]);

  const goTo = (i: number) => {
    setIndex(i);
    setProgressKey((k) => k + 1);
  };

  return (
    <section className="relative isolate min-h-[70dvh] w-full overflow-hidden bg-[#0B2545] sm:min-h-[80dvh] lg:min-h-[88vh]">
      {HERO_SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              active
                ? "z-[1] opacity-100"
                : "z-0 opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={`object-cover object-center will-change-transform ${
                active ? "carousel-kenburns" : "scale-110"
              } ${"imageClass" in slide ? slide.imageClass : ""}`}
              sizes="100vw"
            />
          </div>
        );
      })}

      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,37,69,0.35)_55%,rgba(7,21,40,0.82)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#071528] via-[#0B2545]/35 to-[#0B2545]/55"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 sm:min-h-[80dvh] sm:px-6 sm:pb-20 sm:pt-28 lg:min-h-[88vh] lg:justify-center lg:px-8 lg:pb-24">
        <div key={index} className="max-w-2xl carousel-caption">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7c4a3] sm:text-xs sm:tracking-[0.28em]">
            {heroIntro.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            {heroIntro.headline}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
            {heroIntro.body}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Link
              href="/booking"
              className="inline-flex min-h-11 items-center justify-center bg-[#c5a572] px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#0B2545] transition hover:bg-[#dbbf8a]"
            >
              Book Appointment
            </Link>
            <Link
              href="/visa-services"
              className="inline-flex min-h-11 items-center justify-center border border-white/35 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#c5a572] hover:text-[#c5a572]"
            >
              Consular Services
            </Link>
          </div>
        </div>

        <div
          className="mt-8 flex gap-2 sm:mt-10"
          role="tablist"
          aria-label="Hero slides"
        >
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              className="group relative h-1 min-w-10 overflow-hidden bg-white/25 sm:min-w-14"
              onClick={() => goTo(i)}
            >
              <span
                key={i === index ? progressKey : `idle-${i}`}
                className={`absolute inset-y-0 left-0 bg-[#c5a572] ${
                  i === index
                    ? "carousel-progress"
                    : i < index
                      ? "w-full"
                      : "w-0"
                }`}
                style={
                  i === index
                    ? { animationDuration: `${INTERVAL_MS}ms` }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
