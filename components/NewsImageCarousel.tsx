"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

const INTERVAL_MS = 5000;

export default function NewsImageCarousel({
  images,
  label = "Photo gallery",
}: {
  images: Slide[];
  label?: string;
}) {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [images.length, index]);

  if (!images.length) return null;

  const go = (dir: number) => {
    setIndex((current) => (current + dir + images.length) % images.length);
    setProgressKey((k) => k + 1);
  };

  const slide = images[index]!;

  return (
    <div className="overflow-hidden border border-line bg-white shadow-[0_18px_40px_rgba(11,37,69,0.08)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {label}
          </p>
          <p className="mt-1 text-xs text-muted">
            {index + 1} / {images.length}
          </p>
        </div>
        {images.length > 1 ? (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center border border-line text-navy transition hover:border-navy hover:bg-canvas"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center border border-line text-navy transition hover:border-navy hover:bg-canvas"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-navy sm:aspect-[16/9]">
        {images.map((image, i) => {
          const active = i === index;
          return (
            <div
              key={image.src}
              className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                active
                  ? "z-[1] scale-100 opacity-100"
                  : "z-0 scale-[1.03] opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-transparent to-transparent" />
        {slide.caption || slide.alt ? (
          <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
            <p className="max-w-xl text-sm leading-relaxed text-white/90">
              {slide.caption || slide.alt}
            </p>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
          <div className="flex flex-1 gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setProgressKey((k) => k + 1);
                }}
                className="group relative h-1 flex-1 overflow-hidden bg-slate-200"
              >
                <span
                  key={i === index ? progressKey : `${image.src}-idle`}
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
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
