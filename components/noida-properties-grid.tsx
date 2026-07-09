"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, Building2 } from "lucide-react";
import { Property } from "@/types/property";
import { getPropertyUrl } from "@/lib/property-url";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import { scrollPropertySearchSectionIntoView } from "@/lib/scroll-listings";

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

export function NoidaPropertiesGrid({
  initialProperties,
  location,
  initialTotalCount = initialProperties.length,
  defaultPropertyType,
}: NoidaPropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPagingLoading, setIsPagingLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    locality: [],
    propertyType: defaultPropertyType ?? "all",
    projectStatus: "all",
    configuration: [],
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PROPERTIES_PER_PAGE));

  const fetchPage = useCallback(
    async (filters: FilterState, page: number, mode: "filter" | "page") => {
      const offset = (page - 1) * PROPERTIES_PER_PAGE;
      if (mode === "filter") {
        setIsLoading(true);
        window.dispatchEvent(new CustomEvent("location-properties-loading", { detail: true }));
      } else {
        setIsPagingLoading(true);
      }
      try {
        const params = new URLSearchParams();
        params.append("location", location);
        params.append("limit", PROPERTIES_PER_PAGE.toString());
        params.append("offset", offset.toString());

        filters.locality.forEach((localitySlug) => {
          params.append("locality", localitySlug);
        });

        if (filters.propertyType && filters.propertyType !== "all") {
          params.append("propertyType", filters.propertyType);
        }
        if (filters.projectStatus && filters.projectStatus !== "all") {
          params.append("projectStatus", filters.projectStatus);
        }
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

        setProperties(fetchedProperties);
        setTotalCount(typeof data.totalCount === "number" ? data.totalCount : fetchedProperties.length);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching filtered properties:", error);
        if (mode === "filter") {
          setProperties([]);
        }
        setTotalCount(0);
      } finally {
        if (mode === "filter") {
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent("location-properties-loading", { detail: false }));
        } else {
          setIsPagingLoading(false);
        }
      }
    },
    [location]
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent<FilterState>) => {
      const newFilters = event.detail;
      setActiveFilters(newFilters);
      setIsInitialLoad(false);
      setProperties([]);
      fetchPage(newFilters, 1, "filter");
    };

    window.addEventListener("location-filter-change", handleFilterChange as EventListener);
    return () => {
      window.removeEventListener("location-filter-change", handleFilterChange as EventListener);
    };
  }, [location, fetchPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isLoading || isPagingLoading) return;
    fetchPage(activeFilters, page, "page");
  };

  const skipScrollOnFirstPaint = useRef(true);

  useEffect(() => {
    if (skipScrollOnFirstPaint.current) {
      skipScrollOnFirstPaint.current = false;
      return;
    }
    scrollPropertySearchSectionIntoView();
  }, [currentPage]);

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
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin mb-4" />
          <p className="text-lg text-gray-600 font-poppins">Searching properties...</p>
        </div>
      ) : (
        <div className="relative min-h-[200px]">
          {isPagingLoading && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[1px]"
              aria-busy="true"
              aria-label="Loading page"
            >
              <Loader2 className="w-10 h-10 text-[#CBB27A] animate-spin" />
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isPagingLoading ? 0.55 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {properties.map((property) => (
                <Link key={property.id} href={getPropertyUrl(property)} className="block">
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/30"></div>

                      <div className="absolute bottom-3 left-3 right-3 transition-transform duration-300 group-hover:translate-y-[-4px]">
                        <div className="flex items-center gap-2 text-white mb-1">
                          <MapPin className="w-3 h-3 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-xs font-medium text-white">{property.location}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">{property.projectName}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <PropertyGridPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPagingLoading}
        />
      )}
    </>
  );
}
