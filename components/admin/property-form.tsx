"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Property, PropertyFormData } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, Plus, Loader2, Image as ImageIcon, Video, FileText } from "lucide-react";
import { toast } from "sonner";
import { AmenitiesMultiSelect } from "@/components/admin/amenities-multi-select";
import { normalizeAmenities } from "@/lib/amenity-normalize";

interface PropertyFormProps {
  property?: Property;
  onSuccess?: () => void;
}

export default function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<PropertyFormData>({
    slug: property?.slug || "",
    projectName: property?.projectName || "",
    developer: property?.developer || "",
    location: property?.location || "",
    reraId: property?.reraId || "",
    status: property?.status || "Under Construction",
    possessionDate: property?.possessionDate || "",
    unitTypes: property?.unitTypes || [],
    sizes: property?.sizes || "",
    description: property?.description || "",
    heroImage: property?.heroImage || "",
    brochureUrl: property?.brochureUrl || "",
    images: property?.images || [],
    videos: property?.videos || [],
    amenities: normalizeAmenities(property?.amenities),
    price: property?.price || "",
    seo: property?.seo || {},
    isPublished: property?.isPublished || false,
  });

  // Store files temporarily (not uploaded until submit)
  const [tempFiles, setTempFiles] = useState<{
    hero?: File;
    brochure?: File;
    images: File[];
    videos: File[];
  }>({
    images: [],
    videos: [],
  });

  // Preview URLs for temporary files
  const [previewUrls, setPreviewUrls] = useState<{
    hero?: string;
    brochure?: string;
    images: string[];
    videos: string[];
  }>({
    images: [],
    videos: [],
  });

  const [unitTypeInput, setUnitTypeInput] = useState("");

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      // Revoke object URLs to prevent memory leaks
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      if (previewUrls.brochure) URL.revokeObjectURL(previewUrls.brochure);
      previewUrls.images.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.videos.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleChange = (field: keyof PropertyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Store file temporarily (not uploaded until submit)
  const handleFileSelect = (
    file: File,
    type: "hero" | "brochure" | "image" | "video"
  ) => {
    // Validate file type
    if (type === "hero" || type === "image") {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
    } else if (type === "video") {
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a video file");
        return;
      }
      // Validate file size (50 MB limit)
      const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        toast.error("Video file is too large. Please select a video file smaller than 50 MB.", {
          description: `Your file is ${fileSizeMB} MB. Maximum allowed size is 50 MB.`,
          duration: 6000,
        });
        return;
      }
    } else if (type === "brochure") {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      // Validate file size (10 MB limit)
      const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
      if (file.size > maxSize) {
        toast.error("PDF file size must be less than 10 MB");
        return;
      }
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    if (type === "hero") {
      // Revoke old preview URL if exists
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      setTempFiles((prev) => ({ ...prev, hero: file }));
      setPreviewUrls((prev) => ({ ...prev, hero: previewUrl }));
      // Clear existing hero image URL if it was from a previous upload
      if (formData.heroImage && !formData.heroImage.startsWith("blob:")) {
        handleChange("heroImage", "");
      }
    } else if (type === "brochure") {
      if (previewUrls.brochure) URL.revokeObjectURL(previewUrls.brochure);
      setTempFiles((prev) => ({ ...prev, brochure: file }));
      setPreviewUrls((prev) => ({ ...prev, brochure: previewUrl }));
      if (formData.brochureUrl && !formData.brochureUrl.startsWith("blob:")) {
        handleChange("brochureUrl", "");
      }
    } else if (type === "image") {
      setTempFiles((prev) => ({ ...prev, images: [...prev.images, file] }));
      setPreviewUrls((prev) => ({ ...prev, images: [...prev.images, previewUrl] }));
    } else if (type === "video") {
      setTempFiles((prev) => ({ ...prev, videos: [...prev.videos, file] }));
      setPreviewUrls((prev) => ({ ...prev, videos: [...prev.videos, previewUrl] }));
    }

    toast.success(`${type === "hero" ? "Hero image" : type === "brochure" ? "Brochure" : type === "image" ? "Image" : "Video"} selected. It will be uploaded when you save the property.`);
  };

  // Remove temporary file
  const removeTempFile = (type: "hero" | "brochure" | "image" | "video", index?: number) => {
    if (type === "hero") {
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      setTempFiles((prev) => ({ ...prev, hero: undefined }));
      setPreviewUrls((prev) => ({ ...prev, hero: undefined }));
    } else if (type === "brochure") {
      if (previewUrls.brochure) URL.revokeObjectURL(previewUrls.brochure);
      setTempFiles((prev) => ({ ...prev, brochure: undefined }));
      setPreviewUrls((prev) => ({ ...prev, brochure: undefined }));
    } else if (type === "image" && index !== undefined) {
      URL.revokeObjectURL(previewUrls.images[index]);
      setTempFiles((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setPreviewUrls((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else if (type === "video" && index !== undefined) {
      URL.revokeObjectURL(previewUrls.videos[index]);
      setTempFiles((prev) => ({
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index),
      }));
      setPreviewUrls((prev) => ({
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index),
      }));
    }
  };

  // Upload a single file to R2
  const uploadFileToR2 = async (
    file: File,
    type: "hero" | "brochure" | "image" | "video",
    propertySlug: string
  ): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("propertySlug", propertySlug);

    let endpoint = "";
    if (type === "brochure") {
      endpoint = "/api/admin/upload/pdf";
    } else if (type === "image") {
      endpoint = "/api/admin/upload/image";
    } else if (type === "video") {
      endpoint = "/api/admin/upload/video";
    } else if (type === "hero") {
      endpoint = "/api/admin/upload/image";
      uploadFormData.append("isHero", "true");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      const errorMessage = errorData.error || `Upload failed with status ${response.status}`;
      console.error(`Upload failed for ${type}:`, errorMessage, `Property slug: ${propertySlug}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.url || data.url.trim() === "") {
      throw new Error("Upload succeeded but no URL returned");
    }
    console.log(`Upload successful for ${type}:`, data.url);
    return data.url;
  };

  const addUnitType = () => {
    if (unitTypeInput.trim()) {
      handleChange("unitTypes", [...formData.unitTypes, unitTypeInput.trim()]);
      setUnitTypeInput("");
    }
  };

  const removeUnitType = (index: number) => {
    handleChange(
      "unitTypes",
      formData.unitTypes.filter((_, i) => i !== index)
    );
  };

  const handleAmenitiesChange = (amenities: string[]) => {
    // Normalize amenities to ensure consistency
    const normalized = normalizeAmenities(amenities);
    handleChange("amenities", normalized);
  };

  const removeImage = (index: number, isTemp: boolean = false) => {
    if (isTemp) {
      removeTempFile("image", index);
    } else {
      handleChange(
        "images",
        formData.images.filter((_, i) => i !== index)
      );
    }
  };

  const removeVideo = (index: number, isTemp: boolean = false) => {
    if (isTemp) {
      removeTempFile("video", index);
    } else {
      handleChange(
        "videos",
        (formData.videos || []).filter((_, i) => i !== index)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.projectName) newErrors.projectName = "Project name is required";
    if (!formData.developer) newErrors.developer = "Developer is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description) newErrors.description = "Description is required";
    
    // Check if hero image exists (either from temp files or existing URL)
    if (!tempFiles.hero && !formData.heroImage) {
      newErrors.heroImage = "Hero image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Check if slug already exists (only for new properties, not edits)
    if (!property?.id && formData.slug) {
      try {
        const normalizedSlug = formData.slug.trim().toLowerCase();
        const checkResponse = await fetch(
          `/api/admin/properties/check-slug?slug=${encodeURIComponent(normalizedSlug)}`
        );

        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          if (!checkData.available) {
            const existingProperty = checkData.existingProperty;
            const errorMessage = existingProperty?.projectName
              ? `A property with this slug already exists: "${existingProperty.projectName}". Please choose a different slug.`
              : `A property with slug "${normalizedSlug}" already exists. Please choose a different slug.`;
            
            setErrors({ slug: errorMessage });
            toast.error(errorMessage, {
              duration: 6000,
            });
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error checking slug availability:", error);
        // Continue with submission if check fails (don't block user)
        // The server will catch duplicate slugs anyway
      }
    }

    try {
      const propertySlug = formData.slug || property?.slug;
      if (!propertySlug || propertySlug.trim() === "") {
        throw new Error("Property slug is required for file uploads. Please ensure the slug field is filled.");
      }
      const updatedFormData = { ...formData };
      const uploadErrors: string[] = [];
      
      console.log(`Starting upload process for property: ${propertySlug} (Edit mode: ${!!property?.id})`);

      // Step 1: Upload all temporary files to R2
      // Ensure all uploads complete successfully before proceeding
      setUploading("all");

      // Upload hero image (required)
      if (tempFiles.hero) {
        try {
          const heroUrl = await uploadFileToR2(tempFiles.hero, "hero", propertySlug);
          if (!heroUrl || heroUrl.trim() === "") {
            throw new Error("Hero image upload failed - no URL returned");
          }
          updatedFormData.heroImage = heroUrl;
        } catch (error) {
          const errorMsg = `Failed to upload hero image: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
        }
      } else if (!formData.heroImage) {
        // Hero image is required
        throw new Error("Hero image is required. Please upload a hero image.");
      }

      // Upload brochure (optional)
      if (tempFiles.brochure) {
        try {
          const brochureUrl = await uploadFileToR2(tempFiles.brochure, "brochure", propertySlug);
          if (!brochureUrl || brochureUrl.trim() === "") {
            throw new Error("Brochure upload failed - no URL returned");
          }
          updatedFormData.brochureUrl = brochureUrl;
        } catch (error) {
          const errorMsg = `Failed to upload brochure: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
          // Brochure is optional, so we continue even if it fails
        }
      }

      // Upload gallery images
      const imageUrls: string[] = [...formData.images]; // Keep existing images
      for (let i = 0; i < tempFiles.images.length; i++) {
        try {
          const imageUrl = await uploadFileToR2(tempFiles.images[i], "image", propertySlug);
          if (!imageUrl || imageUrl.trim() === "") {
            throw new Error(`Image ${i + 1} upload failed - no URL returned`);
          }
          imageUrls.push(imageUrl);
        } catch (error) {
          const errorMsg = `Failed to upload image ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
          // Continue with other images even if one fails
        }
      }
      updatedFormData.images = imageUrls;

      // Upload videos
      const videoData: Array<{ title: string; src: string; thumbnail: string }> = [...(formData.videos || [])]; // Keep existing videos
      for (let i = 0; i < tempFiles.videos.length; i++) {
        try {
          console.log(`Uploading video ${i + 1}/${tempFiles.videos.length}: ${tempFiles.videos[i].name} (${(tempFiles.videos[i].size / 1024 / 1024).toFixed(2)}MB)`);
          const videoUrl = await uploadFileToR2(tempFiles.videos[i], "video", propertySlug);
          if (!videoUrl || videoUrl.trim() === "") {
            throw new Error(`Video ${i + 1} upload failed - no URL returned`);
          }
          console.log(`Video ${i + 1} uploaded successfully: ${videoUrl}`);
          videoData.push({
            title: tempFiles.videos[i].name.replace(/\.[^/.]+$/, ""),
            src: videoUrl,
            thumbnail: updatedFormData.heroImage || formData.heroImage, // Use hero image as thumbnail
          });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Unknown error";
          uploadErrors.push(`Failed to upload video ${i + 1}: ${errorMsg}`);
          console.error(`Failed to upload video ${i + 1}:`, error);
          
          // Show user-friendly error message
          if (errorMsg.includes("too large") || errorMsg.includes("50 MB")) {
            toast.error(`Video file is too large. Maximum size is 50 MB.`, {
              duration: 5000,
            });
          } else {
            toast.error(`Video upload failed: ${tempFiles.videos[i].name}`, {
              description: errorMsg,
              duration: 5000,
            });
          }
          // Continue with other videos even if one fails
        }
      }
      updatedFormData.videos = videoData;
      
      // Log final video data for debugging
      console.log(`Final video data:`, videoData);

      // Step 2: Validate that critical uploads succeeded
      // If hero image upload failed and we don't have an existing one, abort
      if (!updatedFormData.heroImage || updatedFormData.heroImage.trim() === "") {
        throw new Error("Hero image is required. Upload failed or no image provided.");
      }

      // Step 3: If there were upload errors (but not critical ones), warn user
      // but allow save to proceed for optional assets
      if (uploadErrors.length > 0) {
        console.warn("Some optional assets failed to upload:", uploadErrors);
        // Non-critical errors (brochure, some images/videos) won't block the save
      }

      setUploading(null);

      // Step 4: Prepare data for Supabase
      // Ensure JSONB fields are properly formatted
      const propertyData = {
        ...updatedFormData,
        // Ensure arrays are never null/undefined
        unitTypes: updatedFormData.unitTypes || [],
        images: updatedFormData.images || [],
        videos: updatedFormData.videos || [],
        amenities: (updatedFormData.amenities || []).filter((a: string) => a && a.trim() !== ""),
        // Ensure SEO object is properly formatted
        seo: updatedFormData.seo || {},
        // Ensure boolean is set correctly
        isPublished: updatedFormData.isPublished === true,
      };

      // Step 5: Save property data to Supabase
      // Only proceed if we have all required data
      const url = property?.id
        ? `/api/admin/properties/${property.id}`
        : "/api/admin/properties";
      const method = property?.id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        const errorMessage = errorData.error || `Failed to save property (${response.status})`;
        
        // Handle duplicate slug error specifically
        if (response.status === 409 || errorMessage.includes("already exists")) {
          setErrors({ slug: errorMessage });
          toast.error(errorMessage, {
            duration: 6000,
          });
        } else {
          toast.error(errorMessage);
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Verify the property was saved successfully
      if (!result.property) {
        throw new Error("Property saved but no data returned. Please verify in the database.");
      }

      // Show final success message
      toast.success("Property saved successfully! All files have been uploaded.", {
        duration: 5000,
      });

      // Clean up temporary files and preview URLs
      if (previewUrls.hero) URL.revokeObjectURL(previewUrls.hero);
      if (previewUrls.brochure) URL.revokeObjectURL(previewUrls.brochure);
      previewUrls.images.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.videos.forEach((url) => URL.revokeObjectURL(url));

      // Clear all form fields after successful save (only for new properties, not edits)
      if (!property?.id) {
        setFormData({
          slug: "",
          projectName: "",
          developer: "",
          location: "",
          reraId: "",
          status: "Under Construction",
          possessionDate: "",
          unitTypes: [],
          sizes: "",
          description: "",
          heroImage: "",
          brochureUrl: "",
          images: [],
          videos: [],
          amenities: [],
          price: "",
          seo: {},
          isPublished: false,
        });
        setTempFiles({
          images: [],
          videos: [],
        });
        setPreviewUrls({
          images: [],
          videos: [],
        });
        setUnitTypeInput("");
      } else {
        // For edits, just clear temporary files
        setTempFiles({
          images: [],
          videos: [],
        });
        setPreviewUrls({
          images: [],
          videos: [],
        });
      }

      // Wait a bit before redirecting to show success message
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/admin/properties");
        }
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save property");
      setUploading(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="slug" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                URL Slug *
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                placeholder="forest-walk-villa"
                className={errors.slug ? "border-red-500" : ""}
                required
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              <p className="text-xs text-gray-500 mt-1">Used in URL: /projects/{formData.slug || "..."}</p>
            </div>

            <div>
              <Label htmlFor="projectName" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Project Name *
              </Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="FOREST WALK VILLA"
                className={errors.projectName ? "border-red-500" : ""}
                required
              />
              {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
            </div>

            <div>
              <Label htmlFor="developer" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Developer *
              </Label>
              <Input
                id="developer"
                value={formData.developer}
                onChange={(e) => handleChange("developer", e.target.value)}
                placeholder="Madhusudan Group / Yatharth Group"
                className={errors.developer ? "border-red-500" : ""}
                required
              />
              {errors.developer && <p className="text-red-500 text-sm mt-1">{errors.developer}</p>}
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="NH-24, Dasna, Ghaziabad"
                className={errors.location ? "border-red-500" : ""}
                required
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="reraId" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                RERA ID
              </Label>
              <Input
                id="reraId"
                value={formData.reraId}
                onChange={(e) => handleChange("reraId", e.target.value)}
                placeholder="UPRERAPRJ658961/08/2025"
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Status *
              </Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                placeholder="Under Construction"
                required
              />
            </div>

            <div>
              <Label htmlFor="possessionDate" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Possession Date
              </Label>
              <Input
                id="possessionDate"
                type="date"
                value={
                  formData.possessionDate
                    ? formData.possessionDate.match(/^\d{4}-\d{2}-\d{2}$/)
                      ? formData.possessionDate
                      : formData.possessionDate.match(/^\d{4}-\d{2}$/)
                      ? `${formData.possessionDate}-01`
                      : ''
                    : ''
                }
                onChange={(e) => {
                  const dateValue = e.target.value;
                  if (dateValue) {
                    // Store as YYYY-MM-DD format
                    handleChange("possessionDate", dateValue);
                  } else {
                    handleChange("possessionDate", "");
                  }
                }}
                className="cursor-pointer"
              />
              {formData.possessionDate && formData.possessionDate.match(/^\d{4}-\d{2}-\d{2}$/) && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {new Date(formData.possessionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sizes" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Sizes *
              </Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => handleChange("sizes", e.target.value)}
                placeholder="163 sq. yd - 238 sq. yd (3,070 sq.ft - 4,200 sq.ft)"
                required
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Price Range
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="₹2.5 Cr - ₹4 Cr"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
            Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter property description..."
            rows={6}
            className={errors.description ? "border-red-500" : ""}
            required
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Unit Types */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Unit Types
          </Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={unitTypeInput}
              onChange={(e) => setUnitTypeInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addUnitType())}
              placeholder="e.g., 4 BHK + 5T Villas"
            />
            <Button type="button" onClick={addUnitType} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.unitTypes.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
              >
                {type}
                <button
                  type="button"
                  onClick={() => removeUnitType(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Hero Image *
          </Label>
          {previewUrls.hero || formData.heroImage ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={previewUrls.hero || formData.heroImage} 
                alt="Hero" 
                className="w-full h-full object-cover" 
              />
              <button
                type="button"
                onClick={() => {
                  if (previewUrls.hero) {
                    removeTempFile("hero");
                  } else {
                    handleChange("heroImage", "");
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
              {previewUrls.hero && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Will upload on save
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
                <p className="text-xs text-gray-400 mt-1">File will be uploaded when you save</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file, "hero");
                }}
                disabled={loading || uploading === "all"}
              />
            </label>
          )}
          {errors.heroImage && <p className="text-red-500 text-sm mt-1">{errors.heroImage}</p>}
        </div>

        {/* Brochure */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Brochure PDF
          </Label>
          {previewUrls.brochure || formData.brochureUrl ? (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <FileText className="w-5 h-5 text-gray-600" />
              {previewUrls.brochure ? (
                <span className="text-sm text-gray-700 flex-1">
                  {tempFiles.brochure?.name} ({(tempFiles.brochure ? (tempFiles.brochure.size / 1024 / 1024).toFixed(2) : "0")} MB)
                </span>
              ) : (
                <a
                  href={formData.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex-1"
                >
                  View Brochure
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  if (previewUrls.brochure) {
                    removeTempFile("brochure");
                  } else {
                    handleChange("brochureUrl", "");
                  }
                }}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileText className="w-8 h-8 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload PDF (max. 10mb)</span>
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file, "brochure");
                }}
                disabled={loading || uploading === "all"}
              />
            </label>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Gallery Images
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
            {/* Existing uploaded images */}
            {formData.images.map((img, index) => (
              <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index, false)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Temporary images (preview) */}
            {previewUrls.images.map((previewUrl, index) => (
              <div key={`temp-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 border-dashed">
                <img src={previewUrl} alt={`New ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index, true)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                  New
                </div>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">Add Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, "image");
              }}
              disabled={loading || uploading === "all"}
            />
          </label>
          <p className="text-xs text-gray-400 mt-1">Images will be uploaded when you save the property</p>
        </div>

        {/* Videos */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Videos
          </Label>
          <div className="space-y-4 mb-4">
            {/* Existing uploaded videos */}
            {(formData.videos || []).map((video, index) => (
              <div key={`existing-video-${index}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Video className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{video.title}</p>
                  <a
                    href={video.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Video
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(index, false)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Temporary videos (preview) */}
            {previewUrls.videos.map((previewUrl, index) => (
              <div key={`temp-video-${index}`} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200 border-dashed">
                <Video className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{tempFiles.videos[index]?.name || `Video ${index + 1}`}</p>
                  <p className="text-xs text-blue-600">Will upload on save</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(index, true)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <Video className="w-4 h-4" />
            <span className="text-sm">Add Video</span>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, "video");
              }}
              disabled={loading || uploading === "all"}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">MP4, MOV, WEBM (MAX. 50MB)</p>
        </div>

        {/* Amenities */}
        <div>
          <AmenitiesMultiSelect
            selectedAmenities={formData.amenities || []}
            onSelectionChange={handleAmenitiesChange}
            disabled={loading || uploading === "all"}
          />
          <p className="text-xs text-gray-500 mt-2">
            Select amenities from the predefined list. Selected amenities will be displayed with their corresponding icons on the property page.
          </p>
        </div>

        {/* SEO Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            SEO Settings (Optional)
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="seoTitle" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Title
              </Label>
              <Input
                id="seoTitle"
                value={formData.seo?.title || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, title: e.target.value })}
                placeholder="Custom SEO title (defaults to project name)"
              />
            </div>
            <div>
              <Label htmlFor="seoDescription" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Description
              </Label>
              <Textarea
                id="seoDescription"
                value={formData.seo?.description || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, description: e.target.value })}
                placeholder="Custom SEO description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="seoKeywords" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Keywords (comma-separated)
              </Label>
              <Input
                id="seoKeywords"
                value={formData.seo?.keywords || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, keywords: e.target.value })}
                placeholder="luxury villa, noida, residential property"
              />
            </div>
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 p-4 border-2 border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <Checkbox
            id="isPublished"
            checked={formData.isPublished}
            onCheckedChange={(checked) => handleChange("isPublished", checked)}
            className="border-2 border-gray-500 data-[state=checked]:border-[#CBB27A]"
          />
          <Label htmlFor="isPublished" className="text-gray-700 font-medium cursor-pointer" style={{ fontFamily: "Poppins, sans-serif" }}>
            Publish this property (make it visible on the website)
          </Label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading || uploading === "all"}
            className="w-full sm:w-auto bg-[#CBB27A] hover:bg-[#B8A068] text-white text-sm sm:text-base"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {loading || uploading === "all" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {uploading === "all" ? "Uploading files..." : "Saving..."}
              </>
            ) : (
              "Save Property"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/properties")}
            className="w-full sm:w-auto text-sm sm:text-base"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

