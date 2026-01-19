"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  FileCheck,
  Globe,
  TrendingUp,
  Home,
  Video,
  ArrowRight,
} from "lucide-react";

export function CoreServices() {
  const services = [
    {
      id: "roi-strategy",
      title: "Personalized ROI-Driven Strategy",
      description:
        "Custom investment plans aligned with your financial goals, risk appetite, and timeline, built on data-driven market and yield analysis.",
      icon: <Target className="w-8 h-8" />,
    },
    {
      id: "transaction",
      title: "End-to-End Real Estate Transaction Consulting",
      description:
        "Complete transaction support from initial due diligence to possession, ensuring every legal and financial aspect is handled with precision.",
      icon: <FileCheck className="w-8 h-8" />,
    },
    {
      id: "nri",
      title: "NRI Real Estate Services",
      description:
        "Support for Non-Resident Indians, managing regulatory requirements, currency, and remote property with seamless digital processes.",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      id: "investment",
      title: "Real Estate Investment Advisory",
      description:
        "Strategic investment guidance with market intelligence, exit strategies, and portfolio optimization for maximum returns.",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      id: "luxury",
      title: "Luxury & Signature Residences",
      description:
        "Exclusive premium properties tailored to your lifestyle, design preferences, and legacy goals, including off-market opportunities.",
      icon: <Home className="w-8 h-8" />,
    },
    {
      id: "virtual",
      title: "Virtual Tours & Digital Consultations",
      description:
        "Advanced digital experiences that bring properties to life, enabling informed decisions from anywhere in the world.",
      icon: <Video className="w-8 h-8" />,
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
            Our <span className="text-[#CBB27A]">Core Services</span>
          </h2>
          <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
            Comprehensive real estate advisory solutions tailored to every need,
            from residential living to strategic investments.
          </p>
        </motion.div>

        {/* Divider Line */}
        <div className="w-24 h-0.5 bg-[#CBB27A] mx-auto mb-16"></div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="text-[#CBB27A] mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-ink leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#CBB27A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </motion.div>
          ))}
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
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border-2 border-black bg-transparent text-[#000000] hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Explore all services"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

