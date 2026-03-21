"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, Building2 } from "lucide-react";
import { Property } from "@/types/property";
import { getPropertyUrl } from "@/lib/property-url";

interface FilterState {
  locality: string[];
  propertyType: string;
  projectStatus: string;
  configuration: string[];
}

interface NoidaPropertiesGridProps {
  initialProperties: Property[];
  location: string;
  initialTotalCount?: number;
  /** Lock to one property type (e.g. "residential" for apartments + villas only). Omit for all types. */
  defaultPropertyType?: string;
}

const PROPERTIES_PER_PAGE = 6;

export function NoidaPropertiesGrid({ initialProperties, location, initialTotalCount = initialProperties.length, defaultPropertyType }: NoidaPropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialProperties.length === PROPERTIES_PER_PAGE);
  const [currentOffset, setCurrentOffset] = useState(initialProperties.length);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    locality: [],
    propertyType: defaultPropertyType ?? "all",
    projectStatus: "all",
    configuration: [],
  });

  // Fetch properties with filters using search API
  const fetchFilteredProperties = useCallback(async (filters: FilterState, offset: number) => {
    // For new searches (offset === 0), use isLoading to show full loading state
    // For pagination (offset > 0), use isLoadingMore to show bottom loading indicator
    if (offset > 0) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    try {
      const params = new URLSearchParams();
      params.append("location", location);
      params.append("limit", PROPERTIES_PER_PAGE.toString());
      params.append("offset", offset.toString());

      // Add locality filters
      filters.locality.forEach((localitySlug) => {
        params.append("locality", localitySlug);
      });

      // Add other filters
      if (filters.propertyType && filters.propertyType !== "all") {
        params.append("propertyType", filters.propertyType);
      }
      if (filters.projectStatus && filters.projectStatus !== "all") {
        params.append("projectStatus", filters.projectStatus);
      }
      // Don't send configuration filter for Commercial properties
      if (filters.propertyType !== "commercial") {
        filters.configuration.forEach((config) => {
          params.append("configuration", config);
        });
      }

      const response = await fetch(`/api/properties/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      const fetchedProperties = data.properties || [];

      if (offset === 0) {
        // Reset properties for new search
        setProperties(fetchedProperties);
      } else {
        // Append for pagination
        setProperties((prev) => [...prev, ...fetchedProperties]);
      }
      setTotalCount(typeof data.totalCount === "number" ? data.totalCount : fetchedProperties.length);

      setCurrentOffset(offset + fetchedProperties.length);
      setHasMore(data.hasMore === true && fetchedProperties.length === PROPERTIES_PER_PAGE);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      if (offset === 0) {
        setProperties([]);
      }
      setHasMore(false);
    } finally {
      if (offset > 0) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
        // Notify filters component that loading has finished
        window.dispatchEvent(new CustomEvent('location-properties-loading', { detail: false }));
      }
    }
  }, [location]);

  // Track if this is the initial load (no filters applied) or a search result
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Listen for filter changes from LocationPropertyFilters component
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent<FilterState>) => {
      const newFilters = event.detail;
      setActiveFilters(newFilters);
      setCurrentOffset(0);
      setIsInitialLoad(false);
      // Set loading state immediately and clear properties before fetching
      setIsLoading(true);
      setProperties([]);
      // Notify filters component that loading has started
      window.dispatchEvent(new CustomEvent('location-properties-loading', { detail: true }));
      // Then fetch properties
      fetchFilteredProperties(newFilters, 0);
    };

    window.addEventListener('location-filter-change', handleFilterChange as EventListener);
    return () => {
      window.removeEventListener('location-filter-change', handleFilterChange as EventListener);
    };
  }, [location, fetchFilteredProperties]);

  const loadMoreProperties = async () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    await fetchFilteredProperties(activeFilters, currentOffset);
  };

  // Check if there are more properties from initial data
  useEffect(() => {
    if (initialProperties.length === PROPERTIES_PER_PAGE) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [initialProperties.length]);

  // Show no properties found message (only if not initial load and no properties)
  if (!isInitialLoad && !isLoading && properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
        <Building2 className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 mb-6 font-poppins text-center">
          No properties found matching your search criteria.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors font-poppins"
        >
          View All Properties
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Show loading animation when loading (hide existing properties) */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin mb-4" />
          <p className="text-lg text-gray-600 font-poppins">Searching properties...</p>
        </div>
      ) : (
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
                    alt={property.heroImageAlt || property.projectName}
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
      )}

      {/* View More + result count: count centred above the button (same column) */}
      {hasMore && !isLoading && !isLoadingMore && (
        <div className="flex flex-col items-center mt-12 gap-3 px-4">
          <p className="text-sm md:text-base text-gray-600 font-poppins text-center">
            Showing <span className="font-semibold text-foreground">{properties.length}</span> out of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span> properties
          </p>
          <button
            type="button"
            onClick={loadMoreProperties}
            disabled={isLoadingMore}
            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-poppins flex items-center gap-2"
          >
            <span>View More Properties</span>
          </button>
        </div>
      )}

      {/* Loading More Indicator — count stays centred above the loading row */}
      {isLoadingMore && (
        <div className="flex flex-col items-center mt-8 gap-3 px-4">
          <p className="text-sm md:text-base text-gray-600 font-poppins text-center">
            Showing <span className="font-semibold text-foreground">{properties.length}</span> out of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span> properties
          </p>
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#CBB27A] animate-spin" />
            <p className="text-gray-600 font-poppins">Loading more properties...</p>
          </div>
        </div>
      )}

      {/* No more pages — count only, centred under grid */}
      {!isLoading && !hasMore && !isLoadingMore && (
        <div className="flex justify-center mt-12 px-4">
          <p className="text-sm md:text-base text-gray-600 font-poppins text-center">
            Showing <span className="font-semibold text-foreground">{properties.length}</span> out of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span> properties
          </p>
        </div>
      )}
    </>
  );
}

