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
  Mail,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminSidebar } from "@/components/admin/admin-sidebar-context";

interface AdminSidebarProps {
  /** Non-support admin: sidebar shows Inventory only */
  inventoryOnly?: boolean;
}

export default function AdminSidebar({ inventoryOnly = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { collapsed, toggleCollapsed } = useAdminSidebar();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = inventoryOnly
    ? [
        { href: "/admin/inventory", label: "Inventory", icon: Layers },
        {
          href: "/admin/inventory/messaging",
          label: "Messaging",
          icon: MessageCircle,
        },
      ]
    : [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/leads", label: "Leads", icon: Mail },
        { href: "/admin/locations", label: "Locations", icon: MapPin },
        { href: "/admin/locations/new", label: "New Location", icon: Plus },
        { href: "/admin/properties", label: "Properties", icon: Building2 },
        { href: "/admin/properties/new", label: "New Property", icon: Plus },
        { href: "/admin/inventory", label: "Inventory", icon: Layers },
        {
          href: "/admin/inventory/messaging",
          label: "Messaging",
          icon: MessageCircle,
        },
      ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const sidebarContent = (options: { mobile?: boolean }) => {
    const isCollapsed = collapsed && !options.mobile;

    return (
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "border-b border-gray-200",
            isCollapsed ? "flex items-center justify-center p-3" : "p-6"
          )}
        >
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CBB27A]/10">
              <Building2 className="h-6 w-6 text-[#CBB27A]" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Celeste Abode
                </h1>
                <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Admin Panel
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className={cn("flex-1 space-y-2 p-4", isCollapsed && "px-2")}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-[#CBB27A]/10 font-semibold text-[#CBB27A]"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn("border-t border-gray-200 p-4", isCollapsed && "px-2")}>
          <Button
            onClick={handleLogout}
            variant="ghost"
            title={isCollapsed ? "Logout" : undefined}
            className={cn(
              "w-full text-gray-700 hover:bg-red-50 hover:text-red-600",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <LogOut className={cn("h-5 w-5 shrink-0", !isCollapsed && "mr-3")} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] h-16 border-b border-gray-800 bg-black shadow-lg md:hidden">
        <div className="relative flex h-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <h1 className="text-sm font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              Celeste Abode
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen border-r border-gray-200/50 bg-white shadow-lg transition-[width] duration-300 ease-in-out md:flex",
          collapsed ? "w-[4.5rem]" : "w-64"
        )}
      >
        {sidebarContent({ mobile: false })}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="absolute -right-3 bottom-28 z-[60] flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-colors hover:border-[#CBB27A]/50 hover:text-[#9a8648]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[95] bg-black/50 md:hidden"
              style={{ top: "4rem" }}
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-16 z-[99] h-[calc(100vh-4rem)] w-64 border-r border-gray-200/50 bg-white shadow-2xl md:hidden"
            >
              {sidebarContent({ mobile: true })}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
