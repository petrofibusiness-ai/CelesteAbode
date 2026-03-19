"use client";

import { useState } from "react";
import Image from "next/image";
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
import { FAQPageSchema, WebPageSchema } from "@/lib/structured-data";

const BUY_VILLA_NOIDA_FAQS: Array<{ question: string; answer: string }> = [
  { question: "What is the starting price to buy a villa in Noida?", answer: "Prices start around ₹1 Crore and can exceed ₹10 Crore for ultra-luxury villas in sectors like 150 and 44." },
  { question: "Are these villas RERA-approved?", answer: "Yes - all villas curated by Celeste Abode are verified, RERA-compliant, and legally secure." },
  { question: "Which sectors are best for villas in Noida?", answer: "Sectors 44, 47, 93, 135, and 150 are among the most desirable for premium villas." },
  { question: "Does Celeste Abode help with home loans or documentation?", answer: "Absolutely - we assist with financing, legal verification, and registration to make your purchase seamless." },
  { question: "Is buying a villa in Noida a good investment?", answer: "Yes - with infrastructure growth, rising demand, and the upcoming Jewar Airport, villas in Noida are among NCR's most promising investments." },
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

export default function BuyVillaInNoidaPage() {
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
          message: formData.message || `Interested in Buying Villa in Noida`,
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
      <WebPageSchema
        name="Buy Villa in Noida – Premium Homes for Refined Living"
        description="Planning to buy a villa in Noida? Compare RERA-verified options by sector, budget, and possession timeline—with support on legal checks and negotiations."
        url="https://www.celesteabode.com/buy-villa-in-noida"
        image="/luxury-royal-style-villa-with-grand-entrance.avif"
      />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0 pb-16">
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/luxury-royal-style-villa-with-grand-entrance.avif" alt="Buy a villa in Noida" fill priority className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">Buy a Villa in Noida</motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Sectors 44, 47, 93, 135, 150 – RERA villas from ₹1 Cr with end-to-end support</motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16 md:space-y-20">
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <p className="text-lg text-muted-foreground leading-relaxed">Buying a villa in Noida means navigating RERA status, builder track record, financing, and registration. Getting the order of steps right saves time and reduces risk.</p>
                <p className="text-lg text-muted-foreground leading-relaxed"><span className="text-[#CBB27A] font-semibold">Celeste Abode</span> helps you shortlist RERA-registered villas in sectors that match your budget and commute, then supports you through legal checks, negotiations, and documentation. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View Noida villas</Link> or <Link href="/properties" className="text-[#CBB27A] hover:underline font-semibold">browse all properties</Link>.</p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 order-1 md:order-2">
                <Image src="/NOIDA.avif" alt="Noida villas" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </motion.div>

            {/* Unique: What to expect when you buy */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                From Inquiry to Keys: What to Expect When You Buy a Villa in Noida
              </h2>
              <ul className="space-y-3 max-w-3xl mx-auto text-muted-foreground">
                <li><span className="font-semibold text-primary">Shortlist:</span> We share only RERA-registered projects from builders with a visible delivery record. You compare by sector, price, and possession timeline.</li>
                <li><span className="font-semibold text-primary">Site visit and verification:</span> We help you verify RERA status on the portal, check title and encumbrance, and visit the site and surrounding area.</li>
                <li><span className="font-semibold text-primary">Financing and negotiation:</span> We can connect you with loan options and support transparent negotiation with the builder or reseller.</li>
                <li><span className="font-semibold text-primary">Agreement and registration:</span> We recommend a legal review of the builder-buyer agreement and support you through stamp duty and registration so the title is clear.</li>
              </ul>
            </motion.div>

            {/* Why Buy Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <Award className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Why Buyers Choose to Buy a Villa in Noida
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  Metro-linked sectors, RERA protection, and builder credibility make Noida villas a clear choice for end-users and investors.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Home className="w-6 h-6" />,
                    title: "More space and privacy",
                    description: "Own terrace, garden, and no shared walls – a clear upgrade from apartment living in the same sector.",
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Sectors 44, 47, 93, 150",
                    description: "Where most villa supply and demand sit; metro and expressway access support resale and rental.",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "RERA and legal clarity",
                    description: "We only suggest RERA-registered projects and help you verify title and builder delivery before you sign.",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Liquidity in the right pockets",
                    description: "Villas in established Noida sectors hold value and attract buyers and tenants when you need to exit.",
                  },
                  {
                    icon: <Award className="w-6 h-6" />,
                    title: "End-to-end support",
                    description: "From shortlist to registration, we help with verification, negotiation, and documentation so you buy with confidence.",
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
              <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                From the calm of Sector 150 to the exclusivity of Noida Expressway, every location offers a distinct charm for homebuyers.
              </p>
            </motion.div>

            {/* Celeste Abode Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Building2 className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Celeste Abode – Turning Aspirations Into Addresses
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Celeste Abode, we don't just help you buy property - we help you find your perfect place in the world. We blend AI-driven insights, market experience, and human understanding to match you with villas that truly reflect your lifestyle. Discover our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] hover:underline font-semibold">comprehensive real estate services</Link> and <Link href="/advisory-philosophy" className="text-[#CBB27A] hover:underline font-semibold">data-driven approach</Link> to property advisory.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "RERA-verified properties",
                      description: "For complete legal security.",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "Personalized consultations",
                      description: "To understand your family, vision, and budget.",
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "Transparent valuations",
                      description: "With ROI and price-trend guidance.",
                    },
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "End-to-end support",
                      description: "From site visits to final registration.",
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
                  Because when it comes to finding your home, clarity and care come first.
                </p>
              </div>
            </motion.div>

            {/* Top Locations Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/5 to-[#CBB27A]/5 rounded-3xl p-8 md:p-12 border border-[#CBB27A]/20">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                  <MapPin className="w-8 h-8 text-[#CBB27A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Top Villa Locations in Noida
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Sector 150",
                    description: "Golf-course views, premium gated villas, and nature-centric planning.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Sector 44 & 47",
                    description: "Established neighborhoods with elegant independent homes.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Noida Expressway",
                    description: "High-connectivity zone for professionals and global citizens.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Noida Extension (Greater Noida West)",
                    description: "Modern, affordable villas with excellent infrastructure.",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    title: "Jaypee Greens Noida",
                    description: "Iconic luxury villas surrounded by world-class amenities.",
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

            {/* Who Should Buy Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Users className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
                Who Should Buy a Villa in Noida?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Growing Families",
                    description: "For those who value space, privacy, and a nurturing environment.",
                    icon: <Heart className="w-6 h-6" />,
                  },
                  {
                    title: "Executives & Entrepreneurs",
                    description: "For professionals who seek calm within connectivity.",
                    icon: <Zap className="w-6 h-6" />,
                  },
                  {
                    title: "NRIs & Investors",
                    description: "For buyers looking to diversify portfolios with premium Indian real estate.",
                    icon: <Globe className="w-6 h-6" />,
                  },
                  {
                    title: "Luxury Seekers",
                    description: "For individuals who believe elegance is a lifestyle, not a luxury.",
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
                Buying a villa is a milestone - and we make it memorable. From your first inquiry to your first morning in your new home, Celeste Abode ensures every step feels effortless, transparent, and truly personal. We're not just consultants; we're partners in your journey toward refined living.
              </p>
            </motion.div>

            {/* FAQs Section – structured data via JSON-LD only (FAQPageSchema) to avoid duplicate FAQPage in Rich Results */}
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
                {BUY_VILLA_NOIDA_FAQS.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 rounded-xl border border-[#CBB27A]/20"
                  >
                    <h3 className="font-semibold text-primary mb-2 flex items-start gap-2">
                      <span className="text-[#CBB27A]">Q{index + 1}.</span> {faq.question}
                    </h3>
                    <p className="text-muted-foreground ml-6 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Internal links – prominent strip */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary/8 to-[#CBB27A]/10 rounded-2xl p-8 md:p-10 border border-[#CBB27A]/25">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 text-center">Explore Noida & Our Services</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">Browse listings, advisory services, and get in touch for a shortlist.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/properties-in-noida" className="group flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-md transition-all">
                  <MapPin className="w-7 h-7 text-[#CBB27A] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-primary text-sm text-center group-hover:text-[#CBB27A] transition-colors">Noida Properties</span>
                </Link>
                <Link href="/properties" className="group flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-md transition-all">
                  <Building2 className="w-7 h-7 text-[#CBB27A] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-primary text-sm text-center group-hover:text-[#CBB27A] transition-colors">All Properties</span>
                </Link>
                <Link href="/real-estate-consulting-services" className="group flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-md transition-all">
                  <Zap className="w-7 h-7 text-[#CBB27A] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-primary text-sm text-center group-hover:text-[#CBB27A] transition-colors">Our Services</span>
                </Link>
                <Link href="/contact" className="group flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border hover:border-[#CBB27A] hover:shadow-md transition-all">
                  <MessageCircle className="w-7 h-7 text-[#CBB27A] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-primary text-sm text-center group-hover:text-[#CBB27A] transition-colors">Contact Us</span>
                </Link>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Shortlist, Verify, and Buy a Villa in Noida With Support
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                We help you compare RERA villas in sectors 44, 47, 93, 150 and support you through legal checks and registration. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View Noida villas</Link> or <Link href="/contact" className="text-[#CBB27A] hover:underline font-semibold">contact us</Link> to start your shortlist.
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
                Ready to Buy Your{" "}
                <span className="text-[#CBB27A]">Dream Villa in Noida?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with our expert advisors for personalized guidance and exclusive villa insights. We're here to help you find the perfect villa that matches your lifestyle and investment goals.
              </p>

              {/* Contact Information */}
              <div className="pt-4 space-y-4">
                <motion.a
                  href="tel:+919910906306"
                  className="flex items-center gap-3 text-primary hover:text-[#CBB27A] transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#CBB27A]/10 flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                    <Phone className="w-5 h-5 text-[#CBB27A]" />
                  </div>
                  <span className="font-medium">+91 9910906306</span>
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
    <FAQPageSchema faqs={BUY_VILLA_NOIDA_FAQS} />
    </>
  );
}
