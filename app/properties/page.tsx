"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { getPropertyUrl } from "@/lib/property-url";
import { Property } from "@/types/property";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import {
  PROPERTY_SEARCH_ANCHOR_ID,
  scrollPropertySearchSectionIntoView,
} from "@/lib/scroll-listings";

function sortPropertiesByDateDesc(a: Property, b: Property): number {
  const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  return tb - ta;
}

interface FilterState {
  location: string[]; // Changed to array for multiple selections
  propertyType: string;
  projectStatus: string;
  configuration: string[];
}

/** One batch from `/api/properties/search` for a single location (multi-location fetch). */
interface LocationSearchBatch {
  properties: Property[];
  hasMore: boolean;
  totalCount: number;
}

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    location: [], // Empty array means all locations
    propertyType: "all",
    projectStatus: "all",
    configuration: [],
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPagingLoading, setIsPagingLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isGeneralFormOpen, setIsGeneralFormOpen] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [isCtaContentExpanded, setIsCtaContentExpanded] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const skipListingsScrollOnMount = useRef(true);

  const PROPERTIES_PER_PAGE = 6;

  // Fetch one page (6 items). mode "filter" = new search; "page" = change page only (softer loading).
  const fetchProperties = useCallback(async (filterState: FilterState, page: number, mode: "filter" | "page" = "filter") => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const offset = (page - 1) * PROPERTIES_PER_PAGE;

    if (mode === "page") {
      setIsPagingLoading(true);
    } else {
      setIsLoading(true);
      setFetchError(null);
      setProperties([]);
      setIsInitialLoad(false);
      setCurrentPage(1);
      window.dispatchEvent(new CustomEvent("properties-page-loading", { detail: true }));
    }

    try {
      if (filterState.location.length === 0) {
        const params = new URLSearchParams();
        params.append("limit", PROPERTIES_PER_PAGE.toString());
        params.append("offset", offset.toString());
        if (filterState.propertyType && filterState.propertyType !== "all") {
          params.append("propertyType", filterState.propertyType);
        }
        if (filterState.projectStatus && filterState.projectStatus !== "all") {
          params.append("projectStatus", filterState.projectStatus);
        }
        if (filterState.propertyType !== "commercial") {
          filterState.configuration.forEach((config) => {
            params.append("configuration", config);
          });
        }

        const response = await fetch(`/api/properties/all?${params.toString()}`, {
          signal: abortController.signal,
        });

        if (abortController.signal.aborted) {
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Failed to fetch properties" }));
          throw new Error(errorData.error || "Failed to fetch properties");
        }
        const data = await response.json();
        const fetchedProperties = data.properties || [];
        setTotalCount(
          typeof data.totalCount === "number" ? data.totalCount : fetchedProperties.length
        );
        setProperties(fetchedProperties);
        setCurrentPage(page);
      } else {
        const fetchPromises = filterState.location.map(async (locationSlug) => {
          const params = new URLSearchParams();
          params.append("location", locationSlug);
          params.append("limit", PROPERTIES_PER_PAGE.toString());
          params.append("offset", offset.toString());
          if (filterState.propertyType && filterState.propertyType !== "all") {
            params.append("propertyType", filterState.propertyType);
          }
          if (filterState.projectStatus && filterState.projectStatus !== "all") {
            params.append("projectStatus", filterState.projectStatus);
          }
          if (filterState.propertyType !== "commercial") {
            filterState.configuration.forEach((config) => {
              params.append("configuration", config);
            });
          }

          try {
            const response = await fetch(`/api/properties/search?${params.toString()}`, {
              signal: abortController.signal,
            });

            if (abortController.signal.aborted) {
              return null;
            }

            if (!response.ok) {
              console.error(`Failed to fetch properties for ${locationSlug}:`, response.statusText);
              return null;
            }
            const data = await response.json();
            const batch: LocationSearchBatch = {
              properties: data.properties || [],
              hasMore: data.hasMore === true,
              totalCount: typeof data.totalCount === "number" ? data.totalCount : 0,
            };
            return batch;
          } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
              return null;
            }
            console.error(`Error fetching properties for ${locationSlug}:`, error);
            return null;
          }
        });

        const results = await Promise.all(fetchPromises);

        if (abortController.signal.aborted) {
          return;
        }

        const allProperties = results.flatMap((result) => (result !== null ? result.properties : []));

        const uniquePropertiesMap = new Map<string, Property>();
        allProperties.forEach((property) => {
          if (property.id && !uniquePropertiesMap.has(property.id)) {
            uniquePropertiesMap.set(property.id, property);
          }
        });

        const mergedSorted = Array.from(uniquePropertiesMap.values()).sort(sortPropertiesByDateDesc);
        const pageSlice = mergedSorted.slice(0, PROPERTIES_PER_PAGE);

        const totalSum = results.reduce((sum, result) => {
          if (result === null) return sum;
          return sum + result.totalCount;
        }, 0);
        setTotalCount(totalSum);
        setProperties(pageSlice);
        setCurrentPage(page);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching properties:", error);
      if (mode === "filter") {
        setFetchError(error instanceof Error ? error.message : "Failed to fetch properties. Please try again.");
        setProperties([]);
        setTotalCount(0);
      }
    } finally {
      if (!abortController.signal.aborted) {
        if (mode === "page") {
          setIsPagingLoading(false);
        } else {
          setIsLoading(false);
          window.dispatchEvent(new CustomEvent("properties-page-loading", { detail: false }));
        }
      }
    }
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / PROPERTIES_PER_PAGE));

  // Handle search from PropertyFilters component (only when search button is clicked)
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    fetchProperties(newFilters, 1, "filter");
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage || isLoading || isPagingLoading) return;
      fetchProperties(filters, page, "page");
    },
    [filters, currentPage, totalPages, isLoading, isPagingLoading, fetchProperties]
  );

  useEffect(() => {
    if (skipListingsScrollOnMount.current) {
      skipListingsScrollOnMount.current = false;
      return;
    }
    scrollPropertySearchSectionIntoView();
  }, [currentPage]);

  // Listen for search button click from PropertyFilters component (via custom event)
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent<FilterState>) => {
      const newFilters = event.detail;
      setFilters(newFilters);
      fetchProperties(newFilters, 1, "filter");
    };

    window.addEventListener('properties-filter-change', handleFilterChange as EventListener);
    return () => {
      window.removeEventListener('properties-filter-change', handleFilterChange as EventListener);
    };
  }, [fetchProperties]);

  // Cleanup: Abort any ongoing requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Load all properties on initial page load OR read location from URL query params
  useEffect(() => {
    const locationParam = searchParams.get("location");
    
    if (locationParam && locationParam.trim() !== "") {
      // URL has location param - use that
      const locationArray = locationParam.split(",").filter(loc => loc.trim() !== "");
      if (locationArray.length > 0) {
        const newFilters = { ...filters, location: locationArray };
        setFilters(newFilters);
        fetchProperties(newFilters, 1, "filter");
        setIsInitialLoad(false);
      }
    } else if (isInitialLoad) {
      // No URL param and initial load - fetch all properties
      fetchProperties(filters, 1, "filter");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);



  const handleViewDetails = (property: Property) => {
    const propertyUrl = getPropertyUrl(property);
    window.location.href = propertyUrl;
  };

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
        {/* Hero Section – mobile: full-height, header overlaps, centered text. Desktop: card, bottom-left text. */}
        <section
          className="relative bg-background pt-0 md:pt-24 md:min-h-screen md:flex md:items-center md:justify-center"
          data-site-hero
        >
          <div className="w-full md:max-w-7xl md:mx-auto md:px-6 md:w-full">
            <div className="relative overflow-hidden w-full min-h-screen md:min-h-0 md:h-[500px] lg:h-[580px] xl:h-[620px] md:rounded-3xl md:shadow-2xl md:bg-white">
              <Image
                src="/hero-.avif"
                alt="Property Portfolio Hero"
                fill
                priority
                loading="eager"
                className="object-cover object-center md:object-[center_70%]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={85}
                fetchPriority="high"
              />

              {/* Same overlay stack as homepage: flat + center dark + gradient */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.25),transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20 md:to-transparent" />

              {/* Mobile: centered. Desktop: bottom-left. */}
              <div className="absolute inset-0 flex items-center justify-center px-4 py-10 md:items-end md:justify-start md:pb-16 md:pl-6 md:pt-0 md:px-6 md:ml-0 lg:pb-16 lg:pl-8">
                <div className="relative text-center text-[#FAFAF8] max-w-2xl mx-auto md:text-left md:mx-0 md:max-w-4xl px-4 md:px-0 md:ml-0">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 leading-tight text-white tracking-tight"
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

                  <p className="text-xs sm:text-sm md:text-sm lg:text-base text-white/90 md:text-[#CBB27A] mb-6 md:mb-6 max-w-lg mx-auto md:mx-0 md:max-w-2xl font-poppins leading-relaxed">
                    Curated residential and investment properties in Delhi NCR across Noida, Greater Noida, and the Yamuna Expressway—assessed for legal compliance, location fundamentals, and long-term investment potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-4">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
        </div>

        <div
          id={PROPERTY_SEARCH_ANCHOR_ID}
          className="scroll-mt-24 md:scroll-mt-28"
          aria-label="Search and filter properties"
        >
          {/* Filters Section Heading */}
          <section className="pt-10 pb-2 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center font-poppins">
                Explore Properties Based on Your Investment Priorities
              </h2>
            </div>
          </section>

          {/* Property Filters Section */}
          <PropertyFilters />
        </div>

        {/* Aesthetic Line Separator */}
        <div className="w-full flex justify-center py-4">
          <div className="w-100 h-0.25 bg-gradient-to-r from-transparent via-[#CBB27A] to-transparent"></div>
                      </div>

        {/* Active Segment Projects */}
        <section id="projects-section" className="py-16 px-4 bg-background" aria-label="Properties Collection">
          <div className="max-w-7xl mx-auto">

            {/* Properties Gallery Display */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center pt-8 pb-16 bg-background rounded-2xl min-h-[400px]">
                <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin mb-4" />
                <p className="text-lg text-gray-600 font-poppins text-center">Searching properties...</p>
                  </div>
            ) : fetchError ? (
              <div className="flex flex-col items-center justify-center pt-8 pb-16 bg-background rounded-2xl min-h-[400px]">
                <Building2 className="w-16 h-16 text-red-400 mb-4" />
                <p className="text-lg text-red-600 mb-2 font-poppins text-center">
                  {fetchError}
                </p>
                <Button
                  onClick={() => {
                    setFetchError(null);
                    fetchProperties(filters, 1, "filter");
                  }}
                  className="mt-4 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all"
                >
                  Try Again
                </Button>
              </div>
            ) : properties.length > 0 ? (
              <>
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
                      id="itemlist"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: isPagingLoading ? 0.55 : 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      role="list"
                      aria-label="Properties"
                    >
                      {properties.map((property) => (
                        <Card
                          key={property.id}
                          className="border-0 bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer p-0 transform hover:-translate-y-2 hover:scale-[1.02]"
                          onClick={() => handleViewDetails(property)}
                          role="listitem"
                          itemScope
                          itemType="https://schema.org/Product"
                        >
                          <div className="relative w-full h-80 rounded-xl overflow-hidden">
                            <Image
                              src={property.heroImage}
                              alt={property.heroImageAlt || `${property.projectName} - ${property.location}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={90}
                              loading="lazy"
                              itemProp="image"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/30"></div>

                            <div className="absolute bottom-3 left-3 right-3 transition-transform duration-300 group-hover:translate-y-[-4px]">
                              <div className="flex items-center gap-2 text-white mb-1">
                                <MapPin className="w-3 h-3 transition-transform duration-300 group-hover:scale-110" />
                                <span className="text-xs font-medium text-white">{property.location}</span>
                              </div>
                              <h3 className="text-lg font-bold text-white leading-tight" itemProp="name">
                                {property.projectName}
                              </h3>
                              <meta
                                itemProp="description"
                                content={property.description || `${property.projectName} in ${property.location}`}
                              />
                              <meta itemProp="brand" content={property.developer || "Verified Developer"} />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <PropertyGridPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isPagingLoading}
                  />
                )}
              </>
            ) : !isInitialLoad && filters.location.length > 0 ? (
              <div className="flex flex-col items-center justify-center pt-8 pb-16 bg-background rounded-2xl min-h-[400px]">
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
            ) : (
              <div className="flex flex-col items-center justify-center pt-8 pb-16 bg-background rounded-2xl min-h-[400px]">
                <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-2 font-poppins text-center">
                  Please select a location to view properties.
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
                        The key to making informed property decisions lies in evaluating fundamental factors beyond marketing claims. Developer credibility matters significantly, as a track record of on-time delivery, quality construction, and financial stability reveals more about future performance than any sales pitch. Location maturity cannot be overstated either. Established infrastructure, connectivity, and social amenities that exist today matter far more than future promises that may or may not materialize. When evaluating properties across Delhi NCR, it&apos;s essential to look beyond surface-level amenities and marketing narratives and focus on fundamental real estate investment factors such as location maturity, delivery history, and pricing logic. The true value of a property investment lies in factors that have proven track records rather than speculative future developments. This approach ensures that buyers and investors make decisions based on tangible evidence rather than optimistic projections.
                        {!isCtaContentExpanded && (
                          <>{" "}<button type="button" onClick={() => setIsCtaContentExpanded(true)} className="text-[#CBB27A] font-bold hover:underline cursor-pointer" aria-label="Read more about Celeste Abode">Read More...</button></>
                        )}
                      </p>

                      {/* Brand positioning - always in DOM for crawlers; visibility toggled for UX */}
                      <div className={`mt-6 md:mt-10 pt-6 md:pt-8 border-t border-gray-200 ${isCtaContentExpanded ? "block" : "hidden"}`}>
                        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-6 md:mb-6 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                          At <strong className="text-[#CBB27A]">Celeste Abode</strong>, we don&apos;t present properties as inventory to be sold. Instead, we curate residential and investment properties across key Delhi NCR markets—including Noida, Greater Noida, the Yamuna Expressway, and emerging growth corridors—that pass rigorous evaluation across developer credibility, location logic, pricing fairness, and long-term suitability.
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-normal sm:leading-relaxed font-poppins mb-0 max-w-none text-left sm:text-justify tracking-normal px-2 sm:px-0">
                          Our advisory-led approach, backed by structured <Link href="/real-estate-consulting-services" className="text-[#CBB27A] hover:text-[#B8A068] transition-colors font-medium">real estate consulting and advisory services</Link>, helps buyers and investors in <strong>Delhi NCR</strong> make informed property decisions based on evidence, not sales narratives.{" "}
                          <button type="button" onClick={() => setIsCtaContentExpanded(false)} className="text-[#CBB27A] font-bold hover:underline cursor-pointer" aria-label="Read less">Read Less</button>
                        </p>
                      </div>
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
                  Ready to Make an Informed Property Decision in Delhi NCR?
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto font-poppins leading-relaxed">
                  Let our advisory team help you evaluate residential and investment properties in Delhi NCR based on developer credibility, location maturity, pricing logic, and long-term suitability—not just marketing claims.
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
