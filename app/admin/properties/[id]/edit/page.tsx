"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Property } from "@/types/property";
import PropertyForm from "@/components/admin/property-form";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}`);
      if (!response.ok) throw new Error("Failed to fetch property");
      const data = await response.json();
      setProperty(data.property);
    } catch (error) {
      console.error("Error fetching property:", error);
      alert("Failed to load property");
      router.push("/admin/properties");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/admin/properties");
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
            Loading property...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Property not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          Edit Property
        </h1>
        <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
          Update property information
        </p>
      </div>

      <PropertyForm property={property} onSuccess={handleSuccess} />
    </div>
  );
}

