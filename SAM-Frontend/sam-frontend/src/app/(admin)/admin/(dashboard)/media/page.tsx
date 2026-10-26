"use client";

import { useCloudinaryMedia } from "@/src/hooks/media/useCloudinaryMedia";
import { useState } from "react";

import {
  type MediaSortOrder,
} from "@/src/components/admin/media/MediaToolbar";
import { MediaHeader } from "@/src/components/admin/media/MediaHeader";
import { MediaStats } from "@/src/components/admin/media/MediaStats";
import { MediaGrid } from "@/src/components/admin/media/MediaGrid";

export default function MediaPage() {
    const [search, setSearch] = useState("");

const [sortOrder, setSortOrder] =
  useState<MediaSortOrder>("newest");
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCloudinaryMedia();

  const media = data?.data.items ?? [];

  return (
    <div className="space-y-6">
      <MediaHeader />

      <MediaStats
        total={media.length}
        isLoading={isLoading}
      />

      <MediaGrid
  items={media}
  isLoading={isLoading}
  isError={isError}
  onRefresh={() => {
    void refetch();
  }}
  search={search}
  sortOrder={sortOrder}
  onSearchChange={setSearch}
  onSortChange={setSortOrder}
/>
    </div>
  );
}