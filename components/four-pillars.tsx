"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Database, Zap, Users, Shield, Sparkles, ArrowRight } from "lucide-react";

export function FourPillars() {
  const pillars = [
    {
      id: "data-driven",
      title: "Data-Driven Insights",
      description:
        "We believe every property decision should be guided by facts, not guesswork. Our proprietary analytics engine evaluates locality trends, price movements, and project performance, empowering you to compare, evaluate, and invest intelligently.",
      icon: <Database className="w-8 h-8" />,
    },
    {
      id: "ai-enabled",
      title: "AI-Enabled Recommendations",
      description:
        "Using advanced algorithms, we match your preferences, budget, lifestyle, commute, ROI goals, with verified projects that meet your needs. Each recommendation is ranked by growth potential and livability index, not just listings.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      id: "end-to-end",
      title: "End-to-End Advisory",
      description:
        "From initial consultation to site visits, virtual tours, documentation, and registration, Celeste Abode manages the entire process seamlessly. Our advisors work one-on-one to guide you through every financial and legal aspect.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      id: "transparent",
      title: "Transparent and Trusted",
      description:
        "We partner only with pre-vetted developers and maintain full disclosure on project approvals, construction progress, and legal status. Every buyer and investor enjoys a risk-free experience backed by reliable intelligence.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      id: "personalized",
      title: "Personalized Experience",
      description:
        "Our digital platform tailor's property journeys based on your goals, whether it's residential living, rental yield, or long-term capital growth. You receive curated recommendations, interactive dashboards, and transparent insights.",
      icon: <Sparkles className="w-8 h-8" />,
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
            Why Choose{" "}
            <span className="text-[#CBB27A]">Celeste Abode</span>
          </h2>
          <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
            We combine cutting-edge technology with expert insight to deliver
            intelligent, transparent, and personalized real estate advisory.
          </p>
        </motion.div>

        {/* Divider Line */}
        <div className="w-24 h-0.5 bg-[#CBB27A] mx-auto mb-16"></div>

        {/* Five Pillars Grid */}
        <div>
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 lg:mb-8">
            {pillars.slice(0, 3).map((pillar, index) => (
            <motion.div
              key={pillar.id}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
                <div className="text-[#CBB27A] mb-6 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-ink leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#CBB27A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

          {/* Second Row - 2 Cards Centered */}
          <div className="flex flex-wrap justify-center gap-8">
            {pillars.slice(3, 5).map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] lg:max-w-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              >
                {/* Icon */}
                <div className="text-[#CBB27A] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-ink leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#CBB27A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/advisory-philosophy"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border-2 border-black bg-transparent text-[#000000] hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Explore our philosophy"
          >
            Explore Our Philosophy
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
