"use client";

import type {
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";

interface ManagedContentFiltersProps {
  search: string;
  section: ManagedContentSection | "all";
  status: ManagedContentStatus | "all";
  onSearchChange: (value: string) => void;
  onSectionChange: (
    value: ManagedContentSection | "all"
  ) => void;
  onStatusChange: (
    value: ManagedContentStatus | "all"
  ) => void;
}

export function ManagedContentFilters({
  search,
  section,
  status,
  onSearchChange,
  onSectionChange,
  onStatusChange,
}: ManagedContentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center">
      <div className="flex-1">
        <label
          htmlFor="managed-content-search"
          className="sr-only"
        >
          Search content
        </label>

        <input
          id="managed-content-search"
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search content..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="managed-content-section"
          className="sr-only"
        >
          Filter by section
        </label>

        <select
          id="managed-content-section"
          value={section}
          onChange={(event) =>
            onSectionChange(
              event.target.value as
                | ManagedContentSection
                | "all"
            )
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 md:w-44"
        >
          <option value="all">All Sections</option>
          <option value="articles">Articles</option>
          <option value="bible-study">Bible Study</option>
          <option value="family">Family</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="managed-content-status"
          className="sr-only"
        >
          Filter by status
        </label>

        <select
          id="managed-content-status"
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value as
                | ManagedContentStatus
                | "all"
            )
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 md:w-40"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>
  );
}