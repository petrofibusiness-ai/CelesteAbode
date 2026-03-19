"use client";

import { SimpleLeadForm } from "@/components/simple-lead-form";
import { Phone, Mail } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export default function StickyCTANoida() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky-cta-container">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
          Get Expert Guidance
        </h3>
        <p className="text-sm text-gray-600 font-poppins mb-4">
          Speak with our Noida property experts
        </p>
        <div className="space-y-2">
          <a
            href="tel:+919910906306"
            className="flex items-center gap-2 text-sm font-medium text-[#CBB27A] hover:text-[#CBB27A]/80 transition-colors font-poppins"
          >
            <Phone className="w-4 h-4" />
            <span>+91 9910906306</span>
          </a>
          <div className="flex items-center gap-2 text-sm font-medium text-[#CBB27A] font-poppins">
            <Mail className="w-4 h-4" />
            <ObfuscatedEmail variant="link" className="text-[#CBB27A] hover:text-[#CBB27A]/80" showIcon={false} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <SimpleLeadForm
          propertyName="Properties in Noida"
          propertyLocation="Noida, Delhi NCR"
          segment="location-page-sticky"
        />
      </div>
    </div>
  );
}

