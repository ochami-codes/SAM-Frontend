import Link from "next/link";

import { Pencil } from "lucide-react";

import type {
  ManagedContentListItem,
} from "@/src/lib/api/managedContent";

import { ManagedContentActions } from "./ManagedContentActions";
import { ManagedContentStatus } from "./ManagedContentStatus";

interface ManagedContentMobileCardProps {
  item: ManagedContentListItem;
}

function formatSection(
  section: ManagedContentListItem["section"]
): string {
  switch (section) {
    case "articles":
      return "Articles";

    case "bible-study":
      return "Bible Study";

    case "family":
      return "Family";

    case "health":
      return "Health";

    default:
      return section;
  }
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function getEditPath(
  item: ManagedContentListItem
): string {
  if (item.section === "articles") {
    return `/admin/managed-content/edit/${item.section}/${item.slug}`;
  }

  return `/admin/managed-content/edit/${item.section}/${item.category}/${item.slug}`;
}

export function ManagedContentMobileCard({
  item,
}: ManagedContentMobileCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-gray-900">
            {item.title}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500">
            /{item.slug}
          </p>
        </div>

        <ManagedContentStatus status={item.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-400">
            Section
          </p>

          <p className="mt-1 text-gray-700">
            {formatSection(item.section)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Category
          </p>

          <p className="mt-1 text-gray-700">
            {item.category ?? "—"}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-xs text-gray-400">
            Last updated
          </p>

          <p className="mt-1 text-gray-700">
            {formatDate(item.updatedAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
        <Link
          href={getEditPath(item)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Pencil
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
          Edit
        </Link>

        <div className="flex flex-1">
          <ManagedContentActions item={item} />
        </div>
      </div>
    </article>
  );
}                                 