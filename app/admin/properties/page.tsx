"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete property");
      fetchProperties();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete property");
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update property");
      fetchProperties();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update property");
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
        <Link href="/admin/properties/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-[#CBB27A] hover:bg-[#B8A068] text-white text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Hero Image */}
              <div className="relative h-48 bg-gray-200">
                {property.heroImage ? (
                  <img
                    src={property.heroImage}
                    alt={property.projectName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      property.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {property.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.projectName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {property.location}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Link href={`/admin/properties/${property.id}/edit`} className="flex-1 sm:flex-initial">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto text-xs sm:text-sm"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(property.id!, property.isPublished)}
                    className="text-xs sm:text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {property.isPublished ? (
                      <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(property.id!)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

