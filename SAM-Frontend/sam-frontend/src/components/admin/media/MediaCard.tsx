"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import type { CloudinaryMediaItem } from "@/src/lib/api/media";
import { useDeleteCloudinaryMedia } from "@/src/hooks/media/useDeleteCloudinaryMedia";

import { MediaCardActions } from "./MediaCardActions";
import { MediaContentReferences } from "./MediaContentReferences";
import { MediaPreviewModal } from "./MediaPreviewModal";

interface MediaCardProps {
  item: CloudinaryMediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    mutate: deleteMedia,
    isPending: isDeleting,
  } = useDeleteCloudinaryMedia();

  const filename =
    item.public_id.split("/").pop() ?? "Media image";

  const isInUse = item.usedBy.length > 0;

  function handleDelete() {
    if (isInUse || isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${filename}" permanently from Cloudinary? This action cannot be undone.`
    );

    if (confirmed) {
      deleteMedia(item.public_id);
    }
  }

  return (
    <>
      <article className="overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-sam-blue hover:shadow-sm">
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="group relative block aspect-square w-full bg-gray-50"
          aria-label={`Preview ${filename}`}
        >
          <img
            src={item.secure_url}
            alt={filename}
            loading="lazy"
            className="h-full w-full object-cover"
          />

          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white transition group-hover:bg-black/30">
            <ImageIcon
              size={28}
              className="opacity-0 transition group-hover:opacity-100"
            />
          </span>
        </button>

        <div className="space-y-3 p-3">
          <div>
            <p
              className="truncate text-sm font-medium text-gray-800"
              title={item.public_id}
            >
              {filename}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {item.width} × {item.height} ·{" "}
              {item.format.toUpperCase()}
            </p>
          </div>

          <MediaCardActions
            publicId={item.public_id}
            secureUrl={item.secure_url}
            filename={filename}
            isInUse={isInUse}
            isDeleting={isDeleting}
            onDelete={handleDelete}
          />

          <MediaContentReferences usedBy={item.usedBy} />
        </div>
      </article>

      {isPreviewOpen && (
        <MediaPreviewModal
          filename={filename}
          secureUrl={item.secure_url}
          width={item.width}
          height={item.height}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
}