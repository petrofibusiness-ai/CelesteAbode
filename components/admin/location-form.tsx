"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Blog, Location, LocationFormData, Locality, FAQ } from "@/types/location";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface LocationFormProps {
  location?: Location;
  onSuccess?: () => void;
}

export default function LocationForm({ location, onSuccess }: LocationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const csrfTokenRef = useRef<string | null>(null); // Ref for synchronous access

  const [formData, setFormData] = useState<LocationFormData>({
    slug: location?.slug || "",
    locationName: location?.locationName || "",
    heroImage: location?.heroImage || "",
    heroText: location?.heroText || "",
    heroSubtext: location?.heroSubtext || "",
    exploreSectionHeading: location?.exploreSectionHeading || "Explore Our Curated Collection",
    exploreSectionDescription: location?.exploreSectionDescription || "RERA-compliant projects with verified credentials and transparent documentation",
    localities: location?.localities || [],
    celesteAbodeImage: location?.celesteAbodeImage || location?.heroImage || "",
    faqs: location?.faqs || [],
    blogs: (location?.blogs && location.blogs.length > 0) ? location.blogs : [{ title: "", description: "" }],
    compareLocation1: location?.compareLocation1 ?? null,
    compareLocation2: location?.compareLocation2 ?? null,
    compareLocation3: location?.compareLocation3 ?? null,
    footerCtaHeading: location?.footerCtaHeading || "Ready to Find Your Home",
    footerCtaDescription: location?.footerCtaDescription || "",
    metaTitle: location?.metaTitle || "",
    metaDescription: location?.metaDescription || "",
    metaKeywords: location?.metaKeywords || [],
    ogImage: location?.ogImage || location?.heroImage || "",
    ogTitle: location?.ogTitle || location?.metaTitle || "",
    ogDescription: location?.ogDescription || location?.metaDescription || "",
    imageAltTexts: location?.imageAltTexts || {},
    isPublished: location?.isPublished || false,
  });

  const [tempFiles, setTempFiles] = useState<{
    hero?: File;
    celesteAbode?: File;
  }>({});

  const [previewUrls, setPreviewUrls] = useState<{
    hero?: string;
    celesteAbode?: string;
  }>({});

  const [newLocality, setNewLocality] = useState({ slug: "", name: "" });
  const [newMetaKeyword, setNewMetaKeyword] = useState("");
  const [compareLocationOptions, setCompareLocationOptions] = useState<Array<{ id: string; location_name: string; slug: string }>>([]);

  const heroInputRef = useRef<HTMLInputElement>(null);
  const celesteAbodeInputRef = useRef<HTMLInputElement>(null);

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
            csrfTokenRef.current = data.csrfToken; // Update ref synchronously
            // CSRF token fetched successfully
          }
        }
      } catch (err) {
        // CSRF token fetch failed - will retry on next request
      }
    };
    fetchCSRFToken();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      if (previewUrls.celesteAbode) URL.revokeObjectURL(previewUrls.celesteAbode);
    };
  }, [previewUrls]);

  // Fetch locations for Compare Locations dropdowns
  useEffect(() => {
    const fetchLocationsForCompare = async () => {
      try {
        const response = await fetch("/api/admin/locations/list", {
          credentials: "include",
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = await response.json();
        const list: Array<{ id: string; location_name: string; slug: string }> = Array.isArray(data) ? data : [];

        // Exclude current location itself in edit mode (DB constraint: compare locations must not match self)
        const filtered = location?.id ? list.filter((l) => l.id !== location.id) : list;
        setCompareLocationOptions(filtered);
      } catch (error) {
        // Non-blocking: compare dropdowns will just be empty
        console.error("Error fetching locations for compare:", error);
      }
    };

    fetchLocationsForCompare();
  }, [location?.id]);

  const handleChange = (field: keyof LocationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileSelect = (file: File, type: "hero" | "celeste-abode") => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === "hero") {
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      setTempFiles((prev) => ({ ...prev, hero: file }));
      setPreviewUrls((prev) => ({ ...prev, hero: previewUrl }));
      if (formData.heroImage && !formData.heroImage.startsWith("blob:")) {
        handleChange("heroImage", "");
      }
    } else {
      if (previewUrls.celesteAbode) URL.revokeObjectURL(previewUrls.celesteAbode);
      setTempFiles((prev) => ({ ...prev, celesteAbode: file }));
      setPreviewUrls((prev) => ({ ...prev, celesteAbode: previewUrl }));
      if (formData.celesteAbodeImage && !formData.celesteAbodeImage.startsWith("blob:")) {
        handleChange("celesteAbodeImage", "");
      }
    }

    toast.success(`${type === "hero" ? "Hero image" : "Celeste Abode image"} selected. It will be uploaded when you save.`);
  };

  const uploadFileToR2 = async (file: File, locationSlug: string, imageType: "hero" | "celeste-abode"): Promise<string> => {
    // Check if CSRF token is available (use ref for synchronous access)
    const token = csrfTokenRef.current || csrfToken;
    if (!token) {
      // Try to fetch token one more time
      try {
        const response = await fetch("/api/admin/auth/csrf", {
          credentials: 'include',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.csrfToken) {
            setCsrfToken(data.csrfToken);
            csrfTokenRef.current = data.csrfToken;
            // Retry upload with new token
            return uploadFileToR2(file, locationSlug, imageType);
          }
        }
      } catch (err) {
        // CSRF token fetch failed
      }
      return Promise.reject(new Error("CSRF token not available. Please refresh the page and try again."));
    }

    return new Promise((resolve, reject) => {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("locationSlug", locationSlug);
      uploadFormData.append("imageType", imageType);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploading(`${imageType} (${Math.round(percentComplete)}%)`);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response.url);
          } catch {
            reject(new Error("Invalid response from server"));
          }
        } else if (xhr.status === 401) {
          // Session expired - redirect to login
          toast.error("Your session has expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/admin/login";
          }, 2000);
          reject(new Error("Session expired. Please log in again."));
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData.error || `Upload failed with status ${xhr.status}`));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
      xhr.addEventListener("abort", () => reject(new Error("Upload was aborted")));

      xhr.open("POST", "/api/admin/upload/location-image");
      // Ensure credentials (cookies) are sent with the request
      xhr.withCredentials = true;
      
      // Get token from ref (synchronous) or state
      const tokenToUse = csrfTokenRef.current || csrfToken;
      
      // Add CSRF token header (should always be available at this point)
      if (!tokenToUse) {
        reject(new Error("CSRF token is missing. Please refresh the page."));
        return;
      }
      
      xhr.setRequestHeader("x-csrf-token", tokenToUse);
      // CSRF token included in request header
      
      xhr.send(uploadFormData);
    });
  };

  const addLocality = () => {
    if (!newLocality.slug.trim() || !newLocality.name.trim()) {
      toast.error("Please enter both slug and name for the locality");
      return;
    }
    
    // Normalize slug (lowercase, replace spaces with hyphens)
    const normalizedSlug = newLocality.slug.trim().toLowerCase().replace(/\s+/g, "-");
    
    // Check for duplicates by slug
    if (formData.localities.some(loc => loc.value === normalizedSlug)) {
      toast.error("A locality with this slug already exists");
      return;
    }

    handleChange("localities", [
      ...formData.localities,
      { value: normalizedSlug, label: newLocality.name.trim() }
    ]);
    setNewLocality({ slug: "", name: "" });
    toast.success("Locality added");
  };

  const removeLocality = (index: number) => {
    handleChange("localities", formData.localities.filter((_, i) => i !== index));
  };

  const addBlog = () => {
    handleChange("blogs", [...formData.blogs, { title: "", description: "" }]);
  };

  const updateBlog = (index: number, field: keyof Blog, value: string) => {
    const updated = [...formData.blogs];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("blogs", updated);
  };

  const removeBlog = (index: number) => {
    if (formData.blogs.length <= 1) return;
    handleChange("blogs", formData.blogs.filter((_, i) => i !== index));
  };

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: `faq-${Date.now()}`,
      question: "",
      answer: "",
    };
    handleChange("faqs", [...formData.faqs, newFAQ]);
  };

  const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...formData.faqs];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("faqs", updated);
  };

  const removeFAQ = (index: number) => {
    handleChange("faqs", formData.faqs.filter((_, i) => i !== index));
  };

  const addMetaKeyword = () => {
    if (!newMetaKeyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }
    
    // Check for duplicates
    if (formData.metaKeywords.includes(newMetaKeyword.trim().toLowerCase())) {
      toast.error("This keyword already exists");
      return;
    }

    handleChange("metaKeywords", [...formData.metaKeywords, newMetaKeyword.trim()]);
    setNewMetaKeyword("");
    toast.success("Keyword added");
  };

  const removeMetaKeyword = (index: number) => {
    handleChange("metaKeywords", formData.metaKeywords.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.locationName) newErrors.locationName = "Location name is required";
    if (!formData.heroImage && !tempFiles.hero) newErrors.heroImage = "Hero image is required";
    if (!formData.heroText) newErrors.heroText = "Hero text is required";
    if (!formData.heroSubtext) newErrors.heroSubtext = "Hero subtext is required";
    if (!formData.metaTitle) newErrors.metaTitle = "Meta title is required";
    if (!formData.metaDescription) newErrors.metaDescription = "Meta description is required";

    // Blogs validation
    if (!Array.isArray(formData.blogs) || formData.blogs.length === 0) {
      newErrors.blogs = "At least 1 blog is required";
    } else {
      formData.blogs.forEach((blog, index) => {
        if (!blog.title || blog.title.trim() === "") newErrors[`blogs.${index}.title`] = "Title is required";
        if (!blog.description || blog.description.trim() === "") newErrors[`blogs.${index}.description`] = "Description is required";
      });
    }

    // Compare locations validation (exactly 3 unique)
    const compareSelections = [
      formData.compareLocation1,
      formData.compareLocation2,
      formData.compareLocation3,
    ].filter((v): v is string => typeof v === "string" && v.trim() !== "");

    if (compareSelections.length !== 3) {
      newErrors.compareLocations = "Please select 3 locations to compare";
    } else {
      const unique = new Set(compareSelections);
      if (unique.size !== 3) {
        newErrors.compareLocations = "Compare locations must be 3 unique locations";
      }
      if (location?.id && compareSelections.includes(location.id)) {
        newErrors.compareLocations = "Compare locations cannot include the current location";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Upload images if needed
      let heroImageUrl = formData.heroImage;
      let celesteAbodeImageUrl = formData.celesteAbodeImage || formData.heroImage;

      if (tempFiles.hero) {
        setUploading("Uploading hero image...");
        heroImageUrl = await uploadFileToR2(tempFiles.hero, formData.slug, "hero");
        handleChange("heroImage", heroImageUrl);
      }

      if (tempFiles.celesteAbode) {
        setUploading("Uploading Celeste Abode image...");
        celesteAbodeImageUrl = await uploadFileToR2(tempFiles.celesteAbode, formData.slug, "celeste-abode");
        handleChange("celesteAbodeImage", celesteAbodeImageUrl);
      } else {
        // Always use hero image if Celeste Abode image is not explicitly set
        celesteAbodeImageUrl = formData.celesteAbodeImage || heroImageUrl;
        if (!formData.celesteAbodeImage) {
          handleChange("celesteAbodeImage", heroImageUrl);
        }
      }

      setUploading(null);

      // Prepare final data
      const submitData = {
        ...formData,
        heroImage: heroImageUrl,
        celesteAbodeImage: celesteAbodeImageUrl,
        ogImage: formData.ogImage || heroImageUrl,
        ogTitle: formData.ogTitle || formData.metaTitle,
        ogDescription: formData.ogDescription || formData.metaDescription,
      };

      const url = location ? `/api/admin/locations/${location.slug}` : "/api/admin/locations";
      const method = location ? "PUT" : "POST";

      // Get CSRF token from ref or state
      const tokenToUse = csrfTokenRef.current || csrfToken;
      if (!tokenToUse) {
        throw new Error("CSRF token not available. Please refresh the page and try again.");
      }

      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('x-csrf-token', tokenToUse);

      const response = await fetch(url, {
        method,
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save location");
      }

      toast.success(location ? "Location updated successfully!" : "Location created successfully!");
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/locations");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save location");
    } finally {
      setLoading(false);
      setUploading(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Basic Information</h2>
          
          <div>
            <Label htmlFor="slug" className="font-poppins">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="e.g., noida, greater-noida"
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              disabled={!!location}
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
          </div>

          <div>
            <Label htmlFor="locationName" className="font-poppins">Location Name *</Label>
            <Input
              id="locationName"
              value={formData.locationName}
              onChange={(e) => handleChange("locationName", e.target.value)}
              placeholder="e.g., Noida, Greater Noida"
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
            {errors.locationName && <p className="text-red-500 text-sm mt-1">{errors.locationName}</p>}
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Hero Section</h2>
          
          <div>
            <Label className="font-poppins">Hero Image *</Label>
            <div className="mt-2 space-y-4">
              {previewUrls.hero || formData.heroImage ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={previewUrls.hero || formData.heroImage}
                    alt="Hero preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
                      setTempFiles((prev) => ({ ...prev, hero: undefined }));
                      setPreviewUrls((prev) => ({ ...prev, hero: undefined }));
                      handleChange("heroImage", "");
                      if (heroInputRef.current) heroInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
              <input
                ref={heroInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file, "hero");
                }}
                className="hidden"
                id="hero-image"
              />
              <label
                htmlFor="hero-image"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#CBB27A] transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-poppins">Upload Hero Image</span>
              </label>
            </div>
            {errors.heroImage && <p className="text-red-500 text-sm mt-1">{errors.heroImage}</p>}
          </div>

          <div>
            <Label htmlFor="heroText" className="font-poppins">Hero Text *</Label>
            <Input
              id="heroText"
              value={formData.heroText}
              onChange={(e) => handleChange("heroText", e.target.value)}
              placeholder="e.g., Premium Properties in Noida"
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
            {errors.heroText && <p className="text-red-500 text-sm mt-1">{errors.heroText}</p>}
          </div>

          <div>
            <Label htmlFor="heroSubtext" className="font-poppins">Hero Subtext *</Label>
            <Textarea
              id="heroSubtext"
              value={formData.heroSubtext}
              onChange={(e) => handleChange("heroSubtext", e.target.value)}
              placeholder="e.g., Curated residential and investment opportunities..."
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              rows={3}
            />
            {errors.heroSubtext && <p className="text-red-500 text-sm mt-1">{errors.heroSubtext}</p>}
          </div>
        </section>

        {/* Explore Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Explore Section</h2>
          
          <div>
            <Label htmlFor="exploreSectionHeading" className="font-poppins">Heading</Label>
            <Input
              id="exploreSectionHeading"
              value={formData.exploreSectionHeading}
              onChange={(e) => handleChange("exploreSectionHeading", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="exploreSectionDescription" className="font-poppins">Description</Label>
            <Textarea
              id="exploreSectionDescription"
              value={formData.exploreSectionDescription}
              onChange={(e) => handleChange("exploreSectionDescription", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              rows={2}
            />
          </div>
        </section>

        {/* Localities */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Localities</h2>
          
          {/* Add New Locality Form */}
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="locality-slug" className="font-poppins">Locality Slug *</Label>
                <Input
                  id="locality-slug"
                  value={newLocality.slug}
                  onChange={(e) => setNewLocality({ ...newLocality, slug: e.target.value })}
                  placeholder="e.g., sector-62"
                  className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1 font-poppins">URL-friendly identifier (will be normalized to lowercase with hyphens)</p>
              </div>
              <div>
                <Label htmlFor="locality-name" className="font-poppins">Locality Name *</Label>
                <Input
                  id="locality-name"
                  value={newLocality.name}
                  onChange={(e) => setNewLocality({ ...newLocality, name: e.target.value })}
                  placeholder="e.g., Sector 62"
                  className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1 font-poppins">Display name shown in dropdown</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={addLocality}
                variant="outline"
                size="sm"
                className="font-poppins border-black hover:bg-black hover:text-white"
                disabled={!newLocality.slug.trim() || !newLocality.name.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Locality
              </Button>
            </div>
          </div>
          
          {/* Existing Localities */}
          <div className="space-y-3">
            {formData.localities.length > 0 && (
              <Label className="font-poppins text-sm font-semibold">Added Localities:</Label>
            )}
            {formData.localities.map((locality, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 font-poppins">{locality.label}</p>
                  <p className="text-xs text-gray-500 font-poppins">Slug: {locality.value}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => removeLocality(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {formData.localities.length === 0 && (
              <div className="flex justify-center items-center py-8">
                <p className="text-sm text-gray-500 font-poppins text-center">No localities added yet. Add one above.</p>
              </div>
            )}
          </div>
        </section>

        {/* Blogs */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">Blogs</h2>
              <p className="text-sm text-gray-600 font-poppins">
                Add short, location-specific blog snippets (title + description).
              </p>
            </div>
            <Button
              type="button"
              onClick={addBlog}
              variant="outline"
              size="sm"
              className="font-poppins border-black hover:bg-black hover:text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Blog
            </Button>
          </div>
          
          {errors.blogs && <p className="text-red-500 text-sm font-poppins">{errors.blogs}</p>}

          <div className="space-y-5">
            {formData.blogs.map((blog, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <Label className="font-poppins font-semibold">Blog {index + 1}</Label>
                  <Button
                    type="button"
                    onClick={() => removeBlog(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    disabled={formData.blogs.length <= 1}
                    title={formData.blogs.length <= 1 ? "At least 1 blog is required" : "Remove blog"}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-poppins">Title *</Label>
                    <Input
                      value={blog.title}
                      onChange={(e) => updateBlog(index, "title", e.target.value)}
                      placeholder="e.g., Why invest in Noida?"
                      className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                    />
                    {errors[`blogs.${index}.title`] && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors[`blogs.${index}.title`]}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label className="font-poppins">Description *</Label>
                    <Textarea
                      value={blog.description}
                      onChange={(e) => updateBlog(index, "description", e.target.value)}
                      placeholder="Short description..."
                      className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                      rows={3}
                    />
                    {errors[`blogs.${index}.description`] && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors[`blogs.${index}.description`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compare Locations */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins">Compare Locations</h2>
            <p className="text-sm text-gray-600 font-poppins">
              Select exactly 3 different locations to compare.
            </p>
          </div>

          {errors.compareLocations && (
            <p className="text-red-500 text-sm font-poppins">{errors.compareLocations}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="font-poppins">Compare Location 1 *</Label>
              <Select
                value={formData.compareLocation1 || ""}
                onValueChange={(val) => handleChange("compareLocation1", val || null)}
              >
                <SelectTrigger className="w-full font-poppins !border-black focus:!border-black focus:ring-black">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {compareLocationOptions
                    .filter((opt) => opt.id !== formData.compareLocation2 && opt.id !== formData.compareLocation3)
                    .map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.location_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-poppins">Compare Location 2 *</Label>
              <Select
                value={formData.compareLocation2 || ""}
                onValueChange={(val) => handleChange("compareLocation2", val || null)}
              >
                <SelectTrigger className="w-full font-poppins !border-black focus:!border-black focus:ring-black">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {compareLocationOptions
                    .filter((opt) => opt.id !== formData.compareLocation1 && opt.id !== formData.compareLocation3)
                    .map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.location_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-poppins">Compare Location 3 *</Label>
              <Select
                value={formData.compareLocation3 || ""}
                onValueChange={(val) => handleChange("compareLocation3", val || null)}
              >
                <SelectTrigger className="w-full font-poppins !border-black focus:!border-black focus:ring-black">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {compareLocationOptions
                    .filter((opt) => opt.id !== formData.compareLocation1 && opt.id !== formData.compareLocation2)
                    .map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.location_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Celeste Abode Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Celeste Abode Section</h2>
          
          <div>
            <Label className="font-poppins">Celeste Abode Image (defaults to hero image if not set)</Label>
            <div className="mt-2 space-y-4">
              {(previewUrls.celesteAbode || formData.celesteAbodeImage || previewUrls.hero || formData.heroImage) ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={previewUrls.celesteAbode || formData.celesteAbodeImage || previewUrls.hero || formData.heroImage}
                    alt="Celeste Abode preview"
                    className="w-full h-full object-cover"
                  />
                  {(previewUrls.celesteAbode || formData.celesteAbodeImage) && (
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrls.celesteAbode) URL.revokeObjectURL(previewUrls.celesteAbode);
                        setTempFiles((prev) => ({ ...prev, celesteAbode: undefined }));
                        setPreviewUrls((prev) => ({ ...prev, celesteAbode: undefined }));
                        handleChange("celesteAbodeImage", "");
                        if (celesteAbodeInputRef.current) celesteAbodeInputRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {!previewUrls.celesteAbode && !formData.celesteAbodeImage && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded text-sm font-poppins">
                      Using hero image
                    </div>
                  )}
                </div>
              ) : null}
              <input
                ref={celesteAbodeInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file, "celeste-abode");
                }}
                className="hidden"
                id="celeste-abode-image"
              />
              <label
                htmlFor="celeste-abode-image"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#CBB27A] transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-poppins">Upload Celeste Abode Image</span>
              </label>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins">FAQs</h2>
            <Button type="button" onClick={addFAQ} variant="outline" size="sm" className="font-poppins">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.faqs.map((faq, index) => (
              <div key={faq.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-poppins">FAQ {index + 1}</Label>
                  <Button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  placeholder="Question"
                  className="font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                />
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                  placeholder="Answer"
                  className="font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
                  rows={3}
                />
              </div>
            ))}
            {formData.faqs.length === 0 && (
              <p className="text-sm text-gray-500 font-poppins">No FAQs added yet.</p>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Footer CTA</h2>
          
          <div>
            <Label htmlFor="footerCtaHeading" className="font-poppins">Heading</Label>
            <Input
              id="footerCtaHeading"
              value={formData.footerCtaHeading}
              onChange={(e) => handleChange("footerCtaHeading", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="footerCtaDescription" className="font-poppins">Description</Label>
            <Textarea
              id="footerCtaDescription"
              value={formData.footerCtaDescription}
              onChange={(e) => handleChange("footerCtaDescription", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              rows={2}
            />
          </div>
        </section>

        {/* SEO */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">SEO Settings</h2>
          
          <div>
            <Label htmlFor="metaTitle" className="font-poppins">Meta Title *</Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
            {errors.metaTitle && <p className="text-red-500 text-sm mt-1">{errors.metaTitle}</p>}
          </div>

          <div>
            <Label htmlFor="metaDescription" className="font-poppins">Meta Description *</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              rows={3}
            />
            {errors.metaDescription && <p className="text-red-500 text-sm mt-1">{errors.metaDescription}</p>}
          </div>

          <div>
            <Label className="font-poppins mb-2 block">Meta Keywords</Label>
            {/* Add New Keyword Form */}
            <div className="mb-4 flex gap-2">
              <Input
                value={newMetaKeyword}
                onChange={(e) => setNewMetaKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMetaKeyword();
                  }
                }}
                placeholder="Enter keyword and press Enter or click Add"
                className="flex-1 font-poppins border-black focus:border-black focus:ring-black"
              />
              <Button
                type="button"
                onClick={addMetaKeyword}
                variant="outline"
                size="sm"
                className="font-poppins"
                disabled={!newMetaKeyword.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            {/* Existing Keywords */}
            {formData.metaKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.metaKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-poppins"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeMetaKeyword(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {formData.metaKeywords.length === 0 && (
              <p className="text-sm text-gray-500 font-poppins">No keywords added yet.</p>
            )}
          </div>

          <div>
            <Label htmlFor="ogImage" className="font-poppins">OG Image URL (defaults to hero image)</Label>
            <Input
              id="ogImage"
              value={formData.ogImage}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="ogTitle" className="font-poppins">OG Title (defaults to meta title)</Label>
            <Input
              id="ogTitle"
              value={formData.ogTitle}
              onChange={(e) => handleChange("ogTitle", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="ogDescription" className="font-poppins">OG Description (defaults to meta description)</Label>
            <Textarea
              id="ogDescription"
              value={formData.ogDescription}
              onChange={(e) => handleChange("ogDescription", e.target.value)}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="heroAltText" className="font-poppins">Hero Image Alt Text</Label>
            <Input
              id="heroAltText"
              value={formData.imageAltTexts?.hero || ""}
              onChange={(e) => handleChange("imageAltTexts", { ...formData.imageAltTexts, hero: e.target.value })}
              className="mt-1 font-poppins !border-black focus:!border-black focus:ring-black placeholder:text-gray-400"
            />
          </div>
        </section>

        {/* Publish */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3">
            <Checkbox
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => handleChange("isPublished", checked === true)}
              className="!border-black data-[state=checked]:!border-black"
            />
            <Label htmlFor="isPublished" className="font-poppins cursor-pointer">
              Publish this location page
            </Label>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={loading || !!uploading}
            className="bg-[#CBB27A] hover:bg-[#CBB27A]/90 text-white font-poppins"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {uploading || "Saving..."}
              </>
            ) : (
              location ? "Update Location" : "Create Location"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/locations")}
            className="font-poppins"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

