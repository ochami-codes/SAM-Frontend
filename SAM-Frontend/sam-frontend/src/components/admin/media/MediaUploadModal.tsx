"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { MediaUploader } from "./MediaUploader";

interface MediaUploadModalProps {
isOpen: boolean;
onClose: () => void;
}

export function MediaUploadModal({
isOpen,
onClose,
}: MediaUploadModalProps) {
const [uploadCount, setUploadCount] = useState(0);

if (!isOpen) return null;

function handleUploaded() {
setUploadCount((count) => count + 1);
}

return ( <div
   className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
   onClick={onClose}
 >
<section
role="dialog"
aria-modal="true"
aria-labelledby="media-upload-title"
className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl sm:p-6"
onClick={(event) => event.stopPropagation()}
> <div className="mb-5 flex items-start justify-between gap-4"> <div> <h2
           id="media-upload-title"
           className="text-lg font-semibold text-gray-900"
         >
Upload Images </h2>

```
        <p className="mt-1 text-sm text-gray-500">
          Add images to your SAM media library.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        aria-label="Close upload dialog"
      >
        <X size={20} />
      </button>
    </div>

    <MediaUploader onUploaded={handleUploaded} />

    {uploadCount > 0 && (
      <p className="mt-4 text-sm text-green-700">
        {uploadCount === 1
          ? "1 image uploaded successfully."
          : `${uploadCount} images uploaded successfully.`}
      </p>
    )}

    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={onClose}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  </section>
</div>
);
}
