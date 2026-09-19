import type { ManagedContentStatus } from "@/src/lib/api/managedContent";

interface ManagedContentStatusProps {
  status: ManagedContentStatus;
}

export function ManagedContentStatus({
  status,
}: ManagedContentStatusProps) {
  const isPublished = status === "published";

  return (
    <span
      className={
        isPublished
          ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
          : "inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
      }
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}