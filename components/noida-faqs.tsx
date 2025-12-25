"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function NoidaFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: "noida-best-sectors",
      question: "Which are the best sectors to buy property in Noida?",
      answer:
        "Sector 62, Sector 150, Noida Extension (Sectors 143, 144, 145), and Sector 137 are among the most sought-after sectors in Noida. These areas offer excellent connectivity, planned infrastructure, and strong appreciation potential. Our team can help you identify the best sector based on your budget, lifestyle needs, and investment goals.",
    },
    {
      id: "rera-noida",
      question: "Are all properties in Noida RERA-compliant?",
      answer:
        "Not all properties are RERA-compliant. However, at Celeste Abode, we only recommend RERA-registered projects. This ensures legal protection, transparency in transactions, and timely project completion. We verify RERA registration numbers and project credentials before recommending any property to our clients.",
    },
    {
      id: "noida-metro-connectivity",
      question: "How is the metro connectivity in Noida?",
      answer:
        "Noida has excellent metro connectivity via the Blue Line (Delhi Metro) and the Aqua Line (Noida-Greater Noida Metro). The Blue Line connects Noida to central Delhi, while the Aqua Line connects all major sectors within Noida and extends to Greater Noida. Most premium sectors are within walking distance or a short auto-rickshaw ride from metro stations.",
    },
    {
      id: "noida-investment-returns",
      question: "What kind of returns can I expect from property investment in Noida?",
      answer:
        "Property values in Noida have shown consistent appreciation, especially in well-planned sectors. While past performance doesn't guarantee future returns, properties in prime sectors like 62, 150, and Noida Extension have historically shown 8-12% annual appreciation. However, investment returns depend on location, project quality, and market conditions. Our data-driven analysis helps identify properties with strong appreciation potential.",
    },
    {
      id: "noida-possession-delays",
      question: "How common are possession delays in Noida projects?",
      answer:
        "Possession delays can occur, but RERA has significantly improved project delivery timelines. RERA-registered projects must adhere to strict timelines, and any delays require developer compensation. We help you verify project timelines, track construction progress, and ensure you're protected under RERA regulations. Our team also checks developer track records before recommending projects.",
    },
    {
      id: "noida-legal-verification",
      question: "What legal documents should I verify before buying property in Noida?",
      answer:
        "Essential documents include: RERA Registration Certificate, Building Plan Approval from Noida Authority, Title Deed, Encumbrance Certificate, Occupancy Certificate (for ready properties), and NOC from various authorities. Our team conducts comprehensive legal verification, including title search, RERA compliance check, and document authentication, ensuring your investment is legally secure.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-[#CBB27A]/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold text-gray-900 pr-4 font-poppins">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 text-[#CBB27A]"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-5 pt-0 text-gray-600 font-poppins leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

