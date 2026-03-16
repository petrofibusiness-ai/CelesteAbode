"use client"

import { useEffect } from "react"
import Script from "next/script"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const POSTS = [
  "https://www.instagram.com/reel/DOc3x8tD6kR/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DVM-jPdgP0X/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DUcDc1XFZ9Y/?utm_source=ig_embed&utm_campaign=loading",
] as const

export function InstagramEmbedsSection() {
  useEffect(() => {
    // Ask Instagram's script to (re)scan and render embeds
    if (typeof window !== "undefined" && (window as any).instgrm?.Embeds?.process) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="text-center">
          <div className="kicker">Follow us on Instagram</div>
          <a
            href="https://www.instagram.com/celesteabode/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-balance font-[Poppins] text-2xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl hover:text-[var(--sand)] transition-colors"
          >
            @celesteabode
          </a>
          <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-[var(--sand)] to-transparent" />
        </div>

        {/* Mobile / small screens: carousel */}
        <div className="mt-10 md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {POSTS.map((url) => (
                <CarouselItem key={url}>
                  <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] shadow-[0_10px_28px_rgba(2,6,23,0.06)]">
                    <blockquote
                      className="instagram-media m-0 w-full"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                    >
                      <a href={url} target="_blank" rel="noreferrer">
                        View this post on Instagram
                      </a>
                    </blockquote>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow z-20 pointer-events-auto" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow z-20 pointer-events-auto" />
          </Carousel>
        </div>

        {/* Desktop: three columns side by side */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 md:gap-6">
          {POSTS.map((url) => (
            <div
              key={url}
              className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] shadow-[0_10px_28px_rgba(2,6,23,0.06)]"
            >
              <blockquote
                className="instagram-media m-0 w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url} target="_blank" rel="noreferrer">
                  View this post on Instagram
                </a>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </section>
  )
}

