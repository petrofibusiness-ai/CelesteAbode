"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactPopup } from "@/components/contact-popup";
import { PropertyLeadForm } from "@/components/property-lead-form";
import { PropertyFilters } from "@/components/property-filters";
import { GeneralLeadForm } from "@/components/general-lead-form";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Play,
  Star,
  Building2,
  CheckCircle,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import { BreadcrumbSchema, ItemListSchema, CollectionPageSchema } from "@/lib/structured-data";
import { projectSlugs } from "@/lib/project-metadata";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [activeLocation, setActiveLocation] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isGeneralFormOpen, setIsGeneralFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    title: string;
    location: string;
  } | null>(null);
  const [displayedProperties, setDisplayedProperties] = useState(9);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [isCtaContentExpanded, setIsCtaContentExpanded] = useState(false);


  const locations = [
    {
      id: "all",
      title: "All Locations",
      description: "View all properties",
    },
    {
      id: "noida",
      title: "Noida",
      description: "Planned Urbanism | Smart Living",
    },
    {
      id: "greater-noida",
      title: "Greater Noida",
      description: "Investment Momentum | Aviation Proximity",
    },
    {
      id: "yamuna-expressway",
      title: "Yamuna Expressway",
      description: "High-Growth Zone | Strategic Location",
    },
    {
      id: "ghaziabad",
      title: "Ghaziabad / NH-24",
      description: "The Foundation | Established Corridor",
    },
  ];

  // Comprehensive property data organized by segments
  const propertiesData = {
    "buying-to-live": [
      {
        id: 1,
        title: "ARIHANT ABODE",
        subtitle: "Semi Luxury Residences",
        location: "Sector 10, Greater Noida West",
        price: "₹1.02 Cr onwards",
        priceUnit: "Starting Price",
        image: "/arihant-abode/hero.avif",
        beds: "2 & 3 BHK",
        baths: "2-3 Baths",
        area: "1020-1270 sq.ft.",
        status: "Ready to Move",
        developer: "Arihant Group",
        possession: "Mar 2026",
        highlights: [
          "Ready to Move",
          "Prime Location",
          "30+ Years Legacy",
          "RERA Registered",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ15792",
        unitTypes: ["2 BHK", "3 BHK + 2T"],
        startingPrice: "₹1.02 Cr",
        paymentPlans: ["80:20"],
        pricePerSqft: "₹10,200",
      },
      {
        id: 2,
        title: "SPRING ELMAS",
        subtitle: "Luxury Residences",
        location: "Sector 12, Greater Noida West",
        price: "₹1.52 Cr onwards",
        priceUnit: "Starting Price",
        image: "/spring-elmas/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1385-1895 sq.ft.",
        status: "Under Construction",
        developer: "Spring Group",
        possession: "Dec 2029",
        highlights: [
          "Metro Connectivity",
          "SBI Approved",
          "Smart Home Features",
          "2.3 Acre Central Green",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ274689",
        unitTypes: ["3 BHK + 2T", "3 BHK + 3T", "4 BHK + Servant Room"],
        startingPrice: "₹1.52 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹12,000-12,320",
      },
      {
        id: 3,
        title: "ETERNIA RESIDENCES",
        subtitle: "Ultra Premium Residential",
        location: "TechZone 4, Greater Noida West",
        price: "₹1.97 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Eternia/1.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1932-2625 sq.ft.",
        status: "Under Construction",
        developer: "Yatharth Group + NBCC",
        possession: "Under Construction",
        highlights: [
          "Green Belt Facing",
          "Low Density Planning",
          "6 Towers G+30",
          "Premium Finishes",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAAGT10206",
        unitTypes: ["3 BHK", "3 BHK + Study", "4 BHK + Study"],
        startingPrice: "₹1.97 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹10,200",
      },
      {
        id: 4,
        title: "RG PLEIADDES",
        subtitle: "Premium Residential Development",
        location: "Sector 1, Greater Noida West",
        price: "₹8,584 per sq.ft",
        priceUnit: "Launch Price",
        image: "/RG/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "Premium Sizes",
        status: "New Launch",
        developer: "RG Group",
        possession: "New Launch",
        highlights: [
          "6 Iconic Towers",
          "70% Open Green Spaces",
          "8 Acres Project",
          "EOI ₹15 Lakhs",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ415309",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "Launch Price",
        paymentPlans: ["Flexible Payment Plans"],
        pricePerSqft: "₹8,584",
      },
      {
        id: 5,
        title: "IRISH PLATINUM",
        subtitle: "Premium Residential Development",
        location: "Sector 51, Greater Noida West",
        price: "Near Possession",
        priceUnit: "Status",
        image: "/Irish/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1390-2550 sq.ft.",
        status: "Near Possession",
        developer: "Irish Infrastructure",
        possession: "Near Possession",
        highlights: [
          "11 Feet Ceiling",
          "4 Balconies per Unit",
          "Earthquake Resistant",
          "Premium Finishes",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ742692",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "Special Rates",
        paymentPlans: ["10% on booking"],
        pricePerSqft: "Special Pricing",
        locationCategory: "greater-noida",
      },
    ],
    investment: [
      {
        id: 6,
        title: "ELITE X",
        subtitle: "Sector 22D, Yamuna Expressway",
        location: "Sector 22D, Yamuna Expressway, Greater Noida",
        price: "₹1.30 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Elite X/hero.avif",
        beds: "3 BHK + 2T, 3 BHK + 3T, Duplex Penthouses",
        baths: "2-3 Baths",
        area: "1550-2800 sq.ft.",
        status: "New Launch",
        developer: "Eldeco Group",
        possession: "New Launch",
        highlights: [
          "30+ Years Experience",
          "150+ Projects Delivered",
          "Jewar Airport 20 mins",
          "Buddh Circuit 5 mins",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ752382",
        unitTypes: ["3 BHK + 2T", "3 BHK + 3T", "Duplex Penthouses"],
        startingPrice: "₹1.30 Cr",
        paymentPlans: ["EOI System"],
        pricePerSqft: "₹9,000",
        roi: "High Appreciation Potential",
        rentalYield: "Excellent Rental Yield",
      },
      {
        id: 7,
        title: "ACE HANEI",
        subtitle: "Luxury Residences",
        location: "Sector 1, TechZone 4, Greater Noida West",
        price: "₹2.50 Cr onwards",
        priceUnit: "Starting Price",
        image: "/ACE/hero.avif",
        beds: "3 & 4 BHK + Study",
        baths: "2-3 Baths",
        area: "2746-3862 sq.ft.",
        status: "Under Construction",
        developer: "Gaur Group + NBCC",
        possession: "Under Construction",
        highlights: [
          "30+ Years Experience",
          "NBCC Execution",
          "Large Apartment Sizes",
          "Low Density Luxury",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ11256",
        unitTypes: ["3 BHK + Study", "4 BHK + Study"],
        startingPrice: "₹2.50 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹13,000-14,000",
        roi: "High Appreciation",
        rentalYield: "Premium Rental Yield",
      },
      {
        id: 8,
        title: "THE BROOK & RIVULET",
        subtitle: "Premium High-Rise Residences",
        location: "Sector 12, Greater Noida West",
        price: "₹1.40 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Brook and Rivulet/1.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1350-2050 sq.ft.",
        status: "Under Construction",
        developer: "Fusion Limited",
        possession: "Under Construction",
        highlights: [
          "3 Side Open Corner Plot",
          "Earthquake Resistant RCC",
          "MIVAN Formwork",
          "Hafeez Contractor Design",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ535539",
        unitTypes: ["3C", "3E", "4B", "4C"],
        startingPrice: "₹1.40 Cr",
        paymentPlans: ["SPP 40:40:20", "CLP"],
        pricePerSqft: "₹10,400-10,700",
        roi: "High Appreciation",
        rentalYield: "Excellent Rental Yield",
      },
      {
        id: 9,
        title: "RENOX THRIVE",
        subtitle: "Premium Residences",
        location: "Sector 10, Greater Noida West",
        price: "₹1.42 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Renox/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1582-2644 sq.ft.",
        status: "Under Construction",
        developer: "Nivas Promoters (Renox Group)",
        possession: "Under Construction",
        highlights: [
          "Transparency & Trust",
          "Timely Delivery",
          "Ethical Practices",
          "Escalation Free Pricing",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ742692",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "₹1.42 Cr",
        paymentPlans: ["Down Payment", "Construction Linked"],
        pricePerSqft: "₹9,000",
        roi: "Good Appreciation",
        rentalYield: "Stable Rental Yield",
      },
      {
        id: 10,
        title: "CIVITECH STRINGS",
        subtitle: "Tower Daytona - Premium Residential",
        location: "Sector 12, Greater Noida West",
        price: "₹2.37 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Civitech/hero.avif",
        beds: "3 BHK + 3T",
        baths: "3 Baths",
        area: "1975-2075 sq.ft.",
        status: "Under Construction",
        developer: "S.A.G. Realtech (Civitech Group)",
        possession: "Under Construction",
        highlights: [
          "30+ Years Legacy",
          "IGBC Gold Rated",
          "Aluminium Formwork",
          "Home Automation",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ646272",
        unitTypes: ["3 BHK + 3T"],
        startingPrice: "₹2.37 Cr",
        paymentPlans: ["10:30:30:30"],
        pricePerSqft: "₹12,000",
        roi: "Premium Appreciation",
        rentalYield: "High Rental Yield",
        locationCategory: "greater-noida",
      },
    ],
    luxury: [
      {
        id: 11,
        title: "FOREST WALK VILLA",
        subtitle: "Luxury Forest Living",
        location: "NH-24, Dasna, Ghaziabad",
        price: "₹2.85 Cr onwards",
        priceUnit: "Starting Price",
        image: "/ForestWalk/hero.avif",
        beds: "4 BHK + 5T Villas",
        baths: "5 Baths",
        area: "3070-4200 sq.ft.",
        status: "Under Construction",
        developer: "Madhusudan Group / Yatharth Group",
        possession: "Jun 2027",
        highlights: [
          "52 Acres Forest Theme",
          "80% Green Landscape",
          "Fully Furnished",
          "Vastu Compliant",
        ],
        segment: "Luxury Residence",
        reraId: "UPRERAPRJ658961",
        unitTypes: ["4 BHK + 5T Villas"],
        startingPrice: "₹2.85 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹1,75,000 per sq.yd",
        luxuryFeatures: [
          "Italian Marble Flooring",
          "Modular Kitchen",
          "Lift Provision",
          "Private Gardens",
        ],
      },
      {
        id: 12,
        title: "Vibhor Vaibhav Infrahome Pvt. Ltd.",
        subtitle: "Luxury Residential Development",
        location: "Sector 12, Greater Noida West",
        price: "₹2.40 Cr onwards",
        priceUnit: "Starting Price",
        image: "/VVIP/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "2000-3600 sq.ft.",
        status: "Under Construction",
        developer: "Vibhor Vaibhav Infrahome Pvt. Ltd.",
        possession: "Jun 2028",
        highlights: [
          "30+ Years Nation Building",
          "Studio Symbiosis Design",
          "70,000 sq.ft. Clubhouse",
          "Fully Furnished",
        ],
        segment: "Luxury Residence",
        reraId: "UPRERAPRJ743225/10/2025",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "₹2.40 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹12,000-13,500",
        luxuryFeatures: [
          "Italian Marble Flooring",
          "VRV Air Conditioning",
          "12 ft Ceiling Height",
          "Modular Kitchen & Wardrobes",
        ],
      },
      {
        id: 13,
        title: "PANCHSHEEL GREENS-II",
        subtitle: "Premium Residential Township",
        location: "Sector 16, Greater Noida West",
        price: "₹91.5 Lakhs onwards",
        priceUnit: "Starting Price",
        image: "/residential-plot-with-landscaping.avif",
        beds: "2 & 3 BHK",
        baths: "2-3 Baths",
        area: "915-1525 sq.ft.",
        status: "Ready to Move",
        developer: "Panchsheel Group",
        possession: "Ready to Move",
        highlights: [
          "26 Acres Project",
          "65% Open Area",
          "OC Received",
          "35+ Years Legacy",
        ],
        segment: "Luxury Residence",
        reraId: "UPRERAPRJ8595",
        unitTypes: ["2 BHK", "3 BHK"],
        startingPrice: "₹91.5 Lakhs",
        paymentPlans: ["Available on Request"],
        pricePerSqft: "Ready to Move",
        luxuryFeatures: [
          "Two 3-Storey AC Clubhouses",
          "Six Banquet Halls",
          "Swimming Pools",
          "Panchsheel Greenmart",
        ],
        locationCategory: "greater-noida",
      },
    ],
    all: [
      // Buying to Live Projects
      {
        id: 1,
        title: "ARIHANT ABODE",
        subtitle: "Semi Luxury Residences",
        location: "Sector 10, Greater Noida West",
        price: "₹1.02 Cr onwards",
        priceUnit: "Starting Price",
        image: "/arihant-abode/hero.avif",
        beds: "2 & 3 BHK",
        baths: "2-3 Baths",
        area: "1020-1270 sq.ft.",
        status: "Ready to Move",
        developer: "Arihant Group",
        possession: "Mar 2026",
        highlights: [
          "Ready to Move",
          "Prime Location",
          "30+ Years Legacy",
          "RERA Registered",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ15792",
        unitTypes: ["2 BHK", "3 BHK + 2T"],
        startingPrice: "₹1.02 Cr",
        paymentPlans: ["80:20"],
        pricePerSqft: "₹10,200",
      },
      {
        id: 2,
        title: "SPRING ELMAS",
        subtitle: "Luxury Residences",
        location: "Sector 12, Greater Noida West",
        price: "₹1.52 Cr onwards",
        priceUnit: "Starting Price",
        image: "/spring-elmas/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1385-1895 sq.ft.",
        status: "Under Construction",
        developer: "Spring Group",
        possession: "Dec 2029",
        highlights: [
          "Metro Connectivity",
          "SBI Approved",
          "Smart Home Features",
          "2.3 Acre Central Green",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ274689",
        unitTypes: ["3 BHK + 2T", "3 BHK + 3T", "4 BHK + Servant Room"],
        startingPrice: "₹1.52 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹12,000-12,320",
      },
      {
        id: 3,
        title: "ETERNIA RESIDENCES",
        subtitle: "Ultra Premium Residential",
        location: "TechZone 4, Greater Noida West",
        price: "₹1.97 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Eternia/1.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1932-2625 sq.ft.",
        status: "Under Construction",
        developer: "Yatharth Group + NBCC",
        possession: "Under Construction",
        highlights: [
          "Green Belt Facing",
          "Low Density Planning",
          "6 Towers G+30",
          "Premium Finishes",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAAGT10206",
        unitTypes: ["3 BHK", "3 BHK + Study", "4 BHK + Study"],
        startingPrice: "₹1.97 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹10,200",
      },
      {
        id: 4,
        title: "RG PLEIADDES",
        subtitle: "Premium Residential Development",
        location: "Sector 1, Greater Noida West",
        price: "₹8,584 per sq.ft",
        priceUnit: "Launch Price",
        image: "/RG/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "Premium Sizes",
        status: "New Launch",
        developer: "RG Group",
        possession: "New Launch",
        highlights: [
          "6 Iconic Towers",
          "70% Open Green Spaces",
          "8 Acres Project",
          "EOI ₹15 Lakhs",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ415309",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "Launch Price",
        paymentPlans: ["Flexible Payment Plans"],
        pricePerSqft: "₹8,584",
      },
      {
        id: 5,
        title: "IRISH PLATINUM",
        subtitle: "Premium Residential Development",
        location: "Sector 51, Greater Noida West",
        price: "Near Possession",
        priceUnit: "Status",
        image: "/Irish/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1390-2550 sq.ft.",
        status: "Near Possession",
        developer: "Irish Infrastructure",
        possession: "Near Possession",
        highlights: [
          "11 Feet Ceiling",
          "4 Balconies per Unit",
          "Earthquake Resistant",
          "Premium Finishes",
        ],
        segment: "Buying to Live",
        reraId: "UPRERAPRJ742692",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "Special Rates",
        paymentPlans: ["10% on booking"],
        pricePerSqft: "Special Pricing",
      },
      // Investment Projects
      {
        id: 6,
        title: "ELITE X",
        subtitle: "Sector 22D, Yamuna Expressway",
        location: "Sector 22D, Yamuna Expressway, Greater Noida",
        price: "₹1.30 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Elite X/hero.avif",
        beds: "3 BHK + 2T, 3 BHK + 3T, Duplex Penthouses",
        baths: "2-3 Baths",
        area: "1550-2800 sq.ft.",
        status: "New Launch",
        developer: "Eldeco Group",
        possession: "New Launch",
        highlights: [
          "30+ Years Experience",
          "150+ Projects Delivered",
          "Jewar Airport 20 mins",
          "Buddh Circuit 5 mins",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ752382",
        unitTypes: ["3 BHK + 2T", "3 BHK + 3T", "Duplex Penthouses"],
        startingPrice: "₹1.30 Cr",
        paymentPlans: ["EOI System"],
        pricePerSqft: "₹9,000",
        roi: "High Appreciation Potential",
        rentalYield: "Excellent Rental Yield",
      },
      {
        id: 7,
        title: "ACE HANEI",
        subtitle: "Luxury Residences",
        location: "Sector 1, TechZone 4, Greater Noida West",
        price: "₹2.50 Cr onwards",
        priceUnit: "Starting Price",
        image: "/ACE/hero.avif",
        beds: "3 & 4 BHK + Study",
        baths: "2-3 Baths",
        area: "2746-3862 sq.ft.",
        status: "Under Construction",
        developer: "Gaur Group + NBCC",
        possession: "Under Construction",
        highlights: [
          "30+ Years Experience",
          "NBCC Execution",
          "Large Apartment Sizes",
          "Low Density Luxury",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ11256",
        unitTypes: ["3 BHK + Study", "4 BHK + Study"],
        startingPrice: "₹2.50 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹13,000-14,000",
        roi: "High Appreciation",
        rentalYield: "Premium Rental Yield",
      },
      {
        id: 8,
        title: "THE BROOK & RIVULET",
        subtitle: "Premium High-Rise Residences",
        location: "Sector 12, Greater Noida West",
        price: "₹1.40 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Brook and Rivulet/1.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1350-2050 sq.ft.",
        status: "Under Construction",
        developer: "Fusion Limited",
        possession: "Under Construction",
        highlights: [
          "3 Side Open Corner Plot",
          "Earthquake Resistant RCC",
          "MIVAN Formwork",
          "Hafeez Contractor Design",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ535539",
        unitTypes: ["3C", "3E", "4B", "4C"],
        startingPrice: "₹1.40 Cr",
        paymentPlans: ["SPP 40:40:20", "CLP"],
        pricePerSqft: "₹10,400-10,700",
        roi: "High Appreciation",
        rentalYield: "Excellent Rental Yield",
      },
      {
        id: 9,
        title: "RENOX THRIVE",
        subtitle: "Premium Residences",
        location: "Sector 10, Greater Noida West",
        price: "₹1.42 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Renox/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "1582-2644 sq.ft.",
        status: "Under Construction",
        developer: "Nivas Promoters (Renox Group)",
        possession: "Under Construction",
        highlights: [
          "Transparency & Trust",
          "Timely Delivery",
          "Ethical Practices",
          "Escalation Free Pricing",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ742692",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "₹1.42 Cr",
        paymentPlans: ["Down Payment", "Construction Linked"],
        pricePerSqft: "₹9,000",
        roi: "Good Appreciation",
        rentalYield: "Stable Rental Yield",
      },
      {
        id: 10,
        title: "CIVITECH STRINGS",
        subtitle: "Tower Daytona - Premium Residential",
        location: "Sector 12, Greater Noida West",
        price: "₹2.37 Cr onwards",
        priceUnit: "Starting Price",
        image: "/Civitech/hero.avif",
        beds: "3 BHK + 3T",
        baths: "3 Baths",
        area: "1975-2075 sq.ft.",
        status: "Under Construction",
        developer: "S.A.G. Realtech (Civitech Group)",
        possession: "Under Construction",
        highlights: [
          "30+ Years Legacy",
          "IGBC Gold Rated",
          "Aluminium Formwork",
          "Home Automation",
        ],
        segment: "Investment Opportunity",
        reraId: "UPRERAPRJ646272",
        unitTypes: ["3 BHK + 3T"],
        startingPrice: "₹2.37 Cr",
        paymentPlans: ["10:30:30:30"],
        pricePerSqft: "₹12,000",
        roi: "Premium Appreciation",
        rentalYield: "High Rental Yield",
      },
      // Luxury Projects
      {
        id: 11,
        title: "FOREST WALK VILLA",
        subtitle: "Luxury Forest Living",
        location: "NH-24, Dasna, Ghaziabad",
        price: "₹2.85 Cr onwards",
        priceUnit: "Starting Price",
        image: "/ForestWalk/hero.avif",
        beds: "4 BHK + 5T Villas",
        baths: "5 Baths",
        area: "3070-4200 sq.ft.",
        status: "Under Construction",
        developer: "Madhusudan Group / Yatharth Group",
        possession: "Jun 2027",
        highlights: [
          "52 Acres Forest Theme",
          "80% Green Landscape",
          "Fully Furnished",
          "Vastu Compliant",
        ],
        segment: "Luxury Residence",
        reraId: "UPRERAPRJ658961",
        unitTypes: ["4 BHK + 5T Villas"],
        startingPrice: "₹2.85 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹1,75,000 per sq.yd",
        luxuryFeatures: [
          "Italian Marble Flooring",
          "Modular Kitchen",
          "Lift Provision",
          "Private Gardens",
        ],
      },
      {
        id: 12,
        title: "Vibhor Vaibhav Infrahome Pvt. Ltd.",
        subtitle: "Luxury Residential Development",
        location: "Sector 12, Greater Noida West",
        price: "₹2.40 Cr onwards",
        priceUnit: "Starting Price",
        image: "/VVIP/hero.avif",
        beds: "3 & 4 BHK",
        baths: "2-3 Baths",
        area: "2000-3600 sq.ft.",
        status: "Pre-Launch",
        developer: "Ashtech Group",
        possession: "Pre-Launch",
        highlights: [
          "30+ Years Nation Building",
          "Studio Symbiosis Design",
          "70,000 sq.ft. Clubhouse",
          "Fully Furnished",
        ],
        segment: "Luxury Residence",
        reraId: "Pre-Launch",
        unitTypes: ["3 BHK", "4 BHK"],
        startingPrice: "₹2.40 Cr",
        paymentPlans: ["Construction Linked"],
        pricePerSqft: "₹12,000-13,500",
        luxuryFeatures: [
          "Italian Marble Flooring",
          "VRV Air Conditioning",
          "12 ft Ceiling Height",
          "Modular Kitchen & Wardrobes",
        ],
      },
      {
        id: 13,
        title: "PANCHSHEEL GREENS-II",
        subtitle: "Premium Residential Township",
        location: "Sector 16, Greater Noida West",
        price: "₹91.5 Lakhs onwards",
        priceUnit: "Starting Price",
        image: "/residential-plot-with-landscaping.avif",
        beds: "2 & 3 BHK",
        baths: "2-3 Baths",
        area: "915-1525 sq.ft.",
        status: "Ready to Move",
        developer: "Panchsheel Group",
        possession: "Ready to Move",
        highlights: [
          "26 Acres Project",
          "65% Open Area",
          "OC Received",
          "35+ Years Legacy",
        ],
        segment: "Luxury Residence",
        reraId: "UPRERAPRJ8595",
        unitTypes: ["2 BHK", "3 BHK"],
        startingPrice: "₹91.5 Lakhs",
        paymentPlans: ["Available on Request"],
        pricePerSqft: "Ready to Move",
        luxuryFeatures: [
          "Two 3-Storey AC Clubhouses",
          "Six Banquet Halls",
          "Swimming Pools",
          "Panchsheel Greenmart",
        ],
      },
    ],
  };

  // Helper function to get location category from location string
  const getLocationCategory = (location: string): string => {
    const loc = location.toLowerCase();
    if (loc.includes("yamuna expressway") || loc.includes("yamuna")) {
      return "yamuna-expressway";
    }
    if (loc.includes("ghaziabad") || loc.includes("nh-24") || loc.includes("dasna")) {
      return "ghaziabad";
    }
    if (loc.includes("noida") && !loc.includes("greater")) {
      return "noida";
    }
    if (loc.includes("greater noida")) {
      return "greater-noida";
    }
    return "greater-noida"; // default
  };

  // Filter properties by location only (no segment filtering)
  const allProperties = [
    ...propertiesData["buying-to-live"],
    ...propertiesData["investment"],
    ...propertiesData["luxury"]
  ];
  const currentProperties = activeLocation === "all"
    ? allProperties
    : allProperties.filter((property: any) => {
        const propertyLocationCategory = property.locationCategory || getLocationCategory(property.location);
        return propertyLocationCategory === activeLocation;
      });

  // Read location from URL query params on mount and when params change
  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (locationParam) {
      setActiveLocation(locationParam);
    } else {
      setActiveLocation("all");
    }
  }, [searchParams]);


  const handleLocationChange = (locationId: string) => {
    setActiveLocation(locationId);
    setDisplayedProperties(9); // Reset to show first 9 properties
  };

  const handlePropertyClick = (property: any) => {
    setSelectedProperty({
      title: property.title,
      location: property.location,
    });
    setIsPopupOpen(true);
  };

  const handleViewDetails = (propertyId: number) => {
    const slug = projectSlugs[propertyId] || propertyId.toString();
    window.location.href = `/properties/${slug}`;
  };

  const handleViewMore = () => {
    setDisplayedProperties((prev) => prev + 9);
  };

  const hasMoreProperties = currentProperties.length > displayedProperties;
  const propertiesToShow = currentProperties.slice(0, displayedProperties);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Properties", url: "https://www.celesteabode.com/properties" },
        ]}
      />
    <div className="min-h-screen bg-background">
      <main className="pt-0">
        <Header />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-background pt-24">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Full Container Image */}
              <div className="relative h-[580px] lg:h-[620px]">
                <Image
                  src="/hero-.avif"
                  alt="Property Portfolio Hero"
                  fill
                  priority
                  loading="eager"
                  className="object-cover object-bottom md:object-cover md:object-[center_70%]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  quality={85}
                  fetchPriority="high"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Left side vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Left Aligned Text Overlay */}
                <div className="absolute inset-0 flex items-end pb-16">
                  <div className="text-left text-[#FAFAF8] max-w-4xl px-4 ml-6 md:px-6 md:ml-8">
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 leading-tight text-[#FAFAF8]"
                      style={{
                        textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <div className="block text-[#FAFAF8]">
                        Verified Residential & Investment
                      </div>
                      <div className="block text-[#FAFAF8] mt-1 md:mt-2">
                        <span className="text-[#CBB27A]">
                          Properties in Delhi NCR
                        </span>
                      </div>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-[#CBB27A] mb-4 md:mb-6 max-w-2xl font-poppins leading-relaxed">
                      Curated projects across Noida, Greater Noida, Yamuna Expressway, and NCR growth corridors—evaluated for legality, location logic, and long-term suitability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-4">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Filters Section Heading */}
        <section className="pt-10 pb-2 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center font-poppins">
              Shortlist Projects Based on Your Priorities
              </h2>
            </div>
        </section>

        {/* Property Filters Section */}
        <PropertyFilters />

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-4">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
                      </div>

        {/* Active Segment Projects */}
        <section id="projects-section" className="py-16 px-4 bg-background" aria-label="Properties Collection">
          <div className="max-w-7xl mx-auto">

            {/* Properties Gallery Display */}
            {currentProperties.length > 0 ? (
              <>
                <div id="itemlist" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Properties in Delhi NCR">
                  {propertiesToShow.map((property) => (
                        <Card
                      key={property.id}
                          className="border-0 bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer p-0 transform hover:-translate-y-2 hover:scale-[1.02]"
                          onClick={() => handleViewDetails(property.id)}
                          role="listitem"
                          itemScope
                          itemType="https://schema.org/Product"
                        >
                          <div className="relative w-full h-80 rounded-xl overflow-hidden">
                            <Image
                              src={property.image}
                              alt={`${property.title} - ${property.location} - ${property.beds} - ${property.status}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={90}
                              loading="lazy"
                              itemProp="image"
                            />

                            {/* Overlay for text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/30"></div>

                            {/* Location and Name at bottom */}
                            <div className="absolute bottom-3 left-3 right-3 transition-transform duration-300 group-hover:translate-y-[-4px]">
                              <div className="flex items-center gap-2 text-white mb-1">
                                <MapPin className="w-3 h-3 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-xs font-medium text-white">
                                  {property.location}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-white leading-tight" itemProp="name">
                                {property.title}
                              </h3>
                              <meta itemProp="description" content={`${property.subtitle} in ${property.location}. ${property.beds} available. ${property.status}.`} />
                              <meta itemProp="brand" content={property.developer || "Verified Developer"} />
                              <meta itemProp="offers" itemType="https://schema.org/Offer" content={property.price || "Price on Request"} />
                            </div>
                          </div>
                        </Card>
                    ))}
                </div>

                {/* View More Properties Button */}
                {hasMoreProperties && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={handleViewMore}
                      className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-poppins"
                    >
                      View More Properties
                    </Button>
              </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-background rounded-2xl">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-6 font-poppins">
                  No properties found matching your filters.
                </p>
              </div>
            )}

            {/* Aesthetic Line Separator */}
            <div className="w-full flex justify-center py-4 mt-16">
              <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
            </div>

            {/* SEO Content Section - Insight Panel */}
            <article className="mt-12 sm:mt-16 md:mt-12 mb-12 sm:mb-16 md:mb-12 px-4 sm:px-6 lg:px-8 bg-background">
              <div className="max-w-[1200px] mx-auto">
                {/* Heading Section */}
                <header className="text-center mb-8 md:mb-12 lg:mb-16">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 font-poppins leading-tight px-2">
                    Beyond Brochures: How to Evaluate Properties in <span className="text-[#CBB27A]">Delhi NCR</span>
                  </h2>
                </header>

                {/* Main Content Card - Wide Advisory Panel */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
                    <div className="w-full max-w-none">
                      <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                        When searching for properties in <strong>Delhi NCR</strong>, you'll encounter countless projects across <strong>Noida</strong>, <strong>Greater Noida</strong>, <strong>Yamuna Expressway</strong>, <strong>Ghaziabad</strong>, and other growth corridors. Each developer claims their project is the best investment opportunity or perfect for end-use living. However, the reality is more nuanced than what brochures suggest. Not every property works for every buyer, and what matters isn't the glossy presentation, but the underlying factors that determine long-term value and suitability.
                      </p>

                      <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                        The key to making informed property decisions lies in evaluating fundamental factors beyond marketing claims. Developer credibility matters significantly, as a track record of on-time delivery, quality construction, and financial stability reveals more about future performance than any sales pitch. Location maturity cannot be overstated either. Established infrastructure, connectivity, and social amenities that exist today matter far more than future promises that may or may not materialize.{!isCtaContentExpanded && (
                          <> <button onClick={() => setIsCtaContentExpanded(true)} className="text-[#CBB27A] font-bold hover:underline cursor-pointer" aria-label="Read more about property evaluation">Read More...</button></>
                        )}
                        {isCtaContentExpanded && (
                          <> When evaluating properties across Delhi NCR, it's essential to look beyond surface-level amenities and marketing narratives. The true value of a property investment lies in factors that have proven track records rather than speculative future developments. This approach ensures that buyers and investors make decisions based on tangible evidence rather than optimistic projections.</>
                        )}
                      </p>

                      {/* Brand positioning with subtle styling - shown when expanded */}
                      {isCtaContentExpanded && (
                        <div className="mt-6 md:mt-10 pt-6 md:pt-8 border-t border-gray-200">
                          <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-8 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                            At <strong className="text-[#CBB27A]">Celeste Abode</strong>, we don't present properties as inventory to be sold. Instead, we curate options that pass rigorous evaluation criteria around developer credibility, location logic, pricing fairness, and long-term suitability. Our advisory-led approach helps buyers and investors in <strong>Delhi NCR</strong> make informed decisions by focusing on evidence over marketing, substance over surface-level amenities, and long-term value over short-term promises. <button onClick={() => setIsCtaContentExpanded(false)} className="text-[#CBB27A] font-bold hover:underline cursor-pointer" aria-label="Read less">Read Less</button>
                          </p>
                        </div>
                      )}
                      </div>
                    </div>
              </div>
              </div>
            </article>

            {/* Aesthetic Line Separator */}
            <div className="w-full flex justify-center py-8">
              <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 mb-8">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-poppins">
                  Ready to Make an Informed Property Decision?
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto font-poppins leading-relaxed">
                  Let our advisory team help you evaluate properties in Delhi NCR based on developer credibility, location maturity, and long-term suitability—not just marketing claims.
                </p>
                  <Button
                    onClick={() => setIsGeneralFormOpen(true)}
                    className="bg-black hover:bg-black/90 text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl font-poppins"
                  >
                    Get Expert Consultation
                  </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedProperty(null);
        }}
        propertyTitle={selectedProperty?.title}
        propertyLocation={selectedProperty?.location}
      />

      {/* General Lead Form */}
      <GeneralLeadForm
        isOpen={isGeneralFormOpen}
        onClose={() => setIsGeneralFormOpen(false)}
        title="Get Expert Consultation"
        subtitle="Fill in your details and our team will get back to you shortly."
        source="properties-page"
      />

      <Footer />
    </div>
    </>
  );
}
