"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/types/location";

/** First N FAQs to expand by default for SEO (visible content weight). */
const DEFAULT_OPEN_COUNT = 2;

interface LocationFAQsProps {
  faqs: FAQ[];
}

export default function LocationFAQs({ faqs }: LocationFAQsProps) {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(() =>
    new Set(faqs.slice(0, DEFAULT_OPEN_COUNT).map((_, i) => i))
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id || index}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-[#CBB27A]/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <button
            type="button"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openFAQs.has(index)}
            aria-controls={`location-faq-answer-${index}`}
            id={`location-faq-question-${index}`}
            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold text-gray-900 pr-4 font-poppins" itemProp="name">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openFAQs.has(index) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 text-[#CBB27A]"
              aria-hidden
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          {/* Answer always in DOM for crawlers; visibility toggled for UX */}
          <div
            id={`location-faq-answer-${index}`}
            role="region"
            aria-labelledby={`location-faq-question-${index}`}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            className={openFAQs.has(index) ? "block" : "hidden"}
          >
            <div className="px-6 py-5 pt-0 text-gray-600 font-poppins leading-relaxed" itemProp="text">
              {faq.answer}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

