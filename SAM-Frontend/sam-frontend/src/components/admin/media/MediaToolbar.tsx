"use client";

import { Search, ArrowUpDown, X } from "lucide-react";

export type MediaSortOrder = "newest" | "oldest";

interface MediaToolbarProps {
  search: string;
  sortOrder: MediaSortOrder;
  onSearchChange: (value: string) => void;
  onSortChange: (value: MediaSortOrder) => void;
}

export function MediaToolbar({
  search,
  sortOrder,
  onSearchChange,
  onSortChange,
}: MediaToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by filename or public ID..."
          aria-label="Search images"
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Sorting */}
      <div className="relative sm:w-48">
        <ArrowUpDown
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />

        <select
          value={sortOrder}
          onChange={(event) =>
            onSortChange(event.target.value as MediaSortOrder)
          }
          aria-label="Sort images"
          className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}