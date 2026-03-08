"use client";

import { ResidentialStickyForm } from "@/components/residential-sticky-form";

export function ConsultationSidebar() {
  return (
    <div className="sticky top-28 self-start overflow-hidden rounded-2xl border border-[#CBB27A]/30 bg-gradient-to-b from-gray-900 to-gray-800 p-5 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto my-2">
      <h3 className="text-lg font-bold text-white font-poppins mb-1">
        Tell Us What You Need. We&apos;ll Do the Rest.
      </h3>
      <p className="text-sm text-white/80 font-poppins mb-5 leading-snug">
        Our consultants shortlist, verify, and walk you through every option before you visit a single site.
      </p>
      <ResidentialStickyForm />
    </div>
  );
}
