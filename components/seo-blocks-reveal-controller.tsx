"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const EASE_OUT_SMOOTH = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EXPAND_DURATION_MS = 550;
const OPACITY_DELAY_MS = 80;

interface SeoBlocksRevealControllerProps {
  children: React.ReactNode;
  /** Number of blocks to show initially */
  initialVisible?: number;
  /** Number of blocks to reveal per "Read more" click */
  step?: number;
  /** Total number of blocks (must match children [data-seo-block] count) */
  totalCount: number;
  className?: string;
}

/**
 * Wraps server-rendered SEO block elements. Only receives counts (no block content),
 * so no Supabase data is serialized into the client payload. Controls visibility
 * of children with [data-seo-block] via DOM + inline styles.
 */
export function SeoBlocksRevealController({
  children,
  initialVisible = 2,
  step = 2,
  totalCount,
  className = "",
}: SeoBlocksRevealControllerProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const blocks = container.querySelectorAll<HTMLElement>("[data-seo-block]");
    const duration = prefersReducedMotion ? "0.01ms" : `${EXPAND_DURATION_MS}ms`;
    const transition = prefersReducedMotion
      ? "none"
      : `max-height ${duration} ${EASE_OUT_SMOOTH}, opacity ${duration} ${EASE_OUT_SMOOTH} ${OPACITY_DELAY_MS}ms, margin 0.35s ease-out, padding 0.35s ease-out`;

    blocks.forEach((el, index) => {
      const show = index < visibleCount;
      el.style.transition = transition;
      el.style.maxHeight = show ? "5000px" : "0px";
      el.style.overflow = "hidden";
      el.style.opacity = show ? "1" : "0";
      el.style.marginTop = show ? "" : "0";
      el.style.marginBottom = show ? "" : "0";
      el.style.paddingTop = show ? "" : "0";
      el.style.paddingBottom = show ? "" : "0";
    });

    // Hide separators that appear before unrevealed blocks (only show lines between visible blocks)
    const separators = container.querySelectorAll<HTMLElement>("[data-seo-separator]");
    separators.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-seo-separator") ?? "-1", 10);
      const hide = idx >= visibleCount - 1;
      el.style.transition = transition;
      el.style.maxHeight = hide ? "0px" : "200px";
      el.style.overflow = "hidden";
      el.style.opacity = hide ? "0" : "1";
      el.style.marginTop = hide ? "0" : "";
      el.style.marginBottom = hide ? "0" : "";
      el.style.paddingTop = hide ? "0" : "";
      el.style.paddingBottom = hide ? "0" : "";
    });
  }, [visibleCount, prefersReducedMotion, totalCount]);

  const showReveal = totalCount > initialVisible;
  const hasMore = visibleCount < totalCount;
  const canCollapse = visibleCount > initialVisible;

  const showMore = () => setVisibleCount((prev) => Math.min(prev + step, totalCount));

  /** Collapse and scroll user back to top of this section so they don't feel lost */
  const showLess = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setVisibleCount(initialVisible);
  };

  return (
    <>
    <section
      ref={sectionRef}
      className={`relative py-14 md:py-20 bg-background px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      aria-label="SEO content blocks"
    >
      <div className="max-w-[1200px] mx-auto space-y-10 md:space-y-12">
        {children}
      </div>

      {showReveal && (
        <div className="relative mt-10 md:mt-14 w-full flex flex-col items-center">
          {hasMore && (
            <>
              <div
                className="absolute bottom-full left-0 right-0 h-28 md:h-40 pointer-events-none transition-opacity duration-300 ease-out"
                style={{
                  opacity: 1,
                  background:
                    "linear-gradient(to top, var(--background) 0%, var(--background) 45%, transparent 100%)",
                  filter: "blur(8px)",
                  WebkitFilter: "blur(8px)",
                }}
              />
              <div
                className="absolute bottom-full left-0 right-0 h-24 md:h-36 pointer-events-none transition-opacity duration-300 ease-out"
                style={{
                  opacity: 1,
                  background:
                    "linear-gradient(to top, var(--background) 0%, var(--background) 35%, transparent 100%)",
                }}
              />
            </>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {hasMore && (
              <button
                type="button"
                onClick={showMore}
                className="group relative flex flex-col items-center gap-3 py-4 px-6 text-base md:text-lg font-bold text-[#CBB27A] font-poppins uppercase tracking-widest bg-transparent border-0 cursor-pointer select-none touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-[color,transform] duration-300 ease-out hover:text-[#b89b5e] hover:scale-[1.02] active:scale-[0.98]"
                aria-label={`Show ${Math.min(step, totalCount - visibleCount)} more sections`}
              >
                Read more
                <div className="flex flex-col items-center gap-2" aria-hidden>
                  <ChevronDown className="w-6 h-6 text-[#CBB27A] transition-transform duration-300 ease-out group-hover:translate-y-1" style={{ transitionDelay: prefersReducedMotion ? "0ms" : "0ms" }} />
                  <ChevronDown className="w-5 h-5 text-[#CBB27A]/80 transition-transform duration-300 ease-out group-hover:translate-y-1" style={{ transitionDelay: prefersReducedMotion ? "0ms" : "50ms" }} />
                  <ChevronDown className="w-4 h-4 text-[#CBB27A]/60 transition-transform duration-300 ease-out group-hover:translate-y-1" style={{ transitionDelay: prefersReducedMotion ? "0ms" : "100ms" }} />
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating "Close section" pill: visible when expanded, always in viewport for immediate exit */}
      {showReveal && canCollapse && (
        <div
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 animate-in fade-in duration-300"
          aria-hidden="false"
        >
          <button
            type="button"
            onClick={showLess}
            className="flex items-center gap-2 rounded-full border border-[#CBB27A]/40 bg-white/90 px-4 py-2.5 text-sm font-semibold text-[#CBB27A] shadow-lg backdrop-blur-md transition-colors hover:bg-[#CBB27A]/10 hover:text-[#b89b5e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A]/50 focus-visible:ring-offset-2"
            aria-label="Close section"
          >
            <ChevronUp className="h-4 w-4" />
            <span className="font-poppins uppercase tracking-wider">Close section</span>
          </button>
        </div>
      )}
    </section>
    </>
  );
}
