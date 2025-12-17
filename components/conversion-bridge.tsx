"use client";

import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/pill-button";

export function ConversionBridge() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#0B1020]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="heading-bold text-3xl md:text-4xl lg:text-5xl text-white conversion-bridge-title">
            Stop Searching. Start Strategizing.
          </h2>

          <div className="flex justify-center items-center">
            <PillButton
              variant="primary"
              size="md"
              className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4 bg-[#CBB27A] text-[#0B1020] hover:bg-[#B8A066] rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/contact">Start Your Discovery Session →</a>
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

