"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function AdvisorySessionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    propertyType: "",
    timeline: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/advisory-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          propertyType: "",
          timeline: "",
          location: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://www.celesteabode.com" },
            { name: "Advisory Session", url: "https://www.celesteabode.com/advisory-session" },
          ]}
        />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <section data-site-hero>
            <div className="max-w-2xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#CBB27A] rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Request Submitted Successfully
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Thank you for your interest in our advisory services. Our expert
                  team will review your requirements and contact you within 24
                  hours to schedule your personalized consultation.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base rounded-full"
                >
                  Return to Home
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      </>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Advisory Session", url: "https://www.celesteabode.com/advisory-session" },
        ]}
      />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section data-site-hero>
          <div className="max-w-2xl mx-auto px-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="heading-bold text-primary mb-4">
                Request Advisory Session
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Share your property goals and we'll create a personalized
                consultation tailored to your needs.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        required
                        className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your.email@example.com"
                        required
                        className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-foreground"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 98765 43210"
                        required
                        className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="budget"
                        className="text-sm font-medium text-foreground"
                      >
                        Budget Range *
                      </Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          handleInputChange("budget", value)
                        }
                      >
                        <SelectTrigger className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-50">
                            Under ₹50 Lakhs
                          </SelectItem>
                          <SelectItem value="50-100">
                            ₹50 Lakhs - ₹1 Crore
                          </SelectItem>
                          <SelectItem value="100-200">
                            ₹1 Crore - ₹2 Crore
                          </SelectItem>
                          <SelectItem value="200-500">
                            ₹2 Crore - ₹5 Crore
                          </SelectItem>
                          <SelectItem value="500-plus">₹5 Crore+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="propertyType"
                        className="text-sm font-medium text-foreground"
                      >
                        Property Type *
                      </Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          handleInputChange("propertyType", value)
                        }
                      >
                        <SelectTrigger className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="plot">Residential Plot</SelectItem>
                          <SelectItem value="commercial">
                            Commercial Property
                          </SelectItem>
                          <SelectItem value="investment">
                            Investment Property
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="timeline"
                        className="text-sm font-medium text-foreground"
                      >
                        Timeline *
                      </Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) =>
                          handleInputChange("timeline", value)
                        }
                      >
                        <SelectTrigger className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            Immediate (0-3 months)
                          </SelectItem>
                          <SelectItem value="short">
                            Short term (3-6 months)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium term (6-12 months)
                          </SelectItem>
                          <SelectItem value="long">
                            Long term (1+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred Location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="e.g., Gurgaon, Noida, Delhi, etc."
                      className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Additional Requirements
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your specific needs, preferences, or any questions you have..."
                      rows={4}
                      className="border-muted-foreground/20 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Request Advisory Session
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}
