"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PropertySchema, BreadcrumbSchema } from "@/lib/structured-data";
import { projectMetadata, projectSlugToId } from "@/lib/project-metadata";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ContactPopup } from "@/components/contact-popup";
import {
  MapPin,
  Building2,
  Home,
  Calendar,
  Award,
  Eye,
  X,
  MessageSquare,
  ArrowRight,
  Phone,
  Camera,
  Square,
  Sparkles,
  Droplets,
  Heart,
  Dumbbell,
  TreePine,
  Coffee,
  Gamepad2,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PropertyPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  const property = {
    projectName: "ACE HANEI",
    developer: "ACE Group",
    location: "Sector 1, TechZone 4, Greater Noida West",
    reraId: "UPRERAPRJ11256",
    status: "Under Construction",
    possessionDate: "Dec 2027",
    unitTypes: [
      "3 BHK + Study",
      "4 BHK + Study (Typical Tower)",
      "4 BHK + Study (Iconic Tower)",
    ],
    sizes: "2,746 sq ft - 3,862 sq ft",
    images: [
      "/ACE/hero.avif",
      "/ACE/1.avif",
      "/ACE/2.avif",
      "/ACE/3.avif",
      "/ACE/4.avif",
      "/ACE/5.avif",
      "/ACE/6.avif",
      "/ACE/7.avif",
    ],
  };

  useEffect(() => {
    if (!isSlideshowPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === property.images.length - 1 ? 0 : prevSlide + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshowPaused, property.images.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === property.images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? property.images.length - 1 : prevSlide - 1
    );
  };

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleContact = () => {
    setIsPopupOpen(true);
  };

  const projectId = projectSlugToId["ace-hanei"];
  const projectMeta = projectMetadata[projectId];
  const projectUrl = `https://www.celesteabode.com/projects/ace-hanei`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.celesteabode.com" },
          { name: "Projects", url: "https://www.celesteabode.com/projects" },
          { name: projectMeta.title.split(" - ")[0], url: projectUrl },
        ]}
      />
      <PropertySchema
        name={property.projectName}
        description={projectMeta.description}
        image={property.images[0]}
        price={projectMeta.price}
        address={property.location}
        developer={property.developer}
        reraId={property.reraId}
        unitTypes={property.unitTypes}
        area={property.sizes}
        status={property.status}
        url={projectUrl}
      />
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Header />

      {/* Cinematic Hero Banner */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.projectName}
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

        {/* Mobile Layout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center md:hidden px-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold border border-white/30">
                {property.status}
              </Badge>
            </div>
            <h1
              className="text-xl font-black leading-tight text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {property.projectName}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#CBB27A]" />
              <p
                className="text-sm font-semibold text-[#CBB27A]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {property.location}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="absolute inset-0 hidden md:flex items-end justify-start pb-8 sm:pb-12 md:pb-20 pl-4 md:pl-8 lg:pl-12">
          <div className="max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/30">
                {property.status}
              </Badge>
            </div>
            <h1
              className="text-3xl lg:text-5xl xl:text-6xl font-black leading-[0.9] text-white mb-6"
              style={{
                fontFamily: "Poppins, sans-serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {property.projectName}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#CBB27A]" />
              <p
                  className="text-sm lg:text-lg xl:text-xl font-semibold text-[#CBB27A]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
              >
                {property.location}
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-white">
                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-[#CBB27A]/20 rounded-full flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors duration-300">
                    <Calendar className="w-4 h-4 text-[#CBB27A] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      Possession
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#CBB27A] transition-colors duration-300">
                      {property.possessionDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-[#CBB27A]/20 rounded-full flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors duration-300">
                    <Award className="w-4 h-4 text-[#CBB27A] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      Developer
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#CBB27A] transition-colors duration-300">
                      {property.developer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 bg-[#CBB27A]/20 rounded-full flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors duration-300">
                    <Building2 className="w-4 h-4 text-[#CBB27A] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      RERA ID
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#CBB27A] transition-colors duration-300">
                      {property.reraId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12 md:space-y-20">
              {/* Project Gallery */}
              <section>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[#CBB27A]" />
                    </div>
                    <h2
                      className="text-4xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Project Gallery
                    </h2>
                  </div>
                  <div className="w-20 h-1 bg-[#CBB27A] mb-8"></div>
                </div>

                <div
                  className="relative w-full h-[300px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group"
                  onMouseEnter={() => setIsSlideshowPaused(true)}
                  onMouseLeave={() => setIsSlideshowPaused(false)}
                >
                  <div className="relative w-full h-full">
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => handleImageClick(currentSlide)}
                    >
                      <Image
                        src={property.images[currentSlide]}
                        alt={`${property.projectName} - Image ${currentSlide + 1}`}
                        fill
                        className="object-cover transition-all duration-1000 ease-in-out hover:scale-105"
                        priority
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 pointer-events-none">
                      <span className="text-white text-sm font-semibold">
                        {currentSlide + 1} / {property.images.length}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-4 text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-4 text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">
                          Click to zoom
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Minimal Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex justify-center gap-2 pb-2">
                      {property.images.length <= 8 && property.images.map((image, index) => (
                          <button
                          key={index}
                            onClick={() => setCurrentSlide(index)}
                          className={`relative transition-all duration-300 ${
                              index === currentSlide
                              ? "w-8 h-2 bg-[#CBB27A] rounded-full shadow-lg"
                              : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/60"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Overview Section */}
              <section>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-[#CBB27A]" />
                    </div>
                    <h2
                      className="text-4xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      About ACE Hanei
                    </h2>
                  </div>
                  <div className="w-20 h-1 bg-[#CBB27A] mb-8"></div>
                </div>

                <div className="relative bg-gradient-to-br from-white via-[#CBB27A]/5 to-white rounded-3xl shadow-2xl p-12 md:p-20 border border-[#CBB27A]/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#CBB27A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#CBB27A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#CBB27A]/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="relative z-10">
                    <p
                      className="text-base md:text-lg leading-relaxed text-gray-800 text-center max-w-4xl mx-auto"
                      style={{ 
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        lineHeight: "1.8"
                      }}
                    >
                      Nestled in the prestigious <span className="font-semibold text-[#CBB27A]">Sector 1, TechZone 4, Greater Noida West</span>, ACE Hanei by ACE Group stands as a masterpiece of low-density luxury living, featuring <span className="font-semibold">spacious 3 BHK and 4 BHK residences spanning 2,746 to 3,862 sq.ft across 12 acres</span> with just 4 units per floor in typical towers and 3 units in the iconic 45-floor tower. Designed by <span className="font-semibold">Chapman Taylor</span> and executed in partnership with NBCC, each home showcases <span className="font-semibold">premium Italian marble, quartz countertops, and UPVC windows</span>, while the <span className="font-semibold">grand clubhouse, aqua zone, and theme gardens</span> ensure a lifestyle that redefines modern living with unparalleled space and sophistication.
                    </p>
                  </div>
                </div>
              </section>

              {/* Amenities */}
              <section>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#CBB27A]" />
                    </div>
                    <h2
                      className="text-4xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      World-Class Amenities
                    </h2>
                  </div>
                  <div className="w-20 h-1 bg-[#CBB27A] mb-8"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { name: "Aqua Zone Swimming Pool", icon: Droplets },
                    { name: "Kids Zone", icon: Heart },
                    { name: "Lawn Tennis Courts", icon: Dumbbell },
                    { name: "Theme Gardens", icon: TreePine },
                    { name: "Grand Clubhouse", icon: Coffee },
                    { name: "24/7 Security", icon: Shield },
                    { name: "Basketball Court", icon: Gamepad2 },
                    { name: "Reflexology Garden", icon: Heart },
                  ].map((amenity, index) => {
                    const IconComponent = amenity.icon;
                      return (
                              <div
                                key={index}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-[#CBB27A]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#CBB27A]/20 group-hover:scale-110 transition-all duration-300">
                            <IconComponent className="w-10 h-10 text-[#CBB27A] group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <p
                            className="text-sm font-semibold text-gray-900 leading-tight"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {amenity.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#CBB27A]/10 rounded-full flex items-center justify-center">
                      <Home className="w-5 h-5 text-[#CBB27A]" />
                    </div>
                    <h3
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Property Details
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="pb-5 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Square className="w-4 h-4 text-[#CBB27A]" />
                        <p
                          className="text-xs text-gray-600 font-semibold uppercase tracking-wide"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Type
                        </p>
                      </div>
                      <p
                        className="text-lg font-bold text-gray-900"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {property.status}
                      </p>
                    </div>

                    <div className="pb-5 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-[#CBB27A]" />
                        <p
                          className="text-xs text-gray-600 font-semibold uppercase tracking-wide"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Configuration
                        </p>
                      </div>
                      <div className="space-y-2">
                        {property.unitTypes.map((type, index) => (
                          <p
                            key={index}
                        className="text-lg font-bold text-gray-900"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                            {type}
                          </p>
                        ))}
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {property.sizes}
                      </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#CBB27A]" />
                        <p
                          className="text-xs text-gray-600 font-semibold uppercase tracking-wide"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Location
                        </p>
                      </div>
                      <p
                        className="text-base font-semibold text-gray-900 leading-relaxed"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {property.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#CBB27A]/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#CBB27A]" />
                    </div>
                    <h3
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Property Inquiry
                    </h3>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <Phone className="w-4 h-4 text-[#CBB27A]" />
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        className="border-gray-300 focus:border-[#CBB27A] focus:ring-[#CBB27A] rounded-lg h-10"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <Phone className="w-4 h-4 text-[#CBB27A]" />
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="border-gray-300 focus:border-[#CBB27A] focus:ring-[#CBB27A] rounded-lg h-10"
                      />
                    </div>

                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        Send Inquiry
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="relative bg-gradient-to-br from-[#2B3035] via-[#1a1d22] to-[#2B3035] py-10 md:py-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 bg-[#CBB27A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#CBB27A] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Ready to Find Your{" "}
            <span className="text-[#CBB27A]">Dream Home</span>?
          </h2>
          <p
            className="text-sm md:text-base text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Connect with our expert advisors for personalized guidance and exclusive property insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={handleContact}
              className="bg-[#CBB27A] hover:bg-[#B8A066] text-white font-semibold py-5 px-6 rounded-full text-sm md:text-base transition-all duration-300 hover:-translate-y-1 hover:scale-105 group"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                Schedule Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white hover:border-white bg-white/10 hover:bg-white/20 text-white font-semibold py-5 px-6 rounded-full text-sm md:text-base transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 group"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                Call Now
              </div>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-2xl max-h-[70vh] w-full mx-4">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
            >
              <X className="w-6 h-6 text-black transition-transform duration-300 group-hover:rotate-90" />
            </button>
            <Image
              src={property.images[modalImageIndex]}
              alt={`${property.projectName} - Image ${modalImageIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
    </>
  );
}