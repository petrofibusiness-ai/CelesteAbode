"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { Property } from "@/types/property";

interface NoidaPropertiesGridProps {
  initialProperties: Property[];
  location: string;
}

const PROPERTIES_PER_PAGE = 6;

export function NoidaPropertiesGrid({ initialProperties, location }: NoidaPropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties.slice(0, PROPERTIES_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProperties.length > PROPERTIES_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLoaded, setTotalLoaded] = useState(PROPERTIES_PER_PAGE);

  const loadMoreProperties = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/properties/by-location/${location}?limit=${PROPERTIES_PER_PAGE}&offset=${totalLoaded}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      const newProperties = data.properties || [];

      if (newProperties.length > 0) {
        setProperties((prev) => [...prev, ...newProperties]);
        setTotalLoaded((prev) => prev + newProperties.length);
        // Use hasMore from API response (more reliable)
        setHasMore(data.hasMore === true);
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more properties:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if there are more properties from initial data
  useEffect(() => {
    // If we got exactly PROPERTIES_PER_PAGE properties, there might be more
    if (initialProperties.length >= PROPERTIES_PER_PAGE) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [initialProperties.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={getPropertyUrl(property)}
            className="block"
          >
            <Card className="border-0 bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer p-0 transform hover:-translate-y-2 hover:scale-[1.02]">
              <div className="relative w-full h-80 rounded-xl overflow-hidden">
                <Image
                  src={property.heroImage}
                  alt={property.projectName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {property.projectName}
                  </h3>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMoreProperties}
            disabled={isLoading}
            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-poppins flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>View More Properties</span>
            )}
          </button>
        </div>
      )}
    </>
  );
}

