"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type GreaterNoidaCarouselCard = {
  href: string;
  name: string;
  subtitle: string;
  heroImage: string;
  carouselCta: string;
};

/** Breaks out of article padding to span the card; inner `px-*` keeps the strip slightly off the side borders. */
export const blogCarouselBreakout =
  "relative -mx-6 w-[calc(100%+3rem)] max-w-none px-2 sm:px-3 sm:-mx-8 sm:w-[calc(100%+4rem)] md:-mx-10 md:w-[calc(100%+5rem)] lg:-mx-12 lg:w-[calc(100%+6rem)] lg:px-4";

const arrowBtnClass =
  "pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-[#0f1112] shadow-lg backdrop-blur-[2px] transition hover:border-[#CBB27A] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A] focus-visible:ring-offset-2 active:scale-95";

export function GreaterNoidaHomesCarousel({ cards }: { cards: GreaterNoidaCarouselCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"));
    if (slides.length === 0) return;

    const centerMode = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

    if (centerMode) {
      const viewportCenter = el.scrollLeft + el.clientWidth / 2;
      let idx = 0;
      let minD = Infinity;
      slides.forEach((a, i) => {
        const cc = a.offsetLeft + a.offsetWidth / 2;
        const d = Math.abs(viewportCenter - cc);
        if (d < minD) {
          minD = d;
          idx = i;
        }
      });
      const nextIdx = Math.min(Math.max(0, idx + direction), slides.length - 1);
      const target = slides[nextIdx];
      const left = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2;
      el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      return;
    }

    const first = slides[0];
    const second = slides[1];
    const gap =
      first && second ? Math.max(0, second.offsetLeft - first.offsetLeft - first.offsetWidth) : 16;
    const step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : first
          ? first.offsetWidth + gap
          : Math.max(240, el.clientWidth * 0.72);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || cards.length === 0) return;
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches) return;
    const slides = el.querySelectorAll<HTMLElement>("[data-carousel-card]");
    if (slides.length === 0) return;
    const first = slides[0];
    el.scrollLeft = Math.max(0, first.offsetLeft + first.offsetWidth / 2 - el.clientWidth / 2);
  }, [cards.length]);

  return (
    <section
      className="mb-14 scroll-mt-24"
      id="browse-3bhk-carousel"
      aria-label="Top 3 BHK flats in Greater Noida, handpicked projects carousel"
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
        <span className="w-1 h-7 bg-[#CBB27A] rounded-full shrink-0" />
        Top 3BHK Flats in Greater Noida – Handpicked Projects
      </h2>
      <p className="text-gray-600 text-sm md:text-base mb-5 leading-relaxed">
        Explore premium 3 BHK apartments across high-demand sectors including Greater Noida West, Sector 150, and
        Techzone 4. Compare pricing, layouts, and location advantages before booking a site visit.
      </p>
      <div className={blogCarouselBreakout}>
        <button
          type="button"
          className={`${arrowBtnClass} absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-3`}
          aria-label="Scroll to previous projects"
          onClick={() => scroll(-1)}
        >
          <ChevronLeft className="size-5" strokeWidth={2.25} aria-hidden />
        </button>
        <button
          type="button"
          className={`${arrowBtnClass} absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-3`}
          aria-label="Scroll to next projects"
          onClick={() => scroll(1)}
        >
          <ChevronRight className="size-5" strokeWidth={2.25} aria-hidden />
        </button>
        <div
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scroll-pl-5 scroll-pr-5 px-0 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:scroll-p-0 sm:px-11 sm:pb-3 sm:pt-1 md:px-12 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none shrink-0 [scroll-snap-align:none] w-[max(0.5rem,calc((100%-min(100%,17.5rem,calc(100dvw-5rem)))/2))] sm:hidden"
          />
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              data-carousel-card
              aria-label={`${card.name}: ${card.carouselCta}`}
              className="group relative block h-[min(62vw,320px)] w-[min(17.5rem,calc(100dvw-5rem),100%)] shrink-0 snap-center snap-always overflow-hidden rounded-2xl border border-white/20 shadow-xl ring-1 ring-black/10 transition-all hover:border-[#CBB27A]/50 hover:shadow-2xl hover:ring-[#CBB27A]/20 cursor-pointer sm:h-[400px] sm:w-[min(42vw,280px)] sm:snap-start md:w-[280px]"
            >
              <Image
                src={card.heroImage}
                alt=""
                fill
                sizes="(max-width: 639px) 75vw, 280px"
                unoptimized={card.heroImage.includes("r2.dev")}
                className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/25"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 pt-12">
                <p className="text-lg font-bold leading-tight text-white font-poppins drop-shadow-sm group-hover:text-[#CBB27A] transition-colors">
                  {card.name}
                </p>
                <p className="mt-1 text-xs font-medium text-white/85">{card.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#CBB27A] drop-shadow">
                  {card.carouselCta} <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
          <div
            aria-hidden
            className="pointer-events-none shrink-0 [scroll-snap-align:none] w-[max(0.5rem,calc((100%-min(100%,17.5rem,calc(100dvw-5rem)))/2))] sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}
