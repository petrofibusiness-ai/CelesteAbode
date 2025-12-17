"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyFormData } from "@/types/property";
import PropertyForm from "@/components/admin/property-form";

export default function NewPropertyPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/properties");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          Create New Property
        </h1>
        <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
          Add a new property listing to your website
        </p>
      </div>

      <PropertyForm onSuccess={handleSuccess} />
    </div>
  );
}

