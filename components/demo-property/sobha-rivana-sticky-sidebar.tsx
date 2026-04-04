"use client";

import { useState, type FormEvent } from "react";
import { Download, Loader2 } from "lucide-react";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import { isValidPhone, isValidName, sanitizeInput } from "@/lib/security";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29641.97145142861!2d77.39002720241957!3d28.55566019520524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef32213980d5%3A0xd250f82d12a9cc79!2sSobha%20Rivana!5e1!3m2!1sen!2sin!4v1774780221315!5m2!1sen!2sin";

export function SobhaRivanaMapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg md:rounded-3xl ${className}`}>
      <iframe
        src={MAPS_EMBED_SRC}
        title="Sobha Rivana on Google Maps"
        className="h-[min(420px,70vw)] w-full border-0 sm:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function SobhaRivanaStickySidebar({ idPrefix = "demo" }: { idPrefix?: string }) {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePhoneChange = (v: string) => {
    const filtered = v.replace(/[^0-9+\s\-()]/g, "");
    setPhone(filtered);
    if (submitError) setSubmitError("");
    if (filtered.trim() && !isValidPhone(filtered)) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      setSubmitError("Name and phone are required.");
      return;
    }
    const parts = trimmedName.split(/\s+/);
    const firstName = sanitizeInput(parts[0] || trimmedName);
    const lastName = sanitizeInput(parts.slice(1).join(" ") || "Not Provided");
    if (!isValidName(firstName) || !isValidName(lastName)) {
      setSubmitError("Please enter a valid name (letters, 2+ characters per part).");
      return;
    }
    if (!isValidPhone(trimmedPhone)) {
      setPhoneError("Enter a valid phone number");
      return;
    }

    const message =
      "Request for a callback about Sobha Rivana (Sector 1, Greater Noida West). Submitted from the demo property page.";

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: sanitizeInput(trimmedPhone),
          message,
          formSource: "demo-property-sobha-rivana",
          propertyTitle: "Sobha Rivana",
          propertyLocation: "Sector 1, Greater Noida West",
          propertySlug: "sobha-rivana",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(typeof data.error === "string" ? data.error : "Something went wrong. Try again.");
        return;
      }
      setIsDone(true);
      setName("");
      setPhone("");
      setTimeout(() => setIsDone(false), 5000);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BrochureDownloadDialog
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        propertyName="Sobha Rivana"
        propertySlug="sobha-rivana"
      />
      <div
        className="property-inquiry-dark-card rounded-2xl border border-[#CBB27A]/40 p-5 sm:p-6 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 [color-scheme:dark]"
        style={{
          fontFamily: "Poppins, sans-serif",
          background: "linear-gradient(165deg, #0f0f0f 0%, #030303 42%, #141414 100%)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[#CBB27A]/90">Sobha Rivana</p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-white">Request a callback</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Share your details — a Celeste Abode advisor calls back with a focused briefing on Rivana:
          formats, pricing bands, and how it stacks up for your budget and commute.
        </p>

        {isDone ? (
          <div className="mt-5 rounded-xl border border-[#CBB27A]/30 bg-[#CBB27A]/10 px-4 py-4 text-center text-sm text-white">
            Thanks — we&apos;ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor={`${idPrefix}-inquiry-name`} className="mb-1 block text-xs font-semibold text-gray-400">
                Name
              </label>
              <input
                id={`${idPrefix}-inquiry-name`}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#CBB27A] focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-inquiry-phone`} className="mb-1 block text-xs font-semibold text-gray-400">
                Phone
              </label>
              <input
                id={`${idPrefix}-inquiry-phone`}
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                required
                inputMode="tel"
                autoComplete="tel"
                className={`w-full rounded-xl border bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBB27A]/40 ${
                  phoneError ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-[#CBB27A]"
                }`}
                placeholder="Mobile number"
              />
              {phoneError ? <p className="mt-1 text-xs text-red-400">{phoneError}</p> : null}
            </div>
            {submitError ? <p className="text-xs text-red-400">{submitError}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !phone.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#CBB27A] py-3 text-sm font-bold text-black transition hover:bg-[#d4c068] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}

        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setBrochureOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-transparent py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Download className="h-4 w-4 text-[#CBB27A]" aria-hidden />
            Download brochure
          </button>
        </div>
      </div>
    </>
  );
}
