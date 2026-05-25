"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export type DemoGallerySlide = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

type GalleryTheme = "light" | "dark";

export function SobhaRivanaGallery({
  slides,
  theme = "light",
  fillParent = false,
  bare = false,
  cinema = false,
  fullscreenHero = false,
  className = "",
}: {
  slides: DemoGallerySlide[];
  theme?: GalleryTheme;
  fillParent?: boolean;
  /** No outer card padding/border — parent supplies frame (e.g. black hero box). */
  bare?: boolean;
  /** Property-page style: black stage, fixed heights, object-contain. */
  cinema?: boolean;
  /** Edge-to-edge viewport hero: parent must be `relative` with defined height (e.g. min-h-svh). */
  fullscreenHero?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const safe = slides.length ? slides : [];
  const current = safe[index] ?? safe[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!safe.length) return;
      setIndex((i) => (i + dir + safe.length) % safe.length);
    },
    [safe.length]
  );

  useEffect(() => {
    if (safe.length <= 1) return;
    const t = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(t);
  }, [go, safe.length]);

  if (!current) return null;

  const isLight = theme === "light";
  const shell = fullscreenHero
    ? `absolute inset-0 h-full w-full ${className}`.trim()
    : bare
      ? `h-full min-h-0 flex flex-col ${className}`.trim()
      : cinema
        ? `overflow-hidden rounded-2xl bg-black shadow-2xl md:rounded-3xl ${className}`.trim()
        : isLight
          ? `rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:p-4 ${className}`.trim()
          : `rounded-2xl border border-white/10 bg-[#0c0e12] p-3 sm:p-4 ${className}`.trim();

  const frame = fullscreenHero
    ? "absolute inset-0 h-full w-full overflow-hidden"
    : cinema
      ? "relative h-[280px] w-full overflow-hidden sm:h-[380px] md:h-[480px] lg:h-[560px]"
      : fillParent
        ? "relative min-h-[200px] w-full flex-1 overflow-hidden rounded-xl ring-1 ring-black/5"
        : "relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/5";

  const controlsOnDark = fullscreenHero || cinema || theme === "dark";

  const imgClass = cinema && !fullscreenHero ? "object-contain" : "object-cover";

  return (
    <div
      className={`${shell} ${fillParent && !cinema && !fullscreenHero ? "flex min-h-0 flex-col" : ""}`.trim()}
    >
      <div className={frame}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className={imgClass}
          sizes={
            fullscreenHero
              ? "100vw"
              : cinema
                ? "(max-width: 1024px) 100vw, 896px"
                : fillParent
                  ? "(max-width: 1024px) 100vw, 58vw"
                  : "(max-width: 1024px) 100vw, 896px"
          }
          priority={index === 0}
          unoptimized={current.src.endsWith(".avif") || current.src.includes("r2.dev")}
        />
        <div
          className={
            fullscreenHero
              ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"
              : cinema || theme === "dark"
                ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                : "pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent"
          }
        />
        {!fullscreenHero ? (
          <p
            className="pointer-events-none absolute bottom-3 left-4 right-4 text-sm font-medium text-white drop-shadow-md sm:bottom-4 sm:left-5"
          >
            {current.label}
          </p>
        ) : null}
        {safe.length > 1 ? (
          <div
            className={`absolute right-1 top-1/2 z-10 flex -translate-y-1/2 scale-[0.72] flex-col items-center gap-0 rounded-full px-px py-0.5 shadow-sm backdrop-blur-sm sm:right-2 sm:scale-100 sm:gap-px sm:px-0.5 sm:py-0.5 ${
              controlsOnDark
                ? "bg-black/40 ring-1 ring-white/12"
                : "bg-white/90 ring-1 ring-gray-200/70"
            }`}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] sm:h-[18px] sm:w-[18px] ${
                controlsOnDark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              aria-label="Previous image"
            >
              <ChevronUp className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" strokeWidth={2} aria-hidden />
            </button>
            <div className="flex max-h-[3rem] flex-col flex-nowrap items-center gap-[2px] overflow-y-auto px-px py-px [scrollbar-width:none] sm:max-h-none sm:max-w-[4rem] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-px [&::-webkit-scrollbar]:hidden">
              {safe.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-[2px] min-h-[2px] min-w-[2px] rounded-full transition-all focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] sm:h-[3px] sm:min-h-[3px] sm:min-w-[3px] ${
                    i === index
                      ? controlsOnDark
                        ? "w-1.5 bg-white sm:w-2"
                        : "w-1.5 bg-gray-900 sm:w-2"
                      : controlsOnDark
                        ? "w-[2px] bg-white/35 hover:bg-white/55 sm:w-[3px]"
                        : "w-[2px] bg-gray-300 hover:bg-gray-500 sm:w-[3px]"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] sm:h-[18px] sm:w-[18px] ${
                controlsOnDark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              aria-label="Next image"
            >
              <ChevronDown className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
      {safe.length > 1 ? (
        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {safe.length}: {current.label}
        </p>
      ) : null}
    </div>
  );
}
