"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, BarChart3, MapPin, FileCheck, Users, ChevronDown, ArrowRight } from "lucide-react";

export function WhyClientsTrustSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const trustPillars = [
    {
      id: "rera-compliant",
      title: "RERA-Compliant Advisory",
      shortText: "RERA registration is the starting point, not the finish line.",
      fullText: "As a property consultant in Noida, we verify approval status, delivery record, and builder compliance history before any project enters our shortlist.",
      icon: Shield,
      gradient: "from-blue-50 to-indigo-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "data-backed",
      title: "Data-Led Real Estate Analysis",
      shortText: "Circle rates, transaction prices, developer timelines, and rental yield benchmarks.",
      fullText: "Every recommendation is built on current micro-market data, not brochure claims or projected returns.",
      icon: BarChart3,
      gradient: "from-emerald-50 to-teal-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "experienced-consultants",
      title: "Experienced Real Estate Consultants in Noida",
      shortText: "Over a decade of experience across Noida's key corridors.",
      fullText: "Our real estate consultants in Noida have worked across the city's key residential and commercial corridors for over a decade. We know which sectors are appreciating, which developers deliver on schedule, and where buyers should stay cautious.",
      icon: Users,
      gradient: "from-purple-50 to-pink-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "developer-network",
      title: "Strong Network with Top Developers",
      shortText: "Direct access to RERA-registered developers in Noida and Greater Noida.",
      fullText: "Pre-launch pricing, accurate inventory, and payment structures that are not always visible on aggregator platforms.",
      icon: MapPin,
      gradient: "from-amber-50 to-orange-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "transparent-process",
      title: "Transparent Property Consulting Process",
      shortText: "No hidden fees. No pressure to close.",
      fullText: "If a project does not clear our internal checks, we tell you why rather than redirect you toward something that does.",
      icon: CheckCircle,
      gradient: "from-rose-50 to-pink-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "end-to-end",
      title: "End-to-End Property Buying Assistance",
      shortText: "We stay involved from the first site visit to possession.",
      fullText: "Agreement review, documentation, loan coordination, and construction milestone tracking are all part of what we do.",
      icon: FileCheck,
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
            Why Choose Celeste Abode as Your <span className="text-[#CBB27A]">Real Estate Consultant</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            There is no shortage of property consultants in Noida. The difference is in what they do before you visit a site. Here is what makes our process different.
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

                    {/* Expandable content - always in DOM for crawlers; visibility toggled for UX */}
                    <div className={`pt-4 border-t border-gray-200 mt-4 ${isExpanded ? "block" : "hidden"}`}>
                      <p className="text-sm text-[#4A4F55] leading-relaxed text-justify">
                        {pillar.fullText}
                      </p>
                    </div>

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
            href="/real-estate-consulting-services"
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
