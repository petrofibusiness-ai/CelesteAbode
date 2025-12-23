"use client";

import { motion } from "framer-motion";

export function AdvisoryNotListingsSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-bold text-primary mb-6">
            Advisory, Not <span className="text-[#CBB27A]">Listings</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't overwhelm you with options. We help you understand which properties actually make sense — legally, financially, and long-term.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

