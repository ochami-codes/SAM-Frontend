import { LayoutGrid } from "lucide-react";

import type { UserRole } from "@/src/context/AuthContext";

import {
  dashboardSections,
} from "@/src/config/adminDashboard";

import {
  DashboardManagementCard,
} from "./DashboardManagementCard";

interface DashboardManagementGridProps {
  role: UserRole;
}

export function DashboardManagementGrid({
  role,
}: DashboardManagementGridProps) {
  const accessibleSections = dashboardSections.filter((section) =>
    section.roles.includes(role)
  );

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid size={19} className="text-sam-blue-dark" />

            <h2 className="text-lg font-bold text-gray-900">
              Management Sections
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Access the tools available to your account.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {accessibleSections.length} available
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {accessibleSections.map((section) => (
          <DashboardManagementCard
            key={section.id}
            section={section}
          />
        ))}
      </div>
    </section>
  );
}