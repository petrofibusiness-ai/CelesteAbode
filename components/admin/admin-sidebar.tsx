"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  LogOut, 
  Plus,
  Menu,
  X,
  MapPin,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
  leadsOnly?: boolean;
}

export default function AdminSidebar({ leadsOnly = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = leadsOnly
    ? [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/leads", label: "Leads", icon: Mail },
      ]
    : [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/leads", label: "Leads", icon: Mail },
        { href: "/admin/locations", label: "Locations", icon: MapPin },
        { href: "/admin/locations/new", label: "New Location", icon: Plus },
        { href: "/admin/properties", label: "Properties", icon: Building2 },
        { href: "/admin/properties/new", label: "New Property", icon: Plus },
      ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#CBB27A]/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#CBB27A]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                Celeste Abode
              </h1>
              <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-[#CBB27A]/10 text-[#CBB27A] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
  );

  return (
    <>
      {/* Mobile Header Strip - Fixed Black Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black z-[100] border-b border-gray-800 shadow-lg">
        <div className="flex items-center justify-between h-full px-4 relative">
          {/* Menu Toggle Button - Left */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
        ) : (
              <Menu className="w-6 h-6 text-white" />
        )}
      </button>

          {/* Logo/Brand - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-sm font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              Celeste Abode
            </h1>
          </div>

          {/* Spacer for balance */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200/50 shadow-lg z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[95] md:hidden"
              style={{ top: '4rem' }}
            />
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200/50 shadow-2xl z-[99] md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

