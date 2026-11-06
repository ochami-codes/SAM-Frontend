import {
  Activity,
  ShieldCheck,
  Users,
  FileText,
  Image,
  Settings,
  Mail,
  Server,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { AuditCategory } from "@/src/types/audit";

interface AuditSummaryCardsProps {
  stats: {
    total: number;
    categories: Record<AuditCategory, number>;
  };
  isLoading?: boolean;
}

interface SummaryCard {
  label: string;
  value: number;
  icon: LucideIcon;
  iconStyles: string;
}

export function AuditSummaryCards({
  stats,
  isLoading = false,
}: AuditSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      label: "Total Events",
      value: stats.total,
      icon: Activity,
      iconStyles: "bg-sam-blue/10 text-sam-blue-dark",
    },
    {
      label: "Authentication",
      value: stats.categories.authentication,
      icon: ShieldCheck,
      iconStyles: "bg-blue-50 text-blue-700",
    },
    {
      label: "Administrators",
      value: stats.categories.administrators,
      icon: Users,
      iconStyles: "bg-purple-50 text-purple-700",
    },
    {
      label: "Content",
      value: stats.categories.content,
      icon: FileText,
      iconStyles: "bg-green-50 text-green-700",
    },
    {
      label: "Media",
      value: stats.categories.media,
      icon: Image,
      iconStyles: "bg-orange-50 text-orange-700",
    },
    {
      label: "Settings",
      value: stats.categories.settings,
      icon: Settings,
      iconStyles: "bg-gray-100 text-gray-700",
    },
    {
      label: "Contact",
      value: stats.categories.contact,
      icon: Mail,
      iconStyles: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "System",
      value: stats.categories.system,
      icon: Server,
      iconStyles: "bg-red-50 text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {card.label}
              </p>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconStyles}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>

            <p className="mt-3 text-2xl font-semibold text-gray-900">
              {isLoading ? "—" : card.value.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}