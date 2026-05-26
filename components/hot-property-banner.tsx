"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { HOT_PROPERTY_PROMO, type HotPropertyPromo } from "@/lib/hot-property-promos";
import { cn } from "@/lib/utils";

function PromoCta({ promo, className }: { promo: HotPropertyPromo; className?: string }) {
  const baseClass = cn(
    "relative z-10 inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#23262A]/20 bg-[#23262A] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#FAFAF8] transition-all duration-200 ease-out hover:scale-105 hover:border-[#23262A]/40 hover:bg-[#1a1d21] active:scale-100 sm:gap-1 sm:px-3 sm:text-xs",
    className
  );

  if (promo.action.type === "link") {
    return (
      <Link href={promo.action.href} className={baseClass}>
        {promo.ctaLabel}
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    );
  }

  if (promo.action.type === "consultation") {
    return (
      <button
        type="button"
        className={baseClass}
        onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))}
      >
        {promo.ctaLabel}
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      </button>
    );
  }

  return (
    <Link href="/contact" className={baseClass}>
      {promo.ctaLabel}
      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  );
}

export function HotPropertyBanner() {
  const promo = HOT_PROPERTY_PROMO;
  const ticker = promo.marqueeText;

  useEffect(() => {
    document.documentElement.setAttribute("data-promo-banner", "true");
    return () => document.documentElement.removeAttribute("data-promo-banner");
  }, []);

  return (
    <div
      className="hot-property-banner relative z-10 overflow-hidden bg-gradient-to-r from-[#B8A068] via-[#CBB27A] to-[#B39A6A]"
      role="region"
      aria-label="Featured property highlight"
    >
      <div className="hot-property-banner-shimmer pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative flex h-9 w-full items-stretch px-2 sm:h-10 sm:px-4 md:px-6 lg:px-10">
        <div className="hidden w-[5.75rem] shrink-0 items-center sm:flex">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 shrink-0 text-[#1a1510]" strokeWidth={2.25} aria-hidden />
            <span
              className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1a1510] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-xs"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {promo.badgeLabel}
            </span>
          </div>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden pl-1 sm:ml-1 sm:px-2">
          <div className="hot-property-marquee flex h-full items-center" aria-hidden>
            <div className="hot-property-marquee-track">
              <span className="hot-property-marquee-item">{ticker}</span>
              <span className="hot-property-marquee-item">{ticker}</span>
            </div>
          </div>
          <p className="sr-only">{ticker}</p>
        </div>

        <div className="flex shrink-0 items-center pl-1 sm:pl-2">
          <PromoCta promo={promo} />
        </div>
      </div>
    </div>
  );
}
