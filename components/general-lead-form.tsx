"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/lib/security";

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

  // Phone validation function (same as other forms)
  const isValidPhone = (value: string) => {
    const trimmed = value.trim();
    
    // First, check that input only contains allowed characters: digits, +, spaces, dashes, parentheses
    // Reject any letters or other invalid characters
    const allowedCharsRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!allowedCharsRegex.test(trimmed)) {
      return false;
    }
    
    // Extract only digits
    const digits = trimmed.replace(/\D/g, '');
    
    // Basic format check - must be 10-12 digits
    // 10 digits: local number (e.g., 9910906306)
    // 11-12 digits: with country code (e.g., +91 9910906306 = 12 digits, +1 5551234567 = 11 digits)
    if (digits.length < 10 || digits.length > 12) {
      return false;
    }
    
    // If 11 digits and doesn't start with 0, must start with + (country code required)
    // 11 digits starting with 0 are allowed without + (e.g., 09876543210)
    // 11 digits not starting with 0 need + (e.g., +1 5551234567)
    // 12 digits always need + (e.g., +91 9910906306)
    if (digits.length === 11 && !digits.startsWith('0') && !trimmed.startsWith('+')) {
      return false;
    }
    if (digits.length === 12 && !trimmed.startsWith('+')) {
      return false;
    }
    
    // Check for all zeros (0000000000, etc.)
    if (/^0+$/.test(digits)) {
      return false;
    }
    
    // Check for repeated numbers (1111111111, 2222222222, etc.)
    // Check if all digits are the same
    if (/^(\d)\1{9,}$/.test(digits)) {
      return false;
    }
    
    // Check for sequential numbers (1234567890, 0123456789, etc.)
    const isSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current + 1 (handles wrap-around like 9->0)
        if (next !== (current + 1) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    // Check for reverse sequential (9876543210, 987654321, etc.)
    const isReverseSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current - 1 (handles wrap-around like 0->9)
        if (next !== (current - 1 + 10) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    if (isSequential(digits) || isReverseSequential(digits)) {
      return false;
    }
    
    return true;
  };

  // Handle phone input to restrict invalid characters
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrow keys, home, end
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40, 35, 36].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    
    // Check if the key is a valid character: digits (0-9), +, -, space, (, )
    const key = e.key;
    const isValidChar = /^[0-9+\s\-()]$/.test(key);
    
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow digits, +, spaces, hyphens, and parentheses
    const filteredValue = value.replace(/[^0-9+\s\-()]/g, '');
    
    setFormData((prev) => ({
      ...prev,
      phone: filteredValue,
    }));
    
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
    
    // Validate phone number in real-time
    if (filteredValue.trim() && !isValidPhone(filteredValue)) {
      const digits = filteredValue.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !filteredValue.trim().startsWith('+')) {
        setErrors((prev) => ({ ...prev, phone: "11-digit numbers (not starting with 0) must start with + (country code required)" }));
      } else if (digits.length === 12 && !filteredValue.trim().startsWith('+')) {
        setErrors((prev) => ({ ...prev, phone: "12-digit numbers must start with + (country code required)" }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Skip phone handling here - it's handled by handlePhoneChange
    if (e.target.name === "phone") {
      return;
    }
    
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
      const digits = formData.phone.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !formData.phone.trim().startsWith('+')) {
        newErrors.phone = "11-digit numbers (not starting with 0) must start with + (country code required)";
      } else if (digits.length === 12 && !formData.phone.trim().startsWith('+')) {
        newErrors.phone = "12-digit numbers must start with + (country code required)";
      } else {
        newErrors.phone = "Please enter a valid phone number";
      }
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
      const lastName = nameParts.slice(1).join(" ") || "Not Provided";
      
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
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  inputMode="tel"
                  pattern="[0-9+\s\-()]*"
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
                disabled={
                  isSubmitting || 
                  !formData.name.trim() || 
                  !formData.phone.trim() || 
                  !isValidPhone(formData.phone)
                }
                className="w-full bg-black hover:bg-black/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
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

