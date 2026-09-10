"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { newsItems } from "@/lib/content/site";

const slides = newsItems.filter(
  (item) => item.slug !== "consular-announcement",
);

export default function NewsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[index];
  const go = (next: number) => {
    setIndex((current) => (current + next + slides.length) % slides.length);
  };

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-navy sm:min-h-[360px] lg:min-h-[420px]">
      {slides.map((item, i) => (
        <div
          key={item.slug}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        ›
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-black/55 px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
          {slide.dateLabel}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white sm:text-[15px]">
          <Link href={`/news/${slide.slug}`} className="hover:underline">
            {slide.excerpt}
          </Link>
        </p>
      </div>
    </div>
  );
}
