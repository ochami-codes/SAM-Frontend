"use client";

import {
useRef,
useState,
type ChangeEvent,
} from "react";

import {
uploadToCloudinary,
validateImageFile,
ALLOWED_IMAGE_TYPES,
type CloudinaryUploadResult,
} from "@/src/lib/api/uploadToCloudinary";

interface ManagedContentImageUploadProps {
value: string;
onChange: (imageUrl: string) => void;
onUploadResult?: (result: CloudinaryUploadResult) => void;
disabled?: boolean;
}

export default function ManagedContentImageUpload({
value,
onChange,
onUploadResult,
disabled = false,
}: ManagedContentImageUploadProps) {
const inputRef = useRef<HTMLInputElement>(null);

const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);
const [error, setError] = useState<string | null>(null);

async function handleFileChange(
event: ChangeEvent<HTMLInputElement>
) {
const file = event.target.files?.[0];

// Allow selecting the same file again after an upload.
event.target.value = "";

if (!file) return;

setError(null);
setProgress(0);

const validationError = validateImageFile(file);

if (validationError) {
  setError(validationError);
  return;
}

setUploading(true);

try {
  const result = await uploadToCloudinary({
    file,
    onProgress: setProgress,
  });

  onChange(result.secure_url);
  onUploadResult?.(result);
  setProgress(100);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Unable to upload the image."
  );
} finally {
  setUploading(false);
}

}

return ( <div className="space-y-3"> <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
{value ? ( <img
         src={value}
         alt="Content hero image preview"
         className="max-h-64 w-full object-contain"
       />
) : ( <p className="px-4 text-center text-sm text-gray-500">
No hero image selected </p>
)} </div>

  <input
    ref={inputRef}
    type="file"
    accept={ALLOWED_IMAGE_TYPES.join(",")}
    onChange={handleFileChange}
    disabled={disabled || uploading}
    className="hidden"
  />

  <div className="flex flex-wrap items-center gap-3">
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      disabled={disabled || uploading}
      className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {uploading
        ? "Uploading..."
        : value
          ? "Replace image"
          : "Upload image"}
    </button>

    {value && (
      <button
        type="button"
        onClick={() => {
          onChange("");
          setError(null);
          setProgress(0);
        }}
        disabled={disabled || uploading}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50"
      >
        Remove image
      </button>
    )}
  </div>

  {uploading && (
    <div
      className="space-y-1"
      role="status"
      aria-live="polite"
    >
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600">
        Uploading image: {progress}%
      </p>
    </div>
  )}

  <p className="text-xs text-gray-500">
    JPEG, PNG, or WebP. Maximum size: 5 MB.
  </p>

  {error && (
    <p
      className="text-sm text-red-600"
      role="alert"
    >
      {error}
    </p>
  )}
</div>

);
}
