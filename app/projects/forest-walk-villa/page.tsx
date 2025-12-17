"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PropertySchema, BreadcrumbSchema } from "@/lib/structured-data";
import { projectMetadata, projectSlugToId } from "@/lib/project-metadata";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ContactPopup } from "@/components/contact-popup";
import { BrochureDownloadDialog } from "@/components/brochure-download-dialog";
import {
  MapPin,
  Download,
  MessageSquare,
  ArrowRight,
  Droplets,
  TreePine,
  Shield,
  Coffee,
  Dumbbell,
  Sparkles,
  Play,
  Eye,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";

export default function PropertyPage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
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

  const property = {
    projectName: "FOREST WALK VILLA",
    developer: "Madhusudan Group / Yatharth Group",
    location: "NH-24, Dasna, Ghaziabad",
    reraId: "UPRERAPRJ658961/08/2025",
    status: "Under Construction",
    possessionDate: "June 2027",
    unitTypes: ["4 BHK + 5T Villas"],
    sizes: "163 sq. yd - 238 sq. yd (3,070 sq.ft - 4,200 sq.ft)",
    brochureUrl: "https://ebvzwbuigaaevkblmgcs.supabase.co/storage/v1/object/public/Celesta_Abode/FORESTWALK%20IN%20GHAZIABAD_compressed_compressed_compressed.pdf?download=forestwalk_villa_brochure.pdf",
    description: "Nestled on the NH-24, Dasna, Ghaziabad, Forest Walk Villa by Madhusudan Group and Yatharth Group represents a unique forest-themed luxury residential development, featuring fully furnished 4 BHK + 5T villas spanning 163 to 238 sq. yards across 52 acres with 80% green landscape—just 20 minutes to Delhi and 15 minutes to Noida and Greater Noida West. Each villa features Italian marble in living areas, laminated wooden flooring in master bedrooms, and lift provision within villa, while the eco landscaping, vastu-compliant design, and sustainable architecture ensure a lifestyle that's both luxurious and harmonious with nature.",
    heroImage: "/ForestWalk/hero.avif",
    images: [
      "/ForestWalk/1.avif",
      "/ForestWalk/2.avif",
      "/ForestWalk/3.avif",
      "/ForestWalk/5.avif",
      "/ForestWalk/6.avif",
      "/ForestWalk/7.avif",
      "/ForestWalk/8.avif",
    ],
    videos: [
      {
        title: "Property Location Video",
        src: "/ForestWalk/PropertyLocationVideo.mp4",
        thumbnail: "/ForestWalk/hero.avif",
      },
      {
        title: "Future Lifestyle Video",
        src: "/ForestWalk/Property_futurelifestule_videos.mp4",
        thumbnail: "/ForestWalk/hero.avif",
      },
    ],
  };

  // Create unified media array (images and videos)
  const mediaItems = [
    ...property.images.map((img, idx) => ({ type: 'image' as const, src: img, index: idx })),
    ...property.videos.map((video, idx) => ({ 
      type: 'video' as const, 
      src: video.src, 
      thumbnail: video.thumbnail,
      title: video.title,
      index: property.images.length + idx 
    })),
  ];

  const projectId = projectSlugToId["forest-walk-villa"];
  const projectMeta = projectMetadata[projectId];
  const projectUrl = `https://www.celesteabode.com/projects/forest-walk-villa`;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Auto-play slideshow (pause on hover)
  useEffect(() => {
    if (!isSlideshowPaused && playingVideoIndex === null) {
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
      if (currentItem.type !== 'video' || currentItem.index !== playingVideoIndex) {
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: '',
          phone: formData.phone,
          message: '',
          propertyTitle: property.projectName,
          propertyLocation: property.location,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "" });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


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
        image={property.heroImage}
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
      <Header />

        {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
            src={property.heroImage}
          alt={property.projectName}
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

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

              <div className="flex items-center gap-3">
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
                <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                  {property.unitTypes[0]}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-[#CBB27A]"></div>

            {/* RERA ID */}
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
                      About Forest Walk Villa
                    </h2>
                  </div>
                  <div className="w-16 sm:w-20 h-1 bg-[#CBB27A] mb-6 sm:mb-8"></div>

                <div className="relative bg-gradient-to-br from-white via-[#CBB27A]/5 to-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-20 border border-[#CBB27A]/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#CBB27A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#CBB27A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <p
                      className="text-base md:text-lg leading-relaxed text-gray-800 text-center max-w-4xl mx-auto"
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
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 mb-16 md:mb-24">
              <div className="text-center mb-8">
                <p
                  className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Get detailed information about{" "}
                  <span className="font-semibold text-[#CBB27A]">Forest Walk Villa</span>{" "}
                  and explore your investment opportunity today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => setIsBrochureDialogOpen(true)}
                  className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl text-sm md:text-base shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group h-auto w-full sm:w-auto"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Download Brochure
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
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
                              <Image
                                src={item.src}
                                alt={`${property.projectName} - Image ${index + 1}`}
                                width={1200}
                                height={800}
                                className="object-contain w-full h-full"
                                quality={90}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                priority={isActive}
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
                                    <Image
                                      src={item.thumbnail}
                                      alt={item.title || 'Video thumbnail'}
                                      width={1200}
                                      height={800}
                                      className="object-contain w-full h-full"
                                      quality={90}
                                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
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
                  </div>
                </div>

                {/* Thumbnail Indicators */}
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
                        <Image
                          src={item.src}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                        />
                      ) : (
                        <>
                          <Image
                            src={item.thumbnail}
                            alt={`Video thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="white" />
                          </div>
                        </>
                      )}
                    </button>
                  ))}
                  </div>
                </div>
              </section>

            {/* Amenities - 6-8 items */}
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

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {[
                    { name: "Half-Olympic Swimming Pool", icon: Droplets },
                    { name: "80% Green Landscape", icon: TreePine },
                    { name: "24/7 Security", icon: Shield },
                    { name: "Premium Clubhouse", icon: Coffee },
                    { name: "Tennis & Badminton Courts", icon: Dumbbell },
                    { name: "Children's Play Area", icon: Sparkles },
                    { name: "Spa & Yoga Garden", icon: Sparkles },
                    { name: "Amphitheatre", icon: Sparkles },
                  ].slice(0, 8).map((amenity, index) => {
                    const IconComponent = amenity.icon;
                      return (
                              <div
                                key={index}
                        className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#CBB27A]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#CBB27A]/20 group-hover:scale-110 transition-all duration-300">
                            <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#CBB27A] group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <p
                            className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {amenity.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </section>
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
                <span className="text-[#CBB27A]">Forest Walk Villa</span>?
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
                      className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
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
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#CBB27A] focus:border-transparent transition-all text-sm"
                        placeholder="Enter your phone number"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      />
                    </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
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

      {/* Contact Popup */}
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        propertyTitle={property.projectName}
        propertyLocation={property.location}
      />

      {/* Brochure Download Dialog */}
      <BrochureDownloadDialog
        isOpen={isBrochureDialogOpen}
        onClose={() => setIsBrochureDialogOpen(false)}
        propertyName={property.projectName}
        brochureUrl={property.brochureUrl}
      />

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
                  <Image
                    src={mediaItems[lightboxIndex].src}
                    alt={`${property.projectName} - Image ${lightboxIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="object-contain w-full h-full max-h-[90vh]"
                    quality={95}
                    sizes="100vw"
                    priority
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
