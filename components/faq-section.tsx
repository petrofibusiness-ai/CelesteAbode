"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs";

/** First N FAQs to expand by default for SEO (visible content weight). */
const DEFAULT_OPEN_COUNT = 2;

export function FAQSection() {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(
    () => new Set(HOMEPAGE_FAQS.slice(0, DEFAULT_OPEN_COUNT).map((_, i) => i))
  );

  const toggle = (index: number) => {
    setOpenFAQs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const faqs = HOMEPAGE_FAQS;

  return (
    <section className="pt-0 pb-0 bg-background" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
            <HelpCircle className="w-8 h-8 text-[#CBB27A]" />
          </div>
          <h2 className="heading-bold text-primary mb-4">
            Frequently Asked <span className="text-[#CBB27A]">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-poppins">
            Common questions about property decisions, real estate consulting, and navigating the Delhi NCR market with expert guidance.
          </p>
        </motion.div>

        {/* FAQ Items – schema.org markup for explicit Q&A relationship */}
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200/60 hover:border-[#CBB27A]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={openFAQs.has(index)}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 rounded-xl"
              >
                <h3 className="text-base md:text-lg font-semibold text-[#2B3035] pr-4 leading-relaxed" itemProp="name">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#CBB27A] transition-transform duration-300 flex-shrink-0 ${
                    openFAQs.has(index) ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>

              {/* Answer always in DOM for crawlers; visibility toggled for UX */}
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={openFAQs.has(index) ? "block" : "hidden"}
              >
                <div className="px-6 md:px-8 pb-6 border-t border-gray-100">
                  <p className="text-sm md:text-base text-[#4A4F55] leading-relaxed pt-4" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
