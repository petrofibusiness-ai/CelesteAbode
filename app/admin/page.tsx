"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, FileText, Eye, Loader2, Mail, MapPin, TrendingUp, Users, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [user, setUser] = useState({ name: "Admin" });
  const [stats, setStats] = useState({
    totalProperties: 0,
    publishedProperties: 0,
    draftProperties: 0,
    totalLocations: 0,
    activeLocations: [] as Array<{ id: string; name: string; slug: string }>,
    totalLeads: 0,
    newLeadsLast7Days: 0,
    leadsByStatus: {
      new: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
    },
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
        totalLocations: data.totalLocations || 0,
        activeLocations: data.activeLocations || [],
        totalLeads: data.totalLeads || 0,
        newLeadsLast7Days: data.newLeadsLast7Days || 0,
        leadsByStatus: data.leadsByStatus || {
          new: 0,
          contacted: 0,
          qualified: 0,
          converted: 0,
        },
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

      {/* Stats Cards - Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-10">
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

        {/* Total Leads Card */}
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200/50 p-6 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>
                Total Leads
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-blue-600" /> : stats.totalLeads}
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Poppins, sans-serif" }}>
                {stats.newLeadsLast7Days} new (7d)
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 md:mb-10">
        {/* Leads by Status */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Leads by Status
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>New</span>
              </div>
              <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.leadsByStatus.new}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Contacted</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.leadsByStatus.contacted}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Qualified</span>
              </div>
              <span className="text-2xl font-bold text-green-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.leadsByStatus.qualified}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Converted</span>
              </div>
              <span className="text-2xl font-bold text-purple-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.leadsByStatus.converted}
              </span>
            </div>
          </div>
        </div>

        {/* Locations Overview */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-lg flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                Active Locations
              </h2>
            </div>
            <div className="text-sm text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#CBB27A]" />
              ) : (
                `${stats.totalLocations} total`
              )}
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#CBB27A]" />
            </div>
          ) : stats.activeLocations.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {stats.activeLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/admin/locations`}
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#CBB27A]/10 rounded-lg border border-gray-200 hover:border-[#CBB27A]/30 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-[#CBB27A]/20 rounded-lg flex items-center justify-center group-hover:bg-[#CBB27A]/30 transition-colors">
                    <MapPin className="w-4 h-4 text-[#CBB27A] group-hover:text-[#B8A068]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#CBB27A] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {location.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                      /{location.slug}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
              <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No active locations</p>
            </div>
          )}
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
              <Button variant="outline" className="border-2 border-gray-300 hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105 h-12 px-6" style={{ fontFamily: "Poppins, sans-serif" }}>
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

