"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Plus, Edit, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types/location";
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

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<{ slug: string; name: string } | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/locations");
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (slug: string, name: string) => {
    setLocationToDelete({ slug, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!locationToDelete) return;

    try {
      setDeleting(locationToDelete.slug);
      const response = await fetch(`/api/admin/locations/${locationToDelete.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete location");

      toast.success("Location deleted successfully");
      setDeleteDialogOpen(false);
      setLocationToDelete(null);
      fetchLocations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete location");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (location: Location) => {
    try {
      setUpdating(location.slug);
      const response = await fetch(`/api/admin/locations/${location.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !location.isPublished }),
      });

      if (!response.ok) throw new Error("Failed to update location");

      toast.success(location.isPublished ? "Location unpublished" : "Location published");
      fetchLocations();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update location");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#CBB27A]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            Location Pages
          </h1>
          <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
            Manage location-specific property pages
          </p>
        </div>
        <Link href="/admin/locations/new">
          <Button className="bg-[#CBB27A] hover:bg-[#CBB27A]/90 text-white font-poppins">
            <Plus className="w-4 h-4 mr-2" />
            New Location
          </Button>
        </Link>
      </div>

      {locations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">No locations yet</h3>
          <p className="text-sm text-gray-600 mb-6 font-poppins">
            Create your first location page to get started
          </p>
          <Link href="/admin/locations/new">
            <Button className="bg-[#CBB27A] hover:bg-[#CBB27A]/90 text-white font-poppins">
              <Plus className="w-4 h-4 mr-2" />
              Create Location
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {location.heroImage ? (
                  <img
                    src={location.heroImage}
                    alt={location.locationName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Button
                    onClick={() => togglePublish(location)}
                    variant="ghost"
                    size="sm"
                    className="bg-white/90 hover:bg-white"
                    disabled={updating === location.slug}
                  >
                    {updating === location.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : location.isPublished ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#CBB27A] transition-colors duration-200 font-poppins">
                  {location.locationName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1 font-poppins">
                  /properties-in-{location.slug}
                </p>
                {location.localities.length > 0 && (
                  <p className="text-xs text-gray-500 mb-4 line-clamp-1 font-poppins">
                    {location.localities.length} {location.localities.length === 1 ? "locality" : "localities"}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/locations/${location.slug}/edit`}
                    className="flex-1"
                    onClick={(e) => {
                      if (deleting !== null) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm h-10 border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/10 text-gray-700 hover:text-[#CBB27A] transition-all duration-200 font-poppins"
                      disabled={deleting !== null}
                    >
                      <Edit className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm h-10 border-2 border-red-300 hover:border-red-500 hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200 font-poppins"
                    onClick={() => handleDeleteClick(location.slug, location.locationName)}
                    disabled={deleting !== null}
                  >
                    {deleting === location.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                  {location.isPublished && (
                    <Link href={`/properties-in-${location.slug}`} target="_blank">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/10 text-gray-700 hover:text-[#CBB27A] transition-all duration-200 font-poppins"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Location</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{locationToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

