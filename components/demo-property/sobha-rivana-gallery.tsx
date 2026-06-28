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
  type?: "image" | "video";
  poster?: string;
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
    if (current?.type === "video") return;
    const t = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(t);
  }, [current?.type, go, safe.length]);

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

  const imgClass = "object-cover";

  return (
    <div
      className={`${shell} ${fillParent && !cinema && !fullscreenHero ? "flex min-h-0 flex-col" : ""}`.trim()}
    >
      <div className={frame}>
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            controls
            preload="metadata"
            className="h-full w-full bg-black object-contain"
          />
        ) : (
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
        )}
        <div
          className={
            fullscreenHero
              ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"
              : cinema || theme === "dark"
                ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                : "pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent"
          }
        />
        {!fullscreenHero && current.label ? (
          <p
            className="pointer-events-none absolute bottom-3 left-4 right-4 text-sm font-medium text-white drop-shadow-md sm:bottom-4 sm:left-5"
          >
            {current.label}
          </p>
        ) : null}
        {safe.length > 1 ? (
          <div
            className="pointer-events-auto absolute right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 sm:right-3"
            aria-label="Gallery controls"
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className={`gallery-control-btn flex items-center justify-center p-0 transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] ${
                controlsOnDark
                  ? "text-white/75 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Previous media"
            >
              <ChevronUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
            {fullscreenHero ? (
              <span
                className={`select-none text-[9px] font-medium tabular-nums leading-none tracking-wide sm:hidden ${
                  controlsOnDark ? "text-white/80" : "text-gray-700"
                }`}
              >
                {index + 1}/{safe.length}
              </span>
            ) : null}
            <div
              className={`flex flex-col items-center gap-2 py-0.5 ${
                fullscreenHero ? "hidden sm:flex" : "flex"
              }`}
              role="tablist"
              aria-label="Slide indicators"
            >
              {safe.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to media ${i + 1}`}
                  aria-selected={i === index}
                  className={`gallery-control-btn w-[2px] shrink-0 rounded-full p-0 transition-all duration-200 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] ${
                    i === index
                      ? controlsOnDark
                        ? "h-6 bg-white"
                        : "h-6 bg-gray-900"
                      : controlsOnDark
                        ? "h-3.5 bg-white/40 hover:bg-white/65"
                        : "h-3.5 bg-gray-400/80 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className={`gallery-control-btn flex items-center justify-center p-0 transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#CBB27A] ${
                controlsOnDark
                  ? "text-white/75 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Next media"
            >
              <ChevronDown className="h-5 w-5" strokeWidth={1.75} aria-hidden />
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
