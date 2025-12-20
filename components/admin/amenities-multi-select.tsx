"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, Search, Check } from "lucide-react";
import { SORTED_AMENITIES, AMENITIES_BY_CATEGORY } from "@/lib/amenity-list";
import { AmenityIcon } from "@/lib/amenity-icons";
import { cn } from "@/lib/utils";

interface AmenitiesMultiSelectProps {
  selectedAmenities: string[];
  onSelectionChange: (amenities: string[]) => void;
  disabled?: boolean;
}

export function AmenitiesMultiSelect({
  selectedAmenities,
  onSelectionChange,
  disabled = false,
}: AmenitiesMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter amenities based on search query
  const filteredAmenities = SORTED_AMENITIES.filter((amenity) =>
    amenity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered amenities by category
  const filteredByCategory = Object.entries(AMENITIES_BY_CATEGORY).map(
    ([category, amenities]) => ({
      category,
      amenities: amenities.filter((amenity) =>
        amenity.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })
  ).filter(({ amenities }) => amenities.length > 0);

  const toggleAmenity = (amenity: string) => {
    const normalized = amenity.trim();
    if (!normalized) return;

    const isSelected = selectedAmenities.some(
      (a) => a.toLowerCase() === normalized.toLowerCase()
    );

    if (isSelected) {
      // Remove amenity (case-insensitive)
      onSelectionChange(
        selectedAmenities.filter(
          (a) => a.toLowerCase() !== normalized.toLowerCase()
        )
      );
    } else {
      // Add amenity (prevent duplicates)
      if (
        !selectedAmenities.some(
          (a) => a.toLowerCase() === normalized.toLowerCase()
        )
      ) {
        onSelectionChange([...selectedAmenities, normalized]);
      }
    }
  };

  const removeAmenity = (amenity: string) => {
    onSelectionChange(
      selectedAmenities.filter(
        (a) => a.toLowerCase() !== amenity.toLowerCase()
      )
    );
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
        Amenities
      </Label>
      
      {/* Selected Amenities Display */}
      {selectedAmenities.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          {selectedAmenities.map((amenity) => (
            <Badge
              key={amenity}
              variant="secondary"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#CBB27A]/10 text-[#CBB27A] border border-[#CBB27A]/20 hover:bg-[#CBB27A]/20"
            >
              <AmenityIcon
                amenityName={amenity}
                className="w-3 h-3"
                color="#CBB27A"
                strokeWidth={2}
              />
              <span>{amenity}</span>
              <button
                type="button"
                onClick={() => removeAmenity(amenity)}
                className="ml-1 hover:bg-[#CBB27A]/20 rounded-full p-0.5 transition-colors"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedAmenities.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
              disabled={disabled}
              className="h-auto px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      {/* Multi-Select Popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between text-left font-normal h-auto min-h-[2.5rem] px-3 py-2 hover:bg-gray-50 border-gray-300"
            disabled={disabled}
          >
            <span className={cn(
              "text-sm",
              selectedAmenities.length > 0 ? "text-gray-900 font-medium" : "text-gray-500"
            )}>
              {selectedAmenities.length > 0
                ? `${selectedAmenities.length} amenit${selectedAmenities.length === 1 ? "y" : "ies"} selected`
                : "Click to select amenities..."}
            </span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180",
              "opacity-50"
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0 shadow-xl border-gray-200" align="start">
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-white border-gray-300 focus:border-[#CBB27A] focus:ring-[#CBB27A]"
              />
            </div>
          </div>
          <div className="max-h-[450px] overflow-y-auto p-3">
            {searchQuery ? (
              // Show flat list when searching
              <div className="space-y-1">
                {filteredAmenities.length > 0 ? (
                  filteredAmenities.map((amenity) => {
                    const isSelected = selectedAmenities.some(
                      (a) => a.toLowerCase() === amenity.toLowerCase()
                    );
                    return (
                      <div
                        key={amenity}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg hover:bg-[#CBB27A]/5 cursor-pointer transition-all border border-transparent",
                          isSelected && "bg-[#CBB27A]/10 border-[#CBB27A]/20 shadow-sm"
                        )}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleAmenity(amenity)}
                          className="border-gray-300 data-[state=checked]:bg-[#CBB27A] data-[state=checked]:border-[#CBB27A] flex-shrink-0"
                        />
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-200 flex-shrink-0">
                          <AmenityIcon
                            amenityName={amenity}
                            className="w-5 h-5"
                            color={isSelected ? "#CBB27A" : "#6B7280"}
                            strokeWidth={2}
                          />
                        </div>
                        <span
                          className={cn(
                            "text-sm flex-1",
                            isSelected ? "font-semibold text-[#CBB27A]" : "text-gray-700"
                          )}
                        >
                          {amenity}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-[#CBB27A] flex-shrink-0" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No amenities found
                  </div>
                )}
              </div>
            ) : (
              // Show categorized list when not searching
              <div className="space-y-4">
                {filteredByCategory.map(({ category, amenities }) => (
                  <div key={category}>
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 px-2 py-1 bg-gray-100 rounded-md">
                      {category}
                    </h4>
                    <div className="space-y-1">
                      {amenities.map((amenity) => {
                        const isSelected = selectedAmenities.some(
                          (a) => a.toLowerCase() === amenity.toLowerCase()
                        );
                        return (
                          <div
                            key={amenity}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg hover:bg-[#CBB27A]/5 cursor-pointer transition-all border border-transparent",
                              isSelected && "bg-[#CBB27A]/10 border-[#CBB27A]/20 shadow-sm"
                            )}
                            onClick={() => toggleAmenity(amenity)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleAmenity(amenity)}
                              className="border-gray-300 data-[state=checked]:bg-[#CBB27A] data-[state=checked]:border-[#CBB27A] flex-shrink-0"
                            />
                            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-200 flex-shrink-0">
                              <AmenityIcon
                                amenityName={amenity}
                                className="w-5 h-5"
                                color={isSelected ? "#CBB27A" : "#6B7280"}
                                strokeWidth={2}
                              />
                            </div>
                            <span
                              className={cn(
                                "text-sm flex-1",
                                isSelected ? "font-semibold text-[#CBB27A]" : "text-gray-700"
                              )}
                            >
                              {amenity}
                            </span>
                            {isSelected && (
                              <Check className="w-5 h-5 text-[#CBB27A] flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border-t bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {selectedAmenities.length} selected
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-auto px-2 py-1 text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

