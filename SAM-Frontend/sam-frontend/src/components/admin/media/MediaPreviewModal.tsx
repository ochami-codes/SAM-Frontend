"use client";

import { ExternalLink, X } from "lucide-react";

interface MediaPreviewModalProps {
  filename: string;
  secureUrl: string;
  width: number;
  height: number;
  onClose: () => void;
}

export function MediaPreviewModal({
  filename,
  secureUrl,
  width,
  height,
  onClose,
}: MediaPreviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Preview ${filename}`}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-gray-800">
              {filename}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {width} × {height}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex max-h-[75vh] justify-center overflow-auto bg-gray-50">
          <img
            src={secureUrl}
            alt={filename}
            className="max-h-[75vh] max-w-full object-contain"
          />
        </div>

        <a
          href={secureUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm text-sam-blue-dark hover:underline"
        >
          <ExternalLink size={14} />
          Open original image
        </a>
      </div>
    </div>
  );
}