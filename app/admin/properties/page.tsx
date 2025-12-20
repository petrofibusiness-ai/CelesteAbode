"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Plus, Edit, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { toast } from "sonner";
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/properties");
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
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
      });

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
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

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
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            Properties
          </h1>
          <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
            Manage all your property listings
          </p>
        </div>
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
            className="w-full sm:w-auto bg-[#CBB27A] hover:bg-[#B8A068] text-white text-sm sm:text-base disabled:opacity-50" 
            disabled={deleting !== null}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Property
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Properties List */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            No properties yet
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
            Get started by creating your first property listing.
          </p>
          <Link href="/admin/properties/new">
            <Button className="bg-[#CBB27A] hover:bg-[#B8A068] text-white text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Property
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
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
                    href={`/projects/${property.slug}`}
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
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 line-clamp-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.projectName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.location}
                </p>
                {property.developer && (
                  <p className="text-xs text-gray-500 mb-4 line-clamp-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {property.developer}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
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
                      className="w-full text-xs sm:text-sm h-9"
                      disabled={deleting !== null}
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(property.id!, property.isPublished)}
                    disabled={updating === property.id || deleting !== null}
                    className="h-9 w-9 p-0 flex items-center justify-center disabled:opacity-50"
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
                    className="h-9 w-9 p-0 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 disabled:opacity-50"
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

