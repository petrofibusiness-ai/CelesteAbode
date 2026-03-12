"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SeoBlocksRevealControllerProps {
  children: React.ReactNode;
  /** Number of blocks to show initially (default: 1) */
  initialVisible?: number;
  /** Number of blocks to reveal per "Read more" click (default: 1 for progressive reveal) */
  step?: number;
  /** Total number of blocks (must match children [data-seo-block] count) */
  totalCount: number;
  className?: string;
}

/**
 * Wraps server-rendered SEO block elements. Controls visibility
 * of children with [data-seo-block] via CSS classes.
 * All content remains in DOM for SEO crawlers.
 * 
 * Features:
 * - Progressive reveal (one block at a time by default)
 * - Blur overlay above buttons
 * - Side-by-side Read More / Show Less buttons
 * - Fade animation for newly revealed blocks
 */
export function SeoBlocksRevealController({
  children,
  initialVisible = 1,
  step = 1,
  totalCount,
  className = "",
}: SeoBlocksRevealControllerProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll<HTMLElement>("[data-seo-block]");
    
    blocks.forEach((el, index) => {
      const show = index < visibleCount;
      const isNewlyRevealed = index === visibleCount - 1 && index >= initialVisible;
      
      if (show) {
        el.style.opacity = "1";
        el.style.maxHeight = "5000px";
        el.style.overflow = "visible";
        el.style.visibility = "visible";
        el.style.marginTop = "";
        el.style.marginBottom = "";
        el.style.paddingTop = "";
        el.style.paddingBottom = "";
        el.style.transition = "opacity 0.5s ease-out, max-height 0.5s ease-out";
        
        if (isNewlyRevealed) {
          el.style.animation = "fadeInUp 0.4s ease-out forwards";
        }
      } else {
        el.style.opacity = "0";
        el.style.maxHeight = "0px";
        el.style.overflow = "hidden";
        el.style.visibility = "hidden";
        el.style.marginTop = "0";
        el.style.marginBottom = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
        el.style.transition = "opacity 0.3s ease-in, max-height 0.3s ease-in";
        el.style.animation = "";
      }
    });

    // Hide separators that appear after the last visible block
    const separators = container.querySelectorAll<HTMLElement>("[data-seo-separator]");
    separators.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-seo-separator") ?? "-1", 10);
      const hide = idx >= visibleCount - 1;
      
      if (hide) {
        el.style.opacity = "0";
        el.style.maxHeight = "0px";
        el.style.overflow = "hidden";
        el.style.marginTop = "0";
        el.style.marginBottom = "0";
        el.style.paddingTop = "0";
        el.style.paddingBottom = "0";
        el.style.transition = "opacity 0.3s ease-in, max-height 0.3s ease-in";
      } else {
        el.style.opacity = "1";
        el.style.maxHeight = "200px";
        el.style.overflow = "visible";
        el.style.marginTop = "";
        el.style.marginBottom = "";
        el.style.paddingTop = "";
        el.style.paddingBottom = "";
        el.style.transition = "opacity 0.5s ease-out, max-height 0.5s ease-out";
      }
    });
  }, [visibleCount, initialVisible]);

  const hasMore = visibleCount < totalCount;
  const canCollapse = visibleCount > initialVisible;
  const isLastBlock = visibleCount >= totalCount;

  const handleExpand = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + step, totalCount));
    }
  };

  const handleCollapse = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setVisibleCount(initialVisible);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <section
        ref={sectionRef}
        className={`relative py-14 md:py-20 bg-background px-4 sm:px-6 lg:px-8 ${className}`.trim()}
        aria-label="SEO content blocks"
      >
        <div className="max-w-[1200px] mx-auto space-y-10 md:space-y-12">
          {children}
        </div>

        {/* Blur + Buttons section */}
        {(hasMore || canCollapse) && (
          <div className="relative mt-10 md:mt-14">
            {/* Gradient blur overlay - only show when there's more content */}
            {hasMore && (
              <div
                className="absolute -top-64 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none transition-opacity duration-300"
                aria-hidden="true"
              />
            )}

            {/* Buttons container */}
            <div className="w-full flex justify-center gap-4 relative z-10">
              {/* Read More button - show if not at last block */}
              {hasMore && (
                <button
                  type="button"
                  onClick={handleExpand}
                  className="group flex items-center justify-center gap-2 w-40 md:w-44 py-3.5 bg-white border-2 border-[#CBB27A] rounded-full text-foreground font-semibold font-poppins text-sm md:text-base hover:bg-[#CBB27A] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={`Show ${Math.min(step, totalCount - visibleCount)} more section${step > 1 ? "s" : ""}`}
                >
                  Read More
                  <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                </button>
              )}

              {/* Show Less button - show if expanded beyond initial */}
              {canCollapse && (
                <button
                  type="button"
                  onClick={handleCollapse}
                  className={`group flex items-center justify-center gap-2 w-40 md:w-44 py-3.5 bg-white rounded-full font-semibold font-poppins text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg ${
                    isLastBlock 
                      ? "border-2 border-[#CBB27A] text-foreground hover:bg-[#CBB27A] hover:text-white shadow-lg hover:shadow-xl" 
                      : "border-2 border-gray-300 text-foreground hover:border-[#CBB27A] hover:text-[#CBB27A]"
                  }`}
                  aria-label="Show less sections"
                >
                  Show Less
                  <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
