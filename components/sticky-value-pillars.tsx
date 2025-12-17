"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";

interface Pillar {
  number: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
}

const pillars: Pillar[] = [
  {
    number: "01",
    headline: "Precision via Lifestyle Intelligence",
    body: "We leverage advanced analytics to decode market trends and align property recommendations with your unstated lifestyle patterns.",
    image: "/1.webp",
    imageAlt: "Yamuna Expressway and Jewar Airport growth corridors map",
  },
  {
    number: "02",
    headline: "Curated Investment Security",
    body: "We safeguard your capital with RERA-aligned diligence and regulatory foresight, ensuring the paperwork is as flawless as the architecture.",
    image: "/2.webp",
    imageAlt: "Premium quality seal and legal documentation on luxury desk",
  },
  {
    number: "03",
    headline: "Bespoke Residential Legacy",
    body: "Our approach blends sharp market intelligence with deep human empathy to find the one address destined to be yours.",
    image: "/3.webp",
    imageAlt: "Family in luxury living room with skyline view",
  },
];

export function StickyValuePillars() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use Intersection Observer for more reliable pillar detection
  useEffect(() => {
    const observers = pillarRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: [0, 0.5, 1],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <Section className="bg-background pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="heading-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-[#0B1020]">Our </span>
            <span className="text-[#CBB27A]">Signature Methodology</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Mobile Image - Show only first image before content */}
          <div className="lg:hidden mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src={pillars[0].image}
                alt={pillars[0].imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 0vw"
                quality={80}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>

          {/* Left Column - Scrolling Content */}
          <div ref={contentRef} className="space-y-32 md:space-y-40">
            {pillars.map((pillar, index) => {
              return (
                <motion.div
                  key={index}
                  ref={(el) => {
                    pillarRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <div className="mb-4 relative inline-block">
                    <span className="h3 text-6xl md:text-7xl font-bold leading-none text-white px-4 py-2 rounded-lg pillar-number-badge">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="heading-bold text-2xl md:text-3xl mb-6 leading-tight pillar-headline">
                    {pillar.headline}
                  </h3>
                  <p className="body-text text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column - Sticky Visual */}
          <div className="hidden lg:block lg:sticky lg:top-32 h-[600px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    quality={80}
                    priority={index === 0}
                  />
                  {/* Subtle overlay for better text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

