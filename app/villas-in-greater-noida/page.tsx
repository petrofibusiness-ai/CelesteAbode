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
  Star,
  TreePine,
  Plane
} from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

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

export default function VillasInGreaterNoidaPage() {
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
          message: formData.message || `Interested in Villas in Greater Noida`,
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
                Villas in Greater Noida – Where Modern Vision{" "}
                <span className="text-[#CBB27A]">Meets Serene Living</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light italic mb-4">
                Luxury, Space & Sophistication — All in One Address
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
                Welcome to Greater Noida, where life moves at the perfect pace — calm yet connected, elegant yet energetic.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                At <span className="text-[#CBB27A] font-semibold">Celeste Abode</span>, we bring you hand-picked villas in Greater Noida that blend architectural brilliance with lifestyle perfection. Each villa isn't just a structure — it's a sanctuary designed for those who value privacy, beauty, and timeless comfort.
              </p>
            </motion.div>

            {/* The Charm Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <TreePine className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                The Charm of Living in Greater Noida
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
                <p>
                  Greater Noida has evolved from a promising extension of NCR to a modern city in its own right. With green boulevards, wide roads, and premium gated communities, it's one of India's most thoughtfully planned urban destinations.
                </p>
                <p>
                  Whether you prefer a ready-to-move villa near Pari Chowk, a golf-facing estate in Jaypee Greens, or a modern villa in Sector 1 or Omega II, each locality offers a balance of serenity and sophistication.
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
                  Why Choose a Villa in Greater Noida?
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  Because true luxury is more than a postcode — it's peace of mind.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="w-6 h-6" />,
                    title: "Spacious Independence",
                    description: "Enjoy private lawns, personal terraces, and open skies — freedom apartments can't match.",
                  },
                  {
                    icon: <Plane className="w-6 h-6" />,
                    title: "Effortless Connectivity",
                    description: "Just minutes from Noida, Delhi, and the upcoming Jewar International Airport via the Yamuna Expressway.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Smart Investment",
                    description: "Property values in Greater Noida are poised for growth, making villas here both a lifestyle and financial win.",
                  },
                  {
                    icon: <TreePine className="w-6 h-6" />,
                    title: "Green & Clean Environment",
                    description: "With its parks, golf courses, and low pollution, Greater Noida offers a quality of life rarely found in metros.",
                  },
                  {
                    icon: <Building2 className="w-6 h-6" />,
                    title: "World-Class Infrastructure",
                    description: "International schools, malls, hospitals, and corporate hubs are all within easy reach.",
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
                Celeste Abode – Crafting Homes That Reflect You
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Celeste Abode, we understand that a home is more than a purchase — it's a personal statement. Our experts curate only the most exquisite villas in Greater Noida, combining lifestyle alignment with legal and financial assurance.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "Lifestyle-Aligned Selection",
                      description: "We match properties to your aspirations, not just your budget.",
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "RERA & Legal Diligence",
                      description: "Verified, transparent, and risk-free investments.",
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "ROI-Focused Insights",
                      description: "Data-backed advice on long-term appreciation and rental potential.",
                    },
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "End-to-End Assistance",
                      description: "From site visits to documentation, we handle every step with care.",
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
                  Because at Celeste Abode, luxury isn't sold — it's crafted with understanding.
                </p>
              </div>
            </motion.div>

            {/* Prime Locations Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-3xl p-8 md:p-12 border border-[#CBB27A]/20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MapPin className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Prime Villa Locations in Greater Noida
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Jaypee Greens",
                    description: "Home to some of NCR's most exclusive golf-course villas — perfect for connoisseurs of space and style.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Omega I & II",
                    description: "Central, connected, and surrounded by nature.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Pari Chowk & Sector Chi",
                    description: "Vibrant neighborhoods with excellent social infrastructure.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Yamuna Expressway Belt",
                    description: "Future-ready zone near the new international airport — ideal for investors and global professionals.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Greater Noida West (Noida Extension)",
                    description: "Fast-developing hub with modern villa communities at accessible price points.",
                    icon: <Star className="w-5 h-5" />,
                    fullWidth: true,
                  },
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all ${location.fullWidth ? 'md:col-span-2' : ''}`}
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
            </motion.div>

            {/* Who Should Invest Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Users className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                Who Should Invest in a Villa in Greater Noida?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Modern Families",
                    description: "Who seek secure, independent, and community-driven living.",
                    icon: <Heart className="w-6 h-6" />,
                  },
                  {
                    title: "Professionals & Entrepreneurs",
                    description: "Who value space, accessibility, and an address that speaks success.",
                    icon: <Zap className="w-6 h-6" />,
                  },
                  {
                    title: "NRIs & Global Investors",
                    description: "Attracted by affordable luxury and long-term appreciation.",
                    icon: <Globe className="w-6 h-6" />,
                  },
                  {
                    title: "Retirees & Serenity Seekers",
                    description: "For those who wish to live amidst nature without losing city convenience.",
                    icon: <TreePine className="w-6 h-6" />,
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
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
                Finding your dream villa with Celeste Abode isn't about browsing listings — it's about discovering belonging. Our team listens, understands, and curates choices that truly resonate with your lifestyle. We combine advanced analytics with human insight, ensuring every recommendation is as genuine as it is exclusive.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                Because a villa isn't just where you live — it's where your story begins.
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
                    q: "What is the average price range of villas in Greater Noida?",
                    a: "Premium villas start around ₹1 Cr and can go beyond ₹8 Cr, depending on the sector, size, and builder.",
                  },
                  {
                    q: "Are Greater Noida villas RERA-approved?",
                    a: "Yes, all villas recommended by Celeste Abode comply with RERA and local authority guidelines.",
                  },
                  {
                    q: "Which is the best area in Greater Noida for villas?",
                    a: "Jaypee Greens, Omega, and the Yamuna Expressway belt are among the most sought-after localities.",
                  },
                  {
                    q: "Is Greater Noida good for investment?",
                    a: "Absolutely. With rapid infrastructure growth, airport proximity, and corporate development, Greater Noida offers high ROI potential.",
                  },
                  {
                    q: "Does Celeste Abode help with site visits and legal checks?",
                    a: "Yes — we provide complete assistance, from property tours to legal verification and negotiation.",
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

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Start Your Greater Noida Villa Journey Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                If you've ever envisioned a home that balances nature, elegance, and future growth — Greater Noida is where that dream comes alive. At Celeste Abode, we'll guide you to villas that redefine comfort, security, and sophistication.
              </p>
              <p className="text-muted-foreground italic text-lg text-center max-w-2xl mx-auto">
                Because true luxury isn't about owning more — it's about living beautifully, every single day.
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
                <span className="text-[#CBB27A]">Greater Noida Villas?</span>
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
