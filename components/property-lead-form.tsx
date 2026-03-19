"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, User, MapPin, Calendar, MessageSquare, Send } from "lucide-react";

interface PropertyLeadFormProps {
  propertyName?: string;
  propertyLocation?: string;
  segment?: "Buying to Live" | "Investment Opportunity" | "Luxury Residence";
  variant?: "popup" | "inline" | "sidebar";
  onClose?: () => void;
}

export function PropertyLeadForm({
  propertyName,
  propertyLocation,
  segment,
  variant = "inline",
  onClose,
}: PropertyLeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
    unitType: "",
    purpose: "",
    message: "",
    newsletter: false,
    smsUpdates: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Phone validation function (same as other forms)
  const isValidPhone = (value: string) => {
    const trimmed = value.trim();
    
    // First, check that input only contains allowed characters: digits, +, spaces, dashes, parentheses
    // Reject any letters or other invalid characters
    const allowedCharsRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!allowedCharsRegex.test(trimmed)) {
      return false;
    }
    
    // Extract only digits
    const digits = trimmed.replace(/\D/g, '');
    
    // Basic format check - must be 10-12 digits
    // 10 digits: local number (e.g., 9910906306)
    // 11-12 digits: with country code (e.g., +91 9910906306 = 12 digits, +1 5551234567 = 11 digits)
    if (digits.length < 10 || digits.length > 12) {
      return false;
    }
    
    // If 11 digits and doesn't start with 0, must start with + (country code required)
    // 11 digits starting with 0 are allowed without + (e.g., 09876543210)
    // 11 digits not starting with 0 need + (e.g., +1 5551234567)
    // 12 digits always need + (e.g., +91 9910906306)
    if (digits.length === 11 && !digits.startsWith('0') && !trimmed.startsWith('+')) {
      return false;
    }
    if (digits.length === 12 && !trimmed.startsWith('+')) {
      return false;
    }
    
    // Check for all zeros (0000000000, etc.)
    if (/^0+$/.test(digits)) {
      return false;
    }
    
    // Check for repeated numbers (1111111111, 2222222222, etc.)
    // Check if all digits are the same
    if (/^(\d)\1{9,}$/.test(digits)) {
      return false;
    }
    
    // Check for sequential numbers (1234567890, 0123456789, etc.)
    const isSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current + 1 (handles wrap-around like 9->0)
        if (next !== (current + 1) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    // Check for reverse sequential (9876543210, 987654321, etc.)
    const isReverseSequential = (str: string) => {
      for (let i = 0; i < str.length - 1; i++) {
        const current = parseInt(str[i]);
        const next = parseInt(str[i + 1]);
        // Check if next digit is current - 1 (handles wrap-around like 0->9)
        if (next !== (current - 1 + 10) % 10) {
          return false;
        }
      }
      return str.length >= 10;
    };
    
    if (isSequential(digits) || isReverseSequential(digits)) {
      return false;
    }
    
    return true;
  };

  // Handle phone input to restrict invalid characters
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrow keys, home, end
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40, 35, 36].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    
    // Check if the key is a valid character: digits (0-9), +, -, space, (, )
    const key = e.key;
    const isValidChar = /^[0-9+\s\-()]$/.test(key);
    
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow digits, +, spaces, hyphens, and parentheses
    const filteredValue = value.replace(/[^0-9+\s\-()]/g, '');
    
    setFormData(prev => ({ ...prev, phone: filteredValue }));
    
    // Validate phone number in real-time
    if (filteredValue.trim() && !isValidPhone(filteredValue)) {
      const digits = filteredValue.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !filteredValue.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !filteredValue.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    // Skip phone handling here - it's handled by handlePhoneChange
    if (field === "phone") {
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPhoneError("");

    // Validate phone number before submission
    if (!formData.phone.trim()) {
      setPhoneError("Phone number is required");
      setIsSubmitting(false);
      return;
    }

    if (!isValidPhone(formData.phone)) {
      const digits = formData.phone.trim().replace(/\D/g, '');
      if (digits.length === 11 && !digits.startsWith('0') && !formData.phone.trim().startsWith('+')) {
        setPhoneError("11-digit numbers (not starting with 0) must start with + (country code required)");
      } else if (digits.length === 12 && !formData.phone.trim().startsWith('+')) {
        setPhoneError("12-digit numbers must start with + (country code required)");
      } else {
        setPhoneError("Please enter a valid phone number");
      }
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your API
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          budget: "",
          timeline: "",
          unitType: "",
          purpose: "",
          message: "",
          newsletter: false,
          smsUpdates: false,
        });
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-600 mb-4">
            Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            Reference ID: #INQ-{Date.now().toString().slice(-6)}
          </p>
        </CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Property Information */}
      {propertyName && (
        <div className="bg-primary/5 p-4 rounded-lg">
          <h4 className="font-semibold text-primary mb-2">Property Inquiry</h4>
          <p className="text-sm text-muted-foreground">
            <strong>{propertyName}</strong>
            {propertyLocation && <span> - {propertyLocation}</span>}
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          onKeyDown={handlePhoneKeyDown}
          inputMode="tel"
          pattern="[0-9+\s\-()]*"
          required
          placeholder="+91 9876543210"
          className={phoneError ? "border-red-500 focus:border-red-500" : ""}
        />
        {phoneError && (
          <p className="mt-1.5 text-sm text-red-600 font-poppins">{phoneError}</p>
        )}
      </div>

      {/* Property Preferences */}
      <div>
        <Label htmlFor="budget">Budget Range</Label>
        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-50">Under ₹50 Lakhs</SelectItem>
            <SelectItem value="50-75">₹50 Lakhs - ₹75 Lakhs</SelectItem>
            <SelectItem value="75-100">₹75 Lakhs - ₹1 Crore</SelectItem>
            <SelectItem value="100-150">₹1 Crore - ₹1.5 Crore</SelectItem>
            <SelectItem value="150-200">₹1.5 Crore - ₹2 Crore</SelectItem>
            <SelectItem value="above-200">Above ₹2 Crore</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="timeline">Timeline</Label>
        <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
          <SelectTrigger>
            <SelectValue placeholder="When are you planning to buy?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediately (0-3 months)</SelectItem>
            <SelectItem value="short">Short term (3-6 months)</SelectItem>
            <SelectItem value="medium">Medium term (6-12 months)</SelectItem>
            <SelectItem value="long">Long term (1+ years)</SelectItem>
            <SelectItem value="exploring">Just exploring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="unitType">Preferred Unit Type</Label>
        <Select value={formData.unitType} onValueChange={(value) => handleInputChange("unitType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select unit type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2bhk">2 BHK</SelectItem>
            <SelectItem value="3bhk">3 BHK</SelectItem>
            <SelectItem value="4bhk">4 BHK</SelectItem>
            <SelectItem value="5bhk">5 BHK</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
            <SelectItem value="plot">Plot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="purpose">Purpose</Label>
        <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="self-use">Self Use</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
            <SelectItem value="rental">Rental Income</SelectItem>
            <SelectItem value="retirement">Retirement Home</SelectItem>
            <SelectItem value="second-home">Second Home</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Additional Requirements</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Any specific requirements or questions..."
          rows={3}
        />
      </div>

      {/* Communication Preferences */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={formData.newsletter}
            onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
          />
          <Label htmlFor="newsletter" className="text-sm">
            Subscribe to property updates and market insights
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="smsUpdates"
            checked={formData.smsUpdates}
            onCheckedChange={(checked) => handleInputChange("smsUpdates", checked as boolean)}
          />
          <Label htmlFor="smsUpdates" className="text-sm">
            Receive SMS updates about new projects and offers
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={
          isSubmitting || 
          !formData.firstName.trim() || 
          !formData.lastName.trim() || 
          !formData.email.trim() || 
          !formData.phone.trim() || 
          !isValidPhone(formData.phone)
        }
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Inquiry
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );

  if (variant === "popup") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Get Property Information</CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            )}
          </CardHeader>
          <CardContent>{formContent}</CardContent>
        </Card>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Get More Information
          </CardTitle>
        </CardHeader>
        <CardContent>{formContent}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Interested in This Property?</CardTitle>
        <p className="text-center text-muted-foreground">
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
