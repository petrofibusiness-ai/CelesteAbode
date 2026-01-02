"use client";

import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Video Container */}
          <div className="relative h-[580px] lg:h-[620px]">
            {/* Placeholder image - shows while video loads */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/propertyhero.avif"
                alt="Best real estate consultant guiding property decisions in Delhi NCR - Noida, Greater Noida, and Yamuna Expressway"
                fill
                priority
                className="w-full h-full object-cover object-center"
                sizes="100vw"
                quality={75}
              />
            </div>

            {/* Cloud-hosted video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center"
            >
              <source src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/HEROVIDEO.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Left side vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Left Aligned Text Overlay */}
            <div className="absolute inset-0 flex items-end pb-16">
              {/* Gradient overlay behind text block only - dark on left, transparent on right */}
              <div className="absolute left-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
              
              <div className="relative text-left text-[#FAFAF8] max-w-3xl px-4 ml-6 md:px-6 md:ml-8">
                {/* Vision Line - Branding Tagline */}
                <div className="text-xs mb-2 font-medium tracking-wide uppercase text-[#CBB27A]">
                  From Masterpieces of Time To Masterpieces of Living
                </div>

                {/* H1 - SEO-Optimized Main Headline */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-3 leading-tight text-[#FAFAF8]">
                  Best Real Estate Consultant in Delhi NCR for Residential & Investment Properties
                </h1>

                {/* Hero Subcopy */}
                <p className="text-xs md:text-sm text-white mb-4 max-w-xl font-medium font-poppins">
                  Guiding confident property decisions across Noida, Greater Noida, and the Yamuna Expressway through data-backed analysis, RERA discipline, and local market expertise.
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <PillButton
                    variant="primary"
                    size="sm"
                    className="text-xs md:text-sm px-4 py-2 bg-white text-[#2B3035] hover:bg-white/90 rounded-full w-[160px] text-center m-0"
                    asChild
                  >
                    <a href="/properties" className="m-0">Explore Properties</a>
                  </PillButton>
                  <PillButton
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm px-4 py-2 border border-white text-white hover:bg-white/20 rounded-full w-[160px] text-center m-0"
                    asChild
                  >
                    <a href="/contact" className="m-0">Book Consultation</a>
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
