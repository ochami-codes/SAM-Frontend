"use client";

import { useState } from "react";
import { ContentHeroImageField } from "@/src/components/admin/managed-content/metadata/ContentHeroImageField";

export interface CreateCustomSectionInput {
  name: string;
  heroImage?: string;
}

interface CustomSectionFormProps {
  onSubmit: (input: CreateCustomSectionInput) => Promise<void>;
  onCancel: () => void;
}

export function CustomSectionForm({ onSubmit, onCancel }: CustomSectionFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const normalizedName = name.trim();
    if (!normalizedName) {
      setError("Section name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: normalizedName,
        ...(heroImage.trim() ? { heroImage: heroImage.trim() } : {}),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create section.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Add Custom Section</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create a new section for your ministry content.
        </p>
      </div>

      <div>
        <label htmlFor="custom-section-name" className="mb-1 block text-sm font-medium">
          Section Name
        </label>
        <input
          id="custom-section-name"
          type="text"
          value={name}
          onChange={(event) => {
            const nextName = event.target.value;
            setName(nextName);
          }}
          placeholder="e.g. Prophecy"
          required
          maxLength={100}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Hero Image (Optional)</label>
        <ContentHeroImageField
          value={heroImage}
          onChange={setHeroImage}
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500">
          We can connect this field to your existing Cloudinary uploader.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Section"}
        </button>
      </div>
    </form>
  );
}