"use client";

import { useState } from "react";
import { Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ArticleLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const [firstName, ...rest] = (formData.name || "").trim().split(/\s+/);
      const lastName = rest.join(" ") || "";
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || formData.name,
          lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "Blog article lead",
          source: "blog_article",
        }),
      });
      if (response.ok) {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f1112] to-[#1a1d1f] rounded-xl p-6 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-2 font-poppins">
        Talk to a <span className="text-[#CBB27A]">real advisor</span>
      </h3>
      <p className="text-sm text-white/80 mb-5 font-poppins">
        Share a few lines about what you&apos;re planning. We&apos;ll respond with clear next steps, project ideas and
        checks to keep in mind for your situation.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins"
        />
        <textarea
          name="message"
          placeholder="Your query (optional)"
          value={formData.message}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] text-sm font-poppins resize-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#CBB27A] text-white font-semibold rounded-lg hover:bg-[#B39A6A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-poppins"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
        </button>
      </form>
      <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
        <a
          href="tel:+919910906306"
          className="flex items-center gap-3 text-white/90 hover:text-[#CBB27A] text-sm font-poppins"
        >
          <Phone className="w-4 h-4 shrink-0" />
          +91 9910906306
        </a>
        <a
          href="mailto:support@celesteabode.com"
          className="flex items-center gap-3 text-white/90 hover:text-[#CBB27A] text-sm font-poppins"
        >
          <Mail className="w-4 h-4 shrink-0" />
          support@celesteabode.com
        </a>
      </div>
    </div>
  );
}
