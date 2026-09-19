"use client";

import Link from "next/link";

import type {
  ManagedContentListItem,
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";

import {
  ResponsiveDataView,
} from "@/src/components/ui/ResponsiveDataView";
import type { DataTableColumn } from "@/src/components/ui/DataTable";

import { useManagedContentList } from "@/src/hooks/managed-content/useManagedContentList";

import { ManagedContentMobileCard } from "./ManagedContentMobileCard";
import { ManagedContentStatus as ManagedContentStatusBadge } from "./ManagedContentStatus";

interface ManagedContentListProps {
  search: string;
  section: ManagedContentSection | "all";
  status: ManagedContentStatus | "all";
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

function filterContent(
  content: ManagedContentListItem[],
  search: string,
  section: ManagedContentSection | "all",
  status: ManagedContentStatus | "all"
): ManagedContentListItem[] {
  const normalizedSearch = search.trim().toLowerCase();

  return content.filter((item) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.slug.toLowerCase().includes(normalizedSearch);

    const matchesSection =
      section === "all" || item.section === section;

    const matchesStatus =
      status === "all" || item.status === status;

    return (
      matchesSearch &&
      matchesSection &&
      matchesStatus
    );
  });
}

export function ManagedContentList({
  search,
  section,
  status,
}: ManagedContentListProps) {
  const {
    data: content = [],
    isLoading,
    isError,
  } = useManagedContentList();

  const filteredContent = filterContent(
    content,
    search,
    section,
    status
  );

  const columns: DataTableColumn<ManagedContentListItem>[] = [
    {
      key: "title",
      header: "Title",
      render: (item) => (
        <div>
          <p className="font-medium text-gray-900">
            {item.title}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            /{item.slug}
          </p>
        </div>
      ),
    },

    {
      key: "section",
      header: "Section",
      render: (item) => formatSection(item.section),
    },

    {
      key: "category",
      header: "Category",
      render: (item) => item.category ?? "—",
    },

    {
      key: "status",
      header: "Status",
      render: (item) => (
        <ManagedContentStatusBadge
          status={item.status}
        />
      ),
    },

    {
      key: "updatedAt",
      header: "Updated",
      render: (item) => formatDate(item.updatedAt),
    },

    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (item) => (
        <div className="flex justify-end">
          <Link
            href={getEditPath(item)}
            className="inline-flex items-center rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        Loading managed content...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
        Failed to load managed content.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <ResponsiveDataView
        data={filteredContent}
        columns={columns}
        getRowKey={(item) => item.id}
        renderMobileItem={(item) => (
          <ManagedContentMobileCard item={item} />
        )}
        emptyMessage="No managed content found."
      />
    </div>
  );
}
