"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { isValidPhone } from "@/lib/security";

interface LocationContactFormProps {
  location: string;
  locationDisplayName?: string;
}

export function LocationContactForm({ 
  location, 
  locationDisplayName 
}: LocationContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/location-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message.trim(),
          location: location,
          locationDisplayName: locationDisplayName || location,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: "", phone: "", message: "" });
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          throw new Error(result.error || "Submission failed");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      setErrors({ 
        submit: error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBB27A]/10 mb-4">
            <CheckCircle className="w-7 h-7 text-[#CBB27A]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 font-poppins">
            Thank You!
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-poppins">
            Our team will contact you within{" "}
            <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your requirements.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white mb-1.5 font-poppins"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm font-poppins"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1 font-poppins">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-white mb-1.5 font-poppins"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm font-poppins"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 font-poppins">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-white mb-1.5 font-poppins"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all resize-none text-sm font-poppins"
              placeholder="Tell us about your requirements..."
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1 font-poppins">{errors.message}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-xs text-red-400 text-center font-poppins">{errors.submit}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-5 py-3 bg-[#CBB27A] text-black rounded-lg font-semibold active:bg-[#CBB27A]/90 md:hover:bg-[#CBB27A]/90 transition-all duration-300 shadow-lg active:shadow-xl md:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBB27A] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-poppins"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

