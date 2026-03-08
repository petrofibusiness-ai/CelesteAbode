"use client";

import { ResidentialStickyForm } from "@/components/residential-sticky-form";
import { CommercialStickyForm } from "@/components/commercial-sticky-form";

type Variant = "residential" | "commercial";

const COPY: Record<Variant, { headline: string; subtext: string }> = {
  residential: {
    headline: "Get a Verified Shortlist—No Guesswork.",
    subtext: "Our consultants shortlist, verify, and walk you through every option before you visit a single site.",
  },
  commercial: {
    headline: "Commercial Advice. No Pitch, No Pressure.",
    subtext: "Our commercial advisors shortlist, verify, and walk you through every option before you visit a single site.",
  },
};

export function ConsultationSidebar({ variant = "residential" }: { variant?: Variant }) {
  const { headline, subtext } = COPY[variant];
  return (
    <div className="sticky top-28 self-start overflow-hidden rounded-2xl border border-[#CBB27A]/30 bg-gradient-to-b from-gray-900 to-gray-800 p-5 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto my-2">
      <h3 className="text-lg font-bold text-white font-poppins mb-1">
        {headline}
      </h3>
      <p className="text-sm text-white/80 font-poppins mb-5 leading-snug">
        {subtext}
      </p>
      {variant === "commercial" ? <CommercialStickyForm /> : <ResidentialStickyForm />}
    </div>
  );
}
