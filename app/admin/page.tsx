"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, FileText, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [user, setUser] = useState({ name: "Admin" });

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // TODO: Fetch stats from database
  const stats = {
    totalProperties: 0,
    publishedProperties: 0,
    draftProperties: 0,
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
          Manage your properties and website content from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                Total Properties
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                {stats.totalProperties}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#CBB27A]/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#CBB27A]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                Published
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {stats.publishedProperties}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                Drafts
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {stats.draftProperties}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Link href="/admin/properties/new">
            <Button className="bg-[#CBB27A] hover:bg-[#B8A068] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Property
            </Button>
          </Link>
          <Link href="/admin/properties">
            <Button variant="outline" style={{ fontFamily: "Poppins, sans-serif" }}>
              <Building2 className="w-4 h-4 mr-2" />
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

