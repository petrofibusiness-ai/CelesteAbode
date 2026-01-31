"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterState {
  location: string[]; // Changed to array for multiple selections (empty array = all locations)
  propertyType: string;
  projectStatus: string;
  configuration: string[]; // Array for multiple selections
}

interface PropertyFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: [], // Empty array means all locations
    propertyType: "all",
    projectStatus: "all",
    configuration: [], // Empty array means all configurations
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  // Listen for loading state from properties page
  useEffect(() => {
    const handleLoadingChange = (event: CustomEvent<boolean>) => {
      setIsLoading(event.detail);
    };

    window.addEventListener('properties-page-loading', handleLoadingChange as EventListener);
    return () => {
      window.removeEventListener('properties-page-loading', handleLoadingChange as EventListener);
    };
  }, []);

  const filterOptions = {
    location: [
      // Remove "all" option since empty array means all
      { value: "noida", label: "Noida" },
      { value: "greater-noida", label: "Greater Noida" },
      { value: "yamuna-expressway", label: "Yamuna Expressway" },
      { value: "ghaziabad", label: "Ghaziabad" },
      { value: "lucknow", label: "Lucknow" },
    ],
    propertyType: [
      { value: "all", label: "All Property Types" },
      { value: "apartments", label: "Apartments / Flats" },
      { value: "villas", label: "Villas" },
      { value: "plots", label: "Plots / Land" },
      { value: "commercial", label: "Commercial" },
    ],
    projectStatus: [
      { value: "all", label: "All Status" },
      { value: "new-launch", label: "New Launch" },
      { value: "under-construction", label: "Under Construction" },
      { value: "ready-to-move", label: "Ready to Move" },
    ],
    configuration: [
      // Remove "all" option since empty array means all
      { value: "2bhk", label: "2 BHK" },
      { value: "2bhk-study", label: "2 BHK + Study" },
      { value: "3bhk", label: "3 BHK" },
      { value: "3bhk-study", label: "3 BHK + Study" },
      { value: "4bhk", label: "4 BHK" },
      { value: "5bhk", label: "5 BHK" },
    ],
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    if (filterType === "location" || filterType === "configuration") {
      // Handle multiple selection for location and configuration
      const currentValues = filters[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((val) => val !== value)
        : [...currentValues, value];
      const newFilters = { ...filters, [filterType]: newValues };
      setFilters(newFilters);
      // Don't trigger search - only update local state
      // Keep dropdown open for multi-select
    } else if (filterType === "propertyType") {
      // Single selection for propertyType
      const newFilters = { 
        ...filters, 
        [filterType]: value,
        // Clear configuration when Commercial is selected
        configuration: value === "commercial" ? [] : filters.configuration
      };
      setFilters(newFilters);
      setOpenDropdown(null);
      // Don't trigger search - only update local state
    } else {
      // Single selection for projectStatus
      const newFilters = { ...filters, [filterType]: value };
      setFilters(newFilters);
      setOpenDropdown(null);
      // Don't trigger search - only update local state
    }
  };

  const getFilterLabel = (filterType: keyof FilterState) => {
    if (filterType === "location") {
      if (filters.location.length === 0) {
        return "All Locations";
      }
      if (filters.location.length === 1) {
        const selected = filterOptions.location.find((opt) => opt.value === filters.location[0]);
        return selected?.label || "Select";
      }
      return `${filters.location.length} Locations Selected`;
    }
    if (filterType === "configuration") {
      if (filters.configuration.length === 0) {
        return "All Configurations";
      }
      if (filters.configuration.length === 1) {
        const selected = filterOptions.configuration.find((opt) => opt.value === filters.configuration[0]);
        return selected?.label || "Select";
      }
      return `${filters.configuration.length} Configurations Selected`;
    }
    const options = filterOptions[filterType];
    const selected = options.find((opt) => opt.value === filters[filterType]);
    return selected?.label || "Select";
  };

  const handleSearch = () => {
    // No validation needed - empty location array means "all locations"
    onFilterChange?.(filters);
    // Dispatch custom event for properties page to listen to
    const event = new CustomEvent('properties-filter-change', { detail: filters });
    window.dispatchEvent(event);
  };

  return (
    <section className="pt-8 pb-12 md:pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={filterRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          {/* Desktop Layout: 4 filters in a line with button below */}
          <div className="hidden md:block space-y-6">
            {/* Filters Row */}
            <div className="flex items-end gap-4">
              {/* Location Filter */}
              <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Location
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "location" ? null : "location"
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins"
                >
                  <span className="text-gray-800">{getFilterLabel("location")}</span>
                  <motion.div
                    animate={{
                      rotate: openDropdown === "location" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openDropdown === "location" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                    {filterOptions.location.map((option) => {
                      const isSelected = filters.location.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange("location", option.value)}
                          className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins flex items-center gap-3 ${
                            isSelected
                              ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                              : "text-gray-800"
                          }`}
                        >
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#CBB27A] bg-[#CBB27A]"
                              : "border-gray-300"
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Property Type
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "propertyType" ? null : "propertyType"
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins"
                >
                  <span className="text-gray-800">{getFilterLabel("propertyType")}</span>
                  <motion.div
                    animate={{
                      rotate: openDropdown === "propertyType" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openDropdown === "propertyType" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                    >
                    {filterOptions.propertyType.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange("propertyType", option.value)
                        }
                        className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins ${
                          filters.propertyType === option.value
                            ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Project Status Filter */}
            <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Project Status
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "projectStatus" ? null : "projectStatus"
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins"
                >
                  <span className="text-gray-800">{getFilterLabel("projectStatus")}</span>
                  <motion.div
                    animate={{
                      rotate: openDropdown === "projectStatus" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openDropdown === "projectStatus" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                    >
                    {filterOptions.projectStatus.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange("projectStatus", option.value)
                        }
                        className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins ${
                          filters.projectStatus === option.value
                            ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Configuration Filter - Disabled for Commercial properties */}
            <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Configuration
              </label>
              <div className="relative">
                <button
                  onClick={() => {
                    if (filters.propertyType !== "commercial") {
                      setOpenDropdown(
                        openDropdown === "configuration" ? null : "configuration"
                      );
                    }
                  }}
                  disabled={filters.propertyType === "commercial"}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-200 font-poppins ${
                    filters.propertyType === "commercial"
                      ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                      : "border-gray-200 hover:border-[#CBB27A]"
                  }`}
                >
                  <span className={filters.propertyType === "commercial" ? "text-gray-400" : "text-gray-800"}>
                    {filters.propertyType === "commercial" ? "Not applicable" : getFilterLabel("configuration")}
                  </span>
                  <motion.div
                    animate={{
                      rotate: openDropdown === "configuration" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${filters.propertyType === "commercial" ? "text-gray-400" : "text-gray-500"}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openDropdown === "configuration" && filters.propertyType !== "commercial" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                    {filterOptions.configuration.map((option) => {
                      const isSelected = filters.configuration.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleFilterChange("configuration", option.value)}
                          className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins flex items-center gap-3 ${
                            isSelected
                              ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                              : "text-gray-800"
                          }`}
                        >
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#CBB27A] bg-[#CBB27A]"
                              : "border-gray-300"
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            )}
            </div>

            {/* Desktop Search Button - Centered Below Filters */}
            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-16 py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl font-poppins flex items-center justify-center gap-2 h-[50px] min-w-[200px] text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Layout: 2x2 grid with button in center */}
          <div className="md:hidden space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Location Filter */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 font-poppins">
                  Location
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "location" ? null : "location"
                      )
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins text-sm"
                  >
                    <span className="text-gray-800 truncate">
                      {getFilterLabel("location")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${
                        openDropdown === "location" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "location" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                      >
                        {filterOptions.location.map((option) => {
                          const isSelected = filters.location.includes(option.value);
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleFilterChange("location", option.value)}
                              className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm flex items-center gap-3 ${
                                isSelected
                                  ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                                  : "text-gray-800"
                              }`}
                            >
                              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "border-[#CBB27A] bg-[#CBB27A]"
                                  : "border-gray-300"
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Property Type Filter */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 font-poppins">
                  Property Type
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "propertyType" ? null : "propertyType"
                      )
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins text-sm"
                  >
                    <span className="text-gray-800 truncate">
                      {getFilterLabel("propertyType")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${
                        openDropdown === "propertyType" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "propertyType" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        {filterOptions.propertyType.map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              handleFilterChange("propertyType", option.value)
                            }
                            className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm ${
                              filters.propertyType === option.value
                                ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                                : "text-gray-800"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Project Status Filter */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 font-poppins">
                  Project Status
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "projectStatus" ? null : "projectStatus"
                      )
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins text-sm"
                  >
                    <span className="text-gray-800 truncate">
                      {getFilterLabel("projectStatus")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${
                        openDropdown === "projectStatus" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "projectStatus" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        {filterOptions.projectStatus.map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              handleFilterChange("projectStatus", option.value)
                            }
                            className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm ${
                              filters.projectStatus === option.value
                                ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                                : "text-gray-800"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Configuration Filter - Disabled for Commercial properties */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 font-poppins">
                  Configuration
                </label>
                <div className="relative">
                  <button
                    onClick={() => {
                      if (filters.propertyType !== "commercial") {
                        setOpenDropdown(
                          openDropdown === "configuration" ? null : "configuration"
                        );
                      }
                    }}
                    disabled={filters.propertyType === "commercial"}
                    className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-200 font-poppins text-sm ${
                      filters.propertyType === "commercial"
                        ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                        : "border-gray-200 hover:border-[#CBB27A]"
                    }`}
                  >
                    <span className={`truncate ${filters.propertyType === "commercial" ? "text-gray-400" : "text-gray-800"}`}>
                      {filters.propertyType === "commercial" ? "Not applicable" : getFilterLabel("configuration")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        filters.propertyType === "commercial"
                          ? "text-gray-400"
                          : openDropdown === "configuration"
                          ? "text-gray-500 rotate-180"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "configuration" && filters.propertyType !== "commercial" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                      >
                        {filterOptions.configuration.map((option) => {
                          const isSelected = filters.configuration.includes(option.value);
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleFilterChange("configuration", option.value)}
                              className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm flex items-center gap-3 ${
                                isSelected
                                  ? "bg-[#CBB27A]/20 text-[#CBB27A] font-semibold"
                                  : "text-gray-800"
                              }`}
                            >
                              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "border-[#CBB27A] bg-[#CBB27A]"
                                  : "border-gray-300"
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Search Button - Centered */}
            <div className="flex justify-center pt-2">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-poppins flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

