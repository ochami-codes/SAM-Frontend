// src/components/admin/AdminHeader.tsx

"use client";

import { Bell, Menu, UserCircle } from "lucide-react";

type AdminRole = "super_admin" | "admin";

interface AdminHeaderProps {
  role: AdminRole;
  name?: string;
  onMenuClick: () => void;
}

export default function AdminHeader({
  role,
  name = "Administrator",
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-sam-border bg-sam-surface px-4 sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Page context */}
        <div>
          <p className="text-xs font-medium text-sam-muted sm:text-sm">
            Administration
          </p>

          <h2 className="text-base font-semibold text-sam-text sm:text-lg">
            {role === "super_admin"
              ? "Control Center"
              : "Admin Center"}
          </h2>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text"
        >
          <Bell className="h-5 w-5" />

          {/* Notification indicator */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sam-yellow" />
        </button>

        {/* Admin profile */}
        <div className="flex items-center gap-3 border-l border-sam-border pl-2 sm:pl-4">
          <UserCircle className="h-8 w-8 text-sam-muted sm:h-9 sm:w-9" />

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-sam-text">
              {name}
            </p>

            <p className="text-xs text-sam-muted">
              {role === "super_admin"
                ? "Super Admin"
                : "Admin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
