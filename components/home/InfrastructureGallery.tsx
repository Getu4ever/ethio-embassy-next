"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const GALLERY = [
  {
    src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a88eec6.jpg",
    title: "Adwa Victory Memorial",
    tag: "Heritage",
    caption:
      "Adwa memorial architecture honouring Ethiopia’s historic victory and national unity.",
  },
  {
    src: "/legacy-site/images/hero-images/bole-corridor-2024-08-02-66ac9ba74dbd3.jpg",
    title: "Bole Corridor Expansion",
    tag: "Infrastructure",
    caption:
      "Modern corridor development transforming mobility and urban form in Addis Ababa.",
  },
  {
    src: "/legacy-site/images/hero-images/Dendi-750x394-1.png",
    title: "Lake Dendi Highlands",
    tag: "Landscape",
    caption:
      "Dendi’s highland waterscape — natural heritage at the heart of Ethiopia’s highlands.",
  },
] as const;

export default function InfrastructureGallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % GALLERY.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: number) => {
    setIndex((current) => (current + dir + GALLERY.length) % GALLERY.length);
  };

  // Show current + next two as a responsive card row (wraps on mobile)
  const visible = [0, 1, 2].map((offset) => GALLERY[(index + offset) % GALLERY.length]);

  return (
    <section className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a572]">
              Gallery
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#0B2545] sm:text-4xl">
              Modern Ethiopia Infrastructure &amp; Heritage
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              Landmark corridors, memorials, and highland landscapes shaping
              Ethiopia’s contemporary identity.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous gallery items"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-[#0B2545] transition hover:border-[#0B2545]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next gallery items"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-[#0B2545] transition hover:border-[#0B2545]"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article
              key={`${item.src}-${index}`}
              className="overflow-hidden border border-slate-200/80 bg-white shadow-[0_18px_40px_rgba(11,37,69,0.08)] transition hover:shadow-[0_22px_50px_rgba(11,37,69,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5a572]">
                  {item.tag}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#0B2545]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.caption}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {GALLERY.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Go to gallery set ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                i === index % GALLERY.length
                  ? "bg-[#0B2545]"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
