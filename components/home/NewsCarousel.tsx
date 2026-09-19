"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NewsItem } from "@/lib/content/site";

const PREFERRED_FIRST = "ambassador-credentials-imo";

/** Keep these on /news only — not the homepage carousel. */
const CAROUSEL_EXCLUDED = new Set([
  "consular-announcement",
  "ethiopian-new-year-2026",
  "zamzam-bank-islamic-finance-award",
]);

const INTERVAL_MS = 7000;

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const slides = useMemo(() => {
    const preferred = items.filter((item) => item.slug === PREFERRED_FIRST);
    const rest = items.filter(
      (item) =>
        item.slug !== PREFERRED_FIRST && !CAROUSEL_EXCLUDED.has(item.slug),
    );
    return [...preferred, ...rest];
  }, [items]);

  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="relative flex h-full min-h-[280px] items-center justify-center bg-navy text-sm text-white/70 sm:min-h-[360px] lg:min-h-[420px]">
        News coming soon
      </div>
    );
  }

  const slide = slides[index]!;
  const go = (next: number) => {
    setIndex((current) => (current + next + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  };

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-navy sm:min-h-[360px] lg:min-h-[420px]">
      {slides.map((item, i) => {
        const active = i === index;
        return (
          <div
            key={item.slug}
            className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority={i === 0}
              className={`object-cover will-change-transform ${
                active ? "carousel-kenburns" : "scale-110"
              }`}
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:left-3"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:right-3"
      >
        ›
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-16 sm:px-5 sm:pb-4">
        <div
          key={slide.slug}
          className="carousel-caption bg-black/50 px-3 py-3 backdrop-blur-[2px] sm:px-4 sm:py-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-bright">
            {slide.dateLabel}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-white sm:text-[15px]">
            <Link href={`/news/${slide.slug}`} className="hover:underline">
              {slide.excerpt}
            </Link>
          </p>
        </div>

        <div className="mt-3 flex gap-1.5" aria-hidden>
          {slides.map((_, i) => (
            <span
              key={i}
              className="relative h-[2px] flex-1 overflow-hidden bg-white/25"
            >
              <span
                key={i === index ? progressKey : `idle-${i}`}
                className={`absolute inset-y-0 left-0 bg-gold ${
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
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
