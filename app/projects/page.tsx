"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactPopup } from "@/components/contact-popup";
import { PropertyLeadForm } from "@/components/property-lead-form";
import { LocationFilterCards } from "@/components/location-filter-cards";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Play,
  Star,
  Building2,
  Home,
  TrendingUp,
  Crown,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { projectSlugs } from "@/lib/project-metadata";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [activeSegment, setActiveSegment] = useState("buying-to-live");
  const [activeLocation, setActiveLocation] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    title: string;
    location: string;
  } | null>(null);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const segments = [
    {
      id: "buying-to-live",
      title: "Buying to Live",
      subtitle: "Your Dream Home Awaits",
      description:
        "Discover homes designed for modern living with premium amenities and strategic locations.",
      icon: Home,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "investment",
      title: "Investment Opportunities",
      subtitle: "Smart Investment Choices",
      description:
        "High-return properties with excellent growth potential and rental yields.",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "luxury",
      title: "Luxury Residences",
      subtitle: "Ultimate Luxury Living",
      description:
        "Exclusive properties with world-class amenities and unparalleled luxury.",
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

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

  // Filter properties by segment and location
  const segmentProperties = propertiesData[activeSegment as keyof typeof propertiesData];
  const currentProperties = activeLocation === "all"
    ? segmentProperties
    : segmentProperties.filter((property: any) => {
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

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset and clamp carousel position when properties change
  useEffect(() => {
    // Desktop: max = length - 3 (so the last position still shows 3 cards)
    // Mobile: max = length - 1 (to show the last single card)
    const maxPositionDesktop = Math.max(0, currentProperties.length - 3);
    const maxPositionMobile = Math.max(0, currentProperties.length - 1);
    const maxPosition = isMobile ? maxPositionMobile : maxPositionDesktop;
    setCarouselPosition((prev) => Math.min(prev, maxPosition));
  }, [activeSegment, activeLocation, currentProperties.length, isMobile]);

  const handleSegmentChange = (segmentId: string) => {
    setActiveSegment(segmentId);
    setCarouselPosition(0); // Reset carousel position when segment changes
  };

  const handleLocationChange = (locationId: string) => {
    setActiveLocation(locationId);
    setCarouselPosition(0); // Reset carousel position when location changes
  };

  const handleExploreProperties = (segmentId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card onClick from firing
    handleSegmentChange(segmentId);
      // Scroll to projects section after a short delay to allow segment change
    setTimeout(() => {
      const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
    window.location.href = `/projects/${slug}`;
  };

  const handleCarouselPrev = () => {
    setCarouselPosition((prev) => Math.max(0, prev - 1));
  };

  const handleCarouselNext = () => {
    // Desktop: max = length - 3 (so the last position still shows 3 cards)
    // Mobile: max = length - 1 (to show the last single card)
    const maxPositionDesktop = Math.max(0, currentProperties.length - 3);
    const maxPositionMobile = Math.max(0, currentProperties.length - 1);
    const maxPosition = isMobile ? maxPositionMobile : maxPositionDesktop;
    setCarouselPosition((prev) => Math.min(prev + 1, maxPosition));
  };

  const shouldShowCarousel = currentProperties.length >= 3;
  // Max position calculation based on screen size
  // Desktop: max = length - 3 (last position shows cards [length-3, length-2, length-1])
  // Mobile: max = length - 1 (last position shows the last single card)
  const maxPositionDesktop = Math.max(0, currentProperties.length - 3);
  const maxPositionMobile = Math.max(0, currentProperties.length - 1);
  const maxPosition = isMobile ? maxPositionMobile : maxPositionDesktop;
  const canGoPrev = carouselPosition > 0;
  const canGoNext = carouselPosition < maxPosition;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Projects", url: "https://www.celesteabode.com/projects" },
        ]}
      />
    <div className="min-h-screen bg-background">
      <style dangerouslySetInnerHTML={{__html: `
        .carousel-transform {
          --translate-percent: calc(var(--carousel-position, 0) * 100%);
          transform: translateX(calc(-1 * var(--translate-percent)));
        }
        @media (min-width: 768px) {
          .carousel-transform {
            --translate-percent: calc(var(--carousel-position, 0) * 33.333%);
          }
        }
      `}} />
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
                      className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight text-[#FAFAF8]"
                      style={{
                        textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <div className="block text-[#FAFAF8]">
                        Your Definitive
                      </div>
                      <div className="block text-[#FAFAF8] mt-2">
                        <span className="text-[#CBB27A]">
                          Property Portfolio
                        </span>
                      </div>
                    </h1>

                    <p className="text-base md:text-lg text-[#CBB27A] mb-6 max-w-2xl">
                      Every asset—whether for living or investing—is vetted by
                      our evidence-driven philosophy, ensuring unparalleled
                      value and peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-8">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        {/* Segment Navigation */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your{" "}
                <span className="text-primary">Property Category</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each category is carefully curated to match your specific
                requirements and investment goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {segments.map((segment) => {
                const Icon = segment.icon;
                const isActive = activeSegment === segment.id;

                return (
                  <Card
                    key={segment.id}
                    className={`cursor-pointer transition-all duration-500 hover:shadow-2xl group transform hover:-translate-y-2 hover:scale-[1.02] ${
                      isActive
                        ? `border-2 border-primary shadow-lg ${segment.bgColor}`
                        : "border border-gray-200 hover:border-primary/50"
                    }`}
                    onClick={() => handleSegmentChange(segment.id)}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                          isActive
                            ? `bg-gradient-to-r ${segment.color} text-white`
                            : `bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:${segment.color} group-hover:text-white`
                        }`}
                      >
                        <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                        {segment.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground">
                        {segment.subtitle}
                      </p>

                      <p className="text-sm text-muted-foreground mb-6 transition-colors duration-300 group-hover:text-foreground">
                        {segment.description}
                      </p>

                      <div 
                        onClick={(e) => handleExploreProperties(segment.id, e)}
                        className="flex items-center justify-center gap-2 text-primary font-medium transition-all duration-300 cursor-pointer hover:gap-3 hover:scale-105 hover:text-primary/90 px-4 py-2 rounded-lg hover:bg-primary/10 group/button"
                      >
                        <span>Explore Projects</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location Filter Cards Section */}
        <Suspense fallback={<div className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 min-h-[400px]" />}>
          <LocationFilterCards />
        </Suspense>

        {/* Active Segment Projects */}
        <section id="projects-section" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {segments.find((s) => s.id === activeSegment)?.title} Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {segments.find((s) => s.id === activeSegment)?.description}
              </p>
            </div>

            {/* Projects Display */}
            {shouldShowCarousel ? (
              /* Carousel with Navigation Arrows */
              <div className="flex items-center gap-0 md:gap-4">
                {/* Left Navigation Arrow - Desktop Only */}
                <button
                  onClick={handleCarouselPrev}
                  disabled={!canGoPrev}
                  className={`hidden md:flex flex-shrink-0 p-3 rounded-full shadow-lg transition-all duration-500 ${
                    canGoPrev
                      ? "bg-white/90 hover:bg-white text-primary hover:scale-110 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Previous properties"
                >
                  <ArrowLeft className="w-6 h-6 transition-transform duration-300" />
                </button>

                {/* Carousel Container */}
                <div className="flex-1 relative overflow-hidden py-6">
                  {/* Mobile Navigation Arrows - Overlay on Cards */}
                  <div className="md:hidden absolute inset-0 z-10 pointer-events-none">
                    {/* Left Arrow */}
                    <button
                      onClick={handleCarouselPrev}
                      disabled={!canGoPrev}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-auto p-2 rounded-full shadow-lg transition-all duration-300 ${
                        canGoPrev
                          ? "bg-white/90 hover:bg-white text-primary hover:scale-110 hover:shadow-xl cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                      }`}
                      aria-label="Previous properties"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={handleCarouselNext}
                      disabled={!canGoNext}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-auto p-2 rounded-full shadow-lg transition-all duration-300 ${
                        canGoNext
                          ? "bg-white/90 hover:bg-white text-primary hover:scale-110 hover:shadow-xl cursor-pointer"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                      }`}
                      aria-label="Next properties"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div
                    className="flex transition-transform duration-500 ease-in-out carousel-transform"
                    style={{
                      '--carousel-position': carouselPosition,
                    } as React.CSSProperties & { '--carousel-position': number }}
                  >
                    {currentProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="flex-shrink-0 w-full md:w-1/3 px-4"
                      >
                        <Card
                          className="border-0 bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer p-0 transform hover:-translate-y-2 hover:scale-[1.02]"
                          onClick={() => handleViewDetails(property.id)}
                        >
                          <div className="relative w-full h-80 rounded-xl overflow-hidden">
                            <Image
                              src={property.image}
                              alt={property.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                              quality={90}
                              loading="lazy"
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
                              <h3 className="text-lg font-bold text-white leading-tight">
                                {property.title}
                              </h3>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Navigation Arrow - Desktop Only */}
                <button
                  onClick={handleCarouselNext}
                  disabled={!canGoNext}
                  className={`hidden md:flex flex-shrink-0 p-3 rounded-full shadow-lg transition-all duration-500 ${
                    canGoNext
                      ? "bg-white/90 hover:bg-white text-primary hover:scale-110 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Next properties"
                >
                  <ArrowRight className="w-6 h-6 transition-transform duration-300" />
                </button>
              </div>
            ) : (
              /* Grid Layout for 3 or fewer properties - Mobile Single Column, Desktop Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="border-0 bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer p-0 transform hover:-translate-y-2 hover:scale-[1.02]"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    <div className="relative w-full h-80 rounded-xl overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        quality={90}
                        loading="lazy"
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
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {property.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Need Help Choosing the Right Property?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our expert advisors are here to help you find the perfect
                  property that matches your needs and budget.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() =>
                      handlePropertyClick({
                        title: "General Inquiry",
                        location: "All Projects",
                      })
                    }
                  >
                    <Users className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Get Expert Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    <Shield className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Contact Us
                  </Button>
                </div>
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

      <Footer />
    </div>
    </>
  );
}
