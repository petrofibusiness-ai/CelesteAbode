"use client";

import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load video after LCP to improve initial load performance
    // Only load on desktop and after user interaction or delay
    if (typeof window === 'undefined') return;
    
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return; // Don't load video on mobile
    
    // Wait for page to be interactive before loading video
    const loadVideo = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShouldLoadVideo(true);
        }, { timeout: 3000 });
      } else {
        const timer = setTimeout(() => {
          setShouldLoadVideo(true);
        }, 3000); // Wait 3 seconds after page load to prioritize LCP
        return () => clearTimeout(timer);
      }
    };

    // Wait for page to be interactive
    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo, { once: true });
      return () => window.removeEventListener('load', loadVideo);
    }
  }, []);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Auto-play may fail, that's okay
      });
    }
  }, [shouldLoadVideo]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Full Container Video/Image */}
          <div className="relative h-[580px] lg:h-[620px]">
            {/* Image for Mobile - Optimized for LCP - Highest Priority */}
            <Image
              src="/propertyhero.avif"
              alt="Luxury real estate background"
              fill
              priority
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
              sizes="100vw"
              quality={70}
              fetchPriority="high"
              unoptimized={false}
            />
            
            {/* Fallback image for Desktop (LCP optimization) - shown until video loads */}
            <Image
              src="/propertyhero.avif"
              alt="Luxury real estate background"
              fill
              priority
              loading="eager"
              decoding="async"
              className={`hidden md:block absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                shouldLoadVideo ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="100vw"
              quality={70}
              fetchPriority="high"
              unoptimized={false}
            />
            
            {/* Video for Desktop - Lazy loaded after LCP to improve performance */}
            {shouldLoadVideo && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-center md:object-cover md:object-bottom opacity-0 transition-opacity duration-500"
                onLoadedData={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.classList.remove('opacity-0');
                  target.classList.add('opacity-100');
                }}
              >
                <source src="/HOMEHERO.mp4" type="video/mp4" />
              </video>
            )}

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Left side vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* Left Aligned Text Overlay - Bottom Right on Mobile */}
            <div className="absolute inset-0 flex items-end md:items-center justify-end md:justify-start">
              {/* Gradient overlay behind text block only - dark on left, transparent on right */}
              <div className="absolute left-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
              
              <div className="relative text-left md:text-left text-[#FAFAF8] max-w-4xl px-4 pb-6 pr-4 md:px-6 md:ml-8 md:pb-0 md:pr-0 z-10">
                <h1
                  className="text-2xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-5 leading-tight text-[#FAFAF8]"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <div className="block text-[#FAFAF8]">
                    From Masterpieces of Time To
                  </div>
                  <div className="block text-[#FAFAF8] mt-1 md:mt-2">
                    Masterpieces of Living
                  </div>
                </h1>

                <p 
                  className="text-sm md:text-lg text-white mb-5 md:mb-7 max-w-2xl font-medium"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  }}
                >
                  Redefining luxury real estate consulting in the NCR. Strategic Advisory for your next high-value investment.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <PillButton
                    variant="primary"
                    size="sm"
                    className="text-xs px-4 py-2 md:text-sm md:px-6 md:py-3 bg-white text-[#2B3035] hover:bg-white/90 rounded-full w-[160px] sm:w-[180px] md:w-[200px] text-center"
                    asChild
                  >
                    <a href="/projects">Explore Projects</a>
                  </PillButton>
                  <PillButton
                    variant="outline"
                    size="sm"
                    className="text-xs px-4 py-2 md:text-sm md:px-6 md:py-3 border border-white text-white hover:bg-white/20 rounded-full w-[160px] sm:w-[180px] md:w-[200px] text-center"
                    asChild
                  >
                    <a href="/contact">Book Consultation</a>
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

