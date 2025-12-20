"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { useEffect, useState } from "react";

export function BrandIntro() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Faster animations on mobile
  const containerDuration = isMobile ? 0.4 : 0.8;

  return (
    <Section className="pt-[102px] pb-12 md:pb-20 bg-background relative overflow-hidden">
      {/* Subtle architectural blueprint watermark background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none brand-intro-bg-pattern" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          {/* Left Column (40%) - Headline + Eyebrow - Fade in from left */}
          <motion.div 
            className="lg:col-span-2 flex flex-col h-full relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: containerDuration, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow Tag - Enhanced contrast for WCAG */}
            <p className="text-sm md:text-base tracking-widest uppercase mb-6 text-left font-semibold text-gold-accent">
              THE CELESTE PHILOSOPHY
            </p>

            {/* Headline - Continuous text for SEO and readability */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-left brand-intro-headline font-semibold">Where Data, Compliance, and Smart Property Decisions Come Together</h2>
            
            {/* Vertical separator line - luxury touch */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#CBB27A]/30 to-transparent"></div>
          </motion.div>

          {/* Right Column (60%) - Body Text - Fade in from right */}
          <div className="lg:col-span-3 flex flex-col h-full lg:pl-8">
            <div className="h-[calc(1.5rem+1.25rem)]"></div>
            <motion.div 
              className="text-lg md:text-xl leading-relaxed text-left brand-intro-body space-y-4 font-medium"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-50px', amount: 0.2 }}
              transition={{ 
                duration: containerDuration,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <p>
                Celeste Abode is a trusted real estate consultant in Delhi NCR, built for people who want clarity before committing to a property.
              </p>
              <p>
                In a market driven by pressure and noise, we focus on what actually protects your decision: RERA-compliant projects, data-backed analysis, and deep local understanding. Our role is not to push options, but to help you evaluate what makes sense financially, legally, and long-term.
              </p>
              <p>
                From Noida and Greater Noida to the Yamuna Expressway, every recommendation is guided by one principle: secure decisions today that hold value tomorrow.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

