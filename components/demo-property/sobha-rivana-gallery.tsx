"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  className = "",
}: {
  slides: DemoGallerySlide[];
  theme?: GalleryTheme;
  fillParent?: boolean;
  /** No outer card padding/border — parent supplies frame (e.g. black hero box). */
  bare?: boolean;
  /** Property-page style: black stage, fixed heights, object-contain. */
  cinema?: boolean;
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
  const shell = bare
    ? `h-full min-h-0 flex flex-col ${className}`.trim()
    : cinema
      ? `overflow-hidden rounded-2xl bg-black shadow-2xl md:rounded-3xl ${className}`.trim()
      : isLight
        ? `rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:p-4 ${className}`.trim()
        : `rounded-2xl border border-white/10 bg-[#0c0e12] p-3 sm:p-4 ${className}`.trim();

  const frame = cinema
    ? "relative h-[280px] w-full overflow-hidden sm:h-[380px] md:h-[480px] lg:h-[560px]"
    : fillParent
      ? "relative min-h-[200px] w-full flex-1 overflow-hidden rounded-xl ring-1 ring-black/5"
      : "relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-black/5";

  const navBtn =
    theme === "dark" || cinema
      ? "border-white/20 bg-black/50 text-white hover:bg-black/70 focus-visible:ring-[#CBB27A]"
      : "border-gray-200 bg-white/95 text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:ring-[#CBB27A]";

  const imgClass = cinema ? "object-contain" : "object-cover";

  return (
    <div
      className={`${shell} ${fillParent && !cinema ? "flex min-h-0 flex-col" : ""}`.trim()}
    >
      <div className={frame}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className={imgClass}
          sizes={
            cinema
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
            cinema || theme === "dark"
              ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
              : "pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent"
          }
        />
        <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-sm font-medium text-white drop-shadow-md sm:bottom-4 sm:left-5">
          {current.label}
        </p>
        {safe.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition focus-visible:outline focus-visible:ring-2 sm:left-4 sm:h-12 sm:w-12 md:h-14 md:w-14 ${navBtn}`}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition focus-visible:outline focus-visible:ring-2 sm:right-4 sm:h-12 sm:w-12 md:h-14 md:w-14 ${navBtn}`}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </button>
            <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm sm:right-4 sm:top-4">
              <span className="text-xs font-semibold text-white sm:text-sm">
                {index + 1} / {safe.length}
              </span>
            </div>
          </>
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
