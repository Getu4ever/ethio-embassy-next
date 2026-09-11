"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { searchSite } from "@/lib/content/search-index";

export default function HeaderSearch({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const results = searchSite(query);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#dbbf8a] hover:text-[#dbbf8a]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close search" : "Search the site"}
        onClick={() => {
          setOpen((v) => !v);
          if (open) setQuery("");
        }}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          role="search"
          className={`absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-[min(92vw,22rem)] border border-white/10 p-3 shadow-2xl sm:w-[24rem] ${
            scrolled ? "bg-[#006699]" : "bg-[#0B2545]"
          }`}
        >
          <label htmlFor={`${panelId}-input`} className="sr-only">
            Search
          </label>
          <div className="flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-2.5">
            <svg
              className="h-4 w-4 shrink-0 text-[#dbbf8a]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              id={`${panelId}-input`}
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, services…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </div>

          <div className="mt-3 max-h-72 overflow-y-auto">
            {!query.trim() ? (
              <p className="px-1 py-2 text-xs leading-relaxed text-white/55">
                Try “passport”, “visa”, “ambassador”, or “investment”.
              </p>
            ) : results.length === 0 ? (
              <p className="px-1 py-2 text-xs text-white/55">
                No matching pages. Try a shorter keyword.
              </p>
            ) : (
              <ul className="space-y-0.5">
                {results.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-2 py-2.5 transition hover:bg-white/10"
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="block text-sm font-medium text-white">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-white/60">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
