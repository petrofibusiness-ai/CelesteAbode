"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, MessageSquare } from "lucide-react";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";

export function SobhaRivanaFooterCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BrochureDownloadDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyName="Sobha Rivana"
        propertySlug="sobha-rivana"
      />
      <section
        id="demo-footer-cta"
        className="relative overflow-hidden bg-gradient-to-br from-[#2B3035] via-[#1a1d22] to-[#2B3035] py-16 md:py-20"
        aria-label="Enquire about Sobha Rivana"
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
              Ready to explore{" "}
              <span className="text-[#CBB27A]">Sobha Rivana</span>?
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Download the brochure or book time with us — we coordinate site visits, decode the builder
              sheet with you, and place Rivana in context against other NCR options that match your brief.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#CBB27A] px-6 py-3 text-sm font-bold text-gray-900 shadow-lg transition hover:bg-[#b8a066] sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Download className="h-5 w-5" aria-hidden />
                Download brochure
              </button>
              <Link
                href="/request-a-free-consultation"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:text-base"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MessageSquare className="h-5 w-5 text-[#CBB27A]" aria-hidden />
                Contact Celeste Abode
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
