"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Plus, Edit, Trash2, Eye, EyeOff, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { toast } from "sonner";
import { getPropertyUrl } from "@/lib/property-url";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; name: string } | null>(null);

  // Handle authentication errors
  const handleAuthError = () => {
    toast.error("Session expired. Please log in again.");
    router.push("/admin/login");
  };

  useEffect(() => {
    // Clear cache on page refresh
    const handleBeforeUnload = () => {
      // Clear the cache key from sessionStorage to force fresh fetch on next load
      sessionStorage.removeItem('properties-cache-timestamp');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      
      // Check if this is a fresh page load (no cache timestamp)
      const cacheTimestamp = sessionStorage.getItem('properties-cache-timestamp');
      const now = Date.now();
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
      
      // Force fresh data if:
      // 1. Manual refresh triggered
      // 2. No cache timestamp (first load or after refresh)
      // 3. Cache has expired
      const isFreshLoad = forceRefresh || !cacheTimestamp || (now - parseInt(cacheTimestamp)) > CACHE_DURATION;
      const cacheParam = isFreshLoad ? `?t=${now}` : '';
      
      const response = await fetch(`/api/admin/properties${cacheParam}`, {
        credentials: 'include', // Send authentication cookies
        cache: 'no-store', // Bypass browser cache
      });
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        handleAuthError();
        return;
      }
      
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      setProperties(data.properties || []);
      
      // Update cache timestamp on successful fetch
      sessionStorage.setItem('properties-cache-timestamp', now.toString());

      if (forceRefresh) {
        toast.success("Properties refreshed successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProperties(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setPropertyToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      // Close dialog and show loading overlay
      setDeleteDialogOpen(false);
      setDeleting(propertyToDelete.id);
      
      const response = await fetch(`/api/admin/properties/${propertyToDelete.id}`, {
        method: "DELETE",
        credentials: 'include', // Send authentication cookies
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete property");
      }

      const data = await response.json();
      const deletedCount = data.deletedAssets || 0;
      
      toast.success(
        `Property deleted successfully${deletedCount > 0 ? ` (${deletedCount} assets removed)` : ""}`,
        { duration: 4000 }
      );
      fetchProperties();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete property");
    } finally {
      setDeleting(null);
      setPropertyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      setUpdating(id);
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Send authentication cookies
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update property");
      }

      toast.success(`Property ${!currentStatus ? "published" : "unpublished"} successfully`);
      fetchProperties();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update property");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
            Loading properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
                Properties
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                Manage all your property listings
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="h-12 w-12 p-0 rounded-xl bg-white border-2 border-black/30 hover:border-black shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh properties"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <RefreshCw className={`w-5 h-5 text-black transition-transform duration-300 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Link 
            href="/admin/properties/new" 
            className="w-full sm:w-auto"
            onClick={(e) => {
              // Prevent navigation if deletion is in progress
              if (deleting !== null) {
                e.preventDefault();
              }
            }}
          >
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-[#CBB27A] to-[#B8A068] hover:from-[#B8A068] hover:to-[#A68F5B] text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 h-12 px-6" 
              disabled={deleting !== null}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Property
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Properties List */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-12 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-[#CBB27A]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
              No properties yet
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
              Get started by creating your first property listing.
            </p>
            <Link href="/admin/properties/new">
              <Button className="bg-gradient-to-r from-[#CBB27A] to-[#B8A068] hover:from-[#B8A068] hover:to-[#A68F5B] text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12 px-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                <Plus className="w-5 h-5 mr-2" />
                Create Property
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-2xl shadow-md border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
            >
              {/* Hero Image */}
              <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                {property.heroImage ? (
                  <img
                    src={property.heroImage}
                    alt={property.projectName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm ${
                      property.isPublished
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {property.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                {/* URL Link Icon - Only for published properties */}
                {property.isPublished && property.slug && (
                  <a
                    href={getPropertyUrl(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 group"
                    title={`View ${property.projectName} on website`}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-[#CBB27A] transition-colors" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#CBB27A] transition-colors duration-200" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.projectName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.location}
                </p>
                {property.developer && (
                  <p className="text-xs text-gray-500 mb-4 line-clamp-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {property.developer}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href={`/admin/properties/${property.id}/edit`} 
                    className="flex-1"
                    onClick={(e) => {
                      // Prevent navigation if deletion is in progress
                      if (deleting !== null) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm h-10 border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/10 text-gray-700 hover:text-[#CBB27A] transition-all duration-200 [&:hover]:text-[#CBB27A] [&:hover]:bg-[#CBB27A]/10"
                      disabled={deleting !== null}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(property.id!, property.isPublished)}
                    disabled={updating === property.id || deleting !== null}
                    className="h-10 w-10 p-0 flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 transition-all duration-200 disabled:opacity-50"
                    title={property.isPublished ? "Unpublish" : "Publish"}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {updating === property.id ? (
                      <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
                    ) : property.isPublished ? (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-600" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(property.id!, property.projectName)}
                    disabled={deleting !== null}
                    className="h-10 w-10 p-0 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-200 hover:border-red-300 transition-all duration-200 disabled:opacity-50"
                    title="Delete property"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {deleting === property.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: "Poppins, sans-serif" }}>
              Delete Property
            </AlertDialogTitle>
            <AlertDialogDescription style={{ fontFamily: "Poppins, sans-serif" }}>
              Are you sure you want to delete <strong>{propertyToDelete?.name}</strong>? 
              This will permanently delete the property and all associated files (images, videos, PDFs) from storage. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleDeleteCancel}
              disabled={deleting !== null}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting !== null}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Delete Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Loading Overlay - Blocks all interactions during deletion */}
      {deleting && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#CBB27A] animate-spin" />
              <div className="text-center space-y-2">
                <h3 
                  className="text-xl font-bold text-gray-900" 
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Deleting Property
                </h3>
                <p 
                  className="text-sm text-gray-600" 
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Please wait while we delete <strong>{propertyToDelete?.name}</strong> and all associated files...
                </p>
                <p 
                  className="text-xs text-gray-500 mt-2" 
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  This may take a few moments
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

