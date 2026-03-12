"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, HandshakeIcon } from "lucide-react";

const kpis = [
  {
    icon: ShieldCheck,
    title: "No developer tie-ups",
    description: "We are not a channel partner for any builder",
  },
  {
    icon: FileCheck,
    title: "RERA-verified shortlists only",
    description: "Compliance and title checked before recommendation",
  },
  {
    icon: HandshakeIcon,
    title: "Involved from visit to possession",
    description: "We stay involved through booking, documentation, and handover",
  },
];

const cardVariants = [
  { initial: { opacity: 0, x: -80 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 } },
  { initial: { opacity: 0, x: 80 }, whileInView: { opacity: 1, x: 0 } },
];

export function KpiCards() {
  return (
    <section className="pt-4 pb-12 md:pt-6 md:pb-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => {
            const anim = cardVariants[index];
            return (
            <motion.div
              key={index}
              initial={anim.initial}
              whileInView={anim.whileInView}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative group"
            >
              <div className="bg-[#1a1a1a] rounded-2xl p-8 text-center h-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                {/* Icon */}
                <div className="mb-5 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F4E4A6] to-[#D4AF37] p-[2px] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <kpi.icon className="w-7 h-7 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-2 font-poppins">
                  <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    {kpi.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 font-poppins leading-relaxed">
                  {kpi.description}
                </p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
