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
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-background pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div
          className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden relative"
        >
          {/* Full Container Video/Image - Explicit dimensions to prevent layout shift */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[580px] lg:h-[620px] min-h-[400px]">
            {/* Image for Mobile - Optimized for LCP - Highest Priority */}
            {/* Using explicit dimensions and immediate render to reduce element render delay */}
            <div className="absolute inset-0 w-full h-full md:hidden">
              <Image
                src="/propertyhero.avif"
                alt="Best real estate consultant guiding property decisions in Delhi NCR - Noida, Greater Noida, and Yamuna Expressway"
                fill
                priority
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-center absolute inset-0"
                sizes="100vw"
                quality={60}
                fetchPriority="high"
                unoptimized={false}
                style={{ contentVisibility: 'auto' }}
              />
            </div>
            
            {/* Fallback image for Desktop (LCP optimization) - shown until video loads */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              <Image
                src="/propertyhero.avif"
                alt="Best real estate consultant guiding property decisions in Delhi NCR - Noida, Greater Noida, and Yamuna Expressway"
                fill
                priority
                loading="eager"
                decoding="sync"
                className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${
                  shouldLoadVideo ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(min-width: 768px) 100vw, 0vw"
                quality={75}
                fetchPriority="high"
                unoptimized={false}
              />
            </div>
            
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
              
              <div className="relative text-left md:text-left text-[#FAFAF8] max-w-4xl px-4 pb-4 md:pb-6 pr-4 md:px-6 md:ml-8 md:pb-0 md:pr-0 z-10">
                {/* Vision Line - Branding Tagline (Not H1) */}
                <div className="text-xs md:text-sm lg:text-base mb-2 md:mb-3 lg:mb-4 font-medium tracking-wide uppercase text-[#CBB27A]">
                  From Masterpieces of Time To Masterpieces of Living
                </div>

                {/* H1 - SEO-Optimized Main Headline */}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 lg:mb-5 leading-tight text-[#FAFAF8] hero-title-typography">
                  Best Real Estate Consultant for Properties in Delhi NCR
                </h1>

                {/* Hero Subcopy */}
                <p className="text-xs md:text-sm text-white mb-4 md:mb-5 lg:mb-7 max-w-2xl font-medium hero-subtitle-typography">
                  Guiding confident property decisions across Noida, Greater Noida, and the Yamuna Expressway through data-backed analysis, RERA discipline, and local market expertise.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <PillButton
                    variant="primary"
                    size="sm"
                    className="text-xs px-4 py-2 md:text-sm md:px-6 md:py-3 bg-white text-[#2B3035] hover:bg-white/90 rounded-full w-[160px] sm:w-[180px] md:w-[200px] text-center m-0"
                    asChild
                  >
                    <a href="/projects" className="m-0">Explore Projects</a>
                  </PillButton>
                  <PillButton
                    variant="outline"
                    size="sm"
                    className="text-xs px-4 py-2 md:text-sm md:px-6 md:py-3 border border-white text-white hover:bg-white/20 rounded-full w-[160px] sm:w-[180px] md:w-[200px] text-center m-0"
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

