"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/lib/structured-data";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [phoneError, setPhoneError] = useState("");

  // Phone validation function (same as CTA section)
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
    
    setFormData({
      ...formData,
      phone: filteredValue,
    });
    
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
    
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
    const { name, value } = e.target;
    
    // Skip phone handling here - it's handled by handlePhoneChange
    if (name === "phone") {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
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

    // Validate message length before submitting
    if (!formData.message || formData.message.trim().length < 10) {
      setSubmitStatus("error");
      setErrorMessage("Message must be at least 10 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          formSource: "contact-page",
        }),
      });

      // Try to parse response as JSON
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        // If response is not JSON, create a generic error
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (response.ok) {
        if (result.success) {
          setSubmitStatus("success");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
          setPhoneError("");
        } else {
          setSubmitStatus("error");
          setErrorMessage(result.error || "Failed to submit form");
        }
      } else {
        // Handle API error responses
        setSubmitStatus("error");
        const errorMsg = result.error || `Server error: ${response.status}`;
        
        // Check if it's a phone validation error
        if (errorMsg.includes("phone") || errorMsg.includes("Phone")) {
          setPhoneError(errorMsg);
          setErrorMessage("");
        } else {
          setErrorMessage(errorMsg);
        }
      }
    } catch (error) {
      // Only show network error for actual network failures
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setSubmitStatus("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      } else {
        // Show the actual error message
        setSubmitStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Contact", url: "https://www.celesteabode.com/contact" },
        ]}
      />
      <LocalBusinessSchema />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative pt-46 pb-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to start your journey towards finding your perfect
                property? Let's connect and discuss how we can help you achieve
                your real estate goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Contact Form & Info */}
        <Section className="py-16 bg-gradient-to-br from-background to-primary/5">
          <div className="max-w-7xl mx-auto">
            {/* Top Row: Form and Contact Details */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#CBB27A]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-[#CBB27A]" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        Send us a Message
                      </h2>
                      <p className="text-muted-foreground">
                        We'd love to hear from you
                      </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold text-primary"
                          >
                            First Name *
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="h-12 border-2 border-primary/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold text-primary"
                          >
                            Last Name *
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="h-12 border-2 border-primary/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-primary"
                          >
                            Phone Number *
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
                            required
                            className={`h-12 border-2 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg text-sm ${
                              phoneError 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                                : "border-primary/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"
                            }`}
                          />
                          {phoneError && (
                            <p className="text-sm text-red-600 font-poppins">{phoneError}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-primary"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12 border-2 border-primary/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-primary"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about your requirements, preferred locations, budget, or any specific questions you have..."
                          className="border-2 border-primary/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg resize-none text-sm"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#CBB27A]/5 to-primary/5 rounded-xl border border-[#CBB27A]/20">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          className="mt-1 w-4 h-4 text-[#CBB27A] border-2 border-[#CBB27A]/30 rounded focus:ring-[#CBB27A] focus:ring-2"
                        />
                        <label
                          htmlFor="consent"
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          I agree to receive communications from Celeste Abode
                          regarding my inquiry and related services. I
                          understand that I can unsubscribe at any time.
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || 
                          !formData.firstName.trim() || 
                          !formData.lastName.trim() || 
                          !formData.email.trim() || 
                          !formData.phone.trim() || 
                          !isValidPhone(formData.phone) ||
                          !formData.message.trim()
                        }
                        className="w-full h-12 bg-[#2b3035] hover:bg-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {submitStatus === "success" && (
                        <div className="text-center text-green-700 text-xs bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg border border-green-200 shadow-sm">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="font-medium">
                              Message sent successfully! We'll get back to you
                              within 2 hours.
                            </span>
                          </div>
                        </div>
                      )}

                      {submitStatus === "error" && errorMessage && (
                        <div className="text-center text-red-700 text-xs bg-gradient-to-r from-red-50 to-rose-50 p-2 rounded-lg border border-red-200 shadow-sm">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✕</span>
                            </div>
                            <span className="font-medium">{errorMessage}</span>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#CBB27A]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-[#CBB27A]" />
                      </div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        Contact Information
                      </h2>
                      <p className="text-muted-foreground">
                        Get in touch with us
                      </p>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        className="group p-4 bg-gradient-to-r from-[#CBB27A]/5 to-primary/5 rounded-xl border border-[#CBB27A]/20 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#CBB27A]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-5 h-5 text-[#CBB27A]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-primary mb-1 text-sm">
                              Phone
                            </h3>
                            <p className="text-primary font-semibold mb-1 text-sm">
                              +91 9818735258
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Available 24/7 for urgent inquiries
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="group p-4 bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 rounded-xl border border-primary/20 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-primary mb-1 text-sm">
                              Email
                            </h3>
                            <p className="text-primary font-semibold mb-1 text-sm">
                              <ObfuscatedEmail
                                variant="text"
                                showIcon={false}
                                className=""
                              />
                            </p>
                            <p className="text-xs text-muted-foreground">
                              We respond within 2 hours
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="group p-4 bg-gradient-to-r from-[#CBB27A]/5 to-primary/5 rounded-xl border border-[#CBB27A]/20 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#CBB27A]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="w-5 h-5 text-[#CBB27A]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-primary mb-1 text-sm">
                              Office Locations
                            </h3>
                            <p className="text-primary font-semibold mb-1 text-sm">
                              Celeste Abode, 615, 6th Floor, Galaxy Blue Sapphire Plaza,
                              Sector 4, Greater Noida (West), U.P - 201309.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Serving the entire NCR region
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="group p-4 bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 rounded-xl border border-primary/20 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-primary mb-1 text-sm">
                              Business Hours
                            </h3>
                            <p className="text-primary font-semibold mb-1 text-sm">
                              Monday - Saturday: 9:00 AM - 7:00 PM
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Sunday: By appointment only
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Row: Quick Actions */}
            <div className="flex justify-center">
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-[#CBB27A]/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="w-6 h-6 text-[#CBB27A]" />
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2">
                        Quick Actions
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with us instantly
                      </p>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-12 justify-center gap-3 font-medium bg-[#2b3035] hover:bg-black text-white transition-all duration-300 rounded-xl text-sm"
                          asChild
                        >
                          <a href="tel:+919818735258">
                            <Phone className="w-4 h-4" />
                            Call Now
                        </a>
                      </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full h-12 justify-center gap-3 font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-300 rounded-xl text-sm"
                          asChild
                      >
                        <a
                          href="https://wa.me/919818735258"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                              className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                            WhatsApp
                        </a>
                      </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Map Section */}
        <Section className="py-16 bg-gradient-to-br from-primary/5 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-bold text-primary mb-6">
                Our Service <span className="text-[#CBB27A]">Areas</span>
            </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover the premium locations where we provide our expert real
                estate services
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-[#CBB27A]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-[#CBB27A]" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                Interactive Map Coming Soon
              </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're working on an interactive map to show our service areas
                and office locations. For now, please contact us directly for
                specific location information.
              </p>
            </div>
            </motion.div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
    </>
  );
}
