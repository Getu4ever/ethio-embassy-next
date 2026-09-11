"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "ethio-embassy-preloader-seen";
const LOGO_SRC = "/legacy-site/images/logo-uk-modified.png";

export default function SitePreloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // private mode — still show once this mount
    }

    setVisible(true);
    const start = performance.now();
    const duration = 1600;

    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }, 550);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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
