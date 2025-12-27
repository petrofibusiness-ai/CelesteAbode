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
    <Section className="pt-20 md:pt-28 pb-16 md:pb-24 bg-background relative overflow-hidden">
      {/* Subtle architectural blueprint watermark background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none brand-intro-bg-pattern" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CBB27A]/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Eyebrow Tag with decorative accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-4 mb-8 md:mb-12"
        >
          <div className="h-px w-12 md:w-16 bg-gradient-to-r from-[#CBB27A] to-transparent" />
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-[#CBB27A]">
            THE CELESTE PHILOSOPHY
          </p>
          <div className="h-px w-12 md:w-16 bg-gradient-to-l from-[#CBB27A]/30 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-end">
          {/* Left Column - Headline */}
          <motion.div 
            className="lg:col-span-5 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: containerDuration, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Headline with enhanced typography */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-left font-semibold text-[#2B3035] tracking-tight">
              Data‑Driven, Compliant & Intelligent Property Consulting for Delhi NCR Investors
            </h2>
          </motion.div>

          {/* Right Column - Body Text */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div 
              className="space-y-5 md:space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px', amount: 0.2 }}
              transition={{ 
                duration: containerDuration,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {/* First paragraph */}
              <div className="relative pl-5 md:pl-6 border-l border-[#CBB27A]/40">
                <p className="text-xs md:text-sm lg:text-base leading-[1.7] text-[#4A4F55] font-normal font-poppins">
                  Celeste Abode is a <span className="text-[#2B3035] font-medium">trusted real estate consultant</span> in Delhi NCR, built for people who want clarity before committing to a property.
              </p>
              </div>

              {/* Second paragraph */}
              <p className="text-xs md:text-sm lg:text-base leading-[1.7] text-[#4A4F55] font-normal font-poppins">
                In a market driven by pressure and noise, we focus on what actually protects your decision: <span className="text-[#2B3035] font-medium">RERA-compliant projects</span>, <span className="text-[#2B3035] font-medium">data-backed analysis</span>, and <span className="text-[#2B3035] font-medium">deep local understanding</span>. Our role is not to push options, but to help you evaluate what makes sense financially, legally, and long-term.
              </p>

              {/* Third paragraph */}
              <div className="relative bg-[#CBB27A]/5 p-5 md:p-6 rounded-md border-l-2 border-[#CBB27A]/30">
                <p className="text-xs md:text-sm lg:text-base leading-[1.7] text-[#2B3035] font-normal font-poppins">
                  From Noida and Greater Noida to the Yamuna Expressway, every recommendation is guided by one principle: <span className="font-medium text-[#CBB27A]">secure decisions today that hold value tomorrow</span>.
              </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

