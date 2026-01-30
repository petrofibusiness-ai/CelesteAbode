"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2 } from "lucide-react";

const LOCATION_OPTIONS = [
  { value: "", label: "Select location preference" },
  { value: "Noida", label: "Noida" },
  { value: "Greater Noida", label: "Greater Noida" },
  { value: "Yamuna Expressway", label: "Yamuna Expressway" },
  { value: "Delhi NCR (All)", label: "Delhi NCR (All)" },
  { value: "Not sure yet", label: "Not sure yet" },
];

function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[\+]?[0-9\s\-\(\)]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 12) return false;
  if (digits.length === 11 && !digits.startsWith("0") && !trimmed.startsWith("+")) return false;
  if (digits.length === 12 && !trimmed.startsWith("+")) return false;
  if (/^0+$/.test(digits)) return false;
  if (/^(\d)\1{9,}$/.test(digits)) return false;
  const seq = (s: string) => {
    for (let i = 0; i < s.length - 1; i++)
      if (parseInt(s[i + 1]) !== (parseInt(s[i]) + 1) % 10) return false;
    return s.length >= 10;
  };
  const rev = (s: string) => {
    for (let i = 0; i < s.length - 1; i++)
      if (parseInt(s[i + 1]) !== (parseInt(s[i]) - 1 + 10) % 10) return false;
    return s.length >= 10;
  };
  return !seq(digits) && !rev(digits);
}

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationPopup({ isOpen, onClose }: ConsultationPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    locationPreference: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+\s\-()]/g, "");
    setFormData((prev) => ({ ...prev, phone: value }));
    setError("");
    if (value.trim() && !isValidPhone(value))
      setPhoneError("Please enter a valid 10–12 digit number (use + for country code)");
    else setPhoneError("");
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40, 35, 36].indexOf(e.keyCode) !== -1) return;
    if (e.ctrlKey && [65, 67, 86, 88].indexOf(e.keyCode) !== -1) return;
    if (!/^[0-9+\s\-()]$/.test(e.key)) e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone") return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setPhoneError("");

    if (!formData.phone.trim()) {
      setPhoneError("Phone number is required");
      setIsSubmitting(false);
      return;
    }
    if (!isValidPhone(formData.phone)) {
      setPhoneError("Please enter a valid phone number");
      setIsSubmitting(false);
      return;
    }
    if (!formData.locationPreference) {
      setError("Please select a location preference");
      setIsSubmitting(false);
      return;
    }

    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || formData.name.trim() || "Consultation";
    const lastName = nameParts.slice(1).join(" ") || "Guest";
    const message =
      formData.notes.trim().length >= 10
        ? `Consultation request. Location: ${formData.locationPreference}. ${formData.notes.trim()}`
        : `Consultation request. Location preference: ${formData.locationPreference}.`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: formData.phone.trim(),
          message,
          formSource: "consultation",
          locationPreference: formData.locationPreference,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", locationPreference: "", notes: "" });
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-border/80 px-5 py-4 rounded-t-2xl z-10 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground">Schedule a Consultation</h2>
                <p className="text-xs text-muted-foreground mt-0.5">We’ll confirm a time that works for you</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBB27A]/10 mb-4">
                    <CheckCircle2 className="w-7 h-7 text-[#CBB27A]" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Request received</h3>
                  <p className="text-sm text-muted-foreground">
                    We’ll contact you within 12–24 hours to confirm your consultation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="consult-name" className="block text-sm font-semibold text-foreground mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="consult-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="consult-phone" className="block text-sm font-semibold text-foreground mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="consult-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      required
                      inputMode="tel"
                      className={`w-full px-3 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent text-sm ${
                        phoneError ? "border-red-500" : "border-border"
                      }`}
                      placeholder="e.g. +91 9818735258"
                    />
                    {phoneError && <p className="mt-1.5 text-sm text-red-600">{phoneError}</p>}
                  </div>

                  <div>
                    <label htmlFor="consult-location" className="block text-sm font-semibold text-foreground mb-1.5">
                      Location Preference *
                    </label>
                    <select
                      id="consult-location"
                      name="locationPreference"
                      value={formData.locationPreference}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent text-sm"
                    >
                      {LOCATION_OPTIONS.map((opt) => (
                        <option key={opt.value || "empty"} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-notes" className="block text-sm font-semibold text-foreground mb-1.5">
                      Additional notes <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="consult-notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent resize-none text-sm"
                      placeholder="Preferred date, property type, or budget"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name.trim() ||
                      !formData.phone.trim() ||
                      !isValidPhone(formData.phone) ||
                      !formData.locationPreference
                    }
                    className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold text-sm hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Submitting…"
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        Request Consultation
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Prefer to chat?{" "}
                    <a
                      href="https://wa.me/919818735258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CBB27A] hover:underline font-medium"
                    >
                      Chat on WhatsApp
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
