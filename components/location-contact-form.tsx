"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

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
    // 10 digits: local number (e.g., 9818735258)
    // 11-12 digits: with country code (e.g., +91 9818735258 = 12 digits, +1 5551234567 = 11 digits)
    if (digits.length < 10 || digits.length > 12) {
      return false;
    }
    
    // If 11 digits and doesn't start with 0, must start with + (country code required)
    // 11 digits starting with 0 are allowed without + (e.g., 09876543210)
    // 11 digits not starting with 0 need + (e.g., +1 5551234567)
    // 12 digits always need + (e.g., +91 9818735258)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              inputMode="tel"
              pattern="[0-9+\s\-()]*"
              required
              className={`w-full px-3 py-2.5 rounded-lg border bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm font-poppins ${
                errors.phone ? "border-red-500" : "border-white/20"
              }`}
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
            disabled={
              isSubmitting || 
              !formData.name.trim() || 
              !formData.phone.trim() || 
              !isValidPhone(formData.phone) ||
              !formData.message.trim()
            }
            className="w-full px-5 py-3 bg-[#CBB27A] text-black rounded-lg font-semibold active:bg-[#CBB27A]/90 md:hover:bg-[#CBB27A]/90 transition-all duration-300 shadow-lg active:shadow-xl md:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBB27A] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-poppins"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

