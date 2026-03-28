"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { blogCarouselBreakout } from "./greater-noida-homes-carousel";

export type ThreeBhkDetailCard = {
  href: string;
  name: string;
  subtitle: string;
  heroImage: string;
  carouselCta: string;
  reraId?: string;
  priceRange: string[];
  nearbyBullets: string[];
  features: string[];
  projectCtaLine: string;
};

function propertyAnchorId(href: string) {
  const last = href.split("/").filter(Boolean).pop() ?? "project";
  return last.replace(/[^a-zA-Z0-9-]/g, "");
}

function CardBulletList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul
      className={`list-disc space-y-1.5 pl-5 mt-1 marker:text-[#CBB27A] leading-relaxed text-sm md:text-[0.9375rem] ${className}`}
    >
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

const arrowBtnOverlayClass =
  "pointer-events-auto z-30 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white shadow-md backdrop-blur-sm transition hover:border-[#CBB27A]/60 hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 md:h-7 md:w-7";

/** Snap spacers use [scroll-snap-align:none]; only real slides are <article>. */
function detailStripArticles(el: HTMLDivElement): HTMLElement[] {
  return Array.from(el.querySelectorAll<HTMLElement>(":scope > article"));
}

function centerScrollOnArticle(el: HTMLDivElement, article: HTMLElement) {
  const left = article.offsetLeft + article.offsetWidth / 2 - el.clientWidth / 2;
  el.scrollLeft = Math.max(0, left);
}

export function ThreeBhkDetailCardsCarousel({ cards }: { cards: ThreeBhkDetailCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = detailStripArticles(el);
    if (slides.length === 0) return;
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    slides.forEach((a, i) => {
      const cardCenter = a.offsetLeft + a.offsetWidth / 2;
      const dist = Math.abs(viewportCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActive(Math.min(closest, cards.length - 1));
  }, [cards.length]);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = detailStripArticles(el);
    if (slides.length === 0) return;
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let idx = 0;
    let minDist = Infinity;
    slides.forEach((a, i) => {
      const c = a.offsetLeft + a.offsetWidth / 2;
      const d = Math.abs(viewportCenter - c);
      if (d < minDist) {
        minDist = d;
        idx = i;
      }
    });
    const nextIdx = Math.min(Math.max(0, idx + direction), slides.length - 1);
    const target = slides[nextIdx];
    const left = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || cards.length === 0) return;
    const slides = detailStripArticles(el);
    if (slides.length === 0) return;
    centerScrollOnArticle(el, slides[0]);
    syncActive();
  }, [cards.length, syncActive]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => syncActive());
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncActive]);

  return (
    <div className={blogCarouselBreakout}>
      {/* Arrows use top-1/2 of this wrapper only so they align with the card strip, not the counter below. */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={syncActive}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-pl-6 scroll-pr-6 px-0 pb-2 pt-0 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:pb-3 sm:pt-1 md:scroll-pl-8 md:scroll-pr-8 md:gap-6 md:pb-3 md:pt-1 lg:scroll-pl-10 lg:scroll-pr-10 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none shrink-0 [scroll-snap-align:none] w-[max(0.75rem,calc((100%-min(42rem,min(100%,calc(100dvw-5.25rem))))/2))] md:w-[max(0px,calc((100%-min(38rem,calc(100%-4rem)))/2))] lg:w-[max(0px,calc((100%-min(36rem,calc(100%-5rem)))/2))]"
          />
          {cards.map((p) => (
            <article
              key={p.href}
              id={propertyAnchorId(p.href)}
              className="box-border w-[min(42rem,min(100%,calc(100dvw-5.25rem)))] shrink-0 grow-0 flex-none scroll-mt-24 snap-center snap-always md:w-[min(38rem,calc(100%-4rem))] lg:w-[min(36rem,calc(100%-5rem))]"
            >
              <div className="relative flex h-[min(45rem,94dvh)] max-h-[94dvh] flex-col overflow-hidden rounded-xl border border-white/15 shadow-2xl ring-1 ring-black/10 sm:h-[40.5rem] sm:max-h-none sm:rounded-2xl md:h-[43.5rem]">
                <Link
                  href={p.href}
                  className="group relative flex h-full flex-col text-left text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#CBB27A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded-2xl"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={p.heroImage}
                      alt=""
                      fill
                      className="pointer-events-none object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 896px"
                      unoptimized={p.heroImage.includes("r2.dev")}
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/72 to-black/88 md:from-black/75 md:via-black/68 md:to-black/85"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full cursor-pointer flex-col px-3.5 py-3.5 sm:px-5 sm:py-5 md:p-6">
                    <div className="shrink-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#CBB27A] sm:text-xs sm:mb-1.5 mb-1">
                        {p.subtitle}
                      </p>
                      <h3 className="text-base font-semibold leading-snug text-white sm:text-lg sm:mb-3 md:text-2xl mb-2 font-poppins drop-shadow-sm transition-colors group-hover:text-[#CBB27A] break-words">
                        {p.name}
                        {p.reraId ? (
                          <span className="block text-[0.85em] font-medium text-white/90 sm:inline sm:text-[1em]">
                            {" "}
                            | {p.reraId}
                          </span>
                        ) : null}
                      </h3>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col justify-start py-0.5 sm:py-1">
                      <dl className="space-y-2.5 text-[0.8125rem] leading-snug text-white/90 sm:space-y-3 sm:text-sm md:text-[0.9375rem] md:leading-normal">
                        <div>
                          <dt className="font-semibold text-[#CBB27A]">Price range</dt>
                          <dd>
                            <CardBulletList items={p.priceRange} className="text-white/90 text-[0.8125rem] sm:text-sm" />
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#CBB27A]">Nearby &amp; connectivity</dt>
                          <dd>
                            <CardBulletList items={p.nearbyBullets} className="text-white/90 text-[0.8125rem] sm:text-sm" />
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#CBB27A]">Key features</dt>
                          <dd className="mt-0.5 sm:mt-1">
                            <ul className="list-disc space-y-1 pl-4 marker:text-[#CBB27A] text-[0.8125rem] leading-snug text-white/90 sm:space-y-1.5 sm:pl-5 sm:text-sm md:text-[0.9375rem] md:leading-relaxed">
                              {p.features.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-3 border-l-[3px] border-[#CBB27A] pl-2.5 text-[0.8125rem] font-medium leading-snug text-white sm:mt-4 sm:pl-3 sm:text-sm md:text-[0.9375rem] md:leading-relaxed">
                        {p.projectCtaLine}
                      </p>
                    </div>
                    <div className="mt-auto shrink-0 pt-3 sm:pt-4 md:pt-5">
                      <div className="flex justify-stretch sm:justify-end">
                        <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#CBB27A] px-4 py-2.5 text-xs font-semibold text-[#0f1112] shadow-md shadow-black/25 ring-1 ring-white/10 transition-colors group-hover:bg-[#d4c48a] group-hover:shadow-lg group-hover:shadow-black/30 sm:w-auto sm:px-5 sm:text-sm">
                          Open {p.name} <ArrowRight className="size-3.5 shrink-0 sm:size-4" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </article>
          ))}
          <div
            aria-hidden
            className="pointer-events-none shrink-0 [scroll-snap-align:none] w-[max(0.75rem,calc((100%-min(42rem,min(100%,calc(100dvw-5.25rem))))/2))] md:w-[max(0px,calc((100%-min(38rem,calc(100%-4rem)))/2))] lg:w-[max(0px,calc((100%-min(36rem,calc(100%-5rem)))/2))]"
          />
        </div>
        {/* After scroll strip in DOM so arrows sit above the track and stay tappable on mobile */}
        <button
          type="button"
          className={`${arrowBtnOverlayClass} absolute left-0 top-1/2 -translate-x-2.5 -translate-y-1/2 sm:left-1 sm:-translate-x-3 md:left-3 md:-translate-x-3.5`}
          aria-label="Previous project"
          onClick={() => scroll(-1)}
        >
          <ChevronLeft className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>
        <button
          type="button"
          className={`${arrowBtnOverlayClass} absolute right-0 top-1/2 translate-x-2.5 -translate-y-1/2 sm:right-1 sm:translate-x-3 md:right-3 md:translate-x-3.5`}
          aria-label="Next project"
          onClick={() => scroll(1)}
        >
          <ChevronRight className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>
      </div>

      <p className="mt-4 text-center text-xs font-medium text-gray-500" aria-live="polite">
        {active + 1} of {cards.length}
        <span className="sr-only"> projects</span>
      </p>
    </div>
  );
}
