"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterState {
  location: string;
  propertyType: string;
  projectStatus: string;
  configuration: string;
}

interface PropertyFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "all",
    propertyType: "all",
    projectStatus: "all",
    configuration: "all",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const filterOptions = {
    location: [
      { value: "all", label: "All Locations" },
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
    ],
    projectStatus: [
      { value: "all", label: "All Status" },
      { value: "new-launch", label: "New Launch" },
      { value: "under-construction", label: "Under Construction" },
      { value: "ready-to-move", label: "Ready to Move" },
    ],
    configuration: [
      { value: "all", label: "All Configurations" },
      { value: "2bhk", label: "2 BHK" },
      { value: "2bhk-study", label: "2 BHK + Study" },
      { value: "3bhk", label: "3 BHK" },
      { value: "3bhk-study", label: "3 BHK + Study" },
      { value: "4bhk", label: "4 BHK" },
    ],
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setOpenDropdown(null);
    onFilterChange?.(newFilters);
  };

  const getFilterLabel = (filterType: keyof FilterState) => {
    const options = filterOptions[filterType];
    const selected = options.find((opt) => opt.value === filters[filterType]);
    return selected?.label || "Select";
  };

  const handleSearch = () => {
    onFilterChange?.(filters);
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
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                    >
                    {filterOptions.location.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange("location", option.value)}
                        className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins ${
                          filters.location === option.value
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

            {/* Configuration Filter */}
            <div className="flex-1 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                Configuration
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "configuration" ? null : "configuration"
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins"
                >
                  <span className="text-gray-800">{getFilterLabel("configuration")}</span>
                  <motion.div
                    animate={{
                      rotate: openDropdown === "configuration" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openDropdown === "configuration" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                    >
                    {filterOptions.configuration.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange("configuration", option.value)
                        }
                        className={`w-full px-4 py-3 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins ${
                          filters.configuration === option.value
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
            </div>

            {/* Desktop Search Button - Centered Below Filters */}
            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                className="px-16 py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl font-poppins flex items-center justify-center gap-2 h-[50px] min-w-[200px] text-xl"
              >
                <Search className="w-5 h-5" />
                Search
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
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        {filterOptions.location.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleFilterChange("location", option.value)}
                            className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm ${
                              filters.location === option.value
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

              {/* Configuration Filter */}
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-700 mb-2 font-poppins">
                  Configuration
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "configuration" ? null : "configuration"
                      )
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#CBB27A] transition-all duration-200 font-poppins text-sm"
                  >
                    <span className="text-gray-800 truncate">
                      {getFilterLabel("configuration")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${
                        openDropdown === "configuration" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "configuration" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        {filterOptions.configuration.map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              handleFilterChange("configuration", option.value)
                            }
                            className={`w-full px-3 py-2.5 text-left hover:bg-[#CBB27A]/10 transition-colors font-poppins text-sm ${
                              filters.configuration === option.value
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
            </div>

            {/* Search Button - Centered */}
            <div className="flex justify-center pt-2">
              <Button
                onClick={handleSearch}
                className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-poppins flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

