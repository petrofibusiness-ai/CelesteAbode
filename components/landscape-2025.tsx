"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Shield, Camera, ArrowRight } from "lucide-react";

export function Landscape2025() {
  const demands = [
    {
      id: "verified-data",
      title: "Verified data, not speculation",
      icon: <Shield className="w-7 h-7" />,
    },
    {
      id: "transparency",
      title: "Transparency in pricing and legal status",
      icon: <TrendingUp className="w-7 h-7" />,
    },
    {
      id: "virtual-tours",
      title: "Virtual tours and digital transactions",
      icon: <Camera className="w-7 h-7" />,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-bold text-primary mb-6">
            India's Real Estate{" "}
            <span className="text-[#CBB27A]">Landscape in 2025</span>
          </h2>
          <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed mb-8">
            The Indian property sector is poised for a decade of intelligent
            growth. With increasing digitization, favorable policies, and the
            rise of AI-powered platforms, real estate in cities like <span className="font-bold text-foreground">Noida</span>,
            <span className="font-bold text-foreground"> Gurgaon</span>, <span className="font-bold text-foreground">Lucknow</span>, and across <span className="font-bold text-foreground">Delhi NCR</span> is becoming more transparent and
            performance-driven.
          </p>
        </motion.div>

        {/* Divider Line */}
        <div className="w-24 h-0.5 bg-[#CBB27A] mx-auto mb-12"></div>

        {/* Buyers Demands Section */}
        <motion.div
          className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Buyers today demand:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demands.map((demand, index) => (
              <motion.div
                key={demand.id}
                className="flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="text-[#CBB27A]">{demand.icon}</div>
                <p className="text-lg font-semibold text-foreground">
                  {demand.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border-2 border-black bg-transparent text-[#000000] hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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

