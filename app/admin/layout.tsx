"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
          Loading...
        </p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}

