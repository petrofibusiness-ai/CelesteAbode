"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQPageSchema, BreadcrumbSchema } from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  Search,
  Key,
  BookOpen,
  HelpCircle,
  FileText,
  TrendingUp,
  Scale,
  Building2,
  Users,
  Phone,
  ChevronDown,
  Lock,
  Shield,
  Award,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function VaultPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("legal");

  const faqData = {
    buying: {
      title: "A. Buying an Apartment or Home",
      questions: [
        {
          question: "What is the difference between a flat and an apartment?",
          answer:
            "Both refer to residential units within a building. 'Flat' is the term commonly used in India; 'apartment' is an international term.",
        },
        {
          question:
            "What is carpet area, built-up area, and super built-up area?",
          answer:
            "• Carpet Area: Actual usable area within the walls.\n• Built-up Area: Carpet area + wall thickness + balcony area.\n• Super Built-up Area: Built-up area + proportionate common areas like lifts, lobby, and staircase.",
        },
        {
          question: "What is RERA and why is it important?",
          answer:
            "The Real Estate Regulatory Authority (RERA) ensures transparency and accountability between developers and buyers.",
        },
        {
          question:
            "What are the key documents required while buying property?",
          answer:
            "• Sale Deed & Title Deed\n• RERA Registration Certificate\n• Building Plan Approval\n• Encumbrance Certificate\n• Occupancy Certificate (OC)\n• Property Tax Receipts\n• NOC from authorities",
        },
        {
          question: "What is an Occupancy Certificate (OC)?",
          answer:
            "Issued by the local authority to confirm that the building is completed as per approved plans and is safe to live in.",
        },
        {
          question: "What is a Possession Letter?",
          answer:
            "A letter issued by the builder to the buyer stating the date when the property is ready for possession.",
        },
        {
          question: "What is a Sale Deed?",
          answer:
            "A legal document that finalizes the sale and transfers ownership from the seller to the buyer.",
        },
        {
          question: "What is a Title Deed?",
          answer:
            "Proof that the property is legally owned by the seller and has a clear title.",
        },
        {
          question: "What is Stamp Duty and Registration Fee?",
          answer:
            "Government charges payable during registration — typically 5–8% (Stamp Duty) and 1–2% (Registration Fee), depending on the state.",
        },
        {
          question: "What is a Power of Attorney (POA)?",
          answer:
            "A document that authorizes someone to act on your behalf for property transactions.",
        },
        {
          question: "What is Home Loan Pre-approval?",
          answer:
            "A preliminary loan sanction from the bank showing the eligible amount based on your income and credit score.",
        },
        {
          question: "What is Property Valuation?",
          answer:
            "The process of estimating the market value of a property by a certified valuer.",
        },
        {
          question:
            "What is the difference between Freehold and Leasehold property?",
          answer:
            "• Freehold: Permanent ownership of land and building.\n• Leasehold: Ownership for a fixed term (e.g., 99 years), after which it reverts to the landowner.",
        },
        {
          question: "What is an NOC (No Objection Certificate)?",
          answer:
            "Official clearance from relevant authorities like Fire, Water, and Electricity departments.",
        },
        {
          question:
            "What is 'Ready to Move-in' vs 'Under Construction' property?",
          answer:
            "• Ready to Move-in: Completed project ready for immediate possession.\n• Under Construction: Still being built — usually cheaper, but has delivery risks.",
        },
        {
          question: "What is Property Tax?",
          answer:
            "A recurring tax paid to the municipal authority for ownership and maintenance of civic infrastructure.",
        },
        {
          question: "What are Society Maintenance Charges?",
          answer:
            "Monthly charges for upkeep of building common areas, lifts, gardens, and security.",
        },
        {
          question: "Can NRIs buy property in India?",
          answer:
            "Yes, NRIs can buy residential and commercial properties, but not agricultural or farmhouse land without RBI approval.",
        },
        {
          question: "What is Primary vs Resale Property?",
          answer:
            "• Primary: Bought directly from builder.\n• Resale: Bought from an existing owner.",
        },
        {
          question: "What is Property Mutation?",
          answer:
            "It's the process of updating ownership details in municipal records after a sale.",
        },
      ],
    },
    investment: {
      title: "B. Real Estate Investment & Trading",
      questions: [
        {
          question: "What is Capital Appreciation?",
          answer: "The increase in the value of property over time.",
        },
        {
          question: "What is Rental Yield?",
          answer:
            "(Annual Rent ÷ Property Value) × 100 — measures income potential of a property.",
        },
        {
          question: "What are REITs (Real Estate Investment Trusts)?",
          answer:
            "Companies that own and manage income-producing real estate and allow investors to buy shares.",
        },
        {
          question: "What is an ideal investment duration?",
          answer:
            "A long-term horizon (5–10 years) helps earn better appreciation and returns.",
        },
        {
          question: "What factors affect property prices?",
          answer:
            "Location, infrastructure, demand, builder reputation, government policy, and economy.",
        },
        {
          question: "What is a Pre-launch or Soft-launch offer?",
          answer:
            "Early-stage offer before RERA registration. Usually cheaper but riskier.",
        },
        {
          question: "What is Property Flipping?",
          answer: "Buying at low price and selling quickly for profit.",
        },
        {
          question: "What is Capital Gains Tax?",
          answer:
            "Tax on profits from property sale —\n• Short-term: Sold within 24 months → added to income.\n• Long-term: Held for >24 months → 20% tax with indexation.",
        },
        {
          question: "What is Circle Rate or Ready Reckoner Rate?",
          answer: "Minimum rate set by government for property transactions.",
        },
        {
          question: "What is a Joint Venture (JV)?",
          answer:
            "A partnership between landowners and developers for constructing a project and sharing revenue.",
        },
        {
          question: "What is FSI/FAR?",
          answer:
            "Floor Space Index / Floor Area Ratio — ratio of built-up area to total land area; decides construction density.",
        },
        {
          question: "Why invest in commercial property?",
          answer:
            "It offers higher rental yields, longer leases, and steady income.",
        },
        {
          question: "How do investors earn from real estate?",
          answer: "Through rental income and capital appreciation.",
        },
        {
          question: "What are key risks in real estate investment?",
          answer:
            "Project delays, legal disputes, low liquidity, and market downturn.",
        },
        {
          question: "How can I verify a builder's credibility?",
          answer:
            "Check RERA registration, previous delivery track record, reviews, and financial stability.",
        },
      ],
    },
    legal: {
      title: "C. Legal & Financial Aspects",
      questions: [
        {
          question: "What is TDS on property purchase?",
          answer: "1% TDS deducted for property purchases above ₹50 lakh.",
        },
        {
          question: "Can I take a Joint Home Loan?",
          answer:
            "Yes. Co-applicants can be spouse, parents, or siblings — increases loan eligibility.",
        },
        {
          question: "What is EMI?",
          answer:
            "Equal Monthly Installment to repay principal + interest on a home loan.",
        },
        {
          question: "What is CIBIL Score?",
          answer:
            "Credit score (300–900) used by lenders to assess creditworthiness.",
        },
        {
          question: "What is a Balance Transfer?",
          answer:
            "Shifting your home loan to another bank for lower interest rates.",
        },
        {
          question: "What is a Resale Agreement?",
          answer: "Legal contract between an existing owner and new buyer.",
        },
        {
          question: "Can I sell a mortgaged property?",
          answer:
            "Yes, but the outstanding loan must be cleared or transferred at sale time.",
        },
        {
          question: "What is Property Insurance?",
          answer:
            "Protects your home against damage from fire, theft, or natural disasters.",
        },
        {
          question: "What is a Top-up Loan?",
          answer:
            "Additional loan taken on your existing home loan for renovation or other needs.",
        },
        {
          question: "What are Registration Charges?",
          answer:
            "1–2% of property value, payable to the government during registration.",
        },
      ],
    },
    market: {
      title: "D. Real Estate Market & Trends",
      questions: [
        {
          question: "What are emerging property hotspots?",
          answer:
            "Tier-2 cities, metro outskirts, and areas near new highways, airports, or IT hubs.",
        },
        {
          question: "How does infrastructure affect property value?",
          answer:
            "Better roads, metro connectivity, and amenities raise demand and appreciation.",
        },
        {
          question: "What are Green or Sustainable Buildings?",
          answer:
            "Eco-friendly structures with energy-efficient materials and water-saving systems.",
        },
        {
          question: "What is Co-living?",
          answer:
            "Modern shared housing concept for young professionals — affordable and social.",
        },
        {
          question: "How to identify the right time to buy property?",
          answer:
            "When interest rates are low, infrastructure is developing, and the project is RERA-approved.",
        },
      ],
    },
  };

  const glossaryTerms = [
    {
      term: "Agreement to Sale",
      definition:
        "A preliminary contract outlining terms before final sale deed.",
      categories: ["Legal"],
    },
    {
      term: "Appreciation",
      definition: "Increase in property value over time.",
      categories: ["Financial"],
    },
    {
      term: "Built-up Area",
      definition: "Carpet area + wall thickness + balcony area.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Carpet Area",
      definition: "Usable floor space within walls.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Circle Rate",
      definition:
        "Minimum value set by the government for property transactions.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Completion Certificate (CC)",
      definition: "Proof that construction matches approved plans.",
      categories: ["Legal"],
    },
    {
      term: "Down Payment",
      definition:
        "Amount paid upfront while booking a property (usually 10–20%).",
      categories: ["Financial"],
    },
    {
      term: "Encumbrance Certificate (EC)",
      definition: "Shows property is free from any legal dues or mortgage.",
      categories: ["Legal"],
    },
    {
      term: "FAR/FSI",
      definition:
        "Floor Area Ratio/Floor Space Index — defines how much can be built.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Freehold Property",
      definition: "Full ownership of land and building.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Leasehold Property",
      definition: "Ownership for a limited period (like 99 years).",
      categories: ["Legal", "Property"],
    },
    {
      term: "Loan to Value (LTV)",
      definition: "Percentage of property cost financed by bank.",
      categories: ["Financial"],
    },
    {
      term: "Mutation",
      definition: "Change of ownership in government records.",
      categories: ["Legal"],
    },
    {
      term: "No Objection Certificate (NOC)",
      definition: "Approval from authorities for construction/sale.",
      categories: ["Legal"],
    },
    {
      term: "Occupancy Certificate (OC)",
      definition: "Proof that a building is ready to occupy.",
      categories: ["Legal"],
    },
    {
      term: "Power of Attorney (POA)",
      definition: "Authorization to act on another's behalf.",
      categories: ["Legal"],
    },
    {
      term: "RERA",
      definition: "Real Estate Regulatory Authority for buyer protection.",
      categories: ["Legal"],
    },
    {
      term: "Ready Reckoner Rate",
      definition: "Minimum government-set valuation for property.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Registration",
      definition: "Legal recording of property ownership transfer.",
      categories: ["Legal"],
    },
    {
      term: "Rental Yield",
      definition: "Rent income percentage relative to property cost.",
      categories: ["Financial"],
    },
    {
      term: "Stamp Duty",
      definition: "Tax paid for registering property ownership.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Title Deed",
      definition: "Legal proof of property ownership.",
      categories: ["Legal"],
    },
  ];

  const filteredGlossaryTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      searchTerm === "" ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      term.categories.includes(
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      );

    return matchesSearch && matchesCategory;
  });

  const filteredFAQs = Object.entries(faqData).filter(
    ([key, section]) => selectedFilter === "all" || key === selectedFilter
  );

  // Collect all FAQs for schema
  const allFAQs = Object.values(faqData).flatMap((section) =>
    section.questions.map((q) => ({ question: q.question, answer: q.answer }))
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Vault", url: "https://www.celesteabode.com/vault" },
        ]}
      />
      <FAQPageSchema faqs={allFAQs} />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-background pt-24">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Hero Image Background */}
              <div className="relative h-[580px] lg:h-[620px]">
                <Image
                  src="/vaulthero.avif"
                  alt="Vault Hero"
                  fill
                  priority
                  loading="eager"
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={80}
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                {/* Left Aligned Text Overlay */}
                <div className="absolute inset-0 flex items-end pb-16">
                  <div className="text-left text-[#FAFAF8] max-w-4xl px-4 ml-6 md:px-6 md:ml-8">
                    <h1
                      className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight text-[#FAFAF8]"
                      style={{
                        textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <div className="block text-[#FAFAF8]">
                        Inside the <span className="text-[#CBB27A]">Vault</span>
                      </div>
                      <div className="block text-[#FAFAF8] mt-2">
                        Exclusive Real Estate{" "}
                        <span className="text-[#CBB27A]">Intelligence</span>
                      </div>
                    </h1>

                    <p className="text-base md:text-lg text-[#CBB27A] mb-6 max-w-2xl">
                      Your personal archive of refined definitions, expert
                      answers, and insights reserved for those who seek
                      precision in every property decision.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Introduction Section */}
        <Section className="pb-16 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-base text-[#666] leading-relaxed mx-auto">
                Buying or investing in property is one of the biggest financial
                decisions in life. This guide helps you understand the basic
                concepts, legal terms, and important questions related to
                property buying, selling, and investment.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Essential Real Estate Terms */}
        <Section className="py-16 bg-gradient-to-br from-background to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-bold text-primary mb-6">
                Essential Real Estate{" "}
                <span className="text-[#CBB27A]">Terms</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Master the key terminology that every property buyer, seller,
                and investor should know.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { key: "legal", label: "Legal & Documents", icon: Scale },
                { key: "financial", label: "Financial", icon: TrendingUp },
                { key: "property", label: "Property Types", icon: Building2 },
              ].map((category) => (
                <Button
                  key={category.key}
                  variant={
                    selectedCategory === category.key ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.key)}
                  className={`h-12 px-6 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-[#2b3035] text-white shadow-lg hover:bg-black"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Terms Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGlossaryTerms.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-primary/10 hover:border-[#CBB27A]/30 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#CBB27A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#CBB27A]/20 transition-colors">
                      <FileText className="w-6 h-6 text-[#CBB27A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#CBB27A] transition-colors">
                        {item.term}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.definition}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredGlossaryTerms.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  No terms found for the selected category.
                </p>
              </div>
            )}
          </div>
        </Section>

        {/* Strategic Q&A Section */}
        <Section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-bold text-primary mb-6">
                Strategic <span className="text-[#CBB27A]">Q&A</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep-dive consultations on the most critical real estate
                decisions
              </p>
            </div>

            <Accordion type="multiple" className="space-y-6">
              {filteredFAQs.map(([key, section]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={key}
                    className="border border-primary/20 rounded-xl bg-white shadow-lg"
                  >
                    <AccordionTrigger className="px-8 py-6 text-left hover:no-underline bg-gradient-to-r from-primary/5 to-[#CBB27A]/5 hover:from-primary/10 hover:to-[#CBB27A]/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {key === "buying" && (
                            <Building2 className="w-6 h-6 text-primary" />
                          )}
                          {key === "investment" && (
                            <TrendingUp className="w-6 h-6 text-primary" />
                          )}
                          {key === "legal" && (
                            <Scale className="w-6 h-6 text-primary" />
                          )}
                          {key === "market" && (
                            <FileText className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <span className="text-xl font-bold text-primary">
                          {section.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 mt-4">
                      <div className="space-y-6">
                        {section.questions.map((item, index) => (
                          <Card
                            key={index}
                            className="border-0 shadow-sm bg-gradient-to-r from-background to-primary/5"
                          >
                            <CardContent className="p-6">
                              <h4 className="font-bold text-primary mb-4 flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-[#CBB27A] mt-1 flex-shrink-0" />
                                {item.question}
                              </h4>
                              <p className="text-muted-foreground leading-relaxed ml-8">
                                {item.answer}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* Authority Section */}
        <Section className="py-16 bg-gradient-to-br from-primary/10 to-[#CBB27A]/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-bold text-primary mb-6">
                Need{" "}
                <span className="text-[#CBB27A]">Confidential Clarity</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The VAULT contains the fundamentals. For personalized strategy
                on complex transactions, confidential market intelligence, and
                exclusive opportunities—schedule a private consultation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        Private Strategy Sessions
                      </h3>
                      <p className="text-muted-foreground">
                        One-on-one consultations for complex decisions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        Exclusive Market Intelligence
                      </h3>
                      <p className="text-muted-foreground">
                        Insider insights and market opportunities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        Confidential Advisory
                      </h3>
                      <p className="text-muted-foreground">
                        Secure, personalized property strategies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Book Private Strategy Session
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get personalized guidance on your specific property goals and
                  investment strategy.
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg"
                  onClick={() => (window.location.href = "/contact")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
    </>
  );
}
