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

  const containerDuration = isMobile ? 0.4 : 0.8;

  return (
    <Section className="pt-20 md:pt-28 pb-8 md:pb-10 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none brand-intro-bg-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CBB27A]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <div className="h-px w-12 md:w-16 bg-gradient-to-r from-[#CBB27A] to-transparent" />
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-[#CBB27A]">
            THE CELESTE ABODE APPROACH
          </p>
          <div className="h-px w-12 md:w-16 bg-gradient-to-l from-[#CBB27A]/30 to-transparent" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-6 md:mb-8">

          {/* Left Column — H2 */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-start"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: containerDuration, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.15] font-semibold text-[#2B3035] tracking-tight">
              Best Real Estate Consultants in Delhi NCR for Smart Property Investment
            </h2>
          </motion.div>

          {/* Right Column — Two paragraphs */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ duration: containerDuration, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-sm md:text-[0.95rem] lg:text-base leading-[1.85] text-[#4A4F55] font-normal font-poppins">
              Buying property in NCR is not hard because of too few choices. It is hard because too many choices make it difficult to know what is actually worth your time and money.
            </p>

            <p className="text-sm md:text-[0.95rem] lg:text-base leading-[1.85] text-[#4A4F55] font-normal font-poppins">
              <span className="text-[#CBB27A]">Celeste Abode</span> is built for buyers who want straight answers, not more noise. As a <span className="font-medium text-[#2B3035]">property consultant in Noida</span>, we do the groundwork before you see anything, legal checks, builder history, and delivery record. What reaches you has already been reviewed closely. Then we match it to your budget and timeline, and help you compare options honestly.
            </p>

            <p className="text-sm md:text-[0.95rem] lg:text-base leading-[1.85] text-[#4A4F55] font-normal font-poppins">
              <span className="font-semibold text-[#2B3035]">From first shortlist to final handover, we walk with you till the keys are in your hand.</span>
            </p>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
