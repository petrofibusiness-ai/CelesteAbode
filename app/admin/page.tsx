"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, FileText, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [user, setUser] = useState({ name: "Admin" });
  const [stats, setStats] = useState({
    totalProperties: 0,
    publishedProperties: 0,
    draftProperties: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    // Fetch statistics
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch statistics");
      const data = await response.json();
      setStats({
        totalProperties: data.totalProperties || 0,
        publishedProperties: data.publishedProperties || 0,
        draftProperties: data.draftProperties || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "Poppins, sans-serif" }}>
              Welcome back, {user?.name || "Admin"}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Manage your properties and website content from here.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-10">
        {/* Total Properties Card */}
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200/50 p-6 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#CBB27A]/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>
                Total Properties
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-[#CBB27A]" /> : stats.totalProperties}
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Poppins, sans-serif" }}>
                All listings
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#CBB27A]/20 to-[#CBB27A]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Building2 className="w-8 h-8 text-[#CBB27A]" />
            </div>
          </div>
        </div>

        {/* Published Card */}
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200/50 p-6 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>
                Published
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-green-600" /> : stats.publishedProperties}
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Poppins, sans-serif" }}>
                Live on site
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200/50 p-6 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>
                Drafts
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-amber-600" /> : stats.draftProperties}
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Poppins, sans-serif" }}>
                In progress
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6 sm:p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#CBB27A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-lg flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Quick Actions
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link href="/admin/properties/new">
              <Button className="bg-gradient-to-r from-[#CBB27A] to-[#B8A068] hover:from-[#B8A068] hover:to-[#A68F5B] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12 px-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                <Plus className="w-5 h-5 mr-2" />
                Create New Property
              </Button>
            </Link>
            <Link href="/admin/properties">
              <Button variant="outline" className="border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 transition-all duration-300 hover:scale-105 h-12 px-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                <Building2 className="w-5 h-5 mr-2" />
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

