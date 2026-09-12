"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PRELOADER_STORAGE_KEY } from "@/lib/preloader";

const LOGO_SRC = "/images/logo-uk.png";
const DURATION_MS = 1600;
const EXIT_MS = 550;

function setPreloaderState(state: "pending" | "skip") {
  document.documentElement.dataset.preloader = state;
}

function shouldSkipPreloader(pathname: string): boolean {
  if (pathname.startsWith("/admin") || pathname.startsWith("/staff")) {
    return true;
  }
  if (typeof document !== "undefined") {
    if (document.documentElement.dataset.preloader === "skip") {
      return true;
    }
  }
  try {
    return sessionStorage.getItem(PRELOADER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function SitePreloader() {
  const pathname = usePathname();
  // Start visible so the first HTML paint covers the homepage (no post-hydration flash).
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    if (shouldSkipPreloader(pathname)) {
      setPreloaderState("skip");
      setVisible(false);
      return;
    }

    setPreloaderState("pending");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 400 : DURATION_MS;
    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const finish = () => {
      setExiting(true);
      exitTimer = window.setTimeout(() => {
        setPreloaderState("skip");
        setVisible(false);
        try {
          sessionStorage.setItem(PRELOADER_STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      }, reduceMotion ? 0 : EXIT_MS);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`site-preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071528] ${
        exiting ? "site-preloader--exit" : ""
      }`}
      aria-hidden={exiting}
      role="status"
      aria-live="polite"
      aria-label="Loading Embassy of Ethiopia website"
    >
      <div className="site-preloader__mark relative mb-8">
        <span
          className="absolute inset-[-10px] rounded-full bg-gradient-to-br from-[#dbbf8a] via-[#c5a572] to-[#8a7048] opacity-90"
          aria-hidden
        />
        <span className="relative flex overflow-hidden rounded-full bg-[#0B2545] p-2">
          <Image
            src={LOGO_SRC}
            alt=""
            width={120}
            height={120}
            priority
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
          />
        </span>
      </div>

      <p className="font-display text-sm font-semibold tracking-[0.28em] text-[#dbbf8a] uppercase">
        Embassy of Ethiopia
      </p>
      <p className="mt-2 text-xs tracking-[0.2em] text-white/55 uppercase">
        London
      </p>

      <div className="mt-10 h-[2px] w-44 overflow-hidden bg-white/15 sm:w-56">
        <div
          className="h-full bg-gradient-to-r from-[#c5a572] to-[#dbbf8a] transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
