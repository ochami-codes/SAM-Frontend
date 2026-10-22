"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { getCloudinaryUploadSignature } from "@/src/lib/api/cloudinary";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  bytes: number;
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  error?: {
    message?: string;
  };
}

interface ManagedContentImageUploadProps {
  value: string;
  onChange: (imageUrl: string) => void;
  onUploadResult?: (result: CloudinaryUploadResult) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The image must not exceed 5 MB.");
      return;
    }

    setUploading(true);

    try {
      const signature =
        await getCloudinaryUploadSignature();

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "api_key",
        signature.apiKey
      );
      formData.append(
        "timestamp",
        String(signature.timestamp)
      );
      formData.append(
        "signature",
        signature.signature
      );
      formData.append("folder", signature.folder);

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${encodeURIComponent(
              signature.cloudName
            )}/image/upload`
          );

          xhr.upload.onprogress = (progressEvent) => {
            if (progressEvent.lengthComputable) {
              setProgress(
                Math.round(
                  (progressEvent.loaded /
                    progressEvent.total) *
                    100
                )
              );
            }
          };

          xhr.onload = () => {
            let response: CloudinaryUploadResponse;

            try {
              response = JSON.parse(xhr.responseText);
            } catch {
              reject(
                new Error("Invalid response from Cloudinary.")
              );
              return;
            }

            if (
              xhr.status < 200 ||
              xhr.status >= 300
            ) {
              reject(
                new Error(
                  response.error?.message ??
                    "Image upload failed."
                )
              );
              return;
            }

            if (
              !response.secure_url ||
              !response.public_id ||
              response.resource_type !== "image" ||
              !response.format ||
              typeof response.bytes !== "number"
            ) {
              reject(
                new Error(
                  "Cloudinary returned incomplete image details."
                )
              );
              return;
            }

            resolve({
              public_id: response.public_id,
              secure_url: response.secure_url,
              resource_type: response.resource_type,
              format: response.format,
              bytes: response.bytes,
            });
          };

          xhr.onerror = () => {
            reject(
              new Error(
                "Network error while uploading the image."
              )
            );
          };

          xhr.onabort = () => {
            reject(new Error("Image upload was cancelled."));
          };

          xhr.send(formData);
        }
      );

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

  return (
    <div className="space-y-3">
      <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {value ? (
          // A regular img keeps this component independent
          // of Next.js remote image configuration.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Content hero image preview"
            className="max-h-64 w-full object-contain"
          />
        ) : (
          <p className="px-4 text-center text-sm text-gray-500">
            No hero image selected
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
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