"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
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
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

/** NCR residential hero (same asset family as residential-property-in-noida). */
const FREE_CONSULTATION_SIDE_BG =
  "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/residential-property-in-noida/residential-property-in-noida.webp";

const fieldClass =
  "h-11 rounded-xl border-2 border-primary/15 bg-white shadow-sm transition-shadow focus-visible:border-[#CBB27A] focus-visible:ring-2 focus-visible:ring-[#CBB27A]/20 placeholder:text-muted-foreground/45 placeholder:font-normal";

const selectTriggerClass =
  "h-11 w-full rounded-xl border-2 border-primary/15 bg-white shadow-sm focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 data-[placeholder]:text-muted-foreground/45";

export default function RequestAFreeConsultationPage() {
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
            {
              name: "Free Consultation",
              url: "https://www.celesteabode.com/request-a-free-consultation",
            },
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
                    Thank you for your request. Our expert team will review your requirements and contact you within
                    24 hours to schedule your personalized free consultation.
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
          {
            name: "Free Consultation",
            url: "https://www.celesteabode.com/request-a-free-consultation",
          },
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 sm:pt-28 pb-16">
          <section
            className="border-b border-primary/5 bg-gradient-to-b from-background to-primary/[0.02]"
            data-site-hero
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left pt-8 sm:pt-12 md:pt-16 pb-10 md:pb-12"
              >
                <h1 className="heading-bold text-primary mb-4 text-3xl sm:text-4xl md:text-[2.25rem] leading-tight">
                  Request a Free Consultation
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-xl">
                  Share your property goals and we&apos;ll create a personalized consultation tailored to your needs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch pb-4">
                {/* Contact + follow-up — left on desktop, column fills form height */}
                <motion.aside
                  className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6 lg:h-full lg:min-h-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <div className="rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm shrink-0">
                    <h2 className="text-lg font-bold text-primary mb-4 font-poppins">
                      Contact us
                    </h2>
                    <ul className="space-y-5 text-sm">
                      <li className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CBB27A]/15">
                          <Phone className="h-5 w-5 text-[#CBB27A]" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Phone
                          </p>
                          <p className="font-semibold text-foreground mt-0.5">+91 9910906306</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Email
                          </p>
                          <p className="mt-0.5 break-all">
                            <ObfuscatedEmail variant="text" showIcon={false} className="text-sm font-medium" />
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Hours
                          </p>
                          <p className="text-muted-foreground mt-0.5">Open daily 9:30 AM – 6:30 PM</p>
                        </div>
                      </li>
                      <li className="flex gap-3 pt-2 border-t border-primary/10">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CBB27A]/15">
                          <MapPin className="h-5 w-5 text-[#CBB27A]" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Office
                          </p>
                          <p className="text-muted-foreground mt-0.5 leading-snug text-xs sm:text-sm">
                            615, 6th Floor, Galaxy Blue Sapphire Plaza, Sector 4, Greater Noida (West), U.P. 201309
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="relative isolate min-h-[220px] overflow-hidden rounded-2xl border border-primary/10 shadow-sm lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
                    <Image
                      src={FREE_CONSULTATION_SIDE_BG}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 380px, 100vw"
                      quality={75}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40"
                      aria-hidden
                    />
                    <div className="relative z-10 flex flex-1 flex-col justify-center p-6 sm:p-8">
                      <p className="text-center text-xl font-bold font-poppins leading-snug tracking-tight text-white drop-shadow-md sm:text-2xl">
                        Ready to connect with a trusted property consultant in Delhi NCR?
                      </p>
                    </div>
                  </div>
                </motion.aside>

                {/* Form — right on desktop */}
                <motion.div
                  className="lg:col-span-7 order-1 lg:order-2 w-full min-w-0 lg:h-full flex flex-col"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="rounded-2xl border border-primary/10 shadow-lg shadow-primary/5 overflow-hidden lg:flex-1 lg:flex lg:flex-col">
                    <CardContent className="p-6 sm:p-8">
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                              Full name *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Your full name"
                              required
                              className={fieldClass}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="you@email.com"
                              required
                              className={fieldClass}
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                              Phone *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+91 98765 43210"
                              required
                              className={fieldClass}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget" className="text-sm font-semibold text-foreground">
                              Budget range *
                            </Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleInputChange("budget", value)}
                            >
                              <SelectTrigger id="budget" className={selectTriggerClass}>
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-50">Under ₹50 lakhs</SelectItem>
                                <SelectItem value="50-100">₹50 lakhs – ₹1 crore</SelectItem>
                                <SelectItem value="100-200">₹1 crore – ₹2 crore</SelectItem>
                                <SelectItem value="200-500">₹2 crore – ₹5 crore</SelectItem>
                                <SelectItem value="500-plus">₹5 crore+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="propertyType" className="text-sm font-semibold text-foreground">
                              Property type *
                            </Label>
                            <Select
                              value={formData.propertyType}
                              onValueChange={(value) => handleInputChange("propertyType", value)}
                            >
                              <SelectTrigger id="propertyType" className={selectTriggerClass}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="plot">Residential plot</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="investment">Investment</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeline" className="text-sm font-semibold text-foreground">
                              Timeline *
                            </Label>
                            <Select
                              value={formData.timeline}
                              onValueChange={(value) => handleInputChange("timeline", value)}
                            >
                              <SelectTrigger id="timeline" className={selectTriggerClass}>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediate">0–3 months</SelectItem>
                                <SelectItem value="short">3–6 months</SelectItem>
                                <SelectItem value="medium">6–12 months</SelectItem>
                                <SelectItem value="long">1+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-semibold text-foreground">
                            Preferred location
                          </Label>
                          <Input
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="City or micro-market"
                            className={fieldClass}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-semibold text-foreground">
                            Additional requirements
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Anything we should know before we speak…"
                            rows={4}
                            className={`${fieldClass} min-h-[100px] resize-y py-3`}
                          />
                        </div>

                        <div className="pt-2">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-full bg-[#0f1112] text-[#CBB27A] hover:bg-black hover:text-[#d4c28a] font-semibold text-base shadow-md shadow-black/20 border border-[#CBB27A]/35 hover:border-[#CBB27A]/55 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                                Submitting…
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" aria-hidden />
                                Request a free consultation
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

