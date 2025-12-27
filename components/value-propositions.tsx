"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ValuePropositions() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-bold text-primary mb-6">
          The Mark of Expertise : Our{" "}
          <span className="text-[#CBB27A]">Impact & Results</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed font-poppins">
            A decade of trusted consulting in Delhi NCR, backed by measurable results and thousands of satisfied clients who made confident property decisions with our guidance.
          </p>
        </motion.div>

        {/* Statistics Grid - 2-1-2 Layout */}
        <div className="bg-muted/30 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Statistics Grid - 2-1-2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Left Column - 2 Stats */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-3 md:mb-4 tabular-nums">
                  5M+
                </div>
                <p className="body-text text-muted-foreground font-poppins">
                  Sq.Ft of Area Sold
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-3 md:mb-4 tabular-nums">
                  2500+
                </div>
                <p className="body-text text-muted-foreground font-poppins">
                  Happy Investors
                </p>
              </div>
            </motion.div>

            {/* Center - Experience Number */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl md:text-[10rem] lg:text-[14rem] font-semibold mb-4 md:mb-6 bg-clip-text text-transparent tabular-nums experience-number-bg">
                10
              </div>
              <p className="h3 text-foreground uppercase tracking-wide font-poppins">
                Years of Experience
              </p>
            </motion.div>

            {/* Right Column - 2 Stats */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-3 md:mb-4 tabular-nums">
                  50+
                </div>
                <p className="body-text text-muted-foreground font-poppins">
                  Skilled Professionals
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-3 md:mb-4 tabular-nums">
                  25+
                </div>
                <p className="body-text text-muted-foreground font-poppins">
                  Proud Builder Associates
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-black text-white md:border-2 md:border-black md:bg-transparent md:text-[#000000] active:bg-black active:text-white md:hover:bg-black md:hover:text-white transition-all duration-300 active:scale-105 md:hover:scale-105 active:shadow-lg md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Explore our properties"
          >
            Explore Our Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
