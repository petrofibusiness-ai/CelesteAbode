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
  Plane,
  Landmark
} from "lucide-react";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import Link from "next/link";
import { FAQPageSchema } from "@/lib/structured-data";

const PLOTS_NOIDA_FAQS: Array<{ question: string; answer: string }> = [
  { question: "What is the price range of plots in Noida?", answer: "Residential plots start around ₹60 lakh and go up to ₹8 crore and above, depending on sector, size, and proximity to expressways." },
  { question: "Are the plots RERA-approved?", answer: "Yes. All plots curated by Celeste Abode are RERA-registered and approved by the Noida Authority." },
  { question: "Which sectors are best for buying plots in Noida?", answer: "Sectors 150, 162, 117, and the Yamuna Expressway belt are currently in high demand." },
  { question: "Can I get loan assistance for buying a plot?", answer: "Yes. Several leading banks and NBFCs offer plot purchase loans, and Celeste Abode assists you through the process." },
  { question: "Is buying a plot in Noida a safe investment?", answer: "Absolutely. Noida's regulatory framework, planned infrastructure, and upcoming projects make it one of NCR's most secure land markets." },
];

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

export default function PlotsInNoidaPage() {
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
          message: formData.message || `Interested in Plots in Noida`,
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
    <>
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
                Plots in Noida – The Foundation of{" "}
                <span className="text-[#CBB27A]">Your Future</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light italic mb-4">
                Because Every Legacy Begins with Land
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
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
                In a city that's constantly evolving, owning land in Noida is more than a financial decision - it's an emotional investment in tomorrow.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
                At <span className="text-[#CBB27A] font-semibold">Celeste Abode</span>, we help you discover premium plots in Noida that combine location, legality, and long-term value. Whether you're planning to build your forever home or expand your investment portfolio, Noida's planned infrastructure, connectivity, and growth potential make it the perfect place to begin. Explore our <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">Noida properties</Link> or <Link href="/properties" className="text-[#CBB27A] hover:underline font-semibold">browse all properties</Link> to find the perfect plot.
              </p>
            </motion.div>

            {/* Why Choose Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <Award className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Why Choose a Plot in Noida?
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  Because freedom means building your dreams, brick by brick.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="w-6 h-6" />,
                    title: "Design Your Own Home",
                    description: "Shape every corner exactly the way you've imagined - from garden to terrace.",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Unmatched Connectivity",
                    description: "Quick access to Delhi, Greater Noida, and Gurugram via the Noida Expressway and metro network.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "High Appreciation",
                    description: "Noida's real estate market continues to see strong capital growth and rising demand for plotted developments.",
                  },
                  {
                    icon: <TreePine className="w-6 h-6" />,
                    title: "Planned and Green City",
                    description: "Wide roads, green belts, and regulated development ensure long-term value.",
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Smart Infrastructure",
                    description: "From IT parks to international schools, everything you need is minutes away.",
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
                Celeste Abode – Where Land Meets Vision
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Celeste Abode, we believe buying land isn't about square footage - it's about creating the space for your future story. Our expert consultants help you find legally verified, strategically located plots that align with your goals - whether for living or investment. Learn more about our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] hover:underline font-semibold">property investment advisory services</Link> and how we can help you make the right decision.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "RERA-approved plots",
                      description: "And authority-verified plots for complete peace of mind.",
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "Transparent pricing",
                      description: "And ROI insights based on real market data.",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "Personalized consultation",
                      description: "To match your budget, purpose, and lifestyle.",
                    },
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "Developer guidance",
                      description: "If you wish to build your home with trusted partners.",
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
                  Because land isn't just property - it's potential waiting to be realized.
                </p>
              </div>
            </motion.div>

            {/* Top Localities Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-3xl p-8 md:p-12 border border-[#CBB27A]/20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MapPin className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Top Localities for Plots in Noida
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Sector 150",
                    description: "Greenest sector of Noida with premium residential land.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 162–165",
                    description: "High-growth corridor near Noida Expressway.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 117 & 118",
                    description: "Ideal for family homes and gated developments.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Yamuna Expressway & Sector 22D",
                    description: "Future-ready zones near Jewar Airport - perfect for investors.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 44 & 47",
                    description: "Established luxury zones with limited, high-value plots.",
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

            {/* Who Should Invest Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Users className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                Who Should Invest in Plots in Noida?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Home Builders",
                    description: "Create a home that reflects your taste, from layout to lifestyle.",
                    icon: <Home className="w-6 h-6" />,
                  },
                  {
                    title: "Investors",
                    description: "Secure appreciating land assets in NCR's most organized city.",
                    icon: <TrendingUp className="w-6 h-6" />,
                  },
                  {
                    title: "NRIs",
                    description: "Safeguard capital in tangible, high-return Indian real estate.",
                    icon: <Globe className="w-6 h-6" />,
                  },
                  {
                    title: "Developers",
                    description: "Build boutique villa projects or mixed-use properties in emerging sectors.",
                    icon: <Building2 className="w-6 h-6" />,
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

            {/* Advantage Section */}
            <motion.div variants={itemVariants} className="text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Sparkles className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                The Celeste Abode Advantage
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Buying a plot can be complex - but with Celeste Abode, it's transparent, guided, and rewarding. We simplify every step, ensuring your purchase is secure, compliant, and future-ready. From identifying the right sector to verifying documents and closing the deal, our experts stand beside you with integrity and insight.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed italic mt-6">
                Because the land you choose today becomes the life you build tomorrow.
              </p>
            </motion.div>

            {/* FAQs Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border" itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MessageCircle className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  Frequently Asked Questions (FAQs)
                </h2>
              </div>
              <div className="space-y-6 max-w-3xl mx-auto">
                {PLOTS_NOIDA_FAQS.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 rounded-xl border border-[#CBB27A]/20"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <h3 className="font-semibold text-primary mb-2 flex items-start gap-2" itemProp="name">
                      <span className="text-[#CBB27A]">Q{index + 1}.</span> {faq.question}
                    </h3>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-muted-foreground ml-6 leading-relaxed" itemProp="text">{faq.answer}</p>
                    </div>
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
                <Link href="/real-estate-consulting-services" className="group p-4 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-lg transition-all text-center">
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
                Start Your Land Ownership Journey Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Dreaming of your own address in one of NCR's most promising cities? Let Celeste Abode guide you to the perfect plot in Noida - where your vision takes root and your legacy begins. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View available plots in Noida</Link> or <Link href="/contact" className="text-[#CBB27A] hover:underline font-semibold">contact our experts</Link> for personalized guidance.
              </p>
              <p className="text-muted-foreground italic text-lg text-center max-w-2xl mx-auto">
                Because every great dream begins with a foundation - and yours begins here, in Noida.
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
                <span className="text-[#CBB27A]">Plots in Noida?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with our expert advisors for personalized guidance and exclusive plot insights. We're here to help you find the perfect plot that matches your lifestyle and investment goals.
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
                    <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your plot requirements.
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
                      placeholder="Tell us about your plot requirements..."
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
    <FAQPageSchema faqs={PLOTS_NOIDA_FAQS} />
    </>
  );
}
