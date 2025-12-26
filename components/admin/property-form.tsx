"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { UploadProgressOverlay } from "@/components/admin/upload-progress-overlay";

interface PropertyFormProps {
  property?: Property;
  onSuccess?: () => void;
}

export default function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Progress overlay state
  const [showProgressOverlay, setShowProgressOverlay] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"uploading" | "processing" | "success" | "error">("uploading");
  const [uploadStatusText, setUploadStatusText] = useState<string>("");
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string>("");
  const [isTerminalState, setIsTerminalState] = useState(false); // Prevent state updates after success/error
  
  // Use ref to track terminal state synchronously (prevents race conditions with late callbacks)
  const terminalStateRef = useRef(false);
  const uploadStatusRef = useRef<"uploading" | "processing" | "success" | "error">("uploading");
  
  // Sync refs with state
  useEffect(() => {
    terminalStateRef.current = isTerminalState;
  }, [isTerminalState]);
  
  useEffect(() => {
    uploadStatusRef.current = uploadStatus;
  }, [uploadStatus]);
  
  // Helper function to safely update status text (prevents updates after success/error)
  // Uses refs for synchronous checks to prevent race conditions with late XMLHttpRequest callbacks
  const safeSetStatusText = useCallback((text: string) => {
    // Check refs synchronously (not state) to prevent race conditions
    if (terminalStateRef.current || uploadStatusRef.current === "success" || uploadStatusRef.current === "error") {
      return; // Silently ignore - we're in a terminal state
    }
    setUploadStatusText(text);
  }, []);

  const [formData, setFormData] = useState<PropertyFormData>({
    slug: property?.slug || "",
    projectName: property?.projectName || "",
    developer: property?.developer || "",
    location: property?.location || "",
    locationCategory: property?.locationCategory || null,
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

  // Refs for file inputs to reset them after selection
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

    // Only show toast for single file selections (hero, brochure)
    // Multiple files (images, videos) will show their own toast
    if (type === "hero" || type === "brochure") {
      toast.success(`${type === "hero" ? "Hero image" : "Brochure"} selected. It will be uploaded when you save the property.`);
    }
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

  // Upload a single file to R2 with progress tracking
  const uploadFileToR2 = async (
    file: File,
    type: "hero" | "brochure" | "image" | "video",
    propertySlug: string,
    onProgress?: (bytesUploaded: number, totalBytes: number) => void
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
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

      const xhr = new XMLHttpRequest();
      let isCompleted = false; // Guard to prevent late callbacks

      // Track upload progress - report cumulative bytes uploaded for this file
      xhr.upload.addEventListener("progress", (e) => {
        // Prevent progress updates after completion (guard against late callbacks)
        if (isCompleted || !e.lengthComputable || !onProgress) return;
        
        // e.loaded is cumulative bytes uploaded for this file
        // e.total is total bytes for this file
        onProgress(e.loaded, e.total);
      });

      // Handle completion
      xhr.addEventListener("load", () => {
        isCompleted = true; // Mark as completed to block any late progress callbacks
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (!data.url || data.url.trim() === "") {
              reject(new Error("Upload succeeded but no URL returned"));
              return;
            }
            console.log(`Upload successful for ${type}:`, data.url);
            resolve(data.url);
          } catch (error) {
            reject(new Error("Failed to parse upload response"));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            const errorMessage = errorData.error || `Upload failed with status ${xhr.status}`;
            console.error(`Upload failed for ${type}:`, errorMessage, `Property slug: ${propertySlug}`);
            reject(new Error(errorMessage));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      // Handle errors
      xhr.addEventListener("error", () => {
        isCompleted = true; // Mark as completed
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("abort", () => {
        isCompleted = true; // Mark as completed
        reject(new Error("Upload was aborted"));
      });

      // Start upload
      xhr.open("POST", endpoint);
      xhr.send(uploadFormData);
    });
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

    // ===== PHASE 1: VALIDATION (0-30%) =====
    // Always show progress overlay immediately on Save click
    setIsTerminalState(false);
    setShowProgressOverlay(true);
    setUploadProgress(0);
    setUploadStatus("processing");
    safeSetStatusText("Validating inputs...");
    setUploadErrorMessage("");

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

    // Update progress: 10% after basic validation
    setUploadProgress(10);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      terminalStateRef.current = true;
      uploadStatusRef.current = "error";
      setIsTerminalState(true);
      setUploadStatus("error");
      setUploadErrorMessage("Please fix the validation errors above.");
      setLoading(false);
      return;
    }

    // Check if slug already exists (only for new properties, not edits)
    setUploadProgress(20);
    if (!property?.id && formData.slug) {
      try {
        const normalizedSlug = formData.slug.trim().toLowerCase();
        safeSetStatusText("Checking slug availability...");
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
            terminalStateRef.current = true;
            uploadStatusRef.current = "error";
            setIsTerminalState(true);
            setUploadStatus("error");
            setUploadErrorMessage(errorMessage);
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

    // Validation complete: 30%
    setUploadProgress(30);

    try {
      const propertySlug = formData.slug || property?.slug;
      if (!propertySlug || propertySlug.trim() === "") {
        setIsTerminalState(true);
        setUploadStatus("error");
        setUploadErrorMessage("Property slug is required. Please ensure the slug field is filled.");
        setLoading(false);
        throw new Error("Property slug is required for file uploads. Please ensure the slug field is filled.");
      }
      const updatedFormData = { ...formData };
      const uploadErrors: string[] = [];
      
      console.log(`Starting save process for property: ${propertySlug} (Edit mode: ${!!property?.id})`);

      // Calculate files to upload and files deleted
      const filesToUpload: Array<{ file: File; type: "hero" | "brochure" | "image" | "video" }> = [];
      if (tempFiles.hero) filesToUpload.push({ file: tempFiles.hero, type: "hero" });
      if (tempFiles.brochure) filesToUpload.push({ file: tempFiles.brochure, type: "brochure" });
      tempFiles.images.forEach(file => filesToUpload.push({ file, type: "image" }));
      tempFiles.videos.forEach(file => filesToUpload.push({ file, type: "video" }));
      
      const totalFiles = filesToUpload.length;
      const totalBytes = filesToUpload.reduce((sum, item) => sum + item.file.size, 0);

      // Detect deleted files (compare original property with current formData)
      const deletedImages: string[] = [];
      const deletedVideos: Array<{ src: string }> = [];
      if (property?.id) {
        // Compare existing images with current formData.images
        const originalImages = property.images || [];
        const currentImages = formData.images || [];
        deletedImages.push(...originalImages.filter(img => !currentImages.includes(img)));
        
        // Compare existing videos with current formData.videos
        const originalVideos = property.videos || [];
        const currentVideos = formData.videos || [];
        deletedVideos.push(...originalVideos.filter((v: { src: string }) => !currentVideos.some((cv: { src: string }) => cv.src === v.src)));
      }

      const hasDeletions = deletedImages.length > 0 || deletedVideos.length > 0;
      const hasUploads = totalFiles > 0;

      // Progress allocation:
      // - Validation: 0-30% (already done)
      // - Uploads: 30-80% (if files to upload, otherwise skip)
      // - Deletions: 80-90% (if files deleted, otherwise skip)
      // - Save: 90-100%

      const uploadProgressStart = 30;
      const uploadProgressEnd = hasUploads ? 80 : 30;
      const deletionProgressStart = uploadProgressEnd;
      const deletionProgressEnd = hasDeletions ? 90 : uploadProgressEnd;
      const saveProgressStart = deletionProgressEnd;
      const saveProgressEnd = 100;
      
      // Store these in variables accessible throughout the function
      const progressRanges = {
        uploadStart: uploadProgressStart,
        uploadEnd: uploadProgressEnd,
        deletionStart: deletionProgressStart,
        deletionEnd: deletionProgressEnd,
        saveStart: saveProgressStart,
        saveEnd: saveProgressEnd,
      };

      setUploading("all");

      // ===== PHASE 2: FILE UPLOADS (30-80%) =====
      if (hasUploads) {
        setUploadStatus("uploading");
        safeSetStatusText("Preparing uploads...");

      // Track progress based on actual bytes uploaded
      // Track bytes uploaded per file (file index -> bytes uploaded)
      const fileProgressMap = new Map<number, number>();
      let fileIndex = 0;
      
      const updateOverallProgress = (fileBytesUploaded: number, fileTotalBytes: number, currentFileIndex: number) => {
        // Prevent updates if we're in terminal state (critical guard)
        if (isTerminalState || totalBytes === 0) return;
        
        // Store progress for this file (clamp to file size to prevent over-counting)
        const clampedBytes = Math.min(fileBytesUploaded, fileTotalBytes);
        fileProgressMap.set(currentFileIndex, clampedBytes);
        
        // Calculate total bytes uploaded across all files
        let totalBytesUploaded = 0;
        fileProgressMap.forEach((bytes) => {
          totalBytesUploaded += bytes;
        });
        
        // Calculate upload progress (0-100% of upload phase)
        const uploadPhaseProgress = Math.min((totalBytesUploaded / totalBytes) * 100, 100);
        
        // Map upload progress to overall progress range (30-80%)
        const overallProgress = progressRanges.uploadStart + (uploadPhaseProgress / 100) * (progressRanges.uploadEnd - progressRanges.uploadStart);
        
        // Only update if progress actually increased (prevent flicker from late callbacks)
        setUploadProgress((prev) => {
          // Only update if new progress is greater (monotonic increase)
          return overallProgress > prev ? overallProgress : prev;
        });
      };

      // Upload hero image (required)
      if (tempFiles.hero) {
        const currentFileIndex = fileIndex++;
        const heroFile = tempFiles.hero;
        try {
          if (!isTerminalState) {
            safeSetStatusText("Uploading hero image...");
          }
          const heroUrl = await uploadFileToR2(
            heroFile, 
            "hero", 
            propertySlug,
            (bytesUploaded, totalBytes) => {
              // Guard against terminal state in callback
              if (!isTerminalState) {
                updateOverallProgress(bytesUploaded, totalBytes, currentFileIndex);
              }
            }
          );
          if (!heroUrl || heroUrl.trim() === "") {
            throw new Error("Hero image upload failed - no URL returned");
          }
          updatedFormData.heroImage = heroUrl;
          // Mark file as fully uploaded (only if not in terminal state)
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, heroFile.size);
            updateOverallProgress(heroFile.size, heroFile.size, currentFileIndex);
          }
        } catch (error) {
          const errorMsg = `Failed to upload hero image: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
          // Even on error, count the file as processed (but don't update progress if terminal)
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, heroFile.size);
            updateOverallProgress(heroFile.size, heroFile.size, currentFileIndex);
          }
        }
      } else if (!formData.heroImage) {
        // Hero image is required
        terminalStateRef.current = true;
        uploadStatusRef.current = "error";
        setIsTerminalState(true);
        setShowProgressOverlay(false);
        throw new Error("Hero image is required. Please upload a hero image.");
      }

      // Upload brochure (optional)
      if (tempFiles.brochure) {
        const currentFileIndex = fileIndex++;
        const brochureFile = tempFiles.brochure;
        try {
          if (!isTerminalState) {
            safeSetStatusText("Uploading brochure...");
          }
          const brochureUrl = await uploadFileToR2(
            brochureFile, 
            "brochure", 
            propertySlug,
            (bytesUploaded, totalBytes) => {
              // Guard against terminal state in callback
              if (!isTerminalState) {
                updateOverallProgress(bytesUploaded, totalBytes, currentFileIndex);
              }
            }
          );
          if (!brochureUrl || brochureUrl.trim() === "") {
            throw new Error("Brochure upload failed - no URL returned");
          }
          updatedFormData.brochureUrl = brochureUrl;
          // Mark file as fully uploaded (only if not in terminal state)
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, brochureFile.size);
            updateOverallProgress(brochureFile.size, brochureFile.size, currentFileIndex);
          }
        } catch (error) {
          const errorMsg = `Failed to upload brochure: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
          // Even on error, count the file as processed
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, brochureFile.size);
            updateOverallProgress(brochureFile.size, brochureFile.size, currentFileIndex);
          }
          // Brochure is optional, so we continue even if it fails
        }
      }

      // Upload gallery images
      const imageUrls: string[] = [...formData.images]; // Keep existing images
      for (let i = 0; i < tempFiles.images.length; i++) {
        const currentImage = tempFiles.images[i];
        const currentFileIndex = fileIndex++;
        try {
          if (!isTerminalState) {
            safeSetStatusText(`Uploading image ${i + 1} of ${tempFiles.images.length}...`);
          }
          const imageUrl = await uploadFileToR2(
            currentImage, 
            "image", 
            propertySlug,
            (bytesUploaded, totalBytes) => {
              if (!isTerminalState) {
                updateOverallProgress(bytesUploaded, totalBytes, currentFileIndex);
              }
            }
          );
          if (!imageUrl || imageUrl.trim() === "") {
            throw new Error(`Image ${i + 1} upload failed - no URL returned`);
          }
          imageUrls.push(imageUrl);
          // Mark file as fully uploaded
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, currentImage.size);
            updateOverallProgress(currentImage.size, currentImage.size, currentFileIndex);
          }
        } catch (error) {
          const errorMsg = `Failed to upload image ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`;
          uploadErrors.push(errorMsg);
          console.error(errorMsg, error);
          // Even on error, count the file as processed
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, tempFiles.images[i].size);
            updateOverallProgress(tempFiles.images[i].size, tempFiles.images[i].size, currentFileIndex);
          }
          // Continue with other images even if one fails
        }
      }
      updatedFormData.images = imageUrls;

      // Upload videos
      const videoData: Array<{ title: string; src: string; thumbnail: string }> = [...(formData.videos || [])]; // Keep existing videos
      for (let i = 0; i < tempFiles.videos.length; i++) {
        const currentVideo = tempFiles.videos[i];
        const currentFileIndex = fileIndex++;
        try {
          if (!isTerminalState) {
            safeSetStatusText(`Uploading video ${i + 1} of ${tempFiles.videos.length}...`);
          }
          console.log(`Uploading video ${i + 1}/${tempFiles.videos.length}: ${currentVideo.name} (${(currentVideo.size / 1024 / 1024).toFixed(2)}MB)`);
          const videoUrl = await uploadFileToR2(
            currentVideo, 
            "video", 
            propertySlug,
            (bytesUploaded, totalBytes) => {
              if (!isTerminalState) {
                updateOverallProgress(bytesUploaded, totalBytes, currentFileIndex);
              }
            }
          );
          if (!videoUrl || videoUrl.trim() === "") {
            throw new Error(`Video ${i + 1} upload failed - no URL returned`);
          }
          console.log(`Video ${i + 1} uploaded successfully: ${videoUrl}`);
          videoData.push({
            title: currentVideo.name.replace(/\.[^/.]+$/, ""),
            src: videoUrl,
            thumbnail: updatedFormData.heroImage || formData.heroImage, // Use hero image as thumbnail
          });
          // Mark file as fully uploaded
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, currentVideo.size);
            updateOverallProgress(currentVideo.size, currentVideo.size, currentFileIndex);
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Unknown error";
          uploadErrors.push(`Failed to upload video ${i + 1}: ${errorMsg}`);
          console.error(`Failed to upload video ${i + 1}:`, error);
          // Even on error, count the file as processed
          if (!isTerminalState) {
            fileProgressMap.set(currentFileIndex, tempFiles.videos[i].size);
            updateOverallProgress(tempFiles.videos[i].size, tempFiles.videos[i].size, currentFileIndex);
          }
          
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
        terminalStateRef.current = true;
        uploadStatusRef.current = "error";
        setIsTerminalState(true);
        setUploadStatus("error");
        setUploadErrorMessage("Hero image is required. Upload failed or no image provided.");
        setUploading(null);
        return;
      }

      // Step 3: If there were upload errors (but not critical ones), warn user
      // but allow save to proceed for optional assets
      if (uploadErrors.length > 0) {
        console.warn("Some optional assets failed to upload:", uploadErrors);
        // Non-critical errors (brochure, some images/videos) won't block the save
      }

        // Mark all uploads as complete
        terminalStateRef.current = true; // Set ref FIRST (synchronous) to block late callbacks
        setIsTerminalState(true); // Set terminal state FIRST to block any late callbacks
        // Ensure progress is at upload end (80%)
        setUploadProgress(progressRanges.uploadEnd);
      }

      setUploading(null);

      // ===== PHASE 3: FILE DELETIONS (80-90%) =====
      if (hasDeletions) {
        setIsTerminalState(false); // Allow progress updates for deletions
        setUploadStatus("processing");
        safeSetStatusText("Removing deleted assets...");
        
        // Simulate deletion progress (since R2 deletion is typically fast)
        // In a real implementation, you might want to call an API to delete from R2
        const totalDeletions = deletedImages.length + deletedVideos.length;
        let completedDeletions = 0;
        
        // Process deletions with progress updates
        for (let i = 0; i < deletedImages.length; i++) {
          // In a real implementation, call API to delete image from R2
          // await deleteImageFromR2(deletedImages[i]);
          completedDeletions++;
          const deletionProgress = progressRanges.deletionStart + 
            (completedDeletions / totalDeletions) * (progressRanges.deletionEnd - progressRanges.deletionStart);
          setUploadProgress(deletionProgress);
          await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for visual feedback
        }
        
        for (let i = 0; i < deletedVideos.length; i++) {
          // In a real implementation, call API to delete video from R2
          // await deleteVideoFromR2(deletedVideos[i]);
          completedDeletions++;
          const deletionProgress = progressRanges.deletionStart + 
            (completedDeletions / totalDeletions) * (progressRanges.deletionEnd - progressRanges.deletionStart);
          setUploadProgress(deletionProgress);
          await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for visual feedback
        }
        
        setUploadProgress(progressRanges.deletionEnd);
      }

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

      // ===== PHASE 4: SAVE TO DATABASE (90-100%) =====
      setIsTerminalState(false); // Allow progress updates for save phase
      setUploadStatus("processing");
      safeSetStatusText("Saving property data...");
      setUploadProgress(progressRanges.saveStart);
      
      const url = property?.id
        ? `/api/admin/properties/${property.id}`
        : "/api/admin/properties";
      const method = property?.id ? "PATCH" : "POST";

      // Update progress during save (90-95%)
      setUploadProgress(progressRanges.saveStart + (progressRanges.saveEnd - progressRanges.saveStart) * 0.5);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      // Update progress after save completes (95-100%)
      setUploadProgress(progressRanges.saveStart + (progressRanges.saveEnd - progressRanges.saveStart) * 0.9);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        const errorMessage = errorData.error || `Failed to save property (${response.status})`;
        
        // Show error in overlay and set terminal state
        terminalStateRef.current = true;
        uploadStatusRef.current = "error";
        setIsTerminalState(true); // Set terminal state to prevent any further updates
        setUploadStatus("error");
        setUploadErrorMessage(errorMessage);
        
        // Handle duplicate slug error specifically
        if (response.status === 409 || errorMessage.includes("already exists")) {
          setErrors({ slug: errorMessage });
          toast.error(errorMessage, {
            duration: 6000,
          });
        } else {
          toast.error(errorMessage);
        }
        
        setLoading(false);
        setUploading(null);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Verify the property was saved successfully
      if (!result.property) {
        throw new Error("Property saved but no data returned. Please verify in the database.");
      }

      // CRITICAL: Close overlay IMMEDIATELY and redirect INSTANTLY to prevent any flash
      // Update refs FIRST (synchronously) to block any late callbacks immediately
      terminalStateRef.current = true; // Set ref FIRST (synchronous) to block all further updates
      uploadStatusRef.current = "success"; // Set ref to success state
      
      // Close overlay immediately (no delay, no flash)
      setShowProgressOverlay(false);
      setIsTerminalState(true);
      
      // Show final success message
      toast.success("Property saved successfully! All files have been uploaded.", {
        duration: 3000,
      });

      // Clean up temporary files and preview URLs (do this quickly)
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

      // Redirect IMMEDIATELY (no delay, no flash)
      setLoading(false);
      setUploading(null);
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/properties");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save property";
      
      // Show error in overlay if it was open and set terminal state
      if (showProgressOverlay) {
        terminalStateRef.current = true;
        uploadStatusRef.current = "error";
        setIsTerminalState(true); // Mark as terminal state BEFORE updating UI
        setUploadStatus("error");
        setUploadErrorMessage(errorMessage);
      } else {
        toast.error(errorMessage);
      }
      
      setUploading(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOverlay = () => {
    terminalStateRef.current = true;
    setIsTerminalState(true); // Ensure terminal state is set when closing
    setShowProgressOverlay(false);
    setUploadProgress(0);
    setUploadStatus("uploading");
    setUploadStatusText("");
    setUploadErrorMessage("");
  };

  return (
    <>
      <UploadProgressOverlay
        isOpen={showProgressOverlay}
        progress={uploadProgress}
        status={uploadStatus}
        statusText={uploadStatusText}
        errorMessage={uploadErrorMessage}
        onClose={handleCloseOverlay}
      />
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Basic Information Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
              Basic Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="slug" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                URL Slug *
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                placeholder="e.g., forest-walk-villa"
                className={`h-11 border-2 placeholder:text-gray-400 ${errors.slug ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"} rounded-xl transition-all`}
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.slug && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {errors.slug}
              </p>}
              <p className="text-xs text-gray-500 mt-2">Used in URL: /projects/{formData.slug || "..."}</p>
            </div>

            <div>
              <Label htmlFor="projectName" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Project Name *
              </Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="FOREST WALK VILLA"
                className={`h-11 border-2 ${errors.projectName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"} rounded-xl transition-all`}
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.projectName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {errors.projectName}
              </p>}
            </div>

            <div>
              <Label htmlFor="developer" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Developer *
              </Label>
              <Input
                id="developer"
                value={formData.developer}
                onChange={(e) => handleChange("developer", e.target.value)}
                placeholder="e.g., Madhusudan Group / Yatharth Group"
                className={`h-11 border-2 placeholder:text-gray-400 ${errors.developer ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"} rounded-xl transition-all`}
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.developer && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {errors.developer}
              </p>}
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="NH-24, Dasna, Ghaziabad"
                className={`h-11 border-2 ${errors.location ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"} rounded-xl transition-all`}
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.location && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {errors.location}
              </p>}
            </div>

            <div>
              <Label htmlFor="locationCategory" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Location Category
              </Label>
              <select
                id="locationCategory"
                value={formData.locationCategory || ""}
                onChange={(e) => handleChange("locationCategory", e.target.value || null)}
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all w-full px-3 bg-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <option value="">Select Location Category</option>
                <option value="noida">Noida</option>
                <option value="greater-noida">Greater Noida</option>
                <option value="yamuna-expressway">Yamuna Expressway</option>
                <option value="ghaziabad">Ghaziabad</option>
              </select>
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                Select the location category for filtering properties on location-specific pages
              </p>
            </div>

            <div>
              <Label htmlFor="reraId" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                RERA ID
              </Label>
              <Input
                id="reraId"
                value={formData.reraId}
                onChange={(e) => handleChange("reraId", e.target.value)}
                placeholder="e.g., UPRERAPRJ658961/08/2025"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all placeholder:text-gray-400"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Status *
              </Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                placeholder="Under Construction"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all"
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            <div>
              <Label htmlFor="possessionDate" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
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
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all cursor-pointer"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {formData.possessionDate && formData.possessionDate.match(/^\d{4}-\d{2}-\d{2}$/) && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {new Date(formData.possessionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sizes" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Sizes *
              </Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => handleChange("sizes", e.target.value)}
                placeholder="e.g., 163 sq. yd - 238 sq. yd (3,070 sq.ft - 4,200 sq.ft)"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all placeholder:text-gray-400"
                required
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                Price Range
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="e.g., ₹2.5 Cr - ₹4 Cr"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all placeholder:text-gray-400"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
              Description
            </h2>
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
              Property Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="e.g., Enter property description..."
              rows={6}
              className={`border-2 placeholder:text-gray-400 ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20"} rounded-xl transition-all resize-none`}
              required
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
            {errors.description && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              {errors.description}
            </p>}
          </div>
        </div>
      </div>

      {/* Unit Types & Media Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          {/* Unit Types */}
          <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Unit Types
          </Label>
          <div className="flex gap-2 mb-3">
            <Input
              value={unitTypeInput}
              onChange={(e) => setUnitTypeInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addUnitType())}
              placeholder="e.g., 4 BHK + 5T Villas"
              className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
            <Button 
              type="button" 
              onClick={addUnitType} 
              variant="outline"
              className="h-11 w-11 border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/10 hover:text-[#CBB27A] rounded-xl transition-all"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.unitTypes.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#CBB27A]/10 to-[#CBB27A]/5 border border-[#CBB27A]/20 rounded-xl text-sm font-medium text-gray-700"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {type}
                <button
                  type="button"
                  onClick={() => removeUnitType(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          </div>

          {/* Hero Image */}
          <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Hero Image *
          </Label>
          {previewUrls.hero || formData.heroImage ? (
            <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md group">
              <img 
                src={previewUrls.hero || formData.heroImage} 
                alt="Hero" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
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
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
              {previewUrls.hero && (
                <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                  Will upload on save
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 transition-all duration-200 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CBB27A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-[#CBB27A]" />
                </div>
                <p className="mb-2 text-sm text-gray-700 font-medium">
                  <span className="font-semibold text-[#CBB27A]">Click to upload</span> or drag and drop
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
          {errors.heroImage && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            {errors.heroImage}
          </p>}
        </div>

        {/* Brochure */}
        <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Brochure PDF
          </Label>
          {previewUrls.brochure || formData.brochureUrl ? (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#CBB27A]" />
              </div>
              {previewUrls.brochure ? (
                <span className="text-sm text-gray-700 flex-1 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {tempFiles.brochure?.name} ({(tempFiles.brochure ? (tempFiles.brochure.size / 1024 / 1024).toFixed(2) : "0")} MB)
                </span>
              ) : (
                <a
                  href={formData.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex-1 font-medium"
                  style={{ fontFamily: "Poppins, sans-serif" }}
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
                className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 transition-all duration-200 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CBB27A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <p className="mb-2 text-sm text-gray-700 font-medium">
                  <span className="font-semibold text-[#CBB27A]">Click to upload PDF</span> (max. 10mb)
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
          <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Gallery Images
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {/* Existing uploaded images */}
            {formData.images.map((img, index) => (
              <div key={`existing-${index}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-md transition-all group">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <button
                  type="button"
                  onClick={() => removeImage(index, false)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Temporary images (preview) */}
            {previewUrls.images.map((previewUrl, index) => (
              <div key={`temp-${index}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 border-dashed shadow-sm group">
                <img src={previewUrl} alt={`New ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <button
                  type="button"
                  onClick={() => removeImage(index, true)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-lg font-medium">
                  New
                </div>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 hover:border-[#CBB27A] rounded-xl cursor-pointer hover:bg-[#CBB27A]/5 transition-all duration-200 font-medium">
            <ImageIcon className="w-5 h-5 text-[#CBB27A]" />
            <span className="text-sm text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Add Images</span>
            <input
              ref={imageInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) {
                  files.forEach((file) => {
                    handleFileSelect(file, "image");
                  });
                  toast.success(`${files.length} image${files.length > 1 ? 's' : ''} selected. They will be uploaded when you save the property.`);
                }
                // Reset input value to allow re-selecting the same file
                if (e.target) {
                  e.target.value = "";
                }
              }}
              disabled={loading || uploading === "all"}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>You can select multiple images at once. They will be uploaded when you save the property.</p>
        </div>

        {/* Videos */}
        <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Videos
          </Label>
          <div className="space-y-3 mb-4">
            {/* Existing uploaded videos */}
            {(formData.videos || []).map((video, index) => (
              <div key={`existing-video-${index}`} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-[#CBB27A]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>{video.title}</p>
                  <a
                    href={video.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    View Video
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(index, false)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Temporary videos (preview) */}
            {previewUrls.videos.map((previewUrl, index) => (
              <div key={`temp-video-${index}`} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl border-2 border-blue-200 border-dashed shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>{tempFiles.videos[index]?.name || `Video ${index + 1}`}</p>
                  <p className="text-xs text-blue-600 font-medium">Will upload on save</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(index, true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 hover:border-[#CBB27A] rounded-xl cursor-pointer hover:bg-[#CBB27A]/5 transition-all duration-200 font-medium">
            <Video className="w-5 h-5 text-[#CBB27A]" />
            <span className="text-sm text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Add Videos</span>
            <input
              ref={videoInputRef}
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) {
                  files.forEach((file) => {
                    handleFileSelect(file, "video");
                  });
                  toast.success(`${files.length} video${files.length > 1 ? 's' : ''} selected. They will be uploaded when you save the property.`);
                }
                // Reset input value to allow re-selecting the same file
                if (e.target) {
                  e.target.value = "";
                }
              }}
              disabled={loading || uploading === "all"}
            />
          </label>
            <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>You can select multiple videos at once. MP4, MOV, WEBM (MAX. 50MB each)</p>
          </div>

          {/* Amenities */}
          <div className="mt-8">
          <Label className="text-base sm:text-lg font-bold text-gray-800 mb-6 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            Amenities
          </Label>
          <AmenitiesMultiSelect
            selectedAmenities={formData.amenities || []}
            onSelectionChange={handleAmenitiesChange}
            disabled={loading || uploading === "all"}
          />
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
              SEO Settings (Optional)
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="seoTitle" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Title
              </Label>
              <Input
                id="seoTitle"
                value={formData.seo?.title || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, title: e.target.value })}
                placeholder="Custom SEO title (defaults to project name)"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>
            <div>
              <Label htmlFor="seoDescription" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Description
              </Label>
              <Textarea
                id="seoDescription"
                value={formData.seo?.description || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, description: e.target.value })}
                placeholder="e.g., Custom SEO description"
                rows={3}
                className="border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all resize-none placeholder:text-gray-400"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>
            <div>
              <Label htmlFor="seoKeywords" className="text-sm font-semibold text-gray-700 mb-2 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                SEO Keywords (comma-separated)
              </Label>
              <Input
                id="seoKeywords"
                value={formData.seo?.keywords || ""}
                onChange={(e) => handleChange("seo", { ...formData.seo, keywords: e.target.value })}
                placeholder="e.g., luxury villa, noida, residential property"
                className="h-11 border-2 border-gray-200 focus:border-[#CBB27A] focus:ring-[#CBB27A]/20 rounded-xl transition-all placeholder:text-gray-400"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Publish Toggle & Submit */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          {/* Publish Toggle */}
          <div className="flex items-center gap-4 p-5 border-2 border-gray-300 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 hover:border-[#CBB27A] hover:bg-gradient-to-r hover:from-[#CBB27A]/5 hover:to-[#CBB27A]/5 transition-all duration-200">
            <Checkbox
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => handleChange("isPublished", checked)}
              className="border-2 border-gray-400 data-[state=checked]:border-[#CBB27A] data-[state=checked]:bg-[#CBB27A] w-5 h-5"
            />
            <Label htmlFor="isPublished" className="text-gray-700 font-semibold cursor-pointer flex-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Publish this property (make it visible on the website)
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              type="submit"
              disabled={loading || uploading === "all"}
              className="w-full sm:w-auto bg-gradient-to-r from-[#CBB27A] to-[#B8A068] hover:from-[#B8A068] hover:to-[#A68F5B] text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-12 px-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {loading || uploading === "all" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
              className="w-full sm:w-auto text-base border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 h-12 px-8 transition-all duration-200"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

