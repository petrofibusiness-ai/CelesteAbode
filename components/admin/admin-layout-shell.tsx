"use client";

import AdminSidebar from "@/components/admin/admin-sidebar";
import { AdminSidebarProvider, useAdminSidebar } from "@/components/admin/admin-sidebar-context";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

function AdminMain({ children }: { children: React.ReactNode }) {
  const { sidebarWidthClass } = useAdminSidebar();

  return (
    <main
      className={cn(
        "w-full flex-1 pt-16 transition-[margin] duration-300 ease-in-out md:pt-0",
        sidebarWidthClass
      )}
    >
      {children}
    </main>
  );
}

export function AdminLayoutShell({
  children,
  inventoryOnly,
}: {
  children: React.ReactNode;
  inventoryOnly: boolean;
}) {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex flex-col md:flex-row">
          <AdminSidebar inventoryOnly={inventoryOnly} />
          <AdminMain>{children}</AdminMain>
        </div>
        <Toaster />
      </div>
    </AdminSidebarProvider>
  );
}
