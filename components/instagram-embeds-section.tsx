"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function processInstagramEmbeds() {
  if (typeof window === "undefined") return
  const w = window as unknown as { instgrm?: { Embeds?: { process: () => void } } }
  w.instgrm?.Embeds?.process()
}

function reinitCarousel(api: CarouselApi | undefined) {
  if (!api) return
  requestAnimationFrame(() => {
    api.reInit()
  })
}

/** Instagram embed permalinks (posts + reels) — order matches site carousel */
const POSTS = [
  "https://www.instagram.com/p/DWTr-xrmN0e/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DUVDQ7xDo34/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DVqBtQpjZPX/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DWUJJs-j-9a/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DWEqsksD65r/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DWHGmIPDyvS/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DV7tAlxAFjr/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DVqBtQpjZPX/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DVM-jPdgP0X/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DU687mqD8vh/?utm_source=ig_embed&utm_campaign=loading",
] as const

function InstagramEmbedSlide({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] shadow-[0_10px_28px_rgba(2,6,23,0.06)]">
      <blockquote
        className="instagram-media m-0 w-full"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <div className="flex min-h-[320px] items-center justify-center p-6 md:min-h-[380px]">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="instagram-embed-fallback flex min-h-[280px] w-full max-w-none flex-col items-center justify-center gap-3 rounded-2xl border-2 border-[var(--sand)] bg-gradient-to-b from-[color:var(--paper)] to-[var(--sand-tint-light)]/30 text-center font-[Poppins] font-medium text-[var(--ink)] no-underline shadow-[0_8px_24px_rgba(203,178,122,0.15)] transition-all duration-300 hover:border-[var(--sand-tint-dark)] hover:shadow-[0_12px_32px_rgba(203,178,122,0.22)] md:min-h-[320px] md:max-w-[280px]"
          >
            <span className="w-14 h-14 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </span>
            <span className="text-sm uppercase tracking-widest text-[var(--sand)]">View on Instagram</span>
            <span className="text-xs text-[var(--graphite)]">Opens in new tab</span>
          </a>
        </div>
      </blockquote>
    </div>
  )
}

export function InstagramEmbedsSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>()
  const carouselApiRef = useRef<CarouselApi | undefined>(undefined)
  carouselApiRef.current = carouselApi

  useEffect(() => {
    processInstagramEmbeds()
    const t = window.setTimeout(() => {
      processInstagramEmbeds()
      reinitCarousel(carouselApiRef.current)
    }, 500)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!carouselApi) return
    reinitCarousel(carouselApi)
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => {
      processInstagramEmbeds()
      reinitCarousel(carouselApi)
    }
    carouselApi.on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi])

  return (
    <section className="instagram-embeds-section bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="text-center">
          <div className="kicker">Follow us on Instagram</div>
          <a
            href="https://www.instagram.com/celesteabode/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-balance font-[Poppins] text-2xl font-semibold tracking-tight md:text-4xl group"
          >
            <span className="text-[var(--sand)] text-[0.85em] align-baseline">@</span>
            <span className="text-[var(--ink)] group-hover:text-[var(--sand)] transition-colors">celesteabode</span>
          </a>
        </div>

        {/* One slide per view below lg; three equal columns from lg breakpoint up */}
        <div className="mt-10">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full"
          >
            <div className="relative w-full">
              {/* Arrows should not reduce slide/card width (absolute overlay instead of flex columns) */}
              <CarouselPrevious
                type="button"
                className="left-1 !-left-0 top-1/2 -translate-y-1/2 size-10 touch-manipulation bg-white/95 shadow-md hover:bg-white border-[color:var(--line)] z-10"
              />

              <CarouselNext
                type="button"
                className="right-1 !-right-0 top-1/2 -translate-y-1/2 size-10 touch-manipulation bg-white/95 shadow-md hover:bg-white border-[color:var(--line)] z-10"
              />

              <CarouselContent className="-ml-2 md:-ml-4">
                {POSTS.map((url, index) => (
                  <CarouselItem
                    key={`${index}-${url}`}
                    className="basis-full pl-2 md:pl-4 lg:basis-1/3"
                  >
                    <InstagramEmbedSlide url={url} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        </div>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          processInstagramEmbeds()
          window.setTimeout(() => {
            processInstagramEmbeds()
            reinitCarousel(carouselApiRef.current)
          }, 200)
        }}
      />
    </section>
  )
}
