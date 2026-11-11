"use client";

import { useAuth } from "@/src/hooks/auth/useAuth";

import { SystemHealthSection } from "@/src/components/admin/settings/SystemHealthSection";
import { GlobalSecuritySection } from "@/src/components/admin/settings/GlobalSecuritySection";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading settings...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isSuperAdmin = user.role === "super_admin";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Settings
        </h1>

        <p className="mt-1 max-w-xl text-sm text-gray-500">
          Monitor system health and manage security
          policies for Second Advent Ministries.
        </p>
      </div>

      {isSuperAdmin && <SystemHealthSection />}

      <GlobalSecuritySection
        canManage={isSuperAdmin}
      />
    </div>
  );
}