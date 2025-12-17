"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import BlurText from "@/components/blur-text";
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
  const blurTextDelay = isMobile ? 20 : 50;
  const blurTextStepDuration = isMobile ? 0.1 : 0.2;
  const bodyTextDuration = isMobile ? 0.3 : 0.5;
  const bodyTextDelay = isMobile ? 0.2 : 0.6;

  return (
    <Section className="pt-[102px] pb-12 md:pb-20 bg-background relative overflow-hidden">
      {/* Subtle architectural blueprint watermark background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none brand-intro-bg-pattern" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: containerDuration }}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch"
        >
          {/* Left Column (40%) - Headline + Eyebrow */}
          <div className="lg:col-span-2 flex flex-col h-full">
            {/* Eyebrow Tag */}
            <p className="text-sm md:text-base tracking-widest uppercase mb-6 text-left brand-intro-eyebrow">
              THE CELESTE PHILOSOPHY
            </p>

            {/* Headline */}
            <BlurText
              text="The Convergence of Data Intelligence and Luxury Living."
              animateBy="words"
              direction="top"
              delay={blurTextDelay}
              stepDuration={blurTextStepDuration}
              threshold={0.2}
              rootMargin="-50px"
              as="h2"
              className="text-2xl md:text-3xl lg:text-4xl leading-tight text-left brand-intro-headline"
            />
          </div>

          {/* Right Column (60%) - Body Text */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <div className="h-[calc(1.5rem+1.25rem)]"></div>
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-left brand-intro-body"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-50px', amount: 0.2 }}
              transition={{ 
                duration: bodyTextDuration,
                delay: bodyTextDelay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              Celeste Abode is the pinnacle of luxury real estate consulting in the NCR. We transform masterpieces of time into masterpieces of living—rejecting the transaction-first model to focus on data-backed investment security and lifestyle curation. Born from a fusion of global tech leadership and luxury market mastery, we replace guesswork with precision ensuring your acquisition in Noida, Gurugram, or the Yamuna Expressway is secured by proprietary analytics and ethical stewardship.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

