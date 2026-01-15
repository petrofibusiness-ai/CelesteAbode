"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, BarChart3, MapPin, FileCheck, Users, ChevronDown, ArrowRight } from "lucide-react";

export function WhyClientsTrustSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const trustPillars = [
    {
      id: "rera-compliant",
      title: "RERA-Compliant Advisory",
      shortText: "Every property recommendation is aligned with RERA regulations.",
      fullText: "As a real estate consultant in Delhi NCR, we ensure that all properties are reviewed for RERA registration, developer compliance, project approvals, and regulatory status. This process helps reduce legal risk and provides clients with clarity before making any property decision.",
      icon: Shield,
      gradient: "from-blue-50 to-indigo-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "data-backed",
      title: "Data-Led Real Estate Analysis",
      shortText: "Market data guides every recommendation.",
      fullText: "Our real estate consulting services rely on structured market analysis, including pricing trends, demand indicators, absorption rates, and location-specific performance data. We study micro-markets across Noida, Greater Noida, Yamuna Expressway, and wider Delhi NCR to support informed, objective property decisions.",
      icon: BarChart3,
      gradient: "from-emerald-50 to-teal-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "legal-verification",
      title: "Legal Due Diligence",
      shortText: "Thorough verification of property documentation.",
      fullText: "Legal review is a core part of our real estate advisory process. We assess title documents, ownership records, encumbrance status, and statutory approvals to help clients avoid future disputes and ensure transactions are based on verified information.",
      icon: FileCheck,
      gradient: "from-purple-50 to-pink-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "local-expertise",
      title: "Local Market Understanding",
      shortText: "Focused expertise across Delhi NCR micro-markets.",
      fullText: "As a property consultant with a strong presence in Delhi NCR, we bring area-specific insights into infrastructure growth, connectivity, supply-demand balance, and long-term development plans. This local understanding supports practical recommendations rather than generic market assumptions.",
      icon: MapPin,
      gradient: "from-amber-50 to-orange-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "transparent-process",
      title: "Transparent Consulting Process",
      shortText: "Clear communication without pressure or hidden costs.",
      fullText: "Our real estate consulting firm follows a transparent engagement model. Clients receive clear explanations, defined advisory scope, and straightforward fee structures. There are no aggressive sales tactics—only information that supports confident decision-making.",
      icon: CheckCircle,
      gradient: "from-rose-50 to-pink-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "client-first",
      title: "Client-Centered Advisory",
      shortText: "Recommendations aligned with individual objectives.",
      fullText: "Our advisory real estate approach begins with understanding your financial goals, investment horizon, and usage requirements. Whether the objective is end-use or investment, recommendations are aligned with suitability—not commissions or inventory push.",
      icon: Users,
      gradient: "from-cyan-50 to-blue-50",
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
            Why Clients Trust <span className="text-[#CBB27A]">Celeste Abode</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            As a real estate consultant in Delhi NCR, Celeste Abode is built for people who want clarity before commitment. We guide property decisions with transparency, regulatory discipline, and on-ground understanding, not pressure or volume.
          </p>
        </motion.div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isExpanded = expandedCard === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="h-full bg-white rounded-xl border border-gray-200/60 hover:border-[#CBB27A]/50 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden flex flex-col">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#CBB27A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="p-6 md:p-8 relative z-10 text-center flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-xl ${pillar.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm mx-auto`}>
                        <Icon className={`w-8 h-8 ${pillar.iconColor} transition-colors duration-300`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-[#2B3035] mb-4 tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm md:text-base text-[#4A4F55] leading-relaxed font-normal mb-4 flex-1">
                      {pillar.shortText}
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
                              {pillar.fullText}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Read More Button - Always at bottom */}
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : pillar.id)}
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
