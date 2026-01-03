"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/types/property";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertySchema, BreadcrumbSchema } from "@/lib/structured-data";
import { Button } from "@/components/ui/button";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import {
  MapPin,
  Download,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Play,
  Eye,
  Building2,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import { AmenityIcon } from "@/lib/amenity-icons";
import { getPropertyAbsoluteUrl } from "@/lib/property-url";

interface DynamicPropertyPageProps {
  property: Property;
}

export default function DynamicPropertyPage({ property }: DynamicPropertyPageProps) {
  const [isBrochureDialogOpen, setIsBrochureDialogOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Get site URL for client-side component
  const siteUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.celesteabode.com';

  const projectUrl = getPropertyAbsoluteUrl(property);

  // Create unified media array (images and videos)
  const mediaItems = [
    ...(property.images || []).map((img, idx) => ({ type: 'image' as const, src: img, index: idx })),
    ...(property.videos || []).map((video, idx) => ({ 
      type: 'video' as const, 
      src: video.src, 
      thumbnail: property.heroImage, // Always use hero image for video thumbnails
      title: video.title,
      index: (property.images?.length || 0) + idx 
    })),
  ];

  // Auto-play slideshow (pause on hover)
  useEffect(() => {
    if (!isSlideshowPaused && playingVideoIndex === null && mediaItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isSlideshowPaused, playingVideoIndex, mediaItems.length]);

  // Reset video playing state when media changes
  useEffect(() => {
    if (playingVideoIndex !== null) {
      const currentItem = mediaItems[currentMediaIndex];
      if (currentItem && (currentItem.type !== 'video' || currentItem.index !== playingVideoIndex)) {
        setPlayingVideoIndex(null);
      }
    }
  }, [currentMediaIndex, playingVideoIndex, mediaItems]);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    setPlayingVideoIndex(null);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setPlayingVideoIndex(null);
  };

  const goToMedia = (index: number) => {
    setCurrentMediaIndex(index);
    setPlayingVideoIndex(null);
  };

  const handleVideoPlay = (videoIndex: number) => {
    setPlayingVideoIndex(videoIndex);
    setIsSlideshowPaused(true);
  };

  const handleVideoEnd = () => {
    setPlayingVideoIndex(null);
    setIsSlideshowPaused(false);
    // Auto-advance to next media after video ends
    setTimeout(() => {
      nextMedia();
    }, 500);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setIsSlideshowPaused(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsSlideshowPaused(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, mediaItems.length]);

  // Phone validation function (same as other forms)
  const isValidPhone = (value: string) => {
    const trimmed = value.trim();
    
    // First, check that input only contains allowed characters: digits, +, spaces, dashes, parentheses
    // Reject any letters or other invalid characters
    const allowedCharsRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!allowedCharsRegex.test(trimmed)) {
      return false;
    }
    
    // Extract only digits
    const digits = trimmed.replace(/\D/g, '');
    
    // Basic format check - must be 10-12 digits
    // 10 digits: local number (e.g., 9818735258)
    // 11-12 digits: with country code (e.g., +91 9818735258 = 12 digits, +1 5551234567 = 11 digits)
    if (digits.length < 10 || digits.length > 12) {
      return false;
    }
    
    // If 11 digits and doesn't start with 0, must start with + (country code required)
    // 11 digits starting with 0 are allowed without + (e.g., 09876543210)
    // 11 digits not starting with 0 need + (e.g., +1 5551234567)
    // 12 digits always need + (e.g., +91 9818735258)
    if (digits.length === 11 && !digits.startsWith('0') && !trimmed.startsWith('+')) {
      return false;
    }
    if (digits.length === 12 && !trimmed.startsWith('+')) {
      return false;
    }
    
    // Check for all zeros (0000000000, etc.)
    if (/^0+$/.test(digits)) {
      return false;
    }
    
    // Check for repeated numbers (1111111111, 2222222222, etc.)
    // Check if all digits are the same
    if (/^(\d)\1{9,}$/.test(digits)) {
      return false;
    }
    
    // Check for sequential numbers (1234567890, 0123456789, etc.)
    const isSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current + 1 (handles wrap-around like 9->0)
        if (next !== (current + 1) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    // Check for reverse sequential (9876543210, 987654321, etc.)
    const isReverseSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current - 1 (handles wrap-around like 0->9)
        if (next !== (current - 1 + 10) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    if (isSequential(digits) || isReverseSequential(digits)) {
      return false;
    }
    
    return true;
  };

  // Handle phone input to restrict invalid characters
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrow keys, home, end
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40, 35, 36].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    
    // Check if the key is a valid character: digits (0-9), +, -, space, (, )
    const key = e.key;
    const isValidChar = /^[0-9+\s\-()]$/.test(key);
    
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow digits, +, spaces, hyphens, and parentheses
    const filteredValue = value.replace(/[^0-9+\s\-()]/g, '');
    
    setFormData({
      ...formData,
      phone: filteredValue,
    });
    
    // Validate phone number in real-time
    if (filteredValue.trim() && !isValidPhone(filteredValue)) {
      const digits = filteredValue.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !filteredValue.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !filteredValue.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Skip phone handling here - it's handled by handlePhoneChange
    if (e.target.name === "phone") {
      return;
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPhoneError("");
    
    // Validate phone number before submission
    if (!formData.phone.trim()) {
      setPhoneError("Phone number is required");
      setIsSubmitting(false);
      return;
    }

    if (!isValidPhone(formData.phone)) {
      const digits = formData.phone.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !formData.phone.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !formData.phone.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
      setIsSubmitting(false);
      return;
    }
    
    try {
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || formData.name;
      const lastName = nameParts.slice(1).join(' ') || 'Not Provided';

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phone: formData.phone.trim(),
          message: `Property inquiry for ${property.projectName} - ${property.location}`,
          formSource: "property-page-footer-cta",
          propertyTitle: property.projectName,
          propertyLocation: property.location,
          propertySlug: property.slug,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "" });
        setPhoneError("");
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to submit form" }));
        console.error("Form submission error:", errorData.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load amenities dynamically from database - Maximum 8 amenities
  const amenitiesToShow = useMemo(() => {
    if (!property.amenities || !Array.isArray(property.amenities)) {
      return [];
    }
    const filtered = property.amenities
      .filter((a) => a && typeof a === 'string' && a.trim() !== "")
      .slice(0, 8); // Limit to maximum 8 amenities
    return filtered;
  }, [property.amenities]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Properties", url: `${siteUrl}/properties` },
          { name: property.projectName, url: projectUrl },
        ]}
      />
      <PropertySchema
        name={property.projectName}
        description={property.description}
        image={property.heroImage}
        price={property.price}
        address={property.location}
        developer={property.developer}
        reraId={property.reraId}
        configuration={property.configuration}
        area={property.sizes}
        status={property.projectStatus || "Not specified"}
        url={projectUrl}
      />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          {property.heroImage ? (
            <Image
              src={property.heroImage}
              alt={property.projectName}
              fill
              className="object-cover object-center"
              priority
              quality={95}
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/15"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

          {/* Content Overlay - Bottom Left */}
          <div className="absolute inset-0 flex items-end justify-start">
            <div className="px-4 md:px-8 lg:px-12 pb-12 md:pb-20 text-left">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] text-white mb-4"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
                }}
              >
                {property.projectName}
              </h1>

              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#CBB27A]" />
                <p
                  className="text-base md:text-lg lg:text-xl font-semibold text-[#CBB27A]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {property.location}
                </p>
              </div>
              
              {property.developer && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#CBB27A]" />
                  <p
                    className="text-base md:text-lg lg:text-xl font-semibold text-[#CBB27A]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {property.developer}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Strip - Type, Configuration, RERA ID in Line */}
        <section className="relative bg-gradient-to-r from-black via-gray-900 to-black py-6 sm:py-8 md:py-10 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#CBB27A] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#CBB27A] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {/* Type */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 bg-[#CBB27A]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#CBB27A] flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm font-semibold text-[#CBB27A] uppercase tracking-wider mb-0.5 sm:mb-1 leading-tight">
                    Type
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                    Residential
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-[#CBB27A]"></div>

              {/* Configuration */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 bg-[#CBB27A]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#CBB27A] flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm font-semibold text-[#CBB27A] uppercase tracking-wider mb-0.5 sm:mb-1 leading-tight">
                    Configuration
                  </p>
                  {property.configuration && property.configuration.length > 0 ? (
                    <div className="flex flex-col gap-0.5">
                      {property.configuration.map((type, index) => (
                        <p key={index} className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                          {type}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                      N/A
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-[#CBB27A]"></div>

              {/* RERA ID */}
              {property.reraId && (
                <>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 bg-[#CBB27A]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#CBB27A] flex-shrink-0">
                      <Shield className="w-5 h-5 text-[#CBB27A]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#CBB27A] uppercase tracking-wider mb-0.5 sm:mb-1 leading-tight">
                        RERA ID
                      </p>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-white break-all leading-tight">
                        {property.reraId}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-16">
            {/* Description Section */}
            <section className="mb-12 sm:mb-16 md:mb-24">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#CBB27A]" />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    About {property.projectName}
                  </h2>
                </div>
                <div className="w-16 sm:w-20 h-1 bg-[#CBB27A] mb-6 sm:mb-8"></div>

                <div className="relative bg-gradient-to-br from-white via-[#CBB27A]/5 to-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-20 border border-[#CBB27A]/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#CBB27A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#CBB27A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <p
                      className="text-base md:text-lg leading-relaxed text-gray-800 text-justify max-w-4xl mx-auto"
                      style={{ 
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        lineHeight: "1.8",
                      }}
                    >
                      {property.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Buttons - After About Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 md:mb-24">
              <div className="text-center mb-8">
                <p
                  className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Get detailed information about{" "}
                  <span className="font-semibold text-[#CBB27A]">{property.projectName}</span>{" "}
                  and explore your investment opportunity today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {property.brochureUrl && (
                  <Button
                    type="button"
                    onClick={() => setIsBrochureDialogOpen(true)}
                    className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl text-sm md:text-base shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group h-auto w-full sm:w-auto"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Download Brochure
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}
                <Button
                  onClick={() => {
                    const footerCTA = document.getElementById('footer-cta');
                    footerCTA?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  variant="outline"
                  className="border-2 border-black hover:border-gray-900 bg-transparent hover:bg-black/5 text-black hover:text-gray-900 font-bold py-3 px-6 rounded-xl text-sm md:text-base transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group h-auto w-full sm:w-auto"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <MessageSquare className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Project Gallery - Media Carousel */}
            {mediaItems.length > 0 && (
              <section className="mb-12 sm:mb-16 md:mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#CBB27A]" />
                      </div>
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Project Gallery
                      </h2>
                    </div>
                    <div className="w-16 sm:w-20 h-1 bg-[#CBB27A] mb-6 sm:mb-8"></div>
                  </div>

                  <div 
                    className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group bg-black"
                    onMouseEnter={() => setIsSlideshowPaused(true)}
                    onMouseLeave={() => setIsSlideshowPaused(false)}
                  >
                    {/* Media Container */}
                    <div className="relative w-full h-full">
                      {mediaItems.map((item, index) => {
                        const isActive = index === currentMediaIndex;
                        const isVideoPlaying = item.type === 'video' && playingVideoIndex === item.index;

                        return (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                          >
                            {item.type === 'image' ? (
                              <div 
                                className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer group/image"
                                onClick={() => openLightbox(index)}
                              >
                                <img
                                  src={item.src}
                                  alt={`${property.projectName} - Image ${index + 1}`}
                                  className="object-contain w-full h-full"
                                />
                                {/* Enlarge Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-30">
                                  <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                              </div>
                            ) : (
                              <>
                                {isVideoPlaying ? (
                                  <video
                                    src={item.src}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain bg-black"
                                    onEnded={handleVideoEnd}
                                    onPause={() => setIsSlideshowPaused(true)}
                                    onPlay={() => setIsSlideshowPaused(true)}
                                  />
                                ) : (
                                  <>
                                    <div 
                                      className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer group/video"
                                      onClick={() => openLightbox(index)}
                                    >
                                      <img
                                        src={item.thumbnail}
                                        alt={item.title || 'Video thumbnail'}
                                        className="object-contain w-full h-full"
                                      />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/30 transition-colors duration-300 pointer-events-none"></div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleVideoPlay(item.index);
                                      }}
                                      className="absolute inset-0 flex items-center justify-center group/play z-20"
                                      aria-label={`Play ${item.title}`}
                                    >
                                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#CBB27A]/90 hover:bg-[#CBB27A] rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 shadow-2xl">
                                        <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
                                      </div>
                                    </button>
                                    {/* Enlarge Icon Overlay */}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                                      <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    {item.title && (
                                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 pointer-events-none">
                                        <h3
                                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 drop-shadow-lg"
                                          style={{ fontFamily: "Poppins, sans-serif" }}
                                        >
                                          {item.title}
                                        </h3>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20"></div>

                      {/* Media Counter */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 pointer-events-none z-30">
                        <span className="text-white text-xs sm:text-sm font-semibold">
                          {currentMediaIndex + 1} / {mediaItems.length}
                        </span>
                      </div>

                      {/* Navigation Buttons */}
                      {mediaItems.length > 1 && (
                        <>
                          <button
                            onClick={prevMedia}
                            className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group touch-manipulation"
                            aria-label="Previous media"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={nextMedia}
                            className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group touch-manipulation"
                            aria-label="Next media"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Indicators */}
                  {mediaItems.length > 1 && (
                    <div 
                      className="flex items-center justify-start sm:justify-center gap-2 mt-4 sm:mt-6 overflow-x-auto pb-2 px-2 sm:px-0 thumbnail-scrollbar-hide"
                    >
                      {mediaItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => goToMedia(index)}
                          className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                            index === currentMediaIndex
                              ? 'border-[#CBB27A] scale-110 shadow-lg'
                              : 'border-transparent hover:border-[#CBB27A]/50 opacity-70 hover:opacity-100 active:opacity-100'
                          }`}
                          aria-label={`Go to media ${index + 1}`}
                        >
                          {item.type === 'image' ? (
                            <img
                              src={item.src}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <>
                              <img
                                src={item.thumbnail}
                                alt={`Video thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="white" />
                              </div>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Amenities - 6-8 items */}
            {amenitiesToShow.length > 0 && (
              <section className="mb-12 sm:mb-16 md:mb-24">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBB27A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#CBB27A]" />
                      </div>
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Key Amenities
                      </h2>
                    </div>
                    <div className="w-16 sm:w-20 h-1 bg-[#CBB27A] mb-6 sm:mb-8"></div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    {amenitiesToShow.map((amenityName, index) => (
                      <motion.div
                        key={`${amenityName}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-[#CBB27A]/30 p-5 sm:p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group"
                      >
                        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                          {/* Icon Container */}
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#CBB27A]/10 via-[#CBB27A]/5 to-[#CBB27A]/10 rounded-2xl flex items-center justify-center mb-1 group-hover:from-[#CBB27A]/20 group-hover:via-[#CBB27A]/15 group-hover:to-[#CBB27A]/20 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md border border-[#CBB27A]/10 group-hover:border-[#CBB27A]/20">
                            <AmenityIcon 
                              amenityName={amenityName}
                              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0"
                              color="#CBB27A"
                              strokeWidth={2}
                            />
                          </div>
                          {/* Label */}
                          <p
                            className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 leading-tight min-h-[2.5em] flex items-center justify-center px-1 break-words"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {amenityName}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* Footer CTA */}
        <section id="footer-cta" className="relative bg-gradient-to-br from-[#2B3035] via-[#1a1d22] to-[#2B3035] py-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-48 h-48 bg-[#CBB27A] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#CBB27A] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Content */}
              <div className="space-y-4 sm:space-y-6">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Ready to Explore{" "}
                  <span className="text-[#CBB27A]">{property.projectName}</span>?
                </h2>
                <p
                  className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Connect with our expert advisors for personalized guidance, site visits, and exclusive property insights.
                </p>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CBB27A]/20 mb-4">
                      <MessageSquare className="w-7 h-7 text-[#CBB27A]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Thank You!
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Our team will contact you within{" "}
                      <span className="font-semibold text-[#CBB27A]">12-24 hours</span> to discuss your requirements.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white mb-1.5"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                        placeholder="Enter your name"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-white mb-1.5"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onKeyDown={handlePhoneKeyDown}
                        inputMode="tel"
                        pattern="[0-9+\s\-()]*"
                        required
                        className={`w-full px-3 py-2.5 rounded-lg border bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm ${
                          phoneError ? "border-red-500" : "border-white/20"
                        }`}
                        placeholder="Enter your phone number"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      />
                      {phoneError && (
                        <p className="mt-1.5 text-sm text-red-400 font-poppins">{phoneError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim() || !isValidPhone(formData.phone)}
                      className="w-full px-5 py-3 bg-[#CBB27A] hover:bg-[#B8A066] text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBB27A] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Brochure Download Dialog */}
      {property.brochureUrl && (
        <BrochureDownloadDialog
          isOpen={isBrochureDialogOpen}
          onClose={() => setIsBrochureDialogOpen(false)}
          propertyName={property.projectName}
          propertySlug={property.slug}
          brochureUrl={property.brochureUrl}
        />
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && mediaItems && mediaItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-110 group"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Media Container */}
            <div 
              className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-7xl w-full h-full flex items-center justify-center"
              >
                {mediaItems[lightboxIndex]?.type === 'image' ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={mediaItems[lightboxIndex].src}
                      alt={`${property.projectName} - Image ${lightboxIndex + 1}`}
                      className="object-contain w-full h-full max-h-[90vh]"
                    />
                  </div>
                ) : mediaItems[lightboxIndex]?.type === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center max-h-[90vh]">
                    <video
                      src={mediaItems[lightboxIndex].src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain max-h-[90vh]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : null}

                {/* Media Counter */}
                {mediaItems.length > 0 && (
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-40">
                    <span className="text-white text-sm sm:text-base font-semibold">
                      {lightboxIndex + 1} / {mediaItems.length}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group touch-manipulation"
                    aria-label="Previous media"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group touch-manipulation"
                    aria-label="Next media"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}