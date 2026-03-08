"use client";

import { ResidentialStickyForm } from "@/components/residential-sticky-form";
import { CommercialStickyForm } from "@/components/commercial-sticky-form";

type Variant = "residential" | "commercial";

const COPY: Record<Variant, { headline: string; subtext: string }> = {
  residential: {
    headline: "Tell us what you need. We'll shortlist and verify before you visit.",
    subtext: "Consultants shortlist, verify, and walk you through options before any site visit.",
  },
  commercial: {
    headline: "Commercial advice. No pitch, no pressure.",
    subtext: "We shortlist and verify options; you visit only what fits.",
  },
};

type Props = {
  variant?: Variant;
  headline?: string;
  subtext?: string;
};

export function ConsultationSidebar({ variant = "residential", headline: headlineProp, subtext: subtextProp }: Props) {
  const fallback = COPY[variant];
  const headline = headlineProp ?? fallback.headline;
  const subtext = subtextProp ?? fallback.subtext;
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
