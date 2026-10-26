"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

import { MediaUploadModal } from "./MediaUploadModal";

export function MediaHeader() {
const [isUploadOpen, setIsUploadOpen] = useState(false);

return (
<> <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <h1 className="text-2xl font-semibold text-gray-900">
Media Library </h1>

      <p className="mt-1 text-sm text-gray-500">
        Manage images used across the SAM website.
      </p>
    </div>

    <button
      type="button"
      onClick={() => setIsUploadOpen(true)}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-sam-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-sam-blue-dark"
    >
      <Upload className="h-4 w-4" aria-hidden="true" />
      Upload Images
    </button>
  </div>

  <MediaUploadModal
    isOpen={isUploadOpen}
    onClose={() => setIsUploadOpen(false)}
  />
</>
);
}
