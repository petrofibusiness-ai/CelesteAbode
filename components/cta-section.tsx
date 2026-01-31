"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Shield, CheckCircle, Users, CheckCircle2 } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { FAQSection } from "@/components/faq-section";

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Phone validation function (same as chatbot, but stricter)
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
    
    // If filtered value is different, update with filtered value
    if (filteredValue !== value) {
      e.target.value = filteredValue;
    }
    
    setFormData({
      ...formData,
      phone: filteredValue,
    });
    
    // Clear error when user starts typing
    if (error) setError("");
    
    // Validate phone number in real-time
    if (filteredValue.trim() && !isValidPhone(filteredValue)) {
      const digits = filteredValue.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !filteredValue.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !filteredValue.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    
    // Skip phone handling here - it's handled by handlePhoneChange
    if (name === "phone") {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setPhoneError("");
    
    // Validate phone number before submission
    if (!formData.phone.trim()) {
      setPhoneError("Phone number is required");
      setIsSubmitting(false);
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      const digits = formData.phone.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !formData.phone.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !formData.phone.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || formData.name;
      const lastName = nameParts.slice(1).join(" ") || "Not Provided";

      // Call the contact API endpoint which stores lead in database
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phone: formData.phone.trim(),
          message: formData.message.trim() || "Homepage footer CTA inquiry",
          formSource: "homepage-footer-cta", // Identify the source
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to submit form" }));
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSubmitted(true);
      setIsSubmitting(false);
      setPhoneError("");
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({ name: "", phone: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-0 pb-20 bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0">
        {/* Trust Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Accent Line */}
          <div className="w-16 h-0.5 bg-[#CBB27A] mx-auto mb-6"></div>

          {/* Trust Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Trusted by Thousands of{" "}
              <span className="text-[#CBB27A]">Families</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto font-poppins">
              Our unwavering commitment to excellence and client satisfaction
              has made us the preferred choice for discerning real estate
              investments.
            </p>
          </div>

          {/* Trust Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#CBB27A] flex-shrink-0" />
              <span className="text-sm font-medium text-ink">
                RERA Compliant
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#CBB27A] flex-shrink-0" />
              <span className="text-sm font-medium text-ink">
                Legal Verification
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#CBB27A] flex-shrink-0" />
              <span className="text-sm font-medium text-ink">
                Expert Guidance
              </span>
            </div>
          </div>
        </motion.div>

        {/* Frequently Asked Questions */}
        <div className="mb-12">
          <FAQSection />
        </div>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8 mb-12">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* CTA Section - Two Column Grid */}
        <motion.div
          className="max-w-6xl mx-auto w-full min-w-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start min-w-0">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 min-w-0"
            >
              <h2 className="heading-bold text-3xl md:text-4xl lg:text-5xl leading-tight break-words">
            Ready to Connect with Delhi NCR's{" "}
            <span className="text-[#CBB27A]">Trusted Real Estate Consultants?</span>
          </h2>


          {/* Contact Information */}
              <div className="pt-4 space-y-4">
            <a
              href="tel:+919818735258"
                  className="flex items-center gap-3 text-ink hover:text-[#CBB27A] transition-colors group"
            >
                  <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#CBB27A]" />
                  </div>
                  <span className="font-medium">+91 9818735258</span>
            </a>
            <div className="flex items-center gap-3 text-ink hover:text-[#CBB27A] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                <Mail className="w-5 h-5 text-[#CBB27A]" />
              </div>
              <ObfuscatedEmail
                variant="link"
                className="font-medium"
                showIcon={false}
              />
            </div>
          </div>
        </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-border w-full max-w-full lg:max-w-none min-w-0"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBB27A]/10 mb-4">
                    <CheckCircle2 className="w-7 h-7 text-[#CBB27A]" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3">
                    Thank You!
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-poppins">
                    Our team will contact you within{" "}
                    <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your requirements.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 min-w-0 w-full">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-600 font-poppins">{error}</p>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-ink mb-1.5"
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
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-ink mb-1.5"
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
                      required
                      inputMode="tel"
                      pattern="[0-9+\s\-()]*"
                      className={`w-full px-3 py-2.5 rounded-lg border bg-background text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm ${
                        phoneError ? "border-red-500" : "border-border"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {phoneError && (
                      <p className="mt-1.5 text-sm text-red-600 font-poppins">{phoneError}</p>
                    )}
      </div>
      
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all resize-none text-sm"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim() || !isValidPhone(formData.phone)}
                    className="w-full px-5 py-3 bg-[#000000] text-white rounded-lg font-semibold active:bg-[#1a1a1a] md:hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg active:shadow-xl md:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    whileHover={{ scale: (isSubmitting || !formData.name.trim() || !formData.phone.trim() || !isValidPhone(formData.phone)) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || !formData.name.trim() || !formData.phone.trim() || !isValidPhone(formData.phone)) ? 1 : 0.98 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
