"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { MapPin, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/types/property";
import { getPropertyUrl } from "@/lib/property-url";

interface PropertyDisplay {
  id: string;
  name: string;
  builder: string;
  address: string;
  image: string;
  status: string;
  slug: string;
  isPublished?: boolean; // Add isPublished to track publish status
}

export function PropertiesSection() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [properties, setProperties] = useState<PropertyDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/properties");
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        
        const data = await response.json();
        
        // Map API response to display format
        // IMPORTANT: We do NOT filter by isPublished - show ALL properties
        const mappedProperties: PropertyDisplay[] = (data.properties || [])
          .map((prop: Property, index: number) => {
            // Check if property has required fields (only filter by heroImage, NOT by isPublished)
            if (!prop.heroImage) {
              return null;
            }
            
            return {
              id: prop.id || `property-${index}-${prop.slug}`, // Ensure unique ID
              name: prop.projectName,
              builder: prop.developer,
              address: prop.location,
              image: prop.heroImage,
              status: prop.projectStatus || '',
              slug: prop.slug,
              isPublished: prop.isPublished, // Store publish status
            };
          })
          .filter((prop: PropertyDisplay | null): prop is PropertyDisplay => prop !== null);
        setProperties(mappedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err instanceof Error ? err.message : "Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      id="properties"
      className="pt-24 pb-20 bg-gradient-to-br from-background to-primary/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="heading-bold text-primary mb-4">
            Featured <span className="text-[#CBB27A]">Luxury Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked collection of premium real estate projects
            that redefine luxury living
          </p>
        </div>

        {/* Projects Carousel */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No properties available at the moment.</p>
            </div>
          ) : (
            <>
              <Carousel
                setApi={setApi}
                className="w-full max-w-5xl mx-auto relative"
                opts={{
                  align: "start",
                  loop: properties.length > 1,
                }}
              >
                <CarouselContent>
                  {properties.map((property, index) => {
                    // Log each property being rendered (especially unpublished ones)
                    return (
                    <CarouselItem
                      key={property.id || `property-${index}`}
                      className="md:basis-1/2 lg:basis-1/2"
                    >
                      <div
                        className="group cursor-pointer p-4"
                        onClick={() => {
                          handleNavigation(getPropertyUrl(property));
                        }}
                      >
                        <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border-2 border-black">
                          {/* Image */}
                          {property.image ? (
                            <Image
                              src={property.image}
                              alt={property.name}
                              width={450}
                              height={450}
                              className="w-full aspect-[4/5] md:aspect-square object-cover rounded-2xl"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                              quality={90}
                              loading="lazy"
                              onError={(e) => {
                                console.error(`Failed to load image for ${property.name}:`, property.image);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><div class="text-center p-4"><svg class="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm text-gray-500">Image not available</p></div></div>';
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full aspect-[4/5] md:aspect-square flex items-center justify-center bg-gray-200 rounded-2xl">
                              <div className="text-center p-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p className="text-sm text-gray-500">Image not available</p>
                              </div>
                            </div>
                          )}

                          {/* Darker Overlay for Better Text Visibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 rounded-2xl"></div>

                          {/* Status Badge */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm property-status-badge">
                              {property.status}
                            </span>
                            {/* Show unpublished badge if property is not published */}
                            {property.isPublished === false && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-yellow-500/90 text-white">
                                Draft
                              </span>
                            )}
                          </div>

                          {/* Text Overlay - Bottom Left */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-lg property-text-gradient">
                              {property.name}
                            </h3>
                            <p className="text-sm md:text-base opacity-95 mb-2 drop-shadow-lg property-text-gradient">
                              {property.builder}
                            </p>
                            <div className="flex items-center gap-2 text-xs md:text-sm opacity-90">
                              <MapPin className="w-4 h-4 property-mappin-color" />
                              <span className="drop-shadow-lg property-text-gradient">
                                {property.address}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    );
                  })}
                </CarouselContent>

                {/* Navigation Arrows - Left and Right Sides */}
                <div className="absolute -left-4 md:-left-16 top-1/2 transform -translate-y-1/2">
                  <CarouselPrevious className="relative translate-y-0 left-0 right-0 bg-white hover:bg-gray-50 border-2 border-primary text-primary hover:text-primary shadow-lg w-8 h-8 md:w-12 md:h-12" />
                </div>
                <div className="absolute -right-4 md:-right-16 top-1/2 transform -translate-y-1/2">
                  <CarouselNext className="relative translate-y-0 left-0 right-0 bg-white hover:bg-gray/50 border-2 border-primary text-primary hover:text-primary shadow-lg w-8 h-8 md:w-12 md:h-12" />
                </div>
              </Carousel>

              {/* Carousel Indicators */}
              <div className="flex flex-col items-center mt-8 gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {properties.length} properties ({properties.filter(p => p.isPublished === false).length} draft{properties.filter(p => p.isPublished === false).length !== 1 ? 's' : ''})
                </div>
                <div className="flex justify-center gap-2">
                  {properties.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === current ? "bg-secondary w-8" : "bg-gray-300"
                      }`}
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to property ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4 px-8 md:px-0">
            <Button
              size="default"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-base rounded-full w-full sm:w-auto"
              onClick={() => handleNavigation("/properties")}
            >
              Explore All Properties
            </Button>
            <Button
              variant="outline"
              size="default"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 text-base rounded-full w-full sm:w-auto"
              onClick={() => handleNavigation("/contact")}
            >
              Get Expert Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
