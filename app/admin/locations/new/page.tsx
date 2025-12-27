"use client";

import LocationForm from "@/components/admin/location-form";

export default function NewLocationPage() {
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          Create New Location
        </h1>
        <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
          Add a new location page for property listings
        </p>
      </div>
      <LocationForm />
    </div>
  );
}

