"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Shield, CheckCircle, Users, CheckCircle2 } from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({ name: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="pt-0 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
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
            <p className="text-muted max-w-xl mx-auto">
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

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8 mb-12">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* CTA Section - Two Column Grid */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="heading-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Ready to find your{" "}
            <span className="text-[#CBB27A]">masterpiece?</span>
          </h2>

              <p className="text-lg text-muted leading-relaxed">
                Connect with our expert advisors for personalized guidance and exclusive property insights. We're here to help you make informed decisions about your next real estate investment.
              </p>

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
              className="bg-white rounded-2xl p-6 shadow-lg border border-border max-w-md lg:max-w-none"
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
                  <p className="text-sm text-muted leading-relaxed">
                    Our team will contact you within{" "}
                    <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your requirements.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                      placeholder="Enter your phone number"
                    />
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
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 bg-[#000000] text-white rounded-lg font-semibold active:bg-[#1a1a1a] md:hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg active:shadow-xl md:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
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
