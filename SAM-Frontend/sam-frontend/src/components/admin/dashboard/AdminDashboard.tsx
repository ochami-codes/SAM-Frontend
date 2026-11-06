"use client";

import { useAuth } from "@/src/hooks/auth/useAuth";

import { DashboardWelcome } from "./DashboardWelcome";
import { DashboardManagementGrid } from "./DashboardManagementGrid";

export function AdminDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-sam-blue" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <DashboardWelcome user={user} />

      <DashboardManagementGrid role={user.role} />
    </div>
  );
}