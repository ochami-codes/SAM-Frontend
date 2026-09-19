"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import type {
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";

import { useManagedContentList } from "@/src/hooks/managed-content/useManagedContentList";

import { ManagedContentFilters } from "@/src/components/admin/managed-content/ManagedContentFilters";
import { ManagedContentList } from "@/src/components/admin/managed-content/ManagedContentList";

export default function ManagedContentPage() {
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<
    ManagedContentSection | "all"
  >("all");

  const [status, setStatus] = useState<
    ManagedContentStatus | "all"
  >("all");

  const {
    data: content = [],
    isLoading,
    isError,
  } = useManagedContentList();

  const stats = useMemo(() => {
    const published = content.filter(
      (item) => item.status === "published"
    ).length;

    const drafts = content.filter(
      (item) => item.status === "draft"
    ).length;

    return {
      total: content.length,
      published,
      drafts,
    };
  }, [content]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Managed Content
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, edit, and publish content stored in the database.
          </p>
        </div>

        <Link
          href="/admin/managed-content/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-sam-blue-dark"
        >
          <Plus
            className="h-4 w-4"
            aria-hidden="true"
          />
          New Content
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">
            Total Content
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {isLoading ? "—" : stats.total}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">
            Published
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {isLoading ? "—" : stats.published}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">
            Drafts
          </p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {isLoading ? "—" : stats.drafts}
          </p>
        </div>
      </div>

      <ManagedContentFilters
        search={search}
        section={section}
        status={status}
        onSearchChange={setSearch}
        onSectionChange={setSection}
        onStatusChange={setStatus}
      />

      <ManagedContentList
        search={search}
        section={section}
        status={status}
      />

      {isError && (
        <p className="text-center text-xs text-gray-400">
          Statistics could not be loaded.
        </p>
      )}
    </div>
  );
}