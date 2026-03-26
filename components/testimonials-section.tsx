"use client";

import { useEffect, useRef, useState } from "react";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldRenderWidget, setShouldRenderWidget] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Defer Elfsight execution until the widget area is near the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first) return;
        if (first.isIntersecting) {
          setShouldRenderWidget(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        // Load a bit before it becomes visible so users don't see layout popping.
        rootMargin: "300px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

        {/* Elfsight Google Reviews | CELESTE ABODE */}
        <div className="pb-8">
          {shouldRenderWidget ? (
            <>
              <script src="https://elfsightcdn.com/platform.js" async></script>
              <div
                className="elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094"
                data-elfsight-app-lazy
              />
            </>
          ) : (
            // Keep layout stable until Elfsight loads (no custom loader animations).
            <div className="min-h-[320px]" />
          )}
        </div>
      </div>
    </section>
  );
}
