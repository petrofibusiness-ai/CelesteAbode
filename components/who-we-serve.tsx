"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  TrendingUp,
  Building2,
  Briefcase,
  Globe,
  Laptop,
} from "lucide-react";

export function WhoWeServe() {
  const audiences = [
    {
      id: "home-buyers",
      title: "Home Buyers & End-Users",
      description: "Consulting support for home buyers evaluating RERA-compliant residential properties in Noida, Greater Noida, and Yamuna Expressway, with focus on legal clarity and long-term suitability.",
      icon: <User className="w-7 h-7" />,
    },
    {
      id: "investors",
      title: "Real Estate Investors",
      description: "Data-driven property investment advisory in Delhi NCR, supported by ROI assessment, location intelligence, and market insights for informed investment decisions.",
      icon: <TrendingUp className="w-7 h-7" />,
    },
    {
      id: "nris",
      title: "NRIs & Global Indians",
      description: "Structured real estate consulting for NRIs seeking transparent, compliant property investments in NCR, with end-to-end guidance and remote decision support.",
      icon: <Globe className="w-7 h-7" />,
    },
    {
      id: "corporates",
      title: "Corporates & Institutions",
      description: "Strategic real estate consulting for corporates and institutions exploring commercial and investment opportunities across NCR.",
      icon: <Briefcase className="w-7 h-7" />,
    },
    {
      id: "developers",
      title: "Developers & Builders",
      description: "Market-led consulting for developers focused on project positioning, buyer intelligence, and sales strategy within NCR real estate markets.",
      icon: <Building2 className="w-7 h-7" />,
    },
    {
      id: "professionals",
      title: "Professionals & Entrepreneurs",
      description: "Consulting-led property guidance for professionals seeking premium residential properties in Delhi NCR, aligned with lifestyle and long-term value.",
      icon: <Laptop className="w-7 h-7" />,
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
            Who <span className="text-[#CBB27A]">We Serve</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium font-poppins">
            Real Estate Consulting Built for Diverse Needs Across Delhi NCR
          </h3>
        </motion.div>

        {/* Divider Line */}
        <div className="w-24 h-0.5 bg-[#CBB27A] mx-auto mb-16"></div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            // First row (0-2) links to properties, second row (3-5) links to services
            const linkUrl = index < 3 ? "/properties" : "/services";
            
            return (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
                <Link href={linkUrl}>
                  <div className="group relative bg-white rounded-xl p-6 shadow-md active:shadow-xl md:hover:shadow-xl transition-all duration-300 active:-translate-y-1 md:hover:-translate-y-1 border border-border cursor-pointer h-full">
              {/* Icon */}
              <div className="text-[#CBB27A] mb-4 group-hover:scale-110 transition-transform duration-300">
                {audience.icon}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-ink leading-tight">
                  {audience.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-poppins">
                  {audience.description}
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
      </div>
    </section>
  );
}

