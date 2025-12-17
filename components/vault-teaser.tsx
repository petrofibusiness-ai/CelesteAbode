"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowRight, BookOpen } from "lucide-react";

export function VaultTeaser() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-1"
          >
            <Image
              src="/vault.webp"
              alt="Celeste Abode Vault - Real Estate Knowledge Base"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 376px, (max-width: 1200px) 400px, 500px"
              quality={75}
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020]/20 via-transparent to-transparent"></div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-4">
              <Lock className="w-8 h-8 text-[#CBB27A]" />
            </div>

            {/* Heading - H2 */}
            <h2 className="heading-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              <span className="block sm:inline">Your Next Step: </span>
              <span className="block sm:inline">Access <span className="text-[#CBB27A]">Strategic Certainty</span>.</span>
            </h2>

            {/* Subheading - H3 */}
            <h3 className="text-xl md:text-2xl text-ink font-medium mt-4">
              Exclusive Blueprint for Smart Property Investment.
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-ink leading-relaxed max-w-xl mt-6">
              Access Your Private Strategy Guide. This is your definitive resource for property success, transforming confusing market talk and tricky legal details into simple, clear answers. We provide the essential knowledge to make every choice a <strong className="text-ink">confident, smart investment decision</strong> in the NCR market.
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CBB27A] mt-2 flex-shrink-0"></div>
                <p className="text-base text-ink">
                  High-ROI Investor FAQs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CBB27A] mt-2 flex-shrink-0"></div>
                <p className="text-base text-ink">
                  The Master Glossary
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 flex justify-center md:justify-start">
              <Link
                href="/vault"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-black text-white md:border-2 md:border-black md:bg-transparent md:text-[#000000] active:bg-black active:text-white md:hover:bg-black md:hover:text-white transition-all duration-300 active:scale-105 md:hover:scale-105 active:shadow-lg md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                aria-label="Explore the Vault"
              >
                Explore the Vault
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

