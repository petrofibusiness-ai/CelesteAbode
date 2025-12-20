"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, BarChart3, MapPin, FileCheck, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function WhyClientsTrustSection() {
  const trustPillars = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "RERA Compliant",
      description: "Every property recommendation is verified against RERA regulations for legal security and compliance."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data-Backed Analysis",
      description: "Market intelligence and analytics drive every recommendation, not assumptions or pressure."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Legal Verification",
      description: "Comprehensive due diligence on legal documentation, title clearances, and regulatory approvals."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Market Expertise",
      description: "Deep understanding of Noida, Greater Noida, and Yamuna Expressway micro-markets and trends."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Transparent Process",
      description: "Clear communication at every step, no hidden fees, no pressure tactics, just honest guidance."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client-First Approach",
      description: "Your financial goals and lifestyle needs guide our recommendations, not sales targets."
    }
  ];

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
            Why Clients Trust <span className="text-[#CBB27A]">Celeste Abode</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Celeste Abode is built for people who want clarity before commitment. We guide property decisions with transparency, regulatory discipline, and on-ground understanding, not pressure or volume.
          </p>
        </motion.div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#CBB27A]/10 rounded-lg flex items-center justify-center text-[#CBB27A]">
                  {pillar.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-black text-white md:border-2 md:border-black md:bg-transparent md:text-[#000000] active:bg-black active:text-white md:hover:bg-black md:hover:text-white transition-all duration-300 active:scale-105 md:hover:scale-105 active:shadow-lg md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="See how we work"
          >
            See How We Work
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
