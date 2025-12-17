"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export function TestimonialsSection() {
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer to load widget only when section is about to be visible
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadWidget(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "300px", // Start loading earlier (300px before section is visible)
        threshold: 0.1,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Initialize Elfsight widget after script loads
  useEffect(() => {
    if (isScriptLoaded && widgetRef.current && typeof window !== 'undefined') {
      // Function to initialize Elfsight
      const initializeElfsight = () => {
        try {
          // Check if Elfsight is available
          if (window.Elfsight) {
            // Try multiple initialization methods
            if (typeof window.Elfsight.init === 'function') {
              window.Elfsight.init();
              console.log('Elfsight.init() called');
            }
            // Also try direct initialization if available
            if (typeof window.Elfsight.initWidgets === 'function') {
              window.Elfsight.initWidgets();
              console.log('Elfsight.initWidgets() called');
            }
            // Check if widget container exists in DOM
            const widgetElement = document.querySelector('.elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094');
            if (widgetElement) {
              console.log('Elfsight widget container found in DOM');
            } else {
              console.warn('Elfsight widget container not found in DOM');
            }
          } else {
            console.warn('Elfsight object not found');
            return false;
          }
          return true;
        } catch (error) {
          console.error('Elfsight initialization error:', error);
          return false;
        }
      };

      // Try immediate initialization
      let initTimeout = setTimeout(() => {
        if (!initializeElfsight()) {
          // Retry after a longer delay if first attempt failed
          setTimeout(() => {
            initializeElfsight();
          }, 500);
        }
      }, 300);

      // Also listen for Elfsight ready event if available
      if (typeof window !== 'undefined') {
        window.addEventListener('elfsight:ready', () => {
          console.log('Elfsight ready event fired');
          initializeElfsight();
        });
      }

      return () => {
        clearTimeout(initTimeout);
        if (typeof window !== 'undefined') {
          window.removeEventListener('elfsight:ready', initializeElfsight);
        }
      };
    }
  }, [isScriptLoaded]);

  return (
    <section 
      ref={sectionRef}
      className="pt-6 pb-12 bg-gradient-to-br from-background to-secondary/5"
    >
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-bold text-primary mb-6">
            Client Voices: Our <span className="text-[#CBB27A]">Proven Track Record</span>
          </h2>
          <p className="lead text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience with our premium real estate
            projects and services.
          </p>
        </div>

        {/* Elfsight Google Reviews | CELESTE ABODE - Load only when section is visible */}
        {shouldLoadWidget && (
          <>
            <Script
              src="https://elfsightcdn.com/platform.js"
              strategy="afterInteractive"
              id="elfsight-platform-script"
              onLoad={() => {
                console.log('Elfsight script loaded successfully');
                setIsScriptLoaded(true);
                setScriptError(false);
                // Additional initialization after script loads
                setTimeout(() => {
                  if (typeof window !== 'undefined' && window.Elfsight) {
                    if (typeof window.Elfsight.init === 'function') {
                      window.Elfsight.init();
                    }
                  }
                }, 300);
              }}
              onError={() => {
                console.error('Failed to load Elfsight platform script');
                setScriptError(true);
                setIsScriptLoaded(false);
              }}
              onReady={() => {
                console.log('Elfsight script ready');
              }}
            />
            
            {/* Loading placeholder */}
            {!isScriptLoaded && !scriptError && (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 border-4 border-[#CBB27A] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted">Loading reviews...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {scriptError && (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Unable to load reviews at this time. Please try refreshing the page.
                  </p>
                  <button
                    onClick={() => {
                      setScriptError(false);
                      setIsScriptLoaded(false);
                      setShouldLoadWidget(false);
                      // Force reload by removing and re-adding script
                      setTimeout(() => setShouldLoadWidget(true), 100);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Elfsight Widget Container */}
            {isScriptLoaded && !scriptError && (
              <div
                ref={widgetRef}
                className="elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094 pb-8"
                data-elfsight-app-id="4185bb5e-82e5-45bf-92fc-b41420393094"
                aria-label="Google Reviews Widget for Celeste Abode"
                style={{ minHeight: '400px' }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
