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

export default function VillaInNoidaExtensionPage() {
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
          message: formData.message || `Interested in Villa in Noida Extension`,
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
                Villa in Noida Extension – Where Modern Comfort{" "}
                <span className="text-[#CBB27A]">Meets Urban Convenience</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light italic mb-4">
                Your Space. Your Story. Your Signature.
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
                Noida Extension - where the future of modern living unfolds every day.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                At <span className="text-[#CBB27A] font-semibold">Celeste Abode</span>, we present exclusive villas in Noida Extension that merge the serenity of open spaces with the sophistication of contemporary design. Here, every villa isn't just a property; it's a personal canvas - built for those who seek balance, beauty, and belonging.
              </p>
            </motion.div>

            {/* The Allure Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Sparkles className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                The Allure of Noida Extension
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
                <p>
                  Once a quiet suburb, Noida Extension (Greater Noida West) has transformed into one of NCR's most desirable residential zones. With tree-lined roads, modern infrastructure, and seamless connectivity to Delhi and Noida, it offers a lifestyle that's both peaceful and progressive.
                </p>
                <p>
                  Each villa is crafted with attention to detail - from elegant facades and landscaped gardens to smart interiors and airy terraces - reflecting a modern family's every need.
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
                  Why Choose a Villa in Noida Extension?
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  Because a home should do more than shelter - it should inspire.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="w-6 h-6" />,
                    title: "Spacious Freedom",
                    description: "Independent living with your own garden, terrace, and ample privacy - a luxury in today's city life.",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Perfect Connectivity",
                    description: "Direct access to Noida City Centre, Sector 62, and Jewar Airport via expressways and metro.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "High Appreciation",
                    description: "Noida Extension is one of NCR's fastest-growing real estate corridors - ideal for long-term investment.",
                  },
                  {
                    icon: <TreePine className="w-6 h-6" />,
                    title: "Green Lifestyle",
                    description: "Planned development, eco-friendly spaces, and community parks for healthier living.",
                  },
                  {
                    icon: <Building2 className="w-6 h-6" />,
                    title: "Social Infrastructure",
                    description: "Schools, hospitals, IT hubs, and shopping centers all within minutes.",
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
                Celeste Abode – Redefining Lifestyle-Aligned Realty
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Celeste Abode, we don't just help you buy property - we help you find where your life fits best. Every villa we recommend is selected through a blend of research, technology, and empathy - ensuring you make a choice that feels right today and tomorrow. Discover our <Link href="/services" className="text-[#CBB27A] hover:underline font-semibold">property advisory services</Link> and <Link href="/philosophy" className="text-[#CBB27A] hover:underline font-semibold">client-first approach</Link>.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {[
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "Curated Villa Selection",
                      description: "Only top-rated, RERA-approved properties that match your lifestyle.",
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "Transparent Deals",
                      description: "Honest insights about pricing, builders, and ROI - no hidden surprises.",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "Personalized Support",
                      description: "From consultation to possession, our experts walk with you every step of the way.",
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
                  Because for us, finding a villa is not just about where you'll live - it's about how you'll feel living there.
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
                  Popular Villa Hotspots in Noida Extension
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Techzone 4",
                    description: "The heart of modern development - premium villas close to business parks.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 1 & 2",
                    description: "Known for lush, family-friendly villa communities.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Bisrakh & Gaur City Vicinity",
                    description: "Excellent infrastructure and ready-to-move options.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Eco Village Belt",
                    description: "Affordable yet elegant villas surrounded by greenery.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Noida Extension Main Road",
                    description: "Seamless connectivity to Noida, Ghaziabad, and Greater Noida.",
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
            </motion.div>

            {/* Who Should Choose Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Users className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                Who Should Choose a Villa in Noida Extension?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Young Families",
                    description: "Spacious layouts and secure communities for family comfort.",
                    icon: <Heart className="w-6 h-6" />,
                  },
                  {
                    title: "Working Professionals",
                    description: "Close to tech parks with easy city access.",
                    icon: <Zap className="w-6 h-6" />,
                  },
                  {
                    title: "Investors",
                    description: "Great returns with growing demand for independent homes.",
                    icon: <TrendingUp className="w-6 h-6" />,
                  },
                  {
                    title: "Luxury Seekers",
                    description: "Elegant villas that combine city sophistication with suburban peace.",
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
                Buying a home is emotional - and at Celeste Abode, we treat it that way. From your first inquiry to final key handover, we make your villa-buying journey seamless, transparent, and joyful. Our advisors understand that the best homes aren't just made of walls - they're built from dreams.
              </p>
            </motion.div>

            {/* FAQs Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MessageCircle className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  Frequently Asked Questions (FAQs)
                </h2>
              </div>
              <div className="space-y-6 max-w-3xl mx-auto">
                {[
                  {
                    q: "What is the price range for villas in Noida Extension?",
                    a: "Villas start around ₹80 Lakh and go beyond ₹3 Crore, depending on size, location, and builder reputation.",
                  },
                  {
                    q: "Are villas in Noida Extension RERA-registered?",
                    a: "Yes - all villas curated by Celeste Abode are RERA-compliant and legally verified.",
                  },
                  {
                    q: "How far is Noida Extension from Delhi and Noida City Centre?",
                    a: "Just 20–25 minutes via Noida-Greater Noida Link Road or metro, offering effortless daily commute.",
                  },
                  {
                    q: "Are there ready-to-move villas available?",
                    a: "Absolutely. Several premium projects offer ready-to-move and semi-furnished villas with modern amenities.",
                  },
                  {
                    q: "Why invest in a villa in Noida Extension?",
                    a: "It's the perfect mix of affordability, connectivity, and lifestyle - making it ideal for both living and long-term appreciation.",
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
                Start Your Villa Journey in Noida Extension Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                If you're ready to embrace a home that reflects freedom, comfort, and growth - Celeste Abode is here to guide you. Explore the most sought-after villas in Noida Extension and discover where your next chapter begins. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View Noida Extension properties</Link> or <Link href="/contact" className="text-[#CBB27A] hover:underline font-semibold">contact our experts</Link>.
              </p>
              <p className="text-muted-foreground italic text-lg text-center max-w-2xl mx-auto">
                Because every home has a story - and yours deserves to begin in Noida Extension.
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
                <span className="text-[#CBB27A]">Noida Extension Villas?</span>
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
