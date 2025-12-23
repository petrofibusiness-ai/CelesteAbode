"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // CRITICAL SECURITY: Add noindex meta tags to prevent search engine indexing
    // Skip on login page (it has its own layout)
    if (pathname === "/admin/login") {
      return;
    }

    // Only run on client side
    if (typeof document === 'undefined') {
      return;
    }

    try {
      // Check if meta tags already exist
      let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      let metaGooglebot = document.querySelector('meta[name="googlebot"]') as HTMLMetaElement;

      // Create or update robots meta tag
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        document.head.appendChild(metaRobots);
      }
      metaRobots.content = 'noindex, nofollow, noarchive, nosnippet';

      // Create or update googlebot meta tag
      if (!metaGooglebot) {
        metaGooglebot = document.createElement('meta');
        metaGooglebot.name = 'googlebot';
        document.head.appendChild(metaGooglebot);
      }
      metaGooglebot.content = 'noindex, nofollow';
    } catch (error) {
      // Silently fail if there's an error (e.g., SSR)
      console.warn('Failed to add admin meta tags:', error);
    }
  }, [pathname]);

  useEffect(() => {
    // Don't check auth on login page
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    // Check session
    fetch("/api/admin/auth/session")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        router.push("/admin/login");
      });
  }, [pathname, router]);

  // Show nothing while checking auth (except on login page)
  if (pathname !== "/admin/login" && isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Login page doesn't need layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Not authenticated, redirect will happen
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 md:ml-64 w-full pt-16 md:pt-0">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

