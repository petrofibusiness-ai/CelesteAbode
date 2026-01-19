"use client"

import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2, TrendingUp, Globe, CheckCircle } from "lucide-react"

export function AboutSection() {
  const expertise = [
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "Luxury & Premium Residences",
      description: "For clients seeking exclusivity, architectural brilliance, and timeless design."
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "High-Value Real Estate Investment Advisory",
      description: "Leveraging market data and insider access to maximize ROI."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "NRI Real Estate Services",
      description: "Secure, transparent, and hassle-free transactions for clients across the globe."
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "End-to-End Consulting",
      description: "From location analysis to legal documentation, we are your trusted partner."
    }
  ]

  return (
    <Section
      intro={{
        title: "Our Expertise",
        lead: "Comprehensive real estate solutions designed for discerning clients"
      }}
    >
      {/* Perfect 4-Card Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {expertise.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                              <CardContent className="p-6 md:p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <div className="text-primary">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="h4 text-foreground mb-4 leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="body-text text-muted-foreground flex-grow">
                  {item.description}
                </p>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
