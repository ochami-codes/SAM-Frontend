"use client";

import ManagedContentImageUpload from "../ManagedContentImageUpload";

interface ContentHeroImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ContentHeroImageField({
  value,
  onChange,
  disabled = false,
}: ContentHeroImageFieldProps) {
  return (
    <div>
      <label
        htmlFor="managed-content-hero-image"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Hero Image
      </label>

      <ManagedContentImageUpload
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      <p className="mt-1.5 text-xs text-gray-500">
        Optional. Upload a JPEG, PNG, or WebP image (maximum 5 MB),
        or choose an existing image from your Cloudinary library.
      </p>
    </div>
  );
}
