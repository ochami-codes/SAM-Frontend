"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminHeader from "@/src/components/admin/AdminHeader";
import ProtectedRoutes from "@/src/components/auth/ProtectedRoutes";

type AdminRole = "super_admin" | "admin";

interface AdminLayoutProps {
  children: ReactNode;
  role: AdminRole;
  name?: string;
}

export default function AdminLayout({
  children,
  role,
  name,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoutes>
      <div className="flex h-dvh min-h-screen overflow-hidden bg-sam-background text-sam-text">
        {/* Sidebar */}
        <AdminSidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area - takes rest of width */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-5">
          {/* Header - fixed height, never scrolls */}
          <div className="shrink-0">
            <AdminHeader
              role={role}
              name={name}
              onMenuClick={() => setSidebarOpen(true)}
            />
          </div>

          {/* Scrollable content ONLY - header stays on top without overshadowing */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoutes>
  );
}