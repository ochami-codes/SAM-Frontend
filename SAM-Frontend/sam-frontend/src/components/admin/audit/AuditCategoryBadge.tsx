import type { AuditCategory } from "@/src/types/audit";

interface AuditCategoryBadgeProps {
  category: AuditCategory;
}

const categoryStyles: Record<AuditCategory, string> = {
  authentication: "bg-blue-50 text-blue-700 border-blue-200",
  administrators: "bg-purple-50 text-purple-700 border-purple-200",
  content: "bg-green-50 text-green-700 border-green-200",
  media: "bg-orange-50 text-orange-700 border-orange-200",
  settings: "bg-gray-100 text-gray-700 border-gray-200",
  contact: "bg-yellow-50 text-yellow-700 border-yellow-200",
  system: "bg-red-50 text-red-700 border-red-200",
};

const categoryLabels: Record<AuditCategory, string> = {
  authentication: "Authentication",
  administrators: "Administrators",
  content: "Content",
  media: "Media",
  settings: "Settings",
  contact: "Contact",
  system: "System",
};

export function AuditCategoryBadge({
  category,
}: AuditCategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
    </span>
  );
}