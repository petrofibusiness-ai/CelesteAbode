"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Location } from "@/types/location";
import LocationForm from "@/components/admin/location-form";
import { Loader2 } from "lucide-react";

export default function EditLocationPage() {
  const router = useRouter();
  const params = useParams();
  const locationSlug = params.slug as string;
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, [locationSlug]);

  const fetchLocation = async () => {
    try {
      const response = await fetch(`/api/admin/locations/${locationSlug}`);
      if (!response.ok) throw new Error("Failed to fetch location");
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to load location");
      router.push("/admin/locations");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/admin/locations");
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

  if (!location) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
          Location not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          Edit Location: {location.locationName}
        </h1>
        <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
          Update location page details
        </p>
      </div>
      <LocationForm location={location} onSuccess={handleSuccess} />
    </div>
  );
}

