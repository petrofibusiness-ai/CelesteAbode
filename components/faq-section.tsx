"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I choose the right property in Delhi NCR?",
      answer: "Choosing the right property in Delhi NCR depends on budget alignment, location fundamentals, developer credibility, and long-term growth prospects. At Celeste Abode, our real estate advisory evaluates these factors together rather than focusing on listings alone, helping buyers make decisions based on suitability and risk, not urgency."
    },
    {
      question: "Is Delhi NCR a good market for real estate investment right now?",
      answer: "Delhi NCR continues to attract both end-users and long-term investors due to infrastructure development and diversified demand. However, investment outcomes vary by micro-market. Celeste Abode provides real estate consulting services based on data-led market analysis rather than broad market sentiment."
    },
    {
      question: "What legal checks are essential before buying property in Delhi NCR?",
      answer: "Buyers should verify RERA registration, land title, ownership history, project approvals, and agreement terms. Celeste Abode follows a structured legal due diligence process as part of its property consulting approach to help reduce regulatory and documentation-related risks."
    },
    {
      question: "Should I buy a ready-to-move or under-construction property in NCR?",
      answer: "The choice depends on possession timeline, budget flexibility, and risk tolerance. Under-construction properties may offer pricing advantages, while ready-to-move homes provide immediacy and clarity. Through real estate consulting, Celeste Abode helps buyers assess this decision objectively."
    },
    {
      question: "How can a real estate consultant add value beyond property listings?",
      answer: "A real estate consultant in Delhi NCR adds value through market comparison, legal verification, price benchmarking, and negotiation support. Celeste Abode operates as a consulting-led firm, focusing on informed decision-making rather than inventory push."
    },
    {
      question: "Is working with a real estate consultant in Delhi NCR worth it?",
      answer: "For buyers and investors navigating a complex market, working with a Best Real Estate Consultant in Delhi NCR helps reduce risk, save time, and avoid misaligned purchases. Celeste Abode's advisory model is designed to provide clarity and structure throughout the process."
    }
  ];

  return (
    <section className="pt-0 pb-0 bg-background">
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

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200/60 hover:border-[#CBB27A]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200 rounded-xl"
              >
                <h3 className="text-base md:text-lg font-semibold text-[#2B3035] pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#CBB27A] transition-transform duration-300 flex-shrink-0 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 border-t border-gray-100">
                      <p className="text-sm md:text-base text-[#4A4F55] leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}