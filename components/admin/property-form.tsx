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
    amenities: property?.amenities || [],
    price: property?.price || "",
    seo: property?.seo || {},
    isPublished: property?.isPublished || false,
  });

  const [unitTypeInput, setUnitTypeInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

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

  const handleFileUpload = async (
    file: File,
    type: "hero" | "brochure" | "image" | "video"
  ) => {
    try {
      setUploading(type);
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      let endpoint = "";
      if (type === "brochure") {
        endpoint = "/api/admin/upload/pdf";
        uploadFormData.append("projectSlug", formData.slug || "temp");
      } else if (type === "image") {
        endpoint = "/api/admin/upload/image";
      } else if (type === "video") {
        endpoint = "/api/admin/upload/video";
      } else if (type === "hero") {
        endpoint = "/api/admin/upload/image";
        uploadFormData.append("folder", "celeste-abode/properties/heroes");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();

      if (type === "hero") {
        handleChange("heroImage", data.url);
      } else if (type === "brochure") {
        handleChange("brochureUrl", data.url);
      } else if (type === "image") {
        handleChange("images", [...formData.images, data.url]);
      } else if (type === "video") {
        // For videos, we need title and thumbnail
        const videoData = {
          title: file.name.replace(/\.[^/.]+$/, ""),
          src: data.url,
          thumbnail: data.url, // Cloudinary can generate thumbnails
        };
        handleChange("videos", [...(formData.videos || []), videoData]);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(null);
    }
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

  const addAmenity = () => {
    if (amenityInput.trim()) {
      handleChange("amenities", [...formData.amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (index: number) => {
    handleChange(
      "amenities",
      formData.amenities.filter((_, i) => i !== index)
    );
  };

  const removeImage = (index: number) => {
    handleChange(
      "images",
      formData.images.filter((_, i) => i !== index)
    );
  };

  const removeVideo = (index: number) => {
    handleChange(
      "videos",
      (formData.videos || []).filter((_, i) => i !== index)
    );
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
    if (!formData.heroImage) newErrors.heroImage = "Hero image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const url = property?.id
        ? `/api/admin/properties/${property.id}`
        : "/api/admin/properties";
      const method = property?.id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save property");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/properties");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                value={formData.possessionDate}
                onChange={(e) => handleChange("possessionDate", e.target.value)}
                placeholder="June 2027"
              />
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
          {formData.heroImage ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
              <img src={formData.heroImage} alt="Hero" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleChange("heroImage", "")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading === "hero" ? (
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "hero");
                }}
                disabled={uploading === "hero"}
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
          {formData.brochureUrl ? (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <FileText className="w-5 h-5 text-gray-600" />
              <a
                href={formData.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex-1"
              >
                View Brochure
              </a>
              <button
                type="button"
                onClick={() => handleChange("brochureUrl", "")}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading === "brochure" ? (
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                ) : (
                  <FileText className="w-8 h-8 text-gray-400" />
                )}
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload PDF</span>
                </p>
                <p className="text-xs text-gray-500">PDF (MAX. 20MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "brochure");
                }}
                disabled={uploading === "brochure"}
              />
            </label>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Gallery Images
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            {uploading === "image" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
            <span className="text-sm">Add Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "image");
              }}
              disabled={uploading === "image"}
            />
          </label>
        </div>

        {/* Videos */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Videos
          </Label>
          <div className="space-y-4 mb-4">
            {(formData.videos || []).map((video, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
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
                  onClick={() => removeVideo(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            {uploading === "video" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Video className="w-4 h-4" />
            )}
            <span className="text-sm">Add Video</span>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "video");
              }}
              disabled={uploading === "video"}
            />
          </label>
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Amenities
          </Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
              placeholder="e.g., Swimming Pool"
            />
            <Button type="button" onClick={addAmenity} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SEO Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            SEO Settings (Optional)
          </h2>
          <div className="space-y-4">
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
        <div className="flex items-center gap-2">
          <Checkbox
            id="isPublished"
            checked={formData.isPublished}
            onCheckedChange={(checked) => handleChange("isPublished", checked)}
          />
          <Label htmlFor="isPublished" className="text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
            Publish this property (make it visible on the website)
          </Label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#CBB27A] hover:bg-[#B8A068] text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Property"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/properties")}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

