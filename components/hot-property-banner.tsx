"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  HOT_PROPERTY_ANNOUNCEMENTS,
  HOT_PROPERTY_BADGE_LABEL,
  HOT_PROPERTY_CTA_LABEL,
  HOT_PROPERTY_PROJECT_LINKS,
} from "@/lib/hot-property-promos";
import { cn } from "@/lib/utils";

function TickerSequence({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {HOT_PROPERTY_ANNOUNCEMENTS.map((announcement, index) => (
        <span key={`${keyPrefix}-${index}`} className="hot-property-marquee-segment">
          <span className="hot-property-marquee-item">{announcement}</span>
          <span className="hot-property-marquee-separator" aria-hidden>
            <span className="hot-property-marquee-separator-bar" />
          </span>
        </span>
      ))}
    </>
  );
}

function ProjectLinksDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className={cn(
          "hot-property-promo-cta relative z-10 inline-flex h-6 shrink-0 items-center gap-0.5 rounded-full border border-[#23262A]/20 bg-[#23262A] px-2.5 py-0 text-[10px] font-semibold uppercase leading-none tracking-wide text-[#FAFAF8] transition-all duration-200 ease-out hover:scale-105 hover:border-[#23262A]/40 hover:bg-[#1a1d21] active:scale-100 sm:h-7 sm:gap-1 sm:px-3 sm:text-xs"
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        {HOT_PROPERTY_CTA_LABEL}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+0.35rem)] z-[80] w-64 overflow-hidden rounded-xl border border-white/10 bg-[#0f1112] shadow-2xl sm:w-72"
            role="menu"
            aria-label="Featured project pages"
          >
            <div className="border-b border-white/10 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#CBB27A]">
                Featured projects
              </p>
            </div>
            <ul className="max-h-[min(70vh,22rem)] overflow-y-auto py-1">
              {HOT_PROPERTY_PROJECT_LINKS.map((project) => (
                <li key={project.href}>
                  <Link
                    href={project.href}
                    role="menuitem"
                    className="block px-3 py-2.5 transition-colors hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="block text-sm font-medium text-white font-poppins">
                      {project.label}
                    </span>
                    {project.location ? (
                      <span className="mt-0.5 block text-[11px] text-white/55 font-poppins">
                        {project.location}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HotPropertyBanner() {
  useEffect(() => {
    document.documentElement.setAttribute("data-promo-banner", "true");
    return () => document.documentElement.removeAttribute("data-promo-banner");
  }, []);

  return (
    <div
      className="hot-property-banner relative z-10 overflow-visible bg-gradient-to-r from-[#B8A068] via-[#CBB27A] to-[#B39A6A]"
      role="region"
      aria-label="Site announcements"
    >
      <div className="hot-property-banner-shimmer pointer-events-none absolute inset-0 overflow-hidden rounded-none" aria-hidden />

      <div className="relative flex h-9 w-full items-stretch overflow-visible px-2 sm:h-10 sm:px-4 md:px-6 lg:px-10">
        <div className="hidden w-[5.75rem] shrink-0 items-center sm:flex">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 shrink-0 text-[#1a1510]" strokeWidth={2.25} aria-hidden />
            <span
              className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1a1510] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-xs"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {HOT_PROPERTY_BADGE_LABEL}
            </span>
          </div>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden pl-1 sm:ml-1 sm:px-2">
          <div className="hot-property-marquee flex h-full items-center" aria-hidden>
            <div className="hot-property-marquee-track">
              <TickerSequence keyPrefix="a" />
              <TickerSequence keyPrefix="b" />
            </div>
          </div>
          <p className="sr-only">{HOT_PROPERTY_ANNOUNCEMENTS.join(". ")}</p>
        </div>

        <div className="relative z-20 flex shrink-0 items-center pl-1 sm:pl-2">
          <ProjectLinksDropdown />
        </div>
      </div>
    </div>
  );
}
