"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Filter,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  form_type: string;
  form_source: string | null;
  page_url: string | null;
  property_name: string | null;
  property_location: string | null;
  property_slug: string | null;
  location_slug: string | null;
  form_data: Record<string, any>;
  lead_score: string | null;
  status: string;
  notes: string | null;
  email_sent: boolean;
  email_sent_at: string | null;
  email_error: string | null;
  created_at: string;
  updated_at: string;
  client_ip: string | null;
}

const FORM_TYPE_LABELS: Record<string, string> = {
  'contact': 'Contact Form',
  'viewing': 'Viewing Request',
  'location-contact': 'Location Contact',
  'advisory-session': 'Advisory Session',
  'chatbot': 'Chatbot',
  'segmented-entry': 'Homepage Entry',
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  'new': { 
    bg: 'bg-white', 
    text: 'text-black', 
    border: 'border-black',
    icon: 'text-black'
  },
  'contacted': { 
    bg: 'bg-gradient-to-r from-amber-50 to-yellow-50', 
    text: 'text-amber-700', 
    border: 'border-amber-300',
    icon: 'text-amber-600'
  },
  'qualified': { 
    bg: 'bg-gradient-to-r from-emerald-50 to-green-50', 
    text: 'text-emerald-700', 
    border: 'border-emerald-300',
    icon: 'text-emerald-600'
  },
  'converted': { 
    bg: 'bg-gradient-to-r from-purple-50 to-violet-50', 
    text: 'text-purple-700', 
    border: 'border-purple-300',
    icon: 'text-purple-600'
  },
  'lost': { 
    bg: 'bg-gradient-to-r from-red-50 to-rose-50', 
    text: 'text-red-700', 
    border: 'border-red-300',
    icon: 'text-red-600'
  },
};

const FORM_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'contact': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
  'viewing': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
  'location-contact': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
  'advisory-session': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
  'chatbot': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
  'segmented-entry': { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-900' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formTypeFilter, setFormTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);
  const [expandedLeads, setExpandedLeads] = useState<Set<string>>(new Set());
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<Lead | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (detailsDrawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [detailsDrawerOpen]);

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch("/api/admin/auth/csrf", {
          credentials: 'include',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.csrfToken) {
            setCsrfToken(data.csrfToken);
          }
        }
      } catch (err) {
        // CSRF token fetch failed
      }
    };
    fetchCSRFToken();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter, formTypeFilter]);

  const fetchLeads = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (formTypeFilter !== "all") params.append("formType", formTypeFilter);

      // Add cache-busting timestamp if forcing refresh
      if (forceRefresh) {
        params.append("_t", Date.now().toString());
      }

      const response = await fetch(`/api/admin/leads?${params.toString()}`, {
        credentials: 'include', // Send authentication cookies
        cache: forceRefresh ? 'no-store' : 'default',
        headers: forceRefresh ? {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        } : undefined,
      });
      if (!response.ok) throw new Error("Failed to fetch leads");
      const data = await response.json();
      setLeads(data.leads || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
      if (forceRefresh) {
        toast.success("Leads refreshed successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeads(true);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    if (!csrfToken) {
      toast.error("CSRF token not available. Please refresh the page.");
      // Try to fetch token again
      try {
        const response = await fetch("/api/admin/auth/csrf", {
          credentials: 'include',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.csrfToken) {
            setCsrfToken(data.csrfToken);
            // Retry the request
            setTimeout(() => handleStatusChange(leadId, newStatus), 100);
            return;
          }
        }
      } catch (err) {
        // CSRF token refetch failed
      }
      return;
    }

    try {
      setUpdatingLead(leadId);
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('x-csrf-token', csrfToken);
      
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update lead status");
      }
      
      toast.success("Lead status updated");
      fetchLeads();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingLead(null);
    }
  };

  const handleNotesClick = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || "");
    setNotesDialogOpen(true);
  };

  const handleNotesSave = async () => {
    if (!selectedLead) return;
    if (!csrfToken) {
      toast.error("CSRF token not available. Please refresh the page.");
      // Try to fetch token again
      try {
        const response = await fetch("/api/admin/auth/csrf", {
          credentials: 'include',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.csrfToken) {
            setCsrfToken(data.csrfToken);
            // Retry the request
            setTimeout(() => handleNotesSave(), 100);
            return;
          }
        }
      } catch (err) {
        // CSRF token refetch failed
      }
      return;
    }

    try {
      setUpdatingLead(selectedLead.id);
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('x-csrf-token', csrfToken);
      
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ id: selectedLead.id, notes }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save notes");
      }
      
      toast.success("Notes saved");
      setNotesDialogOpen(false);
      fetchLeads();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save notes");
    } finally {
      setUpdatingLead(null);
    }
  };

  const toggleExpand = (leadId: string) => {
    const newExpanded = new Set(expandedLeads);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    setExpandedLeads(newExpanded);
  };

  const openDetailsDrawer = (lead: Lead) => {
    setSelectedLeadForDetails(lead);
    setDetailsDrawerOpen(true);
  };

  const closeDetailsDrawer = () => {
    setDetailsDrawerOpen(false);
    setSelectedLeadForDetails(null);
  };

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.first_name.toLowerCase().includes(query) ||
      lead.last_name.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.property_name?.toLowerCase().includes(query) ||
      lead.property_location?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <MessageSquare className="w-4 h-4" />;
      case "qualified":
        return <CheckCircle2 className="w-4 h-4" />;
      case "converted":
        return <CheckCircle2 className="w-4 h-4" />;
      case "lost":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatFormData = (formData: Record<string, any>, formType: string) => {
    if (!formData || Object.keys(formData).length === 0) {
      return null;
    }

    const formatLabel = (key: string): string => {
      // Convert camelCase/snake_case to Title Case
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase())
        .trim();
    };

    const formatValue = (value: any): string => {
      if (value === null || value === undefined) return "N/A";
      if (typeof value === "boolean") return value ? "Yes" : "No";
      if (typeof value === "object") return JSON.stringify(value);
      return String(value);
    };

    // Form-specific formatting
    if (formType === "viewing") {
      return (
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A] flex-shrink-0" />
            <span className="break-words">Viewing Request Details</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {formData.preferredDate && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Preferred Date</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">
                  {new Date(formData.preferredDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            )}
            {formData.preferredTime && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Preferred Time</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.preferredTime}</div>
              </div>
            )}
            {formData.message && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm md:col-span-2">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Message</div>
                <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{formData.message}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (formType === "advisory-session") {
      return (
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A] flex-shrink-0" />
            <span className="break-words">Advisory Session Details</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {formData.budget && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Budget</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.budget}</div>
              </div>
            )}
            {formData.propertyType && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Property Type</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.propertyType}</div>
              </div>
            )}
            {formData.timeline && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Timeline</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.timeline}</div>
              </div>
            )}
            {formData.location && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Location</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.location}</div>
              </div>
            )}
            {formData.message && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm md:col-span-2">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Message</div>
                <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{formData.message}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (formType === "chatbot") {
      return (
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
            <span className="break-words">Chatbot Interaction Details</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {formData.userIntent && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">User Intent</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.userIntent}</div>
              </div>
            )}
            {formData.propertyType && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Property Type</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.propertyType}</div>
              </div>
            )}
            {formData.preferredLocation && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Preferred Location</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.preferredLocation}</div>
              </div>
            )}
            {formData.budgetRange && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Budget Range</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.budgetRange}</div>
              </div>
            )}
            {formData.bhkPreference && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">BHK Preference</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.bhkPreference}</div>
              </div>
            )}
            {formData.timeline && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Timeline</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.timeline}</div>
              </div>
            )}
            {(formData.wantsVirtualTour || formData.wantsPriceComparison || formData.wantsBestProjects || formData.wantsExpertCall) && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide">Interests</div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {formData.wantsVirtualTour && (
                    <Badge variant="outline" className="border-2 border-green-300 text-green-700 bg-green-50 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                      Virtual Tour
                    </Badge>
                  )}
                  {formData.wantsPriceComparison && (
                    <Badge variant="outline" className="border-2 border-blue-300 text-blue-700 bg-blue-50 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                      Price Comparison
                    </Badge>
                  )}
                  {formData.wantsBestProjects && (
                    <Badge variant="outline" className="border-2 border-purple-300 text-purple-700 bg-purple-50 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                      Best Projects
                    </Badge>
                  )}
                  {formData.wantsExpertCall && (
                    <Badge variant="outline" className="border-2 border-[#CBB27A] text-[#B8A068] bg-[#CBB27A]/10 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                      Expert Call
                    </Badge>
                  )}
                </div>
              </div>
            )}
            {formData.contactPreference && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Contact Preference</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.contactPreference}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (formType === "segmented-entry") {
      // Extract Step1 and Step3 data from formData
      // Structure: formData.formData.Step1 and formData.formData.Step3
      const nestedFormData = formData.formData || {};
      const step1Data = nestedFormData.Step1 || formData.Step1 || {};
      const step3Data = nestedFormData.Step3 || formData.Step3 || {};
      const contactInfo = step3Data.contactInfo || {};
      const intent = formData.intent || nestedFormData.intent;

      return (
        <div className="space-y-3 sm:space-y-4">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A] flex-shrink-0" />
            <span className="break-words">Homepage Entry Details</span>
          </h4>

          {/* Intent */}
          {intent && (
            <div className="bg-gradient-to-r from-[#CBB27A]/10 to-transparent rounded-lg p-3 sm:p-4 border-2 border-[#CBB27A]/40 shadow-sm">
              <div className="text-xs font-semibold text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">Intent</div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-[#CBB27A] uppercase tracking-wider break-words">{intent}</div>
            </div>
          )}

          {/* Step 1: Property Requirements */}
          {(Object.keys(step1Data).length > 0 || nestedFormData.budget || nestedFormData.location || nestedFormData.propertyType) && (
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-black shadow-md">
              <div className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CBB27A] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md flex-shrink-0">1</div>
                <span className="break-words">Property Requirements</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {(step1Data.budget || nestedFormData.budget) && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Budget</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{step1Data.budget || nestedFormData.budget}</div>
                  </div>
                )}
                {(step1Data.propertyType || nestedFormData.propertyType) && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Property Type</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{step1Data.propertyType || nestedFormData.propertyType}</div>
                  </div>
                )}
                {(step1Data.buyingTimeline || nestedFormData.buyingTimeline) && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Buying Timeline</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{step1Data.buyingTimeline || nestedFormData.buyingTimeline}</div>
                  </div>
                )}
                {(step1Data.location || nestedFormData.location) && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Location</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">
                      {Array.isArray(step1Data.location || nestedFormData.location)
                        ? (step1Data.location || nestedFormData.location).join(", ")
                        : (step1Data.location || nestedFormData.location)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {(Object.keys(contactInfo).length > 0 || Object.keys(step3Data).length > 0) && (
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-black shadow-md">
              <div className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 sm:pb-3 border-b-2 border-black">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CBB27A] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md flex-shrink-0">3</div>
                <span className="break-words">Contact Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {contactInfo.name && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Name</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{contactInfo.name}</div>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Email</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 break-all">{contactInfo.email}</div>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Phone</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{contactInfo.phone}</div>
                  </div>
                )}
                {contactInfo.whatsapp && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">WhatsApp</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{contactInfo.whatsapp}</div>
                  </div>
                )}
                {/* Handle other Step3 fields that aren't in contactInfo */}
                {Object.entries(step3Data)
                  .filter(([key]) => key !== "contactInfo")
                  .map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                      <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">{formatLabel(key)}</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formatValue(value)}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Fallback: Show all form data if Step1/Step3 structure not found */}
          {Object.keys(step1Data).length === 0 && Object.keys(step3Data).length === 0 && Object.keys(nestedFormData).length > 0 && (
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-black shadow-md">
              <div className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-black break-words">All Form Data</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {Object.entries(nestedFormData).map(([key, value]) => {
                  // Skip emailContent as it's usually HTML
                  if (key === "emailContent") return null;
                  
                  // Handle nested objects
                  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                    return (
                      <div key={key} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black md:col-span-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide break-words">{formatLabel(key)}</div>
                        <div className="space-y-1.5 sm:space-y-2">
                          {Object.entries(value as Record<string, any>).map(([nestedKey, nestedValue]) => (
                            <div key={nestedKey} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 p-2 bg-white rounded border border-black">
                              <span className="text-xs sm:text-sm text-gray-600 font-medium break-words">{formatLabel(nestedKey)}:</span>
                              <span className="text-xs sm:text-sm font-bold text-gray-900 break-words text-right sm:text-left">
                                {Array.isArray(nestedValue) ? nestedValue.join(", ") : String(nestedValue)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                      <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide break-words">{formatLabel(key)}</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 break-words">
                        {Array.isArray(value) ? value.join(", ") : formatValue(value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other form data that doesn't fit into Step1 or Step3 */}
          {formData.formData && typeof formData.formData === "object" && Object.keys(step1Data).length > 0 && (
            <>
              {Object.keys(nestedFormData).filter(
                (key) => key !== "Step1" && key !== "Step3" && key !== "intent" && key !== "budget" && key !== "location" && key !== "propertyType" && key !== "buyingTimeline"
              ).length > 0 && (
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-black shadow-md">
              <div className="text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4 pb-2 border-b-2 border-black break-words">Additional Information</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    {Object.entries(nestedFormData)
                      .filter(
                        ([key]) => key !== "Step1" && key !== "Step3" && key !== "intent" && key !== "budget" && key !== "location" && key !== "propertyType" && key !== "buyingTimeline"
                      )
                      .map(([key, value]) => {
                        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                          return null;
                        }
                        return (
                          <div key={key} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-black">
                            <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide break-words">{formatLabel(key)}</div>
                            <div className="text-sm sm:text-base font-bold text-gray-900 break-words">
                              {Array.isArray(value) ? value.join(", ") : formatValue(value)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    if (formType === "location-contact") {
      return (
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 border-b-2 border-black">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A] flex-shrink-0" />
            <span className="break-words">Location Inquiry Details</span>
          </h4>
          <div className="space-y-2 sm:space-y-3">
            {formData.location && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Location</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formData.locationDisplayName || formData.location}</div>
              </div>
            )}
            {formData.message && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Message</div>
                <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{formData.message}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (formType === "contact") {
      return (
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 border-b-2 border-black">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
            <span className="break-words">Contact Form Details</span>
          </h4>
          <div className="space-y-2 sm:space-y-3">
            {formData.message && (
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Message</div>
                <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{formData.message}</div>
              </div>
            )}
            {Object.entries(formData)
              .filter(([key]) => key !== "message")
              .map(([key, value]) => {
                if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                  return null;
                }
                return (
                  <div key={key} className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                    <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">{formatLabel(key)}</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formatValue(value)}</div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }

    // Default: Generic form data display
    return (
      <div className="space-y-2 sm:space-y-3">
        <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 pb-2 border-b-2 border-black">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBB27A] flex-shrink-0" />
          <span className="break-words">Form Details</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {Object.entries(formData).map(([key, value]) => {
            // Skip nested objects for now (can be expanded)
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
              return null;
            }
            return (
              <div key={key} className="bg-white rounded-lg p-3 sm:p-4 border border-black shadow-sm">
                <div className="text-xs font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">{formatLabel(key)}</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 break-words">{formatValue(value)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading && leads.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#CBB27A]" />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 min-h-screen pt-16 md:pt-4 lg:pt-6 xl:pt-10" style={{ paddingTop: '36px' }}>
      {/* Header */}
      <div className="mb-2 sm:mb-4 md:mb-6">
        <div className="bg-gradient-to-r from-[#CBB27A] via-[#B8A068] to-[#CBB27A] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-[#CBB27A]/20">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg border-2 border-white/30 flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-black" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black drop-shadow-lg truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                Leads Management
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-black mt-1 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                Total: <span className="font-bold text-black">{total}</span> leads
                  {leads.length !== total && (
                    <span className="ml-2 text-xs text-gray-600">
                      (Showing {leads.length} on this page)
                    </span>
                  )}
              </p>
            </div>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 p-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-white to-gray-50 hover:from-white hover:via-gray-50 hover:to-white border-2 border-black/30 hover:border-black shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 group disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh leads data"
            >
              <RefreshCw className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black group-hover:scale-110 transition-transform duration-300 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-lg sm:rounded-xl shadow-xl border-2 border-blue-200/50 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
            Filters & Search
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 h-10 sm:h-11 py-2 border-2 border-gray-300 focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 bg-white shadow-sm w-full text-sm sm:text-base"
            />
          </div>
          <div className="w-full">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 sm:h-11 w-full border-2 border-gray-300 focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 bg-white shadow-sm text-sm sm:text-base">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-black shadow-lg">
                <SelectItem value="all" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">All Statuses</SelectItem>
                <SelectItem value="new" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">New</SelectItem>
                <SelectItem value="contacted" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">Contacted</SelectItem>
                <SelectItem value="qualified" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">Qualified</SelectItem>
                <SelectItem value="converted" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">Converted</SelectItem>
                <SelectItem value="lost" className="text-gray-900 hover:text-gray-900 focus:text-gray-900 hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-sm sm:text-base">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin text-[#CBB27A]" />
            <span>Loading leads...</span>
          </div>
        )}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border-2 border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Mail className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                No leads found
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                Try adjusting your filters or search query
              </p>
            </div>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isExpanded = expandedLeads.has(lead.id);
            return (
              <div
                key={lead.id}
                className="bg-gradient-to-br from-white to-slate-50 rounded-lg sm:rounded-xl shadow-lg border-2 border-black p-4 sm:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
                  {/* Left Section - Lead Information */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 break-words" style={{ fontFamily: "Poppins, sans-serif" }}>
                          {lead.first_name} {lead.last_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                          <Badge className={`${STATUS_COLORS[lead.status]?.bg || STATUS_COLORS.new.bg} ${STATUS_COLORS[lead.status]?.text || STATUS_COLORS.new.text} ${STATUS_COLORS[lead.status]?.border || STATUS_COLORS.new.border} border-2 px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm text-xs sm:text-sm`}>
                            <span className={STATUS_COLORS[lead.status]?.icon || STATUS_COLORS.new.icon}>
                              {getStatusIcon(lead.status)}
                            </span>
                            <span className="ml-1 capitalize font-semibold">{lead.status}</span>
                          </Badge>
                          {FORM_TYPE_COLORS[lead.form_type] && (
                            <Badge className={`${FORM_TYPE_COLORS[lead.form_type].bg} ${FORM_TYPE_COLORS[lead.form_type].text} ${FORM_TYPE_COLORS[lead.form_type].border} border-2 px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm font-medium text-xs sm:text-sm`}>
                              {FORM_TYPE_LABELS[lead.form_type] || lead.form_type}
                            </Badge>
                          )}
                          {!FORM_TYPE_COLORS[lead.form_type] && (
                            <Badge variant="outline" className="border-2 border-gray-300 text-gray-700 bg-gray-50 font-medium px-2 sm:px-3 py-0.5 sm:py-1 shadow-sm text-xs sm:text-sm">
                              {FORM_TYPE_LABELS[lead.form_type] || lead.form_type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {lead.email && (
                        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-blue-600 mb-0.5 uppercase tracking-wide">Email</div>
                            <div className="text-xs sm:text-sm font-bold text-gray-900 truncate break-all">{lead.email}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-green-600 mb-0.5 uppercase tracking-wide">Phone</div>
                          <div className="text-xs sm:text-sm font-bold text-gray-900 break-all">{lead.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-violet-600 mb-0.5 uppercase tracking-wide">Submitted</div>
                          <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">{formatDate(lead.created_at)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Property/Location Information */}
                    {lead.property_name && (
                      <div className="mb-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-lg border-2 border-blue-300 shadow-md flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">Property</div>
                          <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">{lead.property_name}</div>
                          {lead.property_location && (
                            <div className="text-xs text-gray-600 mt-1 flex items-start sm:items-center gap-1 break-words">
                              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                              <span>{lead.property_location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {lead.location_slug && !lead.property_name && (
                      <div className="mb-3 p-3 sm:p-4 bg-gradient-to-r from-gray-900 to-black rounded-lg border-2 border-gray-900 shadow-md flex items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent rounded-lg flex items-center justify-center shadow-lg border-2 border-white flex-shrink-0">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white mb-1 uppercase tracking-wide">Location</div>
                          <div className="text-xs sm:text-sm font-bold text-white break-words">{lead.property_location || lead.location_slug}</div>
                        </div>
                      </div>
                    )}

                    {/* Email Error Warning */}
                    {lead.email_sent === false && lead.email_error && (
                      <div className="mb-3 p-3 sm:p-4 bg-gradient-to-r from-red-50 via-rose-50 to-red-50 rounded-lg border-2 border-red-300 shadow-md">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-red-700 mb-1 uppercase tracking-wide">Email Delivery Failed</div>
                            <div className="text-xs text-red-800 leading-relaxed break-words">{lead.email_error.substring(0, 150)}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expandable Details - Desktop Only */}
                    {isExpanded && (
                      <div className="hidden lg:block mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
                        <div className="space-y-2 sm:space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {lead.form_source && (
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200 shadow-sm">
                              <div className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">Source</div>
                              <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">
                                {lead.form_source === 'location-page-footer-cta' 
                                  ? 'Location Page Footer CTA'
                                  : lead.form_source === 'property-page-footer-cta'
                                  ? lead.property_name 
                                    ? `Property Page Footer CTA - ${lead.property_name}`
                                    : 'Property Page Footer CTA'
                                  : lead.form_source.startsWith('property-brochure-download')
                                  ? lead.property_name
                                    ? `Brochure Download - ${lead.property_name}`
                                    : lead.form_source.includes(':')
                                    ? `Brochure Download - ${lead.form_source.split(':')[1]}`
                                    : 'Brochure Download - Property'
                                  : lead.form_source === 'homepage-footer-cta'
                                  ? 'Homepage Footer CTA'
                                  : lead.form_source === 'homepage'
                                  ? 'Homepage Entry Form'
                                  : lead.form_source === 'contact-page'
                                  ? 'Contact Page'
                                  : lead.form_source === 'advisory-session-page'
                                  ? 'Advisory Session Page'
                                  : lead.form_source === 'website-chatbot'
                                  ? 'Website Chatbot'
                                  : lead.form_source}
                              </div>
                            </div>
                          )}
                            {lead.email_sent && lead.email_sent_at && (
                              <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200 shadow-sm">
                                <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wide">Email Sent</div>
                                <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">{formatDate(lead.email_sent_at)}</div>
                              </div>
                            )}
                          </div>
                          {lead.page_url && (
                            <div className="p-3 sm:p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                              <div className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Page URL</div>
                              <a 
                                href={lead.page_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs sm:text-sm text-[#CBB27A] hover:text-[#B8A068] hover:underline break-all font-bold transition-colors"
                              >
                                {lead.page_url}
                              </a>
                            </div>
                          )}
                          {lead.notes && (
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-lg border-2 border-amber-300 shadow-md">
                              <div className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                Admin Notes
                              </div>
                              <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{lead.notes}</div>
                            </div>
                          )}
                          {Object.keys(lead.form_data || {}).length > 0 && (
                            <div className="mt-2">
                              <div className="bg-gradient-to-br from-[#CBB27A]/10 via-[#B8A068]/5 to-[#CBB27A]/10 rounded-lg p-3 sm:p-4 md:p-5 border-2 border-[#CBB27A]/40 shadow-md overflow-x-auto">
                                {formatFormData(lead.form_data, lead.form_type)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Section - Actions */}
                  <div className="w-full lg:w-auto lg:min-w-[200px] lg:max-w-[220px]">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 shadow-md">
                      <div className="text-xs font-bold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        Actions
                      </div>
                      <div className="space-y-2 sm:space-y-2.5">
                        <Button
                          onClick={() => {
                            // Mobile: Open drawer, Desktop: Toggle expand
                            if (window.innerWidth < 1024) {
                              openDetailsDrawer(lead);
                            } else {
                              toggleExpand(lead.id);
                            }
                          }}
                          variant="outline"
                          size="sm"
                          className={`w-full border-2 font-medium shadow-sm transition-all text-black hover:text-black text-xs sm:text-sm ml-0 ${
                            isExpanded
                              ? 'lg:border-[#CBB27A] lg:bg-gradient-to-r lg:from-[#CBB27A]/20 lg:to-[#B8A068]/20 lg:hover:from-[#CBB27A]/30 lg:hover:to-[#B8A068]/30 lg:shadow-md'
                              : 'border-gray-300 hover:border-[#CBB27A] hover:bg-gradient-to-r hover:from-[#CBB27A]/10 hover:to-[#B8A068]/10 bg-white hover:shadow-md'
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="hidden lg:inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden lg:inline">Hide Details</span>
                              <ChevronDown className="lg:hidden w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="lg:hidden">View Details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              View Details
                            </>
                          )}
                        </Button>
                        <div className="ml-0" style={{ marginLeft: 0 }}>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                          disabled={updatingLead === lead.id}
                        >
                            <SelectTrigger className="w-full h-9 sm:h-10 border-2 border-gray-300 focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 bg-white text-gray-900 hover:bg-gray-50 font-medium rounded-md shadow-sm text-xs sm:text-sm ml-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-black shadow-lg">
                              <SelectItem value="new" className="hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-gray-900 hover:text-gray-900 focus:text-gray-900 text-sm sm:text-base">New</SelectItem>
                              <SelectItem value="contacted" className="hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-gray-900 hover:text-gray-900 focus:text-gray-900 text-sm sm:text-base">Contacted</SelectItem>
                              <SelectItem value="qualified" className="hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-gray-900 hover:text-gray-900 focus:text-gray-900 text-sm sm:text-base">Qualified</SelectItem>
                              <SelectItem value="converted" className="hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-gray-900 hover:text-gray-900 focus:text-gray-900 text-sm sm:text-base">Converted</SelectItem>
                              <SelectItem value="lost" className="hover:bg-[#CBB27A]/10 focus:bg-[#CBB27A]/10 cursor-pointer text-gray-900 hover:text-gray-900 focus:text-gray-900 text-sm sm:text-base">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <Button
                          onClick={() => handleNotesClick(lead)}
                          variant="outline"
                          size="sm"
                          className="w-full border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-gradient-to-r hover:from-[#CBB27A]/10 hover:to-[#B8A068]/10 text-gray-900 hover:text-gray-900 bg-white font-medium shadow-sm hover:shadow-md transition-all text-xs sm:text-sm ml-0"
                        >
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">{lead.notes ? "Edit Notes" : "Add Notes"}</span>
                          <span className="sm:hidden">{lead.notes ? "Edit" : "Add"}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-white to-gray-50 rounded-lg sm:rounded-xl shadow-xl border-2 border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-700 font-medium text-center sm:text-left" style={{ fontFamily: "Poppins, sans-serif" }}>
              Showing page <span className="font-bold text-[#CBB27A]">{page}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="outline"
                className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-gradient-to-r hover:from-[#CBB27A]/10 hover:to-[#B8A068]/10 disabled:opacity-50 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm"
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                variant="outline"
                className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-gradient-to-r hover:from-[#CBB27A]/10 hover:to-[#B8A068]/10 disabled:opacity-50 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Details Drawer - Mobile Only */}
      <Sheet open={detailsDrawerOpen} onOpenChange={setDetailsDrawerOpen}>
        <SheetContent 
          side="bottom" 
          className="lg:hidden rounded-t-2xl p-0 flex flex-col [&>button]:hidden !z-[100] overflow-hidden" 
          style={{ 
            position: 'fixed',
            top: '4rem',
            left: '0',
            right: '0',
            bottom: '0',
            height: 'calc(100dvh - 4rem)',
            maxHeight: 'calc(100dvh - 4rem)',
            transform: 'translateY(0)',
            willChange: 'transform'
          }}
        >
          {selectedLeadForDetails && (
            <>
              {/* Sticky Header with Close Button */}
              <div className="flex-shrink-0 bg-white border-b-2 border-gray-200 px-4 pt-4 pb-3 rounded-t-2xl flex items-start justify-between gap-3 shadow-sm">
                <SheetHeader className="flex-1 min-w-0 pr-2">
                  <SheetTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent break-words">
                    {selectedLeadForDetails.first_name} {selectedLeadForDetails.last_name}
                  </SheetTitle>
                  <SheetDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                    Complete lead details and information
                  </SheetDescription>
                </SheetHeader>
                <button
                  onClick={() => setDetailsDrawerOpen(false)}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors mt-1"
                  aria-label="Close"
                >
                  <XCircle className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8 space-y-3 sm:space-y-4">
                {/* Status and Form Type */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={`${STATUS_COLORS[selectedLeadForDetails.status]?.bg || STATUS_COLORS.new.bg} ${STATUS_COLORS[selectedLeadForDetails.status]?.text || STATUS_COLORS.new.text} ${STATUS_COLORS[selectedLeadForDetails.status]?.border || STATUS_COLORS.new.border} border-2 px-3 py-1 shadow-sm text-sm`}>
                    <span className={STATUS_COLORS[selectedLeadForDetails.status]?.icon || STATUS_COLORS.new.icon}>
                      {getStatusIcon(selectedLeadForDetails.status)}
                    </span>
                    <span className="ml-1 capitalize font-semibold">{selectedLeadForDetails.status}</span>
                  </Badge>
                  {FORM_TYPE_COLORS[selectedLeadForDetails.form_type] && (
                    <Badge className={`${FORM_TYPE_COLORS[selectedLeadForDetails.form_type].bg} ${FORM_TYPE_COLORS[selectedLeadForDetails.form_type].text} ${FORM_TYPE_COLORS[selectedLeadForDetails.form_type].border} border-2 px-3 py-1 shadow-sm font-medium text-sm`}>
                      {FORM_TYPE_LABELS[selectedLeadForDetails.form_type] || selectedLeadForDetails.form_type}
                    </Badge>
                  )}
          </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {selectedLeadForDetails.email && (
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-sm">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-blue-600 mb-0.5 uppercase tracking-wide">Email</div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900 break-all">{selectedLeadForDetails.email}</div>
                    </div>
                  </div>
                  )}
                  {selectedLeadForDetails.phone && (
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 shadow-sm">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-green-600 mb-0.5 uppercase tracking-wide">Phone</div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900 break-all">{selectedLeadForDetails.phone}</div>
              </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200 shadow-sm">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-violet-600 mb-0.5 uppercase tracking-wide">Submitted</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">{formatDate(selectedLeadForDetails.created_at)}</div>
                    </div>
                  </div>
      </div>

                {/* Property/Location Information */}
                {selectedLeadForDetails.property_name && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-lg border-2 border-blue-300 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
            </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">Property</div>
                        <div className="text-sm font-bold text-gray-900 break-words">{selectedLeadForDetails.property_name}</div>
                        {selectedLeadForDetails.property_location && (
                          <div className="text-xs text-gray-600 mt-1 flex items-center gap-1 break-words">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span>{selectedLeadForDetails.property_location}</span>
                          </div>
                        )}
            </div>
          </div>
        </div>
      )}

                {selectedLeadForDetails.location_slug && !selectedLeadForDetails.property_name && (
                  <div className="p-4 bg-gradient-to-r from-gray-900 to-black rounded-lg border-2 border-gray-900 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center shadow-lg border-2 border-white flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
          </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white mb-1 uppercase tracking-wide">Location</div>
                        <div className="text-sm font-bold text-white break-words">{selectedLeadForDetails.property_location || selectedLeadForDetails.location_slug}</div>
    </div>
                    </div>
                  </div>
                )}

                {/* Email Error Warning */}
                {selectedLeadForDetails.email_sent === false && selectedLeadForDetails.email_error && (
                  <div className="p-4 bg-gradient-to-r from-red-50 via-rose-50 to-red-50 rounded-lg border-2 border-red-300 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <XCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-red-700 mb-1 uppercase tracking-wide">Email Delivery Failed</div>
                        <div className="text-xs text-red-800 leading-relaxed break-words">{selectedLeadForDetails.email_error}</div>
                    </div>
                  </div>
                </div>
                )}

                {/* Additional Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedLeadForDetails.form_source && (
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200 shadow-sm">
                      <div className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">Source</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">
                        {selectedLeadForDetails.form_source === 'location-page-footer-cta' 
                          ? 'Location Page Footer CTA'
                          : selectedLeadForDetails.form_source === 'property-page-footer-cta'
                          ? selectedLeadForDetails.property_name 
                            ? `Property Page Footer CTA - ${selectedLeadForDetails.property_name}`
                            : 'Property Page Footer CTA'
                          : selectedLeadForDetails.form_source.startsWith('property-brochure-download')
                          ? selectedLeadForDetails.property_name
                            ? `Brochure Download - ${selectedLeadForDetails.property_name}`
                            : selectedLeadForDetails.form_source.includes(':')
                            ? `Brochure Download - ${selectedLeadForDetails.form_source.split(':')[1]}`
                            : 'Brochure Download - Property'
                          : selectedLeadForDetails.form_source === 'homepage-footer-cta'
                          ? 'Homepage Footer CTA'
                          : selectedLeadForDetails.form_source === 'homepage'
                          ? 'Homepage Entry Form'
                          : selectedLeadForDetails.form_source === 'contact-page'
                          ? 'Contact Page'
                          : selectedLeadForDetails.form_source === 'advisory-session-page'
                          ? 'Advisory Session Page'
                          : selectedLeadForDetails.form_source === 'website-chatbot'
                          ? 'Website Chatbot'
                          : selectedLeadForDetails.form_source}
              </div>
                    </div>
        )}
                  {selectedLeadForDetails.email_sent && selectedLeadForDetails.email_sent_at && (
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200 shadow-sm">
                      <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wide">Email Sent</div>
                      <div className="text-xs sm:text-sm font-bold text-gray-900 break-words">{formatDate(selectedLeadForDetails.email_sent_at)}</div>
      </div>
                  )}
            </div>

                {/* Page URL */}
                {selectedLeadForDetails.page_url && (
                  <div className="p-3 sm:p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                    <div className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Page URL</div>
                    <a 
                      href={selectedLeadForDetails.page_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs sm:text-sm text-[#CBB27A] hover:text-[#B8A068] hover:underline break-all font-bold transition-colors"
              >
                      {selectedLeadForDetails.page_url}
                    </a>
            </div>
                )}

                {/* Admin Notes */}
                {selectedLeadForDetails.notes && (
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-lg border-2 border-amber-300 shadow-md">
                    <div className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide flex items-center gap-2">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      Admin Notes
          </div>
                    <div className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap leading-relaxed break-words">{selectedLeadForDetails.notes}</div>
        </div>
      )}

                {/* Form Data */}
                {Object.keys(selectedLeadForDetails.form_data || {}).length > 0 && (
                  <div className="bg-gradient-to-br from-[#CBB27A]/10 via-[#B8A068]/5 to-[#CBB27A]/10 rounded-lg p-3 sm:p-4 border-2 border-[#CBB27A]/40 shadow-md overflow-x-auto">
                    {formatFormData(selectedLeadForDetails.form_data, selectedLeadForDetails.form_type)}
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg w-[calc(100vw-2rem)] sm:w-full p-3 sm:p-6">
          <DialogHeader className="mb-2 sm:mb-4 pr-6 sm:pr-0">
            <DialogTitle className="text-sm sm:text-base md:text-lg break-words">
              Notes for {selectedLead?.first_name} {selectedLead?.last_name}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm mt-1">
              Add or edit notes for this lead
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes..."
            rows={5}
            className="w-full mt-2 sm:mt-4 text-sm sm:text-base resize-none min-h-[100px] sm:min-h-[150px]"
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 mt-3 sm:mt-6">
            <Button
              variant="outline"
              onClick={() => setNotesDialogOpen(false)}
              className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNotesSave}
              disabled={updatingLead === selectedLead?.id}
              className="bg-[#CBB27A] hover:bg-[#B8A068] w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
            >
              {updatingLead === selectedLead?.id ? (
                <>
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Notes"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
