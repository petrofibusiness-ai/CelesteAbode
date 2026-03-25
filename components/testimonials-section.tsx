"use client";

import { useEffect, useState } from "react";

export function TestimonialsSection() {
  // Elfsight mutates the widget DOM as soon as its platform script runs.
  // If we render the widget on the server, the client can hydrate a different DOM -> hydration mismatch.
  // Render it only after mount to keep server/client HTML identical.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
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
          {mounted && (
            <>
              <script src="https://elfsightcdn.com/platform.js" async></script>
              <div
                className="elfsight-app-4185bb5e-82e5-45bf-92fc-b41420393094"
                data-elfsight-app-lazy
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
