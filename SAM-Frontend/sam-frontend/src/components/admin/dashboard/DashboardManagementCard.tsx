import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { DashboardSection } from "@/src/config/adminDashboard";

interface DashboardManagementCardProps {
  section: DashboardSection;
}

export function DashboardManagementCard({
  section,
}: DashboardManagementCardProps) {
  const Icon = section.icon;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sam-blue/50 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sam-blue/10 text-sam-blue-dark transition-colors group-hover:bg-sam-blue group-hover:text-white">
          <Icon size={23} />
        </div>

        <ArrowUpRight
          size={19}
          className="text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sam-blue-dark"
        />
      </div>

      <h3 className="mt-5 text-base font-semibold text-gray-900">
        {section.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
        {section.description}
      </p>

      <Link
        href={section.href}
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-sam-blue hover:text-white"
      >
        Open section
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}