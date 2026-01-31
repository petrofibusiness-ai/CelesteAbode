"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Target, TrendingUp, Shield, Crown, Globe, Tablet, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

const services: ServiceCard[] = [
  {
    title: "Bespoke Lifestyle Curation",
    description: "We use AI-powered intelligence and profiling to match your lifestyle, commute, and goals with verified luxury projects.",
    icon: Target,
    link: "/advisory-philosophy",
  },
  {
    title: "Data-Driven ROI Strategy",
    description: "Custom investment plans aligned with your financial goals and risk appetite, built on market and yield analysis for maximum capital growth.",
    icon: TrendingUp,
    link: "/services",
  },
  {
    title: "End-to-End Transaction Security",
    description: "Complete transaction support from initial due diligence through RERA verification and final registration, ensuring flawless paperwork and security.",
    icon: Shield,
    link: "/services",
  },
  {
    title: "Exclusive Signature Residences",
    description: "Access to vetted, premium properties tailored to your design preferences and legacy goals, including off-market opportunities (₹3 Cr+).",
    icon: Crown,
    link: "/properties",
  },
  {
    title: "Global NRI Client Solutions",
    description: "Seamless digital processes managing regulatory requirements, currency, and remote property assets for clients across the globe.",
    icon: Globe,
    link: "/services",
  },
  {
    title: "Advanced Digital Clarity",
    description: "Advanced digital experiences, interactive dashboards, and transparent insights that bring properties to life, enabling informed decisions instantly.",
    icon: Tablet,
    link: "/services",
  },
];

export function CelesteConsultingFramework() {
  return (
    <Section className="bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="heading-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            <div className="text-[#0B1020]">The Celeste Consulting Framework:</div>
            <div className="text-[#CBB27A]">Your Six Pillars of Value</div>
          </h2>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <Link href={service.link}>
                  <div className="group relative bg-white rounded-xl p-8 shadow-md active:shadow-xl md:hover:shadow-xl transition-all duration-300 active:-translate-y-1 md:hover:-translate-y-1 border border-border cursor-pointer h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-[#CBB27A] mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-ink leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed flex-grow">
                        {service.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#CBB27A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Final Funnel Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p
            className="text-lg md:text-xl mb-6 mx-auto max-w-3xl"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 400,
              color: '#5B6168',
            }}
          >
            From location strategy to legacy planning, explore the full scope of our advisory.
          </p>
          <Link
            href="/real-estate-consulting-services"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full bg-black text-white md:border-2 md:border-black md:bg-transparent md:text-[#000000] active:bg-black active:text-white md:hover:bg-black md:hover:text-white transition-all duration-300 active:scale-105 md:hover:scale-105 active:shadow-lg md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Explore all services"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

