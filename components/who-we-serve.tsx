"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  TrendingUp,
  Building2,
  Briefcase,
  Globe,
  Laptop,
  ChevronDown,
} from "lucide-react";

export function WhoWeServe() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const audiences = [
    {
      id: "home-buyers",
      title: "First-Time Home Buyers",
      shortText: "Structured guidance for first-time buyers in the Delhi NCR property market.",
      fullText: "Buying a first home involves regulatory, financial, and location-based decisions. As a real estate consultant in Delhi NCR, we assist first-time buyers with RERA verification, project evaluation, locality assessment, and long-term suitability. Our advisory-led approach helps buyers understand each step clearly before committing.",
      icon: <User className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "investors",
      title: "Property Investors",
      shortText: "Strategic real estate consulting for long-term investment planning.",
      fullText: "Our real estate advisory for investors focuses on data-driven evaluation of rental yield potential, capital appreciation, taxation considerations, and market cycles across Delhi NCR. We prioritize sustainable investment strategies based on fundamentals rather than short-term speculation.",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "nris",
      title: "NRIs & Overseas Buyers",
      shortText: "End-to-end property consulting for NRI and international clients.",
      fullText: "As an experienced property consultant, we support NRIs and overseas buyers through remote property evaluation, legal verification, and compliance with India-specific regulatory requirements. Our process is designed to ensure clarity, compliance, and smooth coordination across borders.",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "corporates",
      title: "Corporate Organizations",
      shortText: "Professional real estate consulting for commercial requirements.",
      fullText: "We provide real estate consulting services to corporate clients seeking office spaces, commercial assets, or strategic property investments. Our support includes market intelligence, location feasibility analysis, and transaction advisory to assist informed business decisions within Delhi NCR.",
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "professionals",
      title: "Working Professionals",
      shortText: "Advisory-led property consulting for working professionals.",
      fullText: "Working professionals rely on our real estate consulting firm for practical guidance on premium residential options across Noida, Greater Noida, Yamuna Expressway, and wider NCR. Our recommendations consider connectivity, livability, future value, and long-term suitability rather than short-term appeal.",
      icon: <Laptop className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "developers",
      title: "Real Estate Developers",
      shortText: "Market intelligence and advisory support for developers.",
      fullText: "We offer advisory real estate services to developers through structured market research, buyer behavior analysis, and competitive positioning insights. Our role focuses on aligning projects with market demand and supporting informed go-to-market decisions across Delhi NCR.",
      icon: <Building2 className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-bold text-primary mb-6">
            Real Estate Consulting for Buyers, Investors & NRIs Across <span className="text-[#CBB27A]">Delhi NCR</span>
          </h2>
        </motion.div>

        {/* Divider Line */}
        <div className="w-24 h-0.5 bg-[#CBB27A] mx-auto mb-16"></div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon.type;
            const isExpanded = expandedCard === audience.id;

            return (
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="h-full bg-white rounded-xl border border-gray-200/60 hover:border-[#CBB27A]/50 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden flex flex-col">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#CBB27A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="p-6 md:p-8 relative z-10 text-center flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-xl ${audience.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm mx-auto`}>
                        <Icon className={`w-8 h-8 ${audience.iconColor} transition-colors duration-300`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-[#2B3035] mb-4 tracking-tight">
                      {audience.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm md:text-base text-[#4A4F55] leading-relaxed font-normal mb-4 flex-1">
                      {audience.shortText}
                    </p>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-200 mt-4">
                            <p className="text-sm text-[#4A4F55] leading-relaxed text-justify">
                              {audience.fullText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Read More Button - Always at bottom */}
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : audience.id)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#CBB27A] hover:text-[#B8A068] transition-colors"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

