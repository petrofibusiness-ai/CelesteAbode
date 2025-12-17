"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Chip, ChipGroup } from "./Chips";
import { FormSubmissionData, sendFormSubmission } from "@/lib/email-client";
import { UserIntent } from "@/lib/analytics";
import { ChevronLeft, ChevronRight, Mail, Phone, User, MessageCircle } from "lucide-react";

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
  intent: UserIntent;
}

const stepLabels = {
  live: {
    title: "Buying to Live",
    subtitle: "Let's find your perfect home",
  },
  invest: {
    title: "Investing for Returns",
    subtitle: "Let's maximize your investment potential",
  },
  signature: {
    title: "Signature Residences",
    subtitle: "Let's explore exclusive properties",
  },
};

const locationOptions = [
  "Noida",
  "Greater Noida West",
  "Greater Noida",
  "Yamuna Expressway",
  "Gurgaon",
  "New Delhi",
  "Ghaziabad",
];

export function MultiStepForm({ isOpen, onClose, intent }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otherLocation, setOtherLocation] = useState("");
  const [formData, setFormData] = useState<FormSubmissionData>({
    intent,
    step1: {},
    step3: { contactInfo: { name: "", email: "", phone: "", whatsapp: "" } },
  });

  // Ref for handling mobile keyboard scrolling
  const activeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Handle mobile keyboard scrolling
  const handleInputFocus = () => {
    if (activeInputRef.current) {
      // Use requestAnimationFrame to avoid forced reflows
      requestAnimationFrame(() => {
        activeInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields - Step 1
    // Check location (either standard selection or "Other" field)
    const hasLocation = (formData.step1.location && formData.step1.location.length > 0) || otherLocation.trim().length > 0;

    if (intent === "live") {
      if (!formData.step1.propertyType) {
        alert("Please select the type of property.");
        setCurrentStep(1);
        return;
      }
      if (!hasLocation) {
        alert("Please select at least one preferred location or enter a location in 'Others'.");
        setCurrentStep(1);
        return;
      }
      if (!formData.step1.buyingTimeline) {
        alert("Please select when you are planning to buy.");
        setCurrentStep(1);
        return;
      }
    } else if (intent === "invest") {
      if (!formData.step1.timeframe) {
        alert("Please select the timeframe of returns.");
        setCurrentStep(1);
        return;
      }
      if (!formData.step1.expectedROI) {
        alert("Please select expected ROI.");
        setCurrentStep(1);
        return;
      }
      if (!hasLocation) {
        alert("Please select at least one preferred location or enter a location in 'Other'.");
        setCurrentStep(1);
        return;
      }
    } else if (intent === "signature") {
      if (!formData.step1.propertyType) {
        alert("Please select the type of property.");
        setCurrentStep(1);
        return;
      }
      if (!formData.step1.productCategory) {
        alert("Please select the product category.");
        setCurrentStep(1);
        return;
      }
      if (!hasLocation) {
        alert("Please select at least one preferred location or enter a location in 'Other'.");
        setCurrentStep(1);
        return;
      }
      if (!formData.step1.buyingTimeline) {
        alert("Please select when you are planning to buy.");
        setCurrentStep(1);
        return;
      }
    }

    // Validate required fields - Step 3 (Personal Information)
    if (!formData.step3.contactInfo.name || 
        !formData.step3.contactInfo.email || 
        !formData.step3.contactInfo.phone ||
        !formData.step3.contactInfo.whatsapp) {
      alert("Please fill in all required personal information fields.");
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      // Add "Other" location if specified
      const finalData = { ...formData };
      if (otherLocation.trim().length > 0) {
        const updatedLocations = finalData.step1.location ? [...finalData.step1.location] : [];
        if (!updatedLocations.includes(otherLocation.trim())) {
          updatedLocations.push(otherLocation.trim());
        }
        finalData.step1.location = updatedLocations;
      }
      const success = await sendFormSubmission(finalData);
      if (success) {
        alert("Thank you! We'll get back to you within 24 hours.");
        onClose();
        // Reset form
        setCurrentStep(1);
        setOtherLocation("");
        setFormData({
          intent,
          step1: {},
          step3: { contactInfo: { name: "", email: "", phone: "", whatsapp: "" } },
        });
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => {
    if (intent === "live") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-ink mb-2">
              Property Preferences
          </h3>
            <p className="text-sm text-muted text-center">Help us understand your requirements</p>
        </div>

          {/* Budget Range */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium text-ink">
              1. Budget Range
          </Label>
          <Input
            id="budget"
            placeholder="₹2 Crore and above"
            value={formData.step1.budget || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                step1: { ...prev.step1, budget: e.target.value },
              }))
            }
            className="border-metal/20 focus:border-metal/40"
          />
        </div>

          {/* Type of Property */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-ink">
              2. Type of Property *
          </Label>
          <RadioGroup
              value={formData.step1.propertyType || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                  step1: { ...prev.step1, propertyType: value },
              }))
            }
              className="grid grid-cols-1 gap-3"
          >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ready to Move" id="ready-to-move" />
                <Label htmlFor="ready-to-move" className="text-sm cursor-pointer">
                  Ready to Move
              </Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Under Construction" id="under-construction" />
                <Label htmlFor="under-construction" className="text-sm cursor-pointer">
                  Under Construction
              </Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pre-Launch" id="pre-launch" />
                <Label htmlFor="pre-launch" className="text-sm cursor-pointer">
                  Pre-Launch
              </Label>
            </div>
          </RadioGroup>
        </div>

          {/* Preferred Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-ink">
              3. Preferred Location *
          </Label>
            <div className="space-y-2">
              <ChipGroup label="Locations" className="gap-2">
                {locationOptions.map((location) => (
              <Chip
                key={location}
                variant="outline"
                selected={formData.step1.location?.includes(location)}
                onClick={() => {
                  const current = formData.step1.location || [];
                  const updated = current.includes(location)
                    ? current.filter((l) => l !== location)
                    : [...current, location];
                  setFormData((prev) => ({
                    ...prev,
                    step1: { ...prev.step1, location: updated },
                  }));
                }}
                    className="text-xs px-3 py-1.5"
              >
                {location}
              </Chip>
            ))}
          </ChipGroup>
              <div className="mt-2">
                <Input
                  placeholder="Others: Enter location"
                  value={otherLocation}
                  onChange={(e) => setOtherLocation(e.target.value)}
                  className="border-metal/20 focus:border-metal/40"
                />
              </div>
            </div>
          </div>

          {/* When Are You Planning to Buy */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              4. When Are You Planning to Buy? *
            </Label>
            <RadioGroup
              value={formData.step1.buyingTimeline || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, buyingTimeline: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Immediate" id="immediate" />
                <Label htmlFor="immediate" className="text-sm cursor-pointer">
                  Immediate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Within 3 Months" id="within-3-months" />
                <Label htmlFor="within-3-months" className="text-sm cursor-pointer">
                  Within 3 Months
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3 to 6 Months" id="3-to-6-months" />
                <Label htmlFor="3-to-6-months" className="text-sm cursor-pointer">
                  3 to 6 Months
                </Label>
              </div>
            </RadioGroup>
        </div>
      </div>
    );
    }

    if (intent === "invest") {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-ink mb-2">
              Investment Preferences
          </h3>
            <p className="text-sm text-muted text-center">Help us understand your investment goals</p>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium text-ink">
              1. Budget Range
            </Label>
            <Input
              id="budget"
              placeholder="₹25 Lakhs & above"
              value={formData.step1.budget || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, budget: e.target.value },
                }))
              }
              className="border-metal/20 focus:border-metal/40"
            />
          </div>

          {/* Timeframe of Returns */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              2. Timeframe of Returns *
            </Label>
            <RadioGroup
              value={formData.step1.timeframe || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, timeframe: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1 Year" id="1-year" />
                <Label htmlFor="1-year" className="text-sm cursor-pointer">
                  1 Year
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2 Years" id="2-years" />
                <Label htmlFor="2-years" className="text-sm cursor-pointer">
                  2 Years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3 Years" id="3-years" />
                <Label htmlFor="3-years" className="text-sm cursor-pointer">
                  3 Years
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Expected ROI */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              3. Expected ROI *
            </Label>
            <RadioGroup
              value={formData.step1.expectedROI || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, expectedROI: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="15%" id="roi-15" />
                <Label htmlFor="roi-15" className="text-sm cursor-pointer">
                  15%
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20%" id="roi-20" />
                <Label htmlFor="roi-20" className="text-sm cursor-pointer">
                  20%
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="25%" id="roi-25" />
                <Label htmlFor="roi-25" className="text-sm cursor-pointer">
                  25%
                </Label>
              </div>
            </RadioGroup>
        </div>

          {/* Preferred Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-ink">
              4. Preferred Location *
          </Label>
            <div className="space-y-2">
              <ChipGroup label="Locations" className="gap-2">
                {locationOptions.map((location) => (
              <Chip
                    key={location}
                variant="outline"
                    selected={formData.step1.location?.includes(location)}
                onClick={() => {
                      const current = formData.step1.location || [];
                      const updated = current.includes(location)
                        ? current.filter((l) => l !== location)
                        : [...current, location];
                  setFormData((prev) => ({
                    ...prev,
                        step1: { ...prev.step1, location: updated },
                  }));
                }}
                    className="text-xs px-3 py-1.5"
              >
                    {location}
              </Chip>
            ))}
          </ChipGroup>
              <div className="mt-2">
                <Input
                  placeholder="Other: Enter location"
                  value={otherLocation}
                  onChange={(e) => setOtherLocation(e.target.value)}
                  className="border-metal/20 focus:border-metal/40"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (intent === "signature") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-ink mb-2">
              Property Preferences
            </h3>
            <p className="text-sm text-muted text-center">Help us understand your luxury requirements</p>
        </div>

          {/* Budget Preference */}
        <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium text-ink">
              1. Budget Preference
          </Label>
          <Input
              id="budget"
              placeholder="₹5 Crore & above"
              value={formData.step1.budget || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                  step1: { ...prev.step1, budget: e.target.value },
              }))
            }
            className="border-metal/20 focus:border-metal/40"
          />
        </div>

          {/* Type of Property */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              2. Type of Property *
            </Label>
            <RadioGroup
              value={formData.step1.propertyType || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, propertyType: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Ready to Move" id="sig-ready-to-move" />
                <Label htmlFor="sig-ready-to-move" className="text-sm cursor-pointer">
                  Ready to Move
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Under Construction" id="sig-under-construction" />
                <Label htmlFor="sig-under-construction" className="text-sm cursor-pointer">
                  Under Construction
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pre-Launch" id="sig-pre-launch" />
                <Label htmlFor="sig-pre-launch" className="text-sm cursor-pointer">
                  Pre-Launch
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Product Category */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              3. Product Category *
            </Label>
            <RadioGroup
              value={formData.step1.productCategory || ""}
              onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                  step1: { ...prev.step1, productCategory: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Flat" id="flat" />
                <Label htmlFor="flat" className="text-sm cursor-pointer">
                  Flat
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Villa" id="villa" />
                <Label htmlFor="villa" className="text-sm cursor-pointer">
                  Villa
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Penthouse" id="penthouse" />
                <Label htmlFor="penthouse" className="text-sm cursor-pointer">
                  Penthouse
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Farm House" id="farm-house" />
                <Label htmlFor="farm-house" className="text-sm cursor-pointer">
                  Farm House
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Area (Size) of Property */}
          <div className="space-y-2">
            <Label htmlFor="area" className="text-sm font-medium text-ink">
              4. Area (Size) of Property
            </Label>
            <Input
              id="area"
              placeholder="3000 sq. ft & above"
              value={formData.step1.area || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, area: e.target.value },
                }))
              }
              className="border-metal/20 focus:border-metal/40"
          />
        </div>

          {/* Preferred Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-ink">
              5. Preferred Location *
          </Label>
            <div className="space-y-2">
              <ChipGroup label="Locations" className="gap-2">
                {locationOptions.map((location) => (
              <Chip
                    key={location}
                variant="outline"
                    selected={formData.step1.location?.includes(location)}
                onClick={() => {
                      const current = formData.step1.location || [];
                      const updated = current.includes(location)
                        ? current.filter((l) => l !== location)
                        : [...current, location];
                  setFormData((prev) => ({
                    ...prev,
                        step1: { ...prev.step1, location: updated },
                  }));
                }}
                    className="text-xs px-3 py-1.5"
              >
                    {location}
              </Chip>
            ))}
          </ChipGroup>
              <div className="mt-2">
                <Input
                  placeholder="Other: Enter location"
                  value={otherLocation}
                  onChange={(e) => setOtherLocation(e.target.value)}
                  className="border-metal/20 focus:border-metal/40"
                />
              </div>
            </div>
          </div>

          {/* When Are You Planning to Buy */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-ink">
              6. When Are You Planning to Buy? *
            </Label>
            <RadioGroup
              value={formData.step1.buyingTimeline || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, buyingTimeline: value },
                }))
              }
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Immediate" id="sig-immediate" />
                <Label htmlFor="sig-immediate" className="text-sm cursor-pointer">
                  Immediate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Within 3 Months" id="sig-within-3-months" />
                <Label htmlFor="sig-within-3-months" className="text-sm cursor-pointer">
                  Within 3 Months
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3 to 6 Months" id="sig-3-to-6-months" />
                <Label htmlFor="sig-3-to-6-months" className="text-sm cursor-pointer">
                  3 to 6 Months
                </Label>
              </div>
            </RadioGroup>
        </div>
      </div>
    );
    }
  };

  const renderStep2 = () => {
    const personalInfoLabel = intent === "live" 
      ? "Personal Information" 
      : "Personal Details";

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-ink mb-2">
            {personalInfoLabel}
          </h3>
          <p className="text-sm text-muted text-center">
            We'll get back to you within 24 hours
          </p>
        </div>

        {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-ink flex items-center gap-2"
            >
              <User className="w-4 h-4" />
            {intent === "live" ? "5. Full Name *" : "1. Full Name *"}
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.step3.contactInfo.name}
            onFocus={handleInputFocus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step3: {
                    ...prev.step3,
                    contactInfo: {
                      ...prev.step3.contactInfo,
                      name: e.target.value,
                    },
                  },
                }))
              }
              className="border-metal/20 focus:border-metal/40"
              required
            />
          </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label
            htmlFor="mobile"
            className="text-sm font-medium text-ink flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {intent === "live" ? "6. Mobile Number *" : "2. Mobile No. *"}
          </Label>
          <Input
            id="mobile"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.step3.contactInfo.phone}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                step3: {
                  ...prev.step3,
                  contactInfo: {
                    ...prev.step3.contactInfo,
                    phone: e.target.value,
                  },
                },
              }))
            }
            className="border-metal/20 focus:border-metal/40"
            required
          />
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <Label
            htmlFor="whatsapp"
            className="text-sm font-medium text-ink flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {intent === "live" ? "7. WhatsApp Number *" : "3. WhatsApp No. *"}
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={formData.step3.contactInfo.whatsapp || ""}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                step3: {
                  ...prev.step3,
                  contactInfo: {
                    ...prev.step3.contactInfo,
                    whatsapp: e.target.value,
                  },
                },
              }))
            }
            className="border-metal/20 focus:border-metal/40"
            required
          />
        </div>

        {/* Email Address */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-ink flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
            {intent === "live" ? "8. Email Address *" : "4. Email Address *"}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.step3.contactInfo.email}
              onFocus={handleInputFocus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step3: {
                    ...prev.step3,
                    contactInfo: {
                      ...prev.step3.contactInfo,
                      email: e.target.value,
                    },
                  },
                }))
              }
              className="border-metal/20 focus:border-metal/40"
              required
            />
          </div>

        {/* Additional Comments/Remarks */}
          <div className="space-y-2">
          <Label htmlFor="comments" className="text-sm font-medium text-ink">
            {intent === "live" 
              ? "9. Additional Comments (Requirements) (Optional)"
              : intent === "invest"
              ? "5. Additional Remarks (Requirements, if any) (Optional)"
              : "5. Additional Remarks (Requirements, if any) (Optional)"}
            </Label>
          <Textarea
            id="comments"
            placeholder={intent === "live"
              ? "Any specific requirements or questions..."
              : "Any specific requirements or questions..."}
            value={formData.step3.additionalNotes || ""}
              onFocus={handleInputFocus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step3: { ...prev.step3, additionalNotes: e.target.value },
                }))
              }
            className="border-metal/20 focus:border-metal/40 min-h-[100px]"
            />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[355px] sm:max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto p-3 sm:p-6 mx-auto overflow-x-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-bold text-ink">
            {stepLabels[intent].title}
          </DialogTitle>
          <p className="text-sm text-muted">{stepLabels[intent].subtitle}</p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">Step {currentStep} of 2</span>
            <span className="text-xs text-muted">
              {Math.round((currentStep / 2) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-hidden"
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 pt-4 border-t border-metal/20 flex justify-between gap-2 overflow-x-hidden">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-1 text-xs px-2 py-1.5 min-w-0 flex-shrink"
          >
            <ChevronLeft className="w-3 h-3" />
            Previous
          </Button>

          {currentStep < 2 ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-xs px-2 py-1.5 min-w-0 flex-shrink"
            >
              Next
              <ChevronRight className="w-3 h-3" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-xs px-2 py-1.5 min-w-0 flex-shrink"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
