"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface SimpleLeadFormProps {
  propertyName?: string;
  propertyLocation?: string;
  segment?: string;
}

export function SimpleLeadForm({
  propertyName,
  propertyLocation,
  segment = "location-page",
}: SimpleLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: "", phone: "", email: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#CBB27A]/10 mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#CBB27A]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-sm text-gray-600 font-poppins">
          Our team will contact you within{" "}
          <span className="font-semibold text-[#CBB27A]">12-24 hours</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1.5 block font-poppins">
          Name *
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="h-10 text-sm font-poppins"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-1.5 block font-poppins">
          Phone Number *
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className="h-10 text-sm font-poppins"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1.5 block font-poppins">
          Email <span className="text-gray-400 font-normal">(Optional)</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="h-10 text-sm font-poppins"
          placeholder="Enter your email"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 bg-black text-white hover:bg-black/90 font-semibold font-poppins"
      >
        {isSubmitting ? "Submitting..." : "Get Expert Guidance"}
      </Button>
    </form>
  );
}

