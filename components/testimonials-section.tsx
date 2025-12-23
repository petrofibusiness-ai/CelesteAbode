"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsSection() {
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
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

  // Initialize Elfsight widget after script loads and detect when content is rendered
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

      // Function to check if widget content is loaded
      const checkWidgetLoaded = () => {
        const widgetElement = document.querySelector('.elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094') as HTMLElement | null;
        if (widgetElement) {
          // Check if widget has actual content (not just empty container)
          const hasContent = widgetElement.children.length > 0 || 
                           widgetElement.innerHTML.trim().length > 100 ||
                           widgetElement.offsetHeight > 50;
          
          if (hasContent) {
            setIsWidgetLoaded(true);
            return true;
          }
        }
        return false;
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

      // Poll for widget content to appear
      const checkInterval = setInterval(() => {
        if (checkWidgetLoaded()) {
          clearInterval(checkInterval);
        }
      }, 500);

      // Also listen for Elfsight ready event if available
      if (typeof window !== 'undefined') {
        window.addEventListener('elfsight:ready', () => {
          console.log('Elfsight ready event fired');
          initializeElfsight();
          setTimeout(() => checkWidgetLoaded(), 1000);
        });
      }

      // Timeout after 10 seconds - assume loaded even if check fails
      const maxWaitTimeout = setTimeout(() => {
        setIsWidgetLoaded(true);
        clearInterval(checkInterval);
      }, 10000);

      return () => {
        clearTimeout(initTimeout);
        clearInterval(checkInterval);
        clearTimeout(maxWaitTimeout);
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
          <p className="lead text-muted-foreground max-w-3xl mx-auto font-poppins">
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
                setIsWidgetLoaded(false); // Reset widget loaded state to show loading animation
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
            
            {/* Beautiful Loading Animation */}
            <AnimatePresence mode="wait">
              {!isWidgetLoaded && !scriptError && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[500px] flex items-center justify-center py-12"
                >
                  <div className="text-center space-y-8 max-w-md mx-auto px-6">
                    {/* Animated Logo/Icon */}
                    <motion.div
                      className="relative mx-auto w-24 h-24"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Outer rotating ring */}
                      <motion.div
                        className="absolute inset-0 border-4 border-[#CBB27A]/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      {/* Middle ring */}
                      <motion.div
                        className="absolute inset-2 border-4 border-[#CBB27A]/40 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      {/* Inner spinning circle */}
                      <motion.div
                        className="absolute inset-4 border-4 border-[#CBB27A] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>

                    {/* Loading Text with Animation */}
                    <motion.div
                      className="space-y-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        Loading Reviews
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base font-poppins">
                        Gathering authentic client testimonials...
                      </p>
                    </motion.div>

                    {/* Animated Dots */}
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={index}
                          className="w-2 h-2 bg-[#CBB27A] rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error state */}
            {scriptError && (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4 font-poppins">
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
              <motion.div
                ref={widgetRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isWidgetLoaded ? 1 : 0, y: isWidgetLoaded ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094 pb-8"
                data-elfsight-app-id="4185bb5e-82e5-45bf-92fc-b41420393094"
                aria-label="Google Reviews Widget for Celeste Abode"
                style={{ minHeight: isWidgetLoaded ? 'auto' : '500px' }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
