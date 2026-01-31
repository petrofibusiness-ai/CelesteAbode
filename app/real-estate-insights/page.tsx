"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQPageSchema, BreadcrumbSchema } from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { OpenConsultationTrigger } from "@/components/open-consultation-trigger";
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
            "Both terms refer to residential units within a building. \"Flat\" is the term commonly used in India, while \"apartment\" is more widely used internationally.",
        },
        {
          question:
            "What is carpet area, built-up area, and super built-up area?",
          answer:
            "• Carpet Area: The net usable floor area within the internal walls of a property.\n• Built-up Area: Carpet area plus wall thickness and balcony area.\n• Super Built-up Area: Built-up area along with a proportionate share of common areas such as lifts, lobbies, and staircases.",
        },
        {
          question: "What is RERA and why is it important?",
          answer:
            "The Real Estate Regulatory Authority (RERA) ensures transparency, accountability, and timely delivery of real estate projects, helping buyers make informed property buying decisions.",
        },
        {
          question:
            "What are the key documents required while buying property?",
          answer:
            "Some of the essential documents to verify while buying a property include:\n• Sale Deed & Title Deed\n• RERA Registration Certificate\n• Approved Building Plans\n• Encumbrance Certificate\n• Occupancy Certificate (OC)\n• Property Tax Receipts\n• No Objection Certificates (NOCs) from relevant authorities\nVerifying these documents is a critical step in making a secure real estate investment.",
        },
        {
          question: "What is an Occupancy Certificate (OC)?",
          answer:
            "An official certificate issued by the local authority confirming that a building has been constructed as per approved plans and is safe and fit for occupancy.",
        },
        {
          question: "What is a Possession Letter?",
          answer:
            "A letter issued by the builder stating the official date on which the buyer can take possession of the property.",
        },
        {
          question: "What is a Sale Deed?",
          answer:
            "A legal document that finalizes the sale and transfers ownership of the property from the seller to the buyer.",
        },
        {
          question: "What is a Title Deed?",
          answer:
            "A legal document that proves ownership of the property and confirms that the title is clear and marketable.",
        },
        {
          question: "What is Stamp Duty and Registration Fee?",
          answer:
            "Government charges payable during property registration—typically 5–8% as stamp duty and 1–2% as registration fees, depending on state regulations.",
        },
        {
          question: "What is a Power of Attorney (POA)?",
          answer:
            "A legal document that authorizes a person to act on another's behalf in property-related transactions.",
        },
        {
          question: "What is Home Loan Pre-approval?",
          answer:
            "A preliminary loan sanction from a bank indicating the eligible loan amount based on the buyer's income, credit score, and financial profile—often recommended as part of a structured real estate advisory process.",
        },
        {
          question: "What is Property Valuation?",
          answer:
            "The process of estimating the fair market value of a property, usually conducted by a certified valuer, to support confident property investment decisions.",
        },
        {
          question:
            "What is the difference between Freehold and Leasehold property?",
          answer:
            "• Freehold: Permanent ownership of both land and building.\n• Leasehold: Ownership rights granted for a fixed tenure (such as 99 years), subject to lease terms.",
        },
        {
          question: "What is an NOC (No Objection Certificate)?",
          answer:
            "An official clearance issued by relevant authorities such as Fire, Water, or Electricity departments, confirming that there are no objections to the property.",
        },
        {
          question:
            "What is the difference between Ready-to-Move-in and Under-Construction property?",
          answer:
            "• Ready-to-Move-in: A completed project available for immediate possession.\n• Under Construction: A project still being developed, typically priced lower but involving delivery timelines and associated risks.\nThe right choice depends on budget, risk appetite, and timeline, and should ideally be evaluated with proper real estate consulting guidance.",
        },
        {
          question: "What is Property Tax?",
          answer:
            "A recurring tax paid to the municipal authority for property ownership and the maintenance of civic infrastructure.",
        },
        {
          question: "What are Society Maintenance Charges?",
          answer:
            "Monthly charges paid for the upkeep of common areas such as lifts, security, gardens, and shared facilities within a residential complex.",
        },
        {
          question: "Can NRIs buy property in India?",
          answer:
            "Yes, NRIs can purchase residential and commercial properties in India but are restricted from buying agricultural land or farmhouses without RBI approval.",
        },
        {
          question: "What is Primary vs Resale Property?",
          answer:
            "• Primary Property: Purchased directly from a developer or builder.\n• Resale Property: Purchased from an existing owner.",
        },
        {
          question: "What is Property Mutation?",
          answer:
            "The process of updating ownership details in municipal or government records after a property sale or transfer.",
        },
      ],
    },
    investment: {
      title: "B. Real Estate Investment & Trading",
      questions: [
        {
          question: "What is Capital Appreciation?",
          answer:
            "The increase in a property's market value over time, influenced by factors such as location growth, infrastructure development, and demand.",
        },
        {
          question: "What is Rental Yield?",
          answer:
            "A metric used to measure income potential, calculated as: (Annual Rent ÷ Property Value) × 100, helping investors assess rental returns.",
        },
        {
          question: "What are REITs (Real Estate Investment Trusts)?",
          answer:
            "Companies that own, operate, or finance income-producing real estate assets and allow investors to participate by purchasing shares.",
        },
        {
          question: "What is an ideal investment duration?",
          answer:
            "A long-term investment horizon of 5–10 years generally offers better capital appreciation and more stable returns in real estate.",
        },
        {
          question: "What factors affect property prices?",
          answer:
            "Key factors include location, infrastructure development, demand and supply, builder reputation, government policies, and overall economic conditions.",
        },
        {
          question: "What is a Pre-launch or Soft-launch offer?",
          answer:
            "An early-stage property offer made before RERA registration. These projects are often priced lower but involve higher regulatory and delivery risks.",
        },
        {
          question: "What is Property Flipping?",
          answer:
            "An investment strategy where a property is purchased at a lower price and sold within a short period to earn quick profits.",
        },
        {
          question: "What is Capital Gains Tax?",
          answer:
            "Tax levied on profits earned from selling a property:\n• Short-term: Sold within 24 months — gains added to taxable income\n• Long-term: Held for more than 24 months — taxed at 20% with indexation benefits\nUnderstanding capital gains tax is essential for informed real estate investment decisions.",
        },
        {
          question: "What is Circle Rate or Ready Reckoner Rate?",
          answer:
            "The minimum property valuation set by the government for calculating stamp duty and registration charges during property transactions.",
        },
        {
          question: "What is a Joint Venture (JV)?",
          answer:
            "A partnership between landowners and developers where both parties collaborate to construct a project and share revenue or profits.",
        },
        {
          question: "What is FSI/FAR?",
          answer:
            "Floor Space Index (FSI) or Floor Area Ratio (FAR) defines the ratio of total built-up area to the plot size and determines construction density.",
        },
        {
          question: "Why invest in commercial property?",
          answer:
            "Commercial real estate often offers higher rental yields, longer lease tenures, and more stable income compared to residential investments.",
        },
        {
          question: "How do investors earn from real estate?",
          answer:
            "Primarily through rental income and long-term capital appreciation, depending on market conditions and investment strategy.",
        },
        {
          question: "What are the key risks in real estate investment?",
          answer:
            "Common risks include project delays, legal disputes, low liquidity, regulatory changes, and market downturns.",
        },
        {
          question: "How can I verify a builder's credibility?",
          answer:
            "Check the builder's RERA registration, past project delivery record, customer reviews, and financial stability before investing.",
        },
      ],
    },
    legal: {
      title: "C. Legal & Financial Aspects",
      questions: [
        {
          question: "What is TDS on property purchase?",
          answer:
            "Tax Deducted at Source (TDS) at the rate of 1% is applicable on property purchases valued above ₹50 lakh and must be deducted by the buyer at the time of transaction.",
        },
        {
          question: "Can I take a Joint Home Loan?",
          answer:
            "Yes. A joint home loan can be taken with co-applicants such as a spouse, parents, or siblings, which may help increase overall loan eligibility.",
        },
        {
          question: "What is EMI?",
          answer:
            "EMI (Equated Monthly Installment) is the fixed monthly payment made towards repaying the principal and interest on a home loan.",
        },
        {
          question: "What is a CIBIL Score?",
          answer:
            "A credit score ranging from 300 to 900 that lenders use to assess an individual's creditworthiness and loan repayment capability.",
        },
        {
          question: "What is a Balance Transfer?",
          answer:
            "The process of shifting an existing home loan from one lender to another, typically to benefit from lower interest rates or better loan terms.",
        },
        {
          question: "What is a Resale Agreement?",
          answer:
            "A legal contract executed between an existing property owner and a new buyer for the sale of a resale property.",
        },
        {
          question: "Can I sell a mortgaged property?",
          answer:
            "Yes. A mortgaged property can be sold, provided the outstanding loan amount is cleared or transferred at the time of sale, as per lender guidelines.",
        },
        {
          question: "What is Property Insurance?",
          answer:
            "An insurance policy that protects a property against potential damage caused by fire, theft, or natural disasters.",
        },
        {
          question: "What is a Top-up Loan?",
          answer:
            "An additional loan availed on an existing home loan, commonly used for renovation, expansion, or other personal requirements.",
        },
        {
          question: "What are Registration Charges?",
          answer:
            "Government fees, typically ranging from 1–2% of the property value, payable at the time of property registration to legally record ownership.",
        },
      ],
    },
    market: {
      title: "D. Real Estate Market & Trends",
      questions: [
        {
          question: "What are emerging property hotspots?",
          answer:
            "Emerging property hotspots typically include Tier-2 cities, metro outskirts, and locations near upcoming infrastructure such as highways, airports, metro corridors, and IT hubs that indicate future growth potential.",
        },
        {
          question: "How does infrastructure affect property value?",
          answer:
            "Infrastructure developments such as improved road networks, metro connectivity, public amenities, and commercial hubs increase demand, accessibility, and long-term property appreciation.",
        },
        {
          question: "What are Green or Sustainable Buildings?",
          answer:
            "Green or sustainable buildings are designed using energy-efficient materials, water-saving systems, and environmentally responsible practices to reduce operational costs and environmental impact.",
        },
        {
          question: "What is Co-living?",
          answer:
            "Co-living is a modern shared housing concept offering furnished spaces, shared amenities, and flexible leases, primarily catering to young professionals seeking affordability and community living.",
        },
        {
          question: "How can I identify the right time to buy property?",
          answer:
            "The right time to buy property is typically when interest rates are favorable, infrastructure development is underway, market conditions are stable, and the project is RERA-approved—ensuring regulatory compliance and buyer protection.",
        },
      ],
    },
  };

  const glossaryTerms = [
    {
      term: "Agreement to Sale",
      definition:
        "A preliminary contract outlining the agreed terms and conditions between buyer and seller before the execution of the final sale deed.",
      categories: ["Legal"],
    },
    {
      term: "Appreciation",
      definition: "The increase in a property's market value over time due to location growth, demand, and infrastructure development.",
      categories: ["Financial"],
    },
    {
      term: "Built-up Area",
      definition: "The total area of a property including the carpet area, internal and external wall thickness, and balcony or terrace space.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Carpet Area",
      definition: "The net usable floor area within the internal walls of a property, excluding wall thickness, balconies, and common areas.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Circle Rate",
      definition:
        "The minimum property value set by the government for a specific area, used to calculate stamp duty and registration charges during property transactions.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Completion Certificate (CC)",
      definition: "An official certificate issued by the local authority confirming that a building has been constructed as per approved plans and complies with applicable regulations.",
      categories: ["Legal"],
    },
    {
      term: "Down Payment",
      definition:
        "The upfront amount paid by the buyer during property purchase, typically representing a percentage of the total property value.",
      categories: ["Financial"],
    },
    {
      term: "Encumbrance Certificate (EC)",
      definition: "A legal document that confirms whether a property is free from financial liabilities, legal dues, or mortgages.",
      categories: ["Legal"],
    },
    {
      term: "FAR/FSI",
      definition:
        "Floor Area Ratio (FAR) or Floor Space Index (FSI) determines the maximum construction area allowed on a plot based on regulatory guidelines.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Freehold Property",
      definition: "A property where the buyer has complete legal ownership of both the land and the structure, with full rights of transfer and usage.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Leasehold Property",
      definition: "A property held on a lease for a fixed period, where ownership rights are granted for a limited duration (such as 99 years), subject to lease terms.",
      categories: ["Legal", "Property"],
    },
    {
      term: "Loan to Value (LTV)",
      definition: "The percentage of a property's value that a lender is willing to finance, with the remainder paid by the buyer as a down payment.",
      categories: ["Financial"],
    },
    {
      term: "Mutation",
      definition: "The process of updating ownership details in government land records after a property transfer.",
      categories: ["Legal"],
    },
    {
      term: "No Objection Certificate (NOC)",
      definition: "An official clearance issued by relevant authorities confirming that there are no objections to property construction, sale, or transfer.",
      categories: ["Legal"],
    },
    {
      term: "Occupancy Certificate (OC)",
      definition: "An official certificate issued by local authorities confirming that a building is safe and compliant for occupancy.",
      categories: ["Legal"],
    },
    {
      term: "Power of Attorney (POA)",
      definition: "A legal document that authorizes a person to act on behalf of another in property-related transactions.",
      categories: ["Legal"],
    },
    {
      term: "RERA",
      definition: "The Real Estate Regulatory Authority established to regulate real estate projects and protect the interests of property buyers.",
      categories: ["Legal"],
    },
    {
      term: "Ready Reckoner Rate",
      definition: "A government-determined minimum property valuation used for calculating stamp duty and registration charges.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Registration",
      definition: "The legal process of recording a property transaction with government authorities to officially transfer ownership.",
      categories: ["Legal"],
    },
    {
      term: "Rental Yield",
      definition: "The annual rental income expressed as a percentage of the property's purchase price, used to assess investment returns.",
      categories: ["Financial"],
    },
    {
      term: "Stamp Duty",
      definition: "A government tax paid during property registration to legally validate the ownership transfer.",
      categories: ["Legal", "Financial"],
    },
    {
      term: "Title Deed",
      definition: "A legal document that establishes and confirms the ownership rights of a property holder.",
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
          { name: "Vault", url: "https://www.celesteabode.com/real-estate-insights" },
        ]}
      />
      <FAQPageSchema faqs={allFAQs} />
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-0">
        {/* Hero Section – mobile: full-height, header overlaps, centered text. Desktop: card, bottom-left text. */}
        <section className="relative bg-background pt-0 md:pt-24 md:min-h-screen md:flex md:items-center md:justify-center">
          <div className="w-full md:max-w-7xl md:mx-auto md:px-6 md:w-full">
            <div className="relative overflow-hidden w-full min-h-screen md:min-h-0 md:h-[500px] lg:h-[580px] xl:h-[620px] md:rounded-3xl md:shadow-2xl md:bg-white">
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

              {/* Same overlay stack as homepage & properties */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.25),transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent" />

              {/* Mobile: centered. Desktop: bottom-left. */}
              <div className="absolute inset-0 flex items-center justify-center px-4 py-10 md:items-end md:justify-start md:pb-16 md:pl-6 md:pt-0 lg:pb-16 lg:pl-8 md:px-0">
                <div className="relative text-center text-[#FAFAF8] max-w-2xl mx-auto md:text-left md:mx-0 md:max-w-4xl px-4 md:px-0 md:ml-0">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 leading-tight text-white tracking-tight"
                    style={{
                      textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <div className="block text-[#FAFAF8]">
                      Inside the <span className="text-[#CBB27A]">Vault</span>
                    </div>
                    <div className="block text-[#FAFAF8] mt-1 md:mt-2">
                      Exclusive Real Estate{" "}
                      <span className="text-[#CBB27A]">Intelligence</span>
                    </div>
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-white/90 md:text-[#CBB27A] mb-6 md:mb-6 max-w-lg mx-auto md:mx-0 md:max-w-2xl">
                    Your personal archive of refined definitions, expert
                    answers, and insights reserved for those who seek
                    precision in every property decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Introduction Section */}
        <Section className="pb-20 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-[#CBB27A]/15 bg-gradient-to-br from-white via-white to-[#CBB27A]/5 px-6 py-10 md:px-12 md:py-12 shadow-[0_4px_24px_-4px_rgba(203,178,122,0.12)]"
            >
              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#CBB27A]/40 via-[#CBB27A] to-[#CBB27A]/40" />
              <div className="relative pl-2 md:pl-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#CBB27A]/10 mb-5">
                    <BookOpen className="w-6 h-6 text-[#CBB27A]" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CBB27A] mb-6 text-center">
                    About this guide
                  </p>
                </div>
                <p className="text-lg md:text-xl text-foreground/95 leading-[1.7] text-center font-medium max-w-2xl mx-auto">
                  Buying or investing in property is one of the most significant financial
                  decisions you will make. From legal terminology and regulatory requirements
                  to market dynamics and investment risks, the process can often feel
                  complex and overwhelming.
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CBB27A]/50 to-transparent mx-auto my-7" />
                <p className="text-base text-muted-foreground leading-[1.75] text-center max-w-2xl mx-auto">
                  Inside the Vault, Celeste Abode brings clarity to these challenges by
                  breaking down essential real estate concepts, legal frameworks, and
                  critical questions that buyers and investors must understand before
                  committing. This knowledge-driven guide is designed to help you navigate
                  property buying, selling, and investment decisions with confidence,
                  accuracy, and long-term perspective.
                </p>
              </div>
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
                Understand the essential terminology every property buyer, seller,
                and investor needs to navigate real estate decisions with confidence.
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
                In-depth answers to the most critical questions around property buying, investing, and market decisions.
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
                The Vault provides essential real estate fundamentals. For personalized real estate consulting, complex transaction strategy, confidential market intelligence, and exclusive advisory support, we recommend scheduling a private consultation.
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
                <OpenConsultationTrigger className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg flex items-center justify-center gap-2 rounded-md font-medium transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <Phone className="w-5 h-5" />
                  Schedule Consultation
                </OpenConsultationTrigger>
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
