"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, MessageSquare } from "lucide-react";
import { PERIGON_VASUNDHARA_PROJECT_NAME, PERIGON_VASUNDHARA_SLUG } from "@/lib/perigon-vasundhara-assets";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";

export function PerigonVasundharaFooterCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BrochureDownloadDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyName={PERIGON_VASUNDHARA_PROJECT_NAME}
        propertySlug={PERIGON_VASUNDHARA_SLUG}
      />
      <section
        id="perigon-vasundhara-footer-cta"
        className="relative overflow-hidden bg-gradient-to-br from-[#161412] via-[#2a2420] to-[#161412] py-16 md:py-20"
        aria-label={`Enquire about ${PERIGON_VASUNDHARA_PROJECT_NAME}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-[#CBB27A] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#CBB27A] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="mx-auto max-w-2xl text-center sm:max-w-3xl">
            <h2
              className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Want the brief on <span className="text-[#CBB27A]">{PERIGON_VASUNDHARA_PROJECT_NAME}</span>?
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Limited inventory. Early EOI is open. Official name and RERA are not out yet.
            </p>
            <div className="mt-8 mx-auto flex w-max max-w-full flex-col items-stretch gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#CBB27A] px-6 text-sm font-bold text-gray-900 shadow-lg transition hover:bg-[#b8a066] sm:h-[3.25rem] sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Download className="h-5 w-5 shrink-0" aria-hidden />
                Request brochure
              </button>
              <Link
                href="/request-a-free-consultation"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-white/80 bg-transparent px-6 text-sm font-bold text-white transition hover:bg-white/10 sm:h-[3.25rem] sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MessageSquare className="h-5 w-5 shrink-0 text-[#CBB27A]" aria-hidden />
                Book a free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
