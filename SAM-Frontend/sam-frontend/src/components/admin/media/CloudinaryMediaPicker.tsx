"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  type CloudinaryMediaItem,
} from "@/src/lib/api/media";

import { useCloudinaryMedia } from "@/src/hooks/media/useCloudinaryMedia";

import {
  MediaGrid,
} from "./MediaGrid";
import type { MediaSortOrder } from "./MediaToolbar";

interface CloudinaryMediaPickerProps {
  onSelect: (item: CloudinaryMediaItem) => void;
  onClose: () => void;
}

export function CloudinaryMediaPicker({
  onSelect,
  onClose,
}: CloudinaryMediaPickerProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] =
    useState<MediaSortOrder>("newest");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCloudinaryMedia();

  const items = data?.data.items ?? [];

  function handleSelect(item: CloudinaryMediaItem) {
    onSelect(item);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cloudinary-picker-title"
        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-gray-50 shadow-xl"
      >
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div>
            <h2
              id="cloudinary-picker-title"
              className="text-lg font-semibold text-gray-900"
            >
              Choose an Image
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select an existing image from your Cloudinary library.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image picker"
            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </header>

        <div className="overflow-y-auto p-4 sm:p-6">
          <MediaGrid
            items={items}
            isLoading={isLoading}
            isError={isError}
            onRefresh={() => void refetch()}
            search={search}
            sortOrder={sortOrder}
            onSearchChange={setSearch}
            onSortChange={setSortOrder}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}