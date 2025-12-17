"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { ImageFigure } from "@/components/ui/image-figure";
import { Kicker } from "@/components/ui/kicker";
import { Lead } from "@/components/ui/lead";

export function BrandEssay() {
  return (
    <Section className="py-16 md:py-20">
      <div className="lg:grid lg:grid-cols-12 gap-8 md:gap-16">
        {/* Mobile Image - Top */}
        <div className="lg:hidden mb-8">
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ImageFigure
              src="/modern-luxury-apartment-building-architectural-pho.avif"
              alt="Modern luxury apartment building architectural photography"
              width={700}
              height={600}
              className="aspect-[7/6] object-contain"
              imageClassName="object-center object-contain"
            />
          </motion.div>
        </div>

        {/* Left Column - Content */}
        <div className="lg:col-span-7">
          {/* Section Header */}
          <motion.div
            className="mb-8 vertical-rhythm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Kicker>Celeste Abode</Kicker>
            <h1 className="heading-bold text-primary mb-6">
              Welcome to a New Era of{" "}
              <span className="text-[#CBB27A]">Real Estate in India</span>
            </h1>
            <Lead>
              India's real estate market has transformed faster than any other in
              Asia. With expanding cities, growing aspirations, and a
              digital-first generation, the property journey today demands
              transparency, precision, and trust.
            </Lead>
          </motion.div>

          {/* Copy Structure */}
          <motion.div
            className="max-w-prose vertical-rhythm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="body-text text-muted-foreground mb-6">
              Celeste Abode stands at the intersection of technology and
              insight, helping buyers, investors, and developers make confident
              decisions through data-backed analytics, virtual experiences, and
              personalized consultation.
            </p>

            <p className="body-text text-muted-foreground mb-6">
              Whether you're searching for your dream home in <span className="font-bold text-foreground">Noida</span>, a luxury
              apartment in <span className="font-bold text-foreground">Gurgaon</span>, or planning an investment portfolio <span className="font-bold text-foreground">anywhere in Delhi NCR</span>.
            </p>
              <p className="body-text text-muted-foreground">
              Celeste Abode ensures every decision is guided by verified data,
              expert insight, and genuine market understanding.
            </p>
          </motion.div>
        </div>

        {/* Right Column - Media (Sticky on Desktop) */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="lg:sticky lg:top-32 flex justify-center h-fit">
            <motion.div
              className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageFigure
                src="/modern-luxury-apartment-building-architectural-pho.avif"
                alt="Modern luxury apartment building architectural photography"
                width={700}
                height={600}
                className="aspect-[7/6] object-contain"
                imageClassName="object-center object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
