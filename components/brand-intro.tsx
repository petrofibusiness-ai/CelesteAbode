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
            {/* Paragraph 1 */}
            <p className="text-sm md:text-[0.95rem] lg:text-base leading-[1.85] text-[#4A4F55] font-normal font-poppins">
              Buying property in the NCR means navigating title irregularities, developers with delayed delivery records, and circle rate revisions that change your registration cost the week you sign. These are not rare exceptions. For most buyers, they are discoveries made after the decision is already done.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm md:text-[0.95rem] lg:text-base leading-[1.85] text-[#4A4F55] font-normal font-poppins">
              That is exactly what <span className="text-[#CBB27A]">Celeste Abode, your trusted real estate consultant in NCR</span>, was built to prevent. As independent real estate consultants in Noida and across Delhi NCR, we verify RERA compliance, land title standing, and developer delivery history before any project reaches your shortlist. Every property consultant in Noida works with inventory. We work with your interest. <span className="font-semibold text-[#2B3035]">If something fails our checks, you hear that first.</span>
            </p>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
