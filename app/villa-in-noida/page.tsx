"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Loader2, 
  MessageCircle, 
  Phone, 
  Mail, 
  Home,
  Building2,
  MapPin,
  TrendingUp,
  Shield,
  Sparkles,
  Heart,
  Users,
  Globe,
  Award,
  Zap,
  ArrowRight,
  Star
} from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function VillaInNoidaPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

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
          phone: formData.phone,
          message: formData.message || `Interested in Villa in Noida`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setSubmitError(data.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-background via-primary/5 to-[#CBB27A]/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary leading-tight">
                Villa in Noida – Where Luxury{" "}
                <span className="text-[#CBB27A]">Finds Its True Home</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light italic mb-4">
                From Spaces You Live In to Spaces You Belong To
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent mx-auto mt-6"
              />
            </motion.div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                In the heart of India's most connected city, Noida, a new definition of luxury living is taking shape - elegant villas designed not just to house your lifestyle, but to elevate it. Explore our curated collection of <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">luxury properties in Noida</Link> to discover villas that match your aspirations.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                At <span className="text-[#CBB27A] font-semibold">Celeste Abode</span>, we believe a home should be more than architecture - it should be an emotion. A sanctuary where design meets desire, and sophistication meets serenity. Learn more about our <Link href="/services" className="text-[#CBB27A] hover:underline font-semibold">real estate consulting services</Link> and how we help you find the perfect villa.
              </p>
            </motion.div>

            {/* The Essence Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Sparkles className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                The Essence of a Noida Villa
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
                <p>
                  Every villa in Noida we curate tells a story - of space, sunlight, and subtle grandeur. Whether you're drawn to the lush green avenues of Sector 150, the tranquil neighbourhoods of Noida Extension, or the premium elegance near the Noida Expressway, each location offers a unique blend of comfort and connectivity.
                </p>
                <p>
                  Our villas are thoughtfully designed with expansive living areas, landscaped gardens, private terraces, and the kind of quiet luxury that makes every day feel extraordinary.
                </p>
              </div>
            </motion.div>

            {/* Why Choose Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <Award className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Why Choose a Villa in Noida?
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  Because luxury isn't about location - it's about lifestyle.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="w-6 h-6" />,
                    title: "Space to Breathe",
                    description: "Independent villas offer the freedom of open layouts, personal gardens, and privacy unmatched by apartments.",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Strategic Connectivity",
                    description: "Noida connects seamlessly to Delhi, Gurugram, and Greater Noida via expressways, metro, and upcoming airport routes.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Investment Value",
                    description: "Noida's real estate market continues to thrive, making villas a high-appreciation, low-risk asset.",
                  },
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Quality of Life",
                    description: "With international schools, hospitals, shopping districts, and golf courses nearby - every comfort is within reach.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-2xl border border-[#CBB27A]/20 hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#CBB27A]/10 flex items-center justify-center text-[#CBB27A]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2 text-lg">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Celeste Abode Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Building2 className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Celeste Abode – Crafting Lifestyle-Aligned Homes
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Celeste Abode, we go beyond transactions - we understand aspirations. Our consultants blend lifestyle mapping, legal diligence, and investment foresight to help you find a villa that reflects who you are. Discover our <Link href="/philosophy" className="text-[#CBB27A] hover:underline font-semibold">philosophy</Link> and <Link href="/services" className="text-[#CBB27A] hover:underline font-semibold">comprehensive services</Link> designed to make your property journey seamless.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {[
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "AI-Driven Matching",
                      description: "To pair you with properties that fit your vision and values.",
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "RERA-Verified Listings",
                      description: "For complete legal peace of mind.",
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "ROI Transparency",
                      description: "So you know where your investment truly stands.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-white rounded-2xl shadow-md border border-border hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#CBB27A]/10 flex items-center justify-center text-[#CBB27A] mx-auto mb-4">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed italic mt-8">
                  Because we don't just sell homes - we help you build legacies.
                </p>
              </div>
            </motion.div>

            {/* Popular Locations Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-3xl p-8 md:p-12 border border-[#CBB27A]/20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MapPin className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Popular Villa Locations in Noida
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Sector 150",
                    description: "Green luxury, golf-course views, and premium gated communities.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Noida Expressway",
                    description: "High-rise convenience meets villa serenity.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Noida Extension",
                    description: "Expanding residential hub with modern infrastructure.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 44 & 47",
                    description: "Established villa zones with timeless charm.",
                    icon: <Star className="w-5 h-5" />,
                  },
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-[#CBB27A] flex-shrink-0">{location.icon}</div>
                      <div>
                        <h3 className="font-semibold text-primary mb-2 text-lg">{location.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{location.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                Whether you seek a 3 BHK contemporary villa, a 4 BHK premium residence, or a custom-built estate, Noida offers options that balance beauty, space, and investment potential. <Link href="/properties" className="text-[#CBB27A] hover:underline font-semibold">Browse all properties</Link> or <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">view Noida properties</Link> to find your perfect match.
              </p>
            </motion.div>

            {/* Who Should Consider Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Users className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                Who Should Consider a Villa in Noida?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Families Seeking Space & Security",
                    description: "Private gardens, gated communities, and abundant amenities.",
                    icon: <Heart className="w-6 h-6" />,
                  },
                  {
                    title: "Professionals & Entrepreneurs",
                    description: "Proximity to business hubs with a peaceful lifestyle.",
                    icon: <Zap className="w-6 h-6" />,
                  },
                  {
                    title: "NRIs & Investors",
                    description: "High-yield, asset-secure real estate with excellent resale value.",
                    icon: <Globe className="w-6 h-6" />,
                  },
                  {
                    title: "Luxury Seekers",
                    description: "For those who believe home is not just where you live - it's how you live.",
                    icon: <Award className="w-6 h-6" />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#CBB27A]/10 flex items-center justify-center text-[#CBB27A] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-2 text-lg">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div variants={itemVariants} className="text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Sparkles className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                The Celeste Abode Experience
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Buying a villa with Celeste Abode isn't a transaction - it's a journey. From your first conversation to the final handshake, our experts walk with you every step of the way. We combine empathy with expertise, technology with trust - ensuring your next address is more than a location; it's a legacy.
              </p>
            </motion.div>

            {/* FAQs Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MessageCircle className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-6 max-w-3xl mx-auto">
                {[
                  {
                    q: "What is the starting price of villas in Noida?",
                    a: "Depending on the sector and project, villas start from ₹1.5 Cr and go upwards of ₹10 Cr for ultra-luxury residences.",
                  },
                  {
                    q: "Are the villas RERA-approved?",
                    a: "Yes, every property we recommend at Celeste Abode is verified and compliant with RERA regulations.",
                  },
                  {
                    q: "Can I customize the interiors or architecture?",
                    a: "Many premium villa projects offer customization options for interiors, landscaping, and smart-home automation.",
                  },
                  {
                    q: "Is Noida a good area for real-estate investment?",
                    a: "Absolutely. With excellent infrastructure, corporate presence, and the upcoming Jewar Airport, Noida is among India's fastest-growing real-estate markets.",
                  },
                  {
                    q: "Does Celeste Abode offer end-to-end support?",
                    a: "Yes - from property selection to legal checks, negotiations, and handover, we ensure a smooth and transparent process.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 rounded-xl border border-[#CBB27A]/20"
                  >
                    <h3 className="font-semibold text-primary mb-2 flex items-start gap-2">
                      <span className="text-[#CBB27A]">Q{index + 1}.</span> {faq.q}
                    </h3>
                    <p className="text-muted-foreground ml-6 leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Internal Links Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-3xl p-8 md:p-12 border border-[#CBB27A]/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Explore More
                </h3>
                <p className="text-muted-foreground mb-6">
                  Discover our comprehensive property services and curated collections
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <Link href="/properties-in-noida" className="group p-4 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-lg transition-all text-center">
                  <MapPin className="w-6 h-6 text-[#CBB27A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-primary group-hover:text-[#CBB27A] transition-colors">Noida Properties</p>
                </Link>
                <Link href="/properties" className="group p-4 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-lg transition-all text-center">
                  <Building2 className="w-6 h-6 text-[#CBB27A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-primary group-hover:text-[#CBB27A] transition-colors">All Properties</p>
                </Link>
                <Link href="/services" className="group p-4 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-lg transition-all text-center">
                  <Zap className="w-6 h-6 text-[#CBB27A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-primary group-hover:text-[#CBB27A] transition-colors">Our Services</p>
                </Link>
                <Link href="/contact" className="group p-4 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-lg transition-all text-center">
                  <MessageCircle className="w-6 h-6 text-[#CBB27A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-primary group-hover:text-[#CBB27A] transition-colors">Contact Us</p>
                </Link>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Start Your Villa Journey in Noida Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                If you've ever dreamed of owning a space that mirrors your success and serenity - Celeste Abode is your destination. Explore Noida's most prestigious villas and discover homes that redefine elegance, comfort, and value. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View our Noida property collection</Link> or <Link href="/contact" className="text-[#CBB27A] hover:underline font-semibold">schedule a consultation</Link> to get started.
              </p>
              <p className="text-muted-foreground italic text-lg text-center max-w-2xl mx-auto">
                Because luxury isn't just about where you live - it's about how beautifully you live there.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Contact Form CTA Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-4"
              >
                <MessageCircle className="w-8 h-8 text-[#CBB27A]" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                Ready to Explore{" "}
                <span className="text-[#CBB27A]">Noida Villas?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with our expert advisors for personalized guidance and exclusive villa insights. We're here to help you find the perfect villa that matches your lifestyle and investment goals.
              </p>

              {/* Contact Information */}
              <div className="pt-4 space-y-4">
                <motion.a
                  href="tel:+919818735258"
                  className="flex items-center gap-3 text-primary hover:text-[#CBB27A] transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#CBB27A]" />
                  </div>
                  <span className="font-medium">+91 9818735258</span>
                </motion.a>
                <motion.div 
                  className="flex items-center gap-3 text-primary hover:text-[#CBB27A] transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                    <Mail className="w-5 h-5 text-[#CBB27A]" />
                  </div>
                  <ObfuscatedEmail
                    variant="link"
                    className="font-medium"
                    showIcon={false}
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-border"
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
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Thank You!
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our team will contact you within{" "}
                    <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your villa requirements.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-primary mb-1.5"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-primary mb-1.5"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-primary mb-1.5"
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
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-primary mb-1.5"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all resize-none text-sm"
                      placeholder="Tell us about your villa requirements..."
                    />
                  </div>

                  {submitError && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      {submitError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 bg-[#000000] text-white rounded-lg font-semibold active:bg-[#1a1a1a] md:hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg active:shadow-xl md:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4" />
                        Submit Inquiry
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
