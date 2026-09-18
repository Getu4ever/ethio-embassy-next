"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import HeaderSearch from "@/components/HeaderSearch";
import { primaryNav, type NavItem } from "@/lib/content/navigation";

const LOGO_SRC = "/images/Embassy-Ethiopia-logo-02.png";
const WORLD_MAP_SRC = "/images/world-map-header-v2.jpg";
const ETHIO_UK_SRC = "/images/ethio-uk-modified.png";
const LOGO_W = 406;
const LOGO_H = 273;

const menuItems: NavItem[] = primaryNav.filter(
  (item) => item.label !== "Contact Us",
);

function isActive(pathname: string, href: string): boolean {
  if (href === "#" || href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V21h13V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 21h16" strokeLinecap="round" />
      <path d="M6 21V5.5L12 3l6 2.5V21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01M9 17h.01M12 17h.01M15 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 6 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-6-3.8-9s1.3-6.2 3.8-9z" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 5 6v5.5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3z" strokeLinejoin="round" />
      <path d="M9.5 12.2 11.2 14l3.5-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.5 19M14 14.6c1.5-.4 3.2-.2 4.5 1.1.8.8 1.2 1.8 1.4 3.3" strokeLinecap="round" />
    </svg>
  );
}

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" strokeLinecap="round" />
    </svg>
  );
}

function IconLandmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function navIcon(label: string, className: string): ReactNode {
  switch (label) {
    case "About Us":
      return <IconBuilding className={className} />;
    case "About Ethiopia":
      return <IconGlobe className={className} />;
    case "Consular Services":
      return <IconShield className={className} />;
    case "Diaspora":
      return <IconUsers className={className} />;
    case "Investment":
      return <IconBriefcase className={className} />;
    case "GERD":
      return <IconLandmark className={className} />;
    default:
      return null;
  }
}

function DesktopDropdown({
  item,
  open,
  onOpen,
  onClose,
  scrolled,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  scrolled: boolean;
}) {
  const id = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, 200);
  };

  useEffect(() => () => clearCloseTimer(), []);

  // Cancel pending close whenever this menu is (re)opened by a sibling switch
  useEffect(() => {
    if (open) clearCloseTimer();
  }, [open]);

  return (
    <li
      className="relative flex h-14 items-stretch"
      onMouseEnter={() => {
        clearCloseTimer();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`inline-flex h-full items-center gap-1.5 whitespace-nowrap px-2.5 text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors xl:px-3 ${
          scrolled
            ? "text-white/95 hover:text-[#dbbf8a]"
            : "text-white/95 hover:text-white"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={() => {
          clearCloseTimer();
          onOpen();
        }}
      >
        {navIcon(item.label, "h-3.5 w-3.5 shrink-0 opacity-80")}
        {item.label}
        <svg
          className={`h-2.5 w-2.5 shrink-0 opacity-70 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M1.41.59 6 5.17 10.59.59 12 2l-6 6-6-6z" />
        </svg>
      </button>

      {/* Overlap trigger by 2px so the pointer never leaves the hover zone */}
      <ul
        id={id}
        role="menu"
        className={`absolute left-0 top-[calc(100%-2px)] z-[60] max-h-[min(70vh,28rem)] min-w-[17.5rem] overflow-y-auto overscroll-contain border border-white/10 py-1.5 shadow-xl transition-[opacity,visibility] duration-150 ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        } ${scrolled ? "bg-[#006699]" : "bg-[#0B2545]"} text-white`}
      >
        {item.children?.map((child) => (
          <li key={child.href} role="none">
            <Link
              role="menuitem"
              href={child.href}
              className="block px-4 py-2 text-sm leading-snug text-white/90 transition hover:bg-white/10 hover:text-[#dbbf8a]"
              onClick={onClose}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    // Hysteresis: compact only after scrolling further down, expand only near top.
    // Prevents sticky-header height changes from flipping scrollY across one threshold.
    const COMPACT_AT = 96;
    const EXPAND_AT = 12;

    const onScroll = () => {
      const y = window.scrollY;
      const next =
        scrolledRef.current
          ? y > EXPAND_AT
          : y >= COMPACT_AT;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const linkTone = "text-white/95 hover:text-[#dbbf8a]";

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full ${
        scrolled ? "shadow-[0_12px_40px_rgba(7,21,40,0.35)]" : ""
      }`}
    >
      {/* Tier 1 — world map brand bar */}
      <div
        className={`relative w-full overflow-hidden bg-[#0B2545] transition-[height] duration-200 ease-out ${
          scrolled
            ? "h-[5.25rem] sm:h-[5.75rem] md:h-[6.25rem]"
            : "h-[6.75rem] sm:h-[8rem] md:h-[8.75rem] lg:h-[9.25rem]"
        }`}
      >
        <div className="absolute inset-0">
          <Image
            src={WORLD_MAP_SRC}
            alt=""
            fill
            priority
            className="object-cover object-center brightness-[0.78] contrast-[1.06]"
            sizes="100vw"
          />
          {/* Soft side fades only — keep map clearly visible in the centre */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071528]/70 via-transparent to-[#071528]/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/25 via-transparent to-[#0B2545]/35"
            aria-hidden
          />
          {/* Soften the Ethiopia star flare without muting the map lines */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(7,21,40,0.42)_0%,rgba(7,21,40,0.18)_28%,transparent_58%)]"
            aria-hidden
          />
        </div>

        {/* True-centre wordmark — nudge up on mobile to clear the map star */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[4.75rem] sm:px-28 lg:px-40">
          <div
            className={`-translate-y-2 text-center transition-transform duration-200 ease-out sm:translate-y-0 ${
              scrolled ? "scale-[0.94]" : "scale-100"
            }`}
          >
            <p className="font-display text-[0.68rem] font-semibold leading-tight tracking-[0.12em] text-[#F5E6C8] uppercase sm:text-[0.95rem] sm:tracking-[0.16em] md:text-base md:tracking-[0.18em] lg:text-lg lg:tracking-[0.2em]">
              Embassy of Ethiopia
            </p>
            <p className="mt-1 font-display text-[0.62rem] font-medium tracking-[0.32em] text-[#dbbf8a] uppercase sm:mt-1 sm:text-[0.7rem] sm:tracking-[0.36em] md:text-xs md:tracking-[0.4em]">
              London
            </p>
            <span
              className="mx-auto mt-1.5 block h-px w-8 bg-gradient-to-r from-transparent via-[#c5a572] to-transparent sm:mt-2.5 sm:w-16"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-20 flex h-full w-full items-center justify-between gap-2 pl-3 pr-5 sm:gap-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Embassy of the Federal Democratic Republic of Ethiopia — London, UK"
            className={`group relative flex w-[3.4rem] shrink-0 items-center origin-left overflow-hidden transition-transform duration-200 ease-out will-change-transform sm:w-auto sm:overflow-visible ${
              scrolled ? "scale-[0.96]" : "scale-100"
            }`}
            onClick={closeAll}
          >
            <Image
              src={LOGO_SRC}
              alt=""
              width={LOGO_W}
              height={LOGO_H}
              priority
              className={`w-auto max-w-none object-contain object-left drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] transition-[height,filter] duration-200 group-hover:brightness-110 ${
                scrolled
                  ? "h-[3rem] sm:h-[4rem] md:h-[4.5rem]"
                  : "h-[3.35rem] sm:h-[5.25rem] md:h-[6rem] lg:h-[6.5rem]"
              }`}
            />
          </Link>

          <div
            className={`relative shrink-0 origin-right self-center transition-transform duration-200 ease-out will-change-transform ${
              scrolled ? "scale-[0.94]" : "scale-100"
            }`}
          >
            <Image
              src={ETHIO_UK_SRC}
              alt="Ethiopia and United Kingdom"
              width={282}
              height={282}
              className={`h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] ${
                scrolled
                  ? "w-8 sm:w-12 md:w-14"
                  : "w-9 sm:w-14 md:w-16 lg:w-[4.5rem]"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Tier 2 — menu row (scroll: deep teal glass, not white) */}
      <div
        className={
          scrolled
            ? "border-b border-white/10 bg-[#006699]/95 backdrop-blur-md"
            : "bg-[#0B2545]"
        }
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
          <nav className="hidden min-w-0 flex-1 lg:flex" aria-label="Primary">
            <ul className="flex w-full flex-nowrap items-center justify-center gap-0.5 xl:gap-1">
              <li>
                <Link
                  href="/"
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors xl:px-3 ${
                    pathname === "/"
                      ? "text-[#dbbf8a]"
                      : linkTone
                  }`}
                >
                  <IconHome className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  Home
                </Link>
              </li>
              {menuItems.map((item) =>
                item.children ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    open={openMenu === item.label}
                    onOpen={() => setOpenMenu(item.label)}
                    onClose={() =>
                      setOpenMenu((current) =>
                        current === item.label ? null : current,
                      )
                    }
                    scrolled={scrolled}
                  />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors xl:px-3 ${
                        isActive(pathname, item.href)
                          ? "text-[#dbbf8a]"
                          : linkTone
                      }`}
                    >
                      {navIcon(item.label, "h-3.5 w-3.5 shrink-0 opacity-80")}
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3 lg:ml-3">
            <HeaderSearch scrolled={scrolled} />
            <Link
              href="/contact-us"
              className="hidden whitespace-nowrap border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#dbbf8a] hover:text-[#dbbf8a] md:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/booking"
              className="hidden whitespace-nowrap bg-[#c5a572] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B2545] transition-colors hover:bg-[#dbbf8a] lg:inline-flex"
            >
              Book Appointment
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#dbbf8a] hover:text-[#dbbf8a] lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="flex h-3.5 w-4 flex-col justify-between" aria-hidden>
                <span
                  className={`block h-px w-full origin-center bg-current transition ${
                    mobileOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full origin-center bg-current transition ${
                    mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`border-t border-white/10 lg:hidden ${
            mobileOpen ? "block" : "hidden"
          } ${scrolled ? "bg-[#006699]" : "bg-[#0B2545]"}`}
        >
          <ul className="mx-auto max-h-[min(70dvh,32rem)] max-w-7xl space-y-0.5 overflow-y-auto overscroll-contain px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4">
            <li>
              <Link
                href="/"
                className="flex min-h-11 items-center gap-2 px-2 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                onClick={closeAll}
              >
                <IconHome className="h-4 w-4" />
                Home
              </Link>
            </li>
            {menuItems.map((item) => (
              <li key={item.label} className="border-t border-white/5">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center justify-between gap-2 px-2 py-3 text-left text-sm font-semibold uppercase tracking-wide text-white"
                      aria-expanded={openMenu === item.label}
                      onClick={() =>
                        setOpenMenu((c) =>
                          c === item.label ? null : item.label,
                        )
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {navIcon(item.label, "h-4 w-4 opacity-80")}
                        {item.label}
                      </span>
                      <span className="opacity-60">
                        {openMenu === item.label ? "−" : "+"}
                      </span>
                    </button>
                    {openMenu === item.label ? (
                      <ul className="mb-1.5 space-y-0 pb-0.5 pl-8">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm leading-snug text-white/75 hover:text-white"
                              onClick={closeAll}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center gap-2 px-2 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                    onClick={closeAll}
                  >
                    {navIcon(item.label, "h-4 w-4 opacity-80")}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="grid gap-2 border-t border-white/10 pt-3 sm:grid-cols-2">
              <Link
                href="/contact-us"
                className="block border border-white/30 px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white"
                onClick={closeAll}
              >
                Contact Us
              </Link>
              <Link
                href="/booking"
                className="block bg-[#c5a572] px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#0B2545]"
                onClick={closeAll}
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
