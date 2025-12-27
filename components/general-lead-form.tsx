"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidPhone, isValidEmail } from "@/lib/security";

interface GeneralLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GeneralLeadForm({
  isOpen,
  onClose,
  title = "Get Expert Consultation",
  subtitle = "Fill in your details and our team will get back to you shortly.",
  source = "properties-page",
}: GeneralLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || formData.name;
      const lastName = nameParts.slice(1).join(" ") || "N/A";
      
      // Use chatbot API which handles optional email better
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.name,
          phoneNumber: formData.phone,
          email: formData.email || "",
          contactPreference: formData.email ? "Email" : "WhatsApp & Call",
          userIntent: "Talk to an expert",
          propertyType: "General Inquiry",
          preferredLocation: formData.location || "All Locations",
          budgetRange: "Not specified",
          timeline: "Not specified",
          leadScore: "High",
          wantsExpertCall: true,
          wantsVirtualTour: false,
          wantsPriceComparison: false,
          wantsBestProjects: false,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", location: "" });
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#CBB27A]/10 to-[#CBB27A]/5 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-poppins">{title}</h2>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1 font-poppins">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                Thank You!
              </h3>
              <p className="text-sm text-gray-600 font-poppins">
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full border-gray-300 focus:border-black focus:ring-black ${errors.name ? "border-red-500" : ""}`}
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 font-poppins">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full border-gray-300 focus:border-black focus:ring-black ${errors.phone ? "border-red-500" : ""}`}
                  required
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 font-poppins">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Email <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full border-gray-300 focus:border-black focus:ring-black ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-poppins">{errors.email}</p>
                )}
              </div>

              {/* Location Interest */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                  Preferred Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none font-poppins text-sm"
                >
                  <option value="">Select a location</option>
                  <option value="Noida">Noida</option>
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Yamuna Expressway">Yamuna Expressway</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="All Locations">All Locations</option>
                </select>
              </div>

              {errors.submit && (
                <p className="text-xs text-red-500 text-center font-poppins">{errors.submit}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 font-poppins"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

