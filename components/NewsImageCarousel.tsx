"use client";

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
  const caption = (() => {
    const explicit = slide.caption?.trim();
    if (explicit) return explicit;
    const alt = slide.alt?.trim() || "";
    if (!alt || /^embassy photograph$/i.test(alt)) return "";
    if (/\.(jpe?g|png|webp|gif|heic)$/i.test(alt)) return "";
    if (/^(img|dsc|photo|image|screenshot)[\s_-]?\d+/i.test(alt)) return "";
    return alt;
  })();

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

      {/* Frame hugs the photo — no fixed min-height letterbox */}
      <figure className="m-0 bg-[#eef1f5]">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={i === index ? "block" : "hidden"}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="mx-auto block h-auto max-h-[min(75vh,44rem)] w-auto max-w-full"
            />
          </div>
        ))}
        {caption ? (
          <figcaption className="border-t border-line bg-white px-4 py-3 text-sm leading-relaxed text-muted sm:px-5">
            {caption}
          </figcaption>
        ) : null}
      </figure>

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
