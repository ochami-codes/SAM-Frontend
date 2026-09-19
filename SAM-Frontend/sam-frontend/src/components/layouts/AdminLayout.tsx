// src/components/layouts/AdminLayout.tsx

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
      <div className="min-h-screen bg-sam-background text-sam-text">
        {/* Sidebar */}
        <AdminSidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area */}
        <div className="min-h-screen lg:ml-64">
          {/* Header */}
          <AdminHeader
            role={role}
            name={name}
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Page content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoutes>
  );
}