"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
ALLOWED_IMAGE_TYPES,
uploadToCloudinary,
validateImageFile,
} from "@/src/lib/api/uploadToCloudinary";

interface MediaUploaderProps {
onUploaded: () => void;
}

export function MediaUploader({ onUploaded }: MediaUploaderProps) {
const inputRef = useRef<HTMLInputElement>(null);
const queryClient = useQueryClient();

const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);

async function handleFileChange(
event: ChangeEvent<HTMLInputElement>
) {
const file = event.target.files?.[0];

// Permit selecting the same file again.
event.target.value = "";

if (!file) return;

const validationError = validateImageFile(file);

if (validationError) {
  toast.error(validationError);
  return;
}

setUploading(true);
setProgress(0);

try {
  await uploadToCloudinary({
    file,
    onProgress: setProgress,
  });

  await queryClient.invalidateQueries({
    queryKey: ["cloudinary-media"],
  });

  toast.success("Image uploaded successfully.");
  onUploaded();
} catch (error) {
  toast.error(
    error instanceof Error
      ? error.message
      : "Unable to upload the image."
  );
} finally {
  setUploading(false);
  setProgress(0);
}

}

return ( <div className="space-y-4">
<input
ref={inputRef}
type="file"
accept={ALLOWED_IMAGE_TYPES.join(",")}
onChange={handleFileChange}
disabled={uploading}
className="hidden"
/>


  <button
    type="button"
    onClick={() => inputRef.current?.click()}
    disabled={uploading}
    className="flex min-h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:border-sam-blue hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {uploading ? (
      <>
        <Upload
          size={28}
          className="mb-3 animate-pulse text-sam-blue"
        />
        <span className="text-sm font-medium text-gray-800">
          Uploading image...
        </span>
      </>
    ) : (
      <>
        <ImagePlus
          size={32}
          className="mb-3 text-gray-500"
        />
        <span className="text-sm font-medium text-gray-800">
          Choose an image to upload
        </span>
        <span className="mt-1 text-xs text-gray-500">
          JPEG, PNG, or WebP · Maximum 5 MB
        </span>
      </>
    )}
  </button>

  {uploading && (
    <div
      className="space-y-1"
      role="status"
      aria-live="polite"
    >
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-sam-blue transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600">
        Upload progress: {progress}%
      </p>
    </div>
  )}
</div>
);
}
