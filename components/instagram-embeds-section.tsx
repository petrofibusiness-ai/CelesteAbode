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

import { InstagramEmbedSlide } from "@/components/instagram-embed-slide"
import { processInstagramEmbeds } from "@/lib/instagram-embed"

function reinitCarousel(api: CarouselApi | undefined) {
  if (!api) return
  requestAnimationFrame(() => {
    api.reInit()
  })
}

/** Instagram embed permalinks (posts + reels) — order matches site carousel */
const POSTS = [
  "https://www.instagram.com/reel/DbVlskhzG8m/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/Dakt18oPIzV/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DaQYcPeP06I/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/p/DaDPJQWD2P6/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DZ7kRYnvbUU/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DZu3vwAvinX/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DZppavvTJbf/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DZkVtlUP6HW/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/p/DZsKletD4ss/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/p/DZnLNbYPZaA/?utm_source=ig_embed&utm_campaign=loading",
] as const

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
