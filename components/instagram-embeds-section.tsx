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
  "https://www.instagram.com/reel/DWEqOcmj4GZ/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DV7tAlxAFjr/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DVM-jPdgP0X/?utm_source=ig_embed&utm_campaign=loading",
] as const

export function InstagramEmbedsSection() {
  useEffect(() => {
    // Ask Instagram's script to (re)scan and render embeds
    if (typeof window !== "undefined" && (window as any).instgrm?.Embeds?.process) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

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
                  <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] shadow-[0_10px_28px_rgba(2,6,23,0.06)] overflow-hidden">
                    <blockquote
                      className="instagram-media m-0 w-full"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                    >
                      <div className="min-h-[320px] md:min-h-[380px] flex items-center justify-center p-6">
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="instagram-embed-fallback flex flex-col items-center justify-center gap-3 w-full max-w-[280px] min-h-[280px] md:min-h-[320px] rounded-2xl border-2 border-[var(--sand)] bg-gradient-to-b from-[color:var(--paper)] to-[var(--sand-tint-light)]/30 text-[var(--ink)] no-underline font-[Poppins] font-medium text-center shadow-[0_8px_24px_rgba(203,178,122,0.15)] hover:shadow-[0_12px_32px_rgba(203,178,122,0.22)] hover:border-[var(--sand-tint-dark)] transition-all duration-300"
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
              className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper)] shadow-[0_10px_28px_rgba(2,6,23,0.06)] overflow-hidden"
            >
              <blockquote
                className="instagram-media m-0 w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <div className="min-h-[320px] md:min-h-[380px] flex items-center justify-center p-6">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="instagram-embed-fallback flex flex-col items-center justify-center gap-3 w-full max-w-[280px] min-h-[280px] md:min-h-[320px] rounded-2xl border-2 border-[var(--sand)] bg-gradient-to-b from-[color:var(--paper)] to-[var(--sand-tint-light)]/30 text-[var(--ink)] no-underline font-[Poppins] font-medium text-center shadow-[0_8px_24px_rgba(203,178,122,0.15)] hover:shadow-[0_12px_32px_rgba(203,178,122,0.22)] hover:border-[var(--sand-tint-dark)] transition-all duration-300"
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
          ))}
        </div>
      </div>

      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </section>
  )
}

