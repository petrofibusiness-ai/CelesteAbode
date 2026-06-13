"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  LogOut,
  Menu,
  X,
  MapPin,
  Mail,
  Layers,
  MessageCircle,
  MessagesSquare,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminSidebar } from "@/components/admin/admin-sidebar-context";

interface AdminSidebarProps {
  /** Non-support admin: sidebar shows Inventory only */
  inventoryOnly?: boolean;
}

type NavLinkItem = {
  type: "link";
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavGroupItem = {
  type: "group";
  id: string;
  label: string;
  icon: LucideIcon;
  children: Array<{ href: string; label: string }>;
};

type NavItem = NavLinkItem | NavGroupItem;

function isGroupActive(pathname: string | null, group: NavGroupItem): boolean {
  return group.children.some((child) => isChildActive(pathname, child.href, group.id));
}

function isChildActive(pathname: string | null, href: string, groupId: string): boolean {
  if (!pathname) return false;
  if (href.endsWith("/new")) return pathname === href || pathname.startsWith(`${href}/`);
  if (groupId === "properties") {
    return (
      pathname === href ||
      (pathname.startsWith("/admin/properties/") && !pathname.startsWith("/admin/properties/new"))
    );
  }
  if (groupId === "locations") {
    return (
      pathname === href ||
      (pathname.startsWith("/admin/locations/") && !pathname.startsWith("/admin/locations/new"))
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar({ inventoryOnly = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [collapsedFlyout, setCollapsedFlyout] = useState<string | null>(null);
  const { collapsed, toggleCollapsed } = useAdminSidebar();

  const navItems: NavItem[] = useMemo(
    () =>
      inventoryOnly
        ? [
            { type: "link", href: "/admin/inventory", label: "Inventory", icon: Layers },
            {
              type: "link",
              href: "/admin/inventory/messaging",
              label: "Messaging",
              icon: MessageCircle,
            },
            {
              type: "link",
              href: "/admin/inventory/follow-up",
              label: "Follow-up",
              icon: MessagesSquare,
            },
          ]
        : [
            { type: "link", href: "/admin", label: "Dashboard", icon: LayoutDashboard },
            { type: "link", href: "/admin/leads", label: "Leads", icon: Mail },
            {
              type: "group",
              id: "properties",
              label: "Properties",
              icon: Building2,
              children: [
                { href: "/admin/properties", label: "View Properties" },
                { href: "/admin/properties/new", label: "Add Property" },
              ],
            },
            {
              type: "group",
              id: "locations",
              label: "Locations",
              icon: MapPin,
              children: [
                { href: "/admin/locations", label: "View Locations" },
                { href: "/admin/locations/new", label: "Add Location" },
              ],
            },
            { type: "link", href: "/admin/inventory", label: "Inventory", icon: Layers },
            {
              type: "link",
              href: "/admin/inventory/messaging",
              label: "Messaging",
              icon: MessageCircle,
            },
            {
              type: "link",
              href: "/admin/inventory/follow-up",
              label: "Follow-up",
              icon: MessagesSquare,
            },
          ],
    [inventoryOnly]
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setCollapsedFlyout(null);
  }, [pathname]);

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      for (const item of navItems) {
        if (item.type === "group" && isGroupActive(pathname, item)) {
          next[item.id] = true;
        }
      }
      return next;
    });
  }, [pathname, navItems]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderNavLink = (item: NavLinkItem, isCollapsed: boolean) => {
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
  };

  const renderNavGroup = (item: NavGroupItem, isCollapsed: boolean) => {
    const Icon = item.icon;
    const groupActive = isGroupActive(pathname, item);
    const isOpen = openGroups[item.id] ?? groupActive;

    if (isCollapsed) {
      return (
        <div key={item.id} className="relative">
          <button
            type="button"
            title={item.label}
            onClick={() => setCollapsedFlyout((prev) => (prev === item.id ? null : item.id))}
            className={cn(
              "flex w-full items-center justify-center rounded-lg px-2 py-3 transition-colors",
              groupActive
                ? "bg-[#CBB27A]/10 font-semibold text-[#CBB27A]"
                : "text-gray-700 hover:bg-gray-100"
            )}
            aria-expanded={collapsedFlyout === item.id}
            aria-haspopup="true"
          >
            <Icon className="h-5 w-5 shrink-0" />
          </button>
          {collapsedFlyout === item.id ? (
            <div className="absolute left-full top-0 z-[70] ml-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <p
                className="border-b border-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.label}
              </p>
              {item.children.map((child) => {
                const childActive = isChildActive(pathname, child.href, item.id);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setCollapsedFlyout(null)}
                    className={cn(
                      "block px-3 py-2 text-sm transition-colors",
                      childActive
                        ? "bg-[#CBB27A]/10 font-semibold text-[#CBB27A]"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <Collapsible
        key={item.id}
        open={isOpen}
        onOpenChange={(open) => setOpenGroups((prev) => ({ ...prev, [item.id]: open }))}
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors",
            groupActive
              ? "bg-[#CBB27A]/10 font-semibold text-[#CBB27A]"
              : "text-gray-700 hover:bg-gray-100"
          )}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1 pl-4">
          {item.children.map((child) => {
            const childActive = isChildActive(pathname, child.href, item.id);
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center rounded-lg py-2 pl-9 pr-3 text-sm transition-colors",
                  childActive
                    ? "bg-[#CBB27A]/10 font-semibold text-[#CBB27A]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {child.label}
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  };

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
          {navItems.map((item) =>
            item.type === "link" ? renderNavLink(item, isCollapsed) : renderNavGroup(item, isCollapsed)
          )}
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
