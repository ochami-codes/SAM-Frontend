
"use client";

import { Bell, Menu, UserCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/src/hooks/auth/useAuth";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "super_admin";

  const name = user?.fullName ?? "Administrator";
  const roleLabel = isSuperAdmin ? "Super Admin" : "Admin";

  // Update this property to match your actual user object.
  const profileImage = user?.profileImage;

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b border-sam-border bg-sam-surface/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="shrink-0 rounded-lg p-2 text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-sam-muted sm:text-sm">
            Administration
          </p>

          <h2 className="truncate text-base font-semibold text-sam-text sm:text-lg">
            {isSuperAdmin ? "Control Center" : "Admin Center"}
          </h2>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-sam-muted transition-colors hover:bg-sam-background hover:text-sam-text"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sam-yellow ring-2 ring-sam-surface" />
        </button>

        <div className="flex items-center gap-3 border-l border-sam-border pl-2 sm:pl-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sam-background sm:h-9 sm:w-9">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={`${name}'s profile`}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <UserCircle className="h-full w-full text-sam-muted" />
            )}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-[14ch] truncate text-sm font-medium text-sam-text">
              {name}
            </p>

            <p className="text-xs text-sam-muted">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
