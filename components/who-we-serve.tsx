"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      shortText: "Buying your first property in the NCR is not just a financial decision. It is a decade-long commitment.",
      fullText: "Our real estate consultants in Noida guide first-time buyers through every layer of the process: what to verify before a site visit, how to read a builder-buyer agreement, and what possession timelines actually look like in practice versus on paper.",
      icon: <User className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "investors",
      title: "Property Investors",
      shortText: "Strong returns in the NCR are corridor-specific, not city-wide. Sector 150 Noida recorded 43% year-on-year appreciation.",
      fullText: "Greater Noida West averaged 24% growth. A property consultant in Noida with investment experience builds your shortlist around verified appreciation data and yield benchmarks, not projected returns designed to close a deal.",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "nris",
      title: "NRIs & Overseas Buyers",
      shortText: "For NRI buyers, the distance between where you are and where the property is makes due diligence even more critical.",
      fullText: "Finding a real estate consultant near me is harder when you are not on the ground. We handle the full process remotely: legal verification, site visit coordination, agreement review, and loan liaison, so you commit to something fully examined, not just well-photographed.",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "corporates",
      title: "Corporate Organisations",
      shortText: "Commercial property decisions for corporate occupiers and investors require a different lens.",
      fullText: "Office space selection, pre-leased asset evaluation, yield assessment, and lease structure review all demand sector-specific knowledge. A property consultant near me with commercial expertise saves organisations from committing to spaces with occupancy gaps or unfavourable lease escalation clauses.",
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "professionals",
      title: "Working Professionals",
      shortText: "Professionals buying property in the NCR for the first time often face the same challenge: limited time to research, high stakes if the decision goes wrong.",
      fullText: "Our real estate consultants in Noida do the verification work and condense it into clear, actionable options. One conversation, a curated shortlist, no repeat site visits to projects that were never right for your brief.",
      icon: <Laptop className="w-8 h-8" />,
      gradient: "from-gray-50 to-slate-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      id: "developers",
      title: "Real Estate Developers",
      shortText: "Developers working in the NCR market benefit from on-ground advisory on buyer demand patterns, pricing benchmarks, and inventory positioning.",
      fullText: "As a property consultant in Noida with deep local market knowledge, we provide market intelligence and advisory support that helps developers calibrate their offerings to what serious buyers are actually looking for.",
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

                    {/* Expandable content - always in DOM for crawlers; visibility toggled for UX */}
                    <div className={`pt-4 border-t border-gray-200 mt-4 ${isExpanded ? "block" : "hidden"}`}>
                      <p className="text-sm text-[#4A4F55] leading-relaxed text-justify">
                        {audience.fullText}
                      </p>
                    </div>

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

