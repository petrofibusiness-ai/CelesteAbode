"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, X, Shield, TrendingUp, MapPin, Target } from "lucide-react";

export function PropertyEvaluationSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollPositionRef = useRef(0);
  const mobileLockAppliedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock background scroll when modal/panel is open (mobile: position fixed + save scroll; desktop: overflow hidden)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isExpanded) {
      if (isMobile) {
        scrollPositionRef.current = window.scrollY;
        body.style.position = "fixed";
        body.style.top = `-${scrollPositionRef.current}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
        html.style.overflow = "hidden";
        mobileLockAppliedRef.current = true;
      } else {
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
      }
    } else {
      if (isMobile && mobileLockAppliedRef.current) {
        mobileLockAppliedRef.current = false;
        html.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.overflow = "";
        body.style.touchAction = "";
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      } else {
        html.style.overflow = "";
        body.style.overflow = "";
      }
    }
    return () => {
      if (mobileLockAppliedRef.current) {
        mobileLockAppliedRef.current = false;
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
      html.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isExpanded, isMobile]);

  const evaluationCards = [
    {
      title: "Regulatory Standing",
      description: "Approval status, compliance, and delivery credibility are assessed first.",
      icon: Shield,
      gradient: "from-blue-50 to-indigo-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      title: "Price Context",
      description: "Pricing is evaluated relative to micro-market behaviour, not promotions.",
      icon: TrendingUp,
      gradient: "from-emerald-50 to-teal-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      title: "Location Behaviour",
      description: "Different NCR zones perform differently across market cycles.",
      icon: MapPin,
      gradient: "from-amber-50 to-orange-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
    {
      title: "Decision Alignment",
      description: "End-use, investment, or long-term holding suitability is clarified early.",
      icon: Target,
      gradient: "from-purple-50 to-pink-50",
      iconColor: "text-[#CBB27A]",
      iconBg: "bg-[#CBB27A]/10",
    },
  ];

  const panelContent = (
    <div className="space-y-5">
      <div className="prose prose-base max-w-none">
        <p className="text-[#4A4F55] leading-[1.7] text-sm md:text-base mb-5">
          Property evaluation begins with intent. A decision meant for immediate end-use requires a different assessment than one planned for rental income or long-term holding. Without clarity on purpose, even well-priced properties can lead to misaligned outcomes.
        </p>

        <div className="border-l-4 border-[#CBB27A]/40 pl-5 my-5">
          <p className="text-[#4A4F55] leading-[1.7] text-sm md:text-base mb-4">
            As a real estate consultant in Delhi NCR, Celeste Abode evaluates decisions by examining structure before surface appeal. Regulatory standing is reviewed to understand approval status and delivery credibility. Pricing is assessed within the context of the micro-market, not in isolation or against promotional benchmarks.
          </p>
        </div>

        <p className="text-[#4A4F55] leading-[1.7] text-sm md:text-base mb-5">
          Location behaviour plays a central role in NCR, where Noida, Delhi, Greater Noida, and the Yamuna Expressway operate under different demand cycles and infrastructure dependencies. Understanding how these areas absorb supply over time helps distinguish momentum from sustainability.
        </p>

        <div className="bg-gradient-to-r from-[#CBB27A]/5 via-transparent to-transparent p-5 rounded-lg border-l-2 border-[#CBB27A]/30 my-5">
          <p className="text-[#2B3035] leading-[1.7] text-sm md:text-base font-medium">
            The final layer of evaluation focuses on alignment — whether the property suits the buyer's timeline, risk tolerance, and long-term objective.
          </p>
        </div>
      </div>
    </div>
  );

  // Mobile modal: render via Portal into document.body so it's never clipped and sits above header
  const mobileModalPortal =
    typeof document !== "undefined" &&
    isMobile &&
    createPortal(
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] touch-none"
              onClick={() => setIsExpanded(false)}
              aria-hidden="true"
              style={{ position: "fixed" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-h-[80vh] bg-white rounded-2xl shadow-2xl z-[10000] overflow-y-auto font-poppins overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-labelledby="evaluation-modal-title"
              style={{ position: "fixed" }}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h3 id="evaluation-modal-title" className="text-lg font-semibold text-[#2B3035] font-poppins">
                  How This Evaluation Works
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#4A4F55] hover:text-[#2B3035]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                <div className="text-sm leading-relaxed font-poppins">
                  {panelContent}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      {mobileModalPortal}
      <Section className="pt-20 md:pt-28 pb-16 md:pb-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2B3035] mb-3 tracking-tight">
              How Property Decisions Are Evaluated
            </h2>
            <p className="text-base md:text-lg text-[#4A4F55] leading-relaxed font-normal">
              Every recommendation follows a structured evaluation process designed to reduce risk and improve decision clarity.
            </p>
          </motion.div>
        </div>

        {/* Crawlable copy of "How This Evaluation Works" – always in DOM for SEO; visually hidden (sr-only) */}
        <div className="sr-only">
          <h3 id="evaluation-works-seo">How This Evaluation Works</h3>
          {panelContent}
        </div>

        {/* Desktop: Side Panel Layout | Mobile: Stacked Layout */}
        <div className="relative">
          {/* Cards Container - Desktop: Left Side | Mobile: Full Width */}
          <div className={`${isExpanded && !isMobile ? 'lg:w-1/2 lg:pr-8' : 'w-full'} transition-all duration-500`}>
            <div className={`grid gap-4 md:gap-6 lg:gap-8 ${
              isExpanded && !isMobile
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {evaluationCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full border border-gray-200/60 hover:border-[#CBB27A]/50 transition-all duration-300 bg-white shadow-sm hover:shadow-xl group relative overflow-hidden min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                      
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#CBB27A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <CardContent className="p-4 md:p-6 lg:p-8 relative z-10 text-center">
                        {/* Icon */}
                        <div className="mb-4 md:mb-5 lg:mb-6">
                          <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm mx-auto`}>
                            <Icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${card.iconColor} transition-colors duration-300`} />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#2B3035] mb-3 tracking-tight">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs md:text-sm lg:text-base text-[#4A4F55] leading-relaxed font-normal px-1">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Side Panel */}
          <AnimatePresence>
            {isExpanded && !isMobile && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:block hidden"
                  onClick={() => setIsExpanded(false)}
                />

                {/* Side Panel */}
                <motion.div
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100vw" }}
                  transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                  className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-[90vw] lg:w-1/2 max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
                >
                  {/* Panel Header with gradient */}
                  <div className="sticky top-0 bg-gradient-to-r from-white via-white to-gray-50/50 border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10 backdrop-blur-sm">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2B3035] mb-1">
                        How This Evaluation Works
                      </h3>
                      <p className="text-sm text-[#4A4F55]">
                        Understanding the structured approach
                      </p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#4A4F55] hover:text-[#2B3035] hover:scale-110"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="px-8 md:px-10 py-8 md:py-10 bg-gradient-to-b from-white to-gray-50/30">
                    {panelContent}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Mobile: Trigger Button */}
          {isMobile && !isExpanded && (
            <div className="mt-6 md:mt-8 max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => setIsExpanded(true)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50/30 to-gray-100/50 p-0.5 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#CBB27A]/20 via-[#CBB27A]/40 to-[#CBB27A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  {/* Main button content */}
                  <div className="relative bg-white rounded-[14px] py-3 px-4 flex items-center justify-between gap-3 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#CBB27A]/5 group-hover:to-[#CBB27A]/10">
                    {/* Content */}
                    <div className="flex-1 text-left min-w-0">
                      <span className="block text-sm md:text-base font-semibold text-[#2B3035] group-hover:text-[#CBB27A] transition-colors duration-300 mb-0.5">
                        See how this evaluation works in practice
                      </span>
                      <span className="text-xs text-[#4A4F55] group-hover:text-[#2B3035] transition-colors duration-300 font-medium">
                        Discover the structured approach
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#CBB27A]/10 to-[#CBB27A]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#CBB27A] group-hover:text-[#B8A068] transition-colors duration-300 rotate-90 group-hover:translate-x-1" />
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-full bg-[#CBB27A]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          )}

          {/* Desktop: Trigger Button (only when panel is closed) */}
          {!isMobile && !isExpanded && (
            <div className="mt-12 max-w-4xl mx-auto">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsExpanded(true)}
                className="w-full text-left flex items-center justify-between gap-3 py-3 px-5 border-2 border-gray-200 hover:border-[#CBB27A]/60 bg-gradient-to-r from-white to-gray-50/50 hover:from-[#CBB27A]/5 hover:to-[#CBB27A]/10 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <span className="text-sm md:text-base font-medium text-[#2B3035] group-hover:text-[#CBB27A] transition-colors">
                  See how this evaluation works in practice
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#4A4F55] group-hover:text-[#CBB27A] transition-colors hidden md:block">
                    Open
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#CBB27A] transition-transform duration-300 flex-shrink-0 rotate-90 group-hover:translate-x-1" />
                </div>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </Section>
    </>
  );
}

export default PropertyEvaluationSection;

