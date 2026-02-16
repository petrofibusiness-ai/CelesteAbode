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

const VILLA_NOIDA_EXTENSION_FAQS: Array<{ question: string; answer: string }> = [
  { question: "What is the price range for villas in Noida Extension?", answer: "Villas start around ₹80 Lakh and go beyond ₹3 Crore, depending on size, location, and builder reputation." },
  { question: "Are villas in Noida Extension RERA-registered?", answer: "Yes - all villas curated by Celeste Abode are RERA-compliant and legally verified." },
  { question: "How far is Noida Extension from Delhi and Noida City Centre?", answer: "Just 20–25 minutes via Noida-Greater Noida Link Road or metro, offering effortless daily commute." },
  { question: "Are there ready-to-move villas available?", answer: "Absolutely. Several premium projects offer ready-to-move and semi-furnished villas with modern amenities." },
  { question: "Why invest in a villa in Noida Extension?", answer: "It's the perfect mix of affordability, connectivity, and lifestyle - making it ideal for both living and long-term appreciation." },
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
    <>
      <WebPageSchema
        name="Villa in Noida Extension – Elegant Living & Smart Investment | Celeste Abode"
        description="Discover RERA-verified villas in Noida Extension (Greater Noida West). Compare Techzone and Bisrakh options, pricing bands, and connectivity before you buy."
        url="https://www.celesteabode.com/villa-in-noida-extension"
        image="/luxury-villa-with-garden-and-modern-design.avif"
      />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0 pb-16">
        {/* Hero with image */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/luxury-villa-with-garden-and-modern-design.avif"
              alt="Villas in Noida Extension - modern villas with green spaces"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight"
            >
              Villas in Noida Extension
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-2"
            >
              Techzone, Bisrakh & affordable connectivity – ₹80 Lakh to ₹3 Cr+
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-white/75"
            >
              RERA villas 20–25 min from Noida City Centre
            </motion.p>
          </div>
        </section>

        {/* Main Content - constrained width, consistent spacing */}
        <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 md:space-y-20"
          >
            {/* Introduction: 2-col with image */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Noida Extension (Greater Noida West) offers villa options at lower price points than main Noida, with the Noida–Greater Noida Link Road and metro expansion improving connectivity. Buyers who verify RERA status and builder delivery often secure good value for both self-use and investment.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="text-[#CBB27A] font-semibold">Celeste Abode</span> only recommends villas that are RERA-compliant and from developers with a visible track record. We focus on pockets like Techzone 4, Bisrakh, and the main road corridor. <Link href="/properties-in-noida" className="text-[#CBB27A] font-semibold hover:underline">View Noida Extension properties</Link> or <Link href="/properties" className="text-[#CBB27A] font-semibold hover:underline">browse all villas</Link>.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 order-1 md:order-2">
                <Image
                  src="/GREATER NOIDA.avif"
                  alt="Noida Extension Greater Noida West villas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Unique: Why Noida Extension vs main Noida */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Noida Extension vs Main Noida: Why Buyers Choose Extension for Villas
              </h2>
              <div className="max-w-3xl mx-auto space-y-3 text-muted-foreground">
                <p>Noida Extension typically offers more built-up area and lower per-sq-ft prices than sectors 44, 47, or 150 in Noida. Commute to Noida City Centre or Sector 62 is usually 20–25 minutes via the link road or metro (where operational). The trade-off is that social infrastructure and resale liquidity are still catching up in some pockets. We help you compare specific projects and verify RERA and possession timelines before you decide.</p>
              </div>
            </motion.div>

            {/* The Allure Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CBB27A]/10 mb-6">
                <Sparkles className="w-8 h-8 text-[#CBB27A]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Where Villas in Noida Extension Make Sense
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
                <p>
                  Techzone 4, Sector 1 & 2, Bisrakh, and the main road belt have the highest concentration of villa projects. Focus on RERA-registered projects and builders who have delivered in Noida or Greater Noida. Ready-to-move options are available; for under-construction, verify possession date and delay clauses in the agreement.
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

            {/* Celeste Abode Section – 2-col with image */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-border overflow-hidden">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden order-2 md:order-1">
                <Image
                  src="/luxury-villa-exterior-modern-architecture.avif"
                  alt="Celeste Abode – lifestyle-aligned villa recommendations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBB27A]/10">
                  <Building2 className="w-7 h-7 text-[#CBB27A]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Celeste Abode – Redefining Lifestyle-Aligned Realty
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Celeste Abode, we don't just help you buy property – we help you find where your life fits best. Every villa we recommend is selected through research, technology, and empathy. Discover our <Link href="/real-estate-consulting-services" className="text-[#CBB27A] font-semibold hover:underline">property advisory services</Link> and <Link href="/advisory-philosophy" className="text-[#CBB27A] font-semibold hover:underline">client-first approach</Link>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Zap className="w-5 h-5" />, title: "Curated villas", desc: "RERA-approved, lifestyle-matched." },
                    { icon: <Shield className="w-5 h-5" />, title: "Transparent deals", desc: "Honest pricing & ROI." },
                    { icon: <Heart className="w-5 h-5" />, title: "Personalized support", desc: "Consultation to possession." },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-primary/5 border border-[#CBB27A]/20">
                      <div className="w-9 h-9 rounded-full bg-[#CBB27A]/10 flex items-center justify-center text-[#CBB27A] mb-2">{item.icon}</div>
                      <p className="font-semibold text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic">
                  Finding a villa isn't just where you'll live – it's how you'll feel living there.
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
                {VILLA_NOIDA_EXTENSION_FAQS.map((faq, index) => (
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
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 text-center">
                Explore Noida & Our Services
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">
                Browse listings, advisory services, and get in touch for a shortlist.
              </p>
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
                Shortlist RERA Villas in Techzone 4, Bisrakh, and Noida Extension
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                We help you compare ready and under-construction villas by location and builder. <Link href="/properties-in-noida" className="text-[#CBB27A] hover:underline font-semibold">View Noida Extension villa listings</Link> or <Link href="/contact" className="text-[#CBB27A] hover:underline font-semibold">contact us</Link> for a shortlist and site visits.
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
    <FAQPageSchema faqs={VILLA_NOIDA_EXTENSION_FAQS} />
    </>
  );
}
