"use client";

import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
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

  const handleVideoLoaded = () => {
    setIsVideoReady(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative"
          style={{ 
            willChange: 'auto',
            transform: 'translateZ(0)', // Force GPU acceleration to prevent flickering
          }}
        >
          {/* Full Container Video/Image - Explicit dimensions to prevent layout shift */}
          <div className="relative h-[580px] lg:h-[620px]">
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
                  isVideoReady ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(min-width: 768px) 100vw, 0vw"
                quality={75}
                fetchPriority="high"
                unoptimized={false}
                style={{ 
                  willChange: isVideoReady ? 'opacity' : 'auto',
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
              />
            </div>
            
            {/* Video for Desktop - Always rendered but hidden until ready to prevent layout shifts */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className={`hidden md:block absolute inset-0 w-full h-full object-cover object-center md:object-cover md:object-bottom transition-opacity duration-500 ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                willChange: 'opacity',
                transform: 'translateZ(0)', // Force GPU acceleration
                pointerEvents: isVideoReady ? 'auto' : 'none', // Prevent interaction when hidden
              }}
              onLoadedData={handleVideoLoaded}
            >
              <source src="/HOMEHERO.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Left side vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

            {/* Left Aligned Text Overlay - Bottom Left */}
            <div className="absolute inset-0 flex items-end pb-16">
              {/* Gradient overlay behind text block only - dark on left, transparent on right */}
              <div className="absolute left-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
              
              <div className="relative text-left text-[#FAFAF8] max-w-3xl px-4 ml-6 md:px-6 md:ml-8">
                {/* Vision Line - Branding Tagline (Not H1) */}
                <div className="text-xs mb-2 font-medium tracking-wide uppercase text-[#CBB27A]">
                  From Masterpieces of Time To Masterpieces of Living
                </div>

                {/* H1 - SEO-Optimized Main Headline */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-3 leading-tight text-[#FAFAF8] hero-title-typography">
                  Best Real Estate Consultant in Delhi NCR for Residential & Investment Properties
                </h1>

                {/* Hero Subcopy */}
                <p className="text-xs md:text-sm text-white mb-4 max-w-xl font-medium hero-subtitle-typography font-poppins">
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

