"use client";

import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { homepageTitle, homepageDescription } from "@/app/metadata";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Video Container - Desktop heights: md:580px lg:620px */}
          <div className="relative h-[550px] sm:h-[650px] md:h-[580px] lg:h-[620px]">
            {/* Image - Mobile only - Optimized for LCP */}
            <div className="absolute inset-0 w-full h-full md:hidden">
              <Image
                src="/propertyhero.avif"
                alt="Real estate consultant in Delhi NCR guiding property decisions - Noida, Greater Noida, and Yamuna Expressway"
                fill
                priority
                fetchPriority="high"
                className="w-full h-full object-cover object-center"
                sizes="100vw"
                quality={60}
                loading="eager"
              />
            </div>
            
            {/* Cloud-hosted video - Desktop only - Deferred loading */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
            >
              <source src="https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/HEROVIDEO%20(1).mp4" type="video/mp4" />
            </video>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Left side vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* Left Aligned Text Overlay */}
            <div className="absolute inset-0 flex items-end pb-8 md:pb-16">
              {/* Gradient overlay behind text block only - dark on left, transparent on right */}
              <div className="absolute left-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
              
              <div className="relative text-left text-[#FAFAF8] max-w-3xl px-4 ml-4 md:ml-6 md:px-6 md:ml-8">
                {/* Vision Line - Branding Tagline */}
                <div className="text-xs mb-1.5 md:mb-2 font-medium tracking-wide uppercase text-[#CBB27A]">
                  From Masterpieces of Time To Masterpieces of Living
                </div>

                {/* H1 - SEO-Optimized Main Headline */}
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium mb-2 md:mb-3 leading-tight text-[#FAFAF8]">
                  {homepageTitle}
                </h1>

                {/* Hero Subcopy */}
                <p className="text-xs sm:text-sm text-white mb-3 md:mb-4 max-w-xl font-medium font-poppins">
                  {homepageDescription}
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
