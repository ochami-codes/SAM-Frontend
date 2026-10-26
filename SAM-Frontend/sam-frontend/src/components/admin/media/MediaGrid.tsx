"use client";

import { Images } from "lucide-react";
import { useMemo } from "react";
import {
  MediaToolbar,
  type MediaSortOrder,
} from "./MediaToolbar";

import type { CloudinaryMediaItem } from "@/src/lib/api/media";

import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  items: CloudinaryMediaItem[];
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
  search: string;
  sortOrder: MediaSortOrder;
  onSearchChange: (value: string) => void;
  onSortChange: (value: MediaSortOrder) => void;
}

export function MediaGrid({
  items,
  isLoading,
  isError,
  onRefresh,
  search,
  sortOrder,
  onSearchChange,
  onSortChange,
}: MediaGridProps) {
    const filteredItems = useMemo(() => {
  const query = search.trim().toLowerCase();

  return items
    .filter((item) => {
      if (!query) {
        return true;
      }

      return item.public_id.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
}, [items, search, sortOrder]);
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            All Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Browse and manage your uploaded images.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
      <div className="mb-5">
  <MediaToolbar
    search={search}
    sortOrder={sortOrder}
    onSearchChange={onSearchChange}
    onSortChange={onSortChange}
  />
</div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-lg border border-gray-200"
            >
              <div className="aspect-square bg-gray-100" />

              <div className="space-y-2 p-3">
                <div className="h-3 w-3/4 rounded bg-gray-100" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="py-12 text-center">
          <p className="text-sm text-red-600">
            Failed to load the media library.
          </p>

          <button
            type="button"
            onClick={onRefresh}
            className="mt-3 text-sm font-medium text-sam-blue-dark hover:underline"
          >
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center">
          <Images
            className="mx-auto h-10 w-10 text-gray-300"
            aria-hidden="true"
          />
<h3 className="mt-3 text-sm font-medium text-gray-900">
  {items.length === 0
    ? "No images found"
    : "No matching images"}
</h3>

<p className="mt-1 text-sm text-gray-500">
  {items.length === 0
    ? "Uploaded images will appear here."
    : "Try a different filename or public ID."}
</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item) => (
            <MediaCard key={item.asset_id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}