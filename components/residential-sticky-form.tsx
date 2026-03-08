"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[\+]?[0-9\s\-\(\)]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 12) return false;
  if (digits.length === 12 && !trimmed.startsWith("+")) return false;
  return true;
}

const PROPERTY_TYPES = [
  { value: "", label: "Property Type" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
  { value: "4 BHK+", label: "4 BHK+" },
  { value: "Villa", label: "Villa" },
  { value: "Plot", label: "Plot" },
];

const BUDGETS = [
  { value: "", label: "Your Budget" },
  { value: "50L to 1 Cr", label: "50L to 1 Cr" },
  { value: "1 Cr to 1.5 Cr", label: "1 Cr to 1.5 Cr" },
  { value: "1.5 Cr to 2.5 Cr", label: "1.5 Cr to 2.5 Cr" },
  { value: "2.5 Cr to 5 Cr", label: "2.5 Cr to 5 Cr" },
  { value: "5 Cr+", label: "5 Cr+" },
];

const TIMELINES = [
  { value: "", label: "Timeline" },
  { value: "Ready to buy now", label: "Ready to buy now" },
  { value: "Within 6 months", label: "Within 6 months" },
  { value: "Within a year", label: "Within a year" },
  { value: "Still researching", label: "Still researching" },
];

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent text-sm font-poppins";
const labelClass = "block text-sm font-semibold text-white mb-1.5 font-poppins";

export function ResidentialStickyForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+\s\-()]/g, "");
    setPhone(value);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40, 35, 36].indexOf(e.keyCode) !== -1) return;
    if (e.ctrlKey && [65, 67, 86, 88].indexOf(e.keyCode) !== -1) return;
    if (!/^[0-9+\s\-()]$/.test(e.key)) e.preventDefault();
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!phone.trim()) next.phone = "Phone number is required";
    else if (!isValidPhone(phone)) next.phone = "Please enter a valid phone number";
    if (!propertyType) next.propertyType = "Please select property type";
    if (!budget) next.budget = "Please select budget";
    if (!timeline) next.timeline = "Please select timeline";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = [
      `Property Type: ${propertyType}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
    ].join("\n");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/location-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message,
          location: "noida",
          locationDisplayName: "Noida",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setPropertyType("");
      setBudget("");
      setTimeline("");
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-5">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#CBB27A]/10 mb-4">
          <CheckCircle className="w-6 h-6 text-[#CBB27A]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2 font-poppins">Thank you</h3>
        <p className="text-sm text-white/80 leading-relaxed font-poppins">
          We&apos;ll call you within <span className="font-semibold text-[#CBB27A]">12–24 hours</span>. One call. No obligation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label htmlFor="res-name" className={labelClass}>Name</label>
        <input
          id="res-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: "" })); }}
          placeholder="Full name"
          className={inputClass}
        />
        {errors.name && <p className="text-xs text-red-400 mt-1 font-poppins">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="res-phone" className={labelClass}>Phone Number</label>
        <input
          id="res-phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onKeyDown={handlePhoneKeyDown}
          placeholder="Best number to reach you"
          className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && <p className="text-xs text-red-400 mt-1 font-poppins">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="res-pt" className={labelClass}>Property Type</label>
        <select
          id="res-pt"
          value={propertyType}
          onChange={(e) => { setPropertyType(e.target.value); if (errors.propertyType) setErrors((p) => ({ ...p, propertyType: "" })); }}
          className={inputClass}
        >
          {PROPERTY_TYPES.map((o) => (
            <option key={o.value || "pt"} value={o.value} className="bg-gray-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        {errors.propertyType && <p className="text-xs text-red-400 mt-1 font-poppins">{errors.propertyType}</p>}
      </div>

      <div>
        <label htmlFor="res-budget" className={labelClass}>Your Budget</label>
        <select
          id="res-budget"
          value={budget}
          onChange={(e) => { setBudget(e.target.value); if (errors.budget) setErrors((p) => ({ ...p, budget: "" })); }}
          className={inputClass}
        >
          {BUDGETS.map((o) => (
            <option key={o.value || "b"} value={o.value} className="bg-gray-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        {errors.budget && <p className="text-xs text-red-400 mt-1 font-poppins">{errors.budget}</p>}
      </div>

      <div>
        <label htmlFor="res-timeline" className={labelClass}>Timeline</label>
        <select
          id="res-timeline"
          value={timeline}
          onChange={(e) => { setTimeline(e.target.value); if (errors.timeline) setErrors((p) => ({ ...p, timeline: "" })); }}
          className={inputClass}
        >
          {TIMELINES.map((o) => (
            <option key={o.value || "t"} value={o.value} className="bg-gray-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        {errors.timeline && <p className="text-xs text-red-400 mt-1 font-poppins">{errors.timeline}</p>}
      </div>

      {errors.submit && <p className="text-xs text-red-400 text-center font-poppins">{errors.submit}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-3 bg-[#CBB27A] text-black rounded-lg font-semibold font-poppins hover:bg-[#CBB27A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Request a Callback"}
      </button>
      <p className="text-xs text-white/70 text-center font-poppins">
        One call. No obligation.
      </p>
    </form>
  );
}
