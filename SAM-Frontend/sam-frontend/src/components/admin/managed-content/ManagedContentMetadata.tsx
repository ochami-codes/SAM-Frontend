"use client";

import type {
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";
import { useState } from "react";
import type { ContentSection } from "@/src/config/contentMetadata";
import { isDefaultContentCategory } from "@/src/config/contentMetadata";
export interface ManagedContentMetadataValues {
  title: string;
  slug: string;
  section: ManagedContentSection;
  category: string;
  heroImage: string;
  order?: number;
  status: ManagedContentStatus;
}

interface ManagedContentMetadataProps {
  values: ManagedContentMetadataValues;
  sections: ContentSection[];
  mode: "create" | "edit";
  onChange: <K extends keyof ManagedContentMetadataValues>(
    field: K,
    value: ManagedContentMetadataValues[K]
  ) => void;
}

export function ManagedContentMetadata({
  values,
  sections,
  mode,
  onChange,
}: ManagedContentMetadataProps) {
  const [isCustomSection, setIsCustomSection] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">
          Content Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Configure the metadata for this content.
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label
            htmlFor="managed-content-title"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Title
          </label>

          <input
            id="managed-content-title"
            type="text"
            value={values.title}
            onChange={(event) =>
              onChange("title", event.target.value)
            }
            required
            maxLength={200}
            placeholder="Enter content title"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
  <label
    htmlFor="managed-content-section"
    className="mb-1.5 block text-sm font-medium text-gray-700"
  >
    Section
  </label>

  {!isCustomSection ? (
    <>
      <select
        id="managed-content-section"
        value={values.section}
        onChange={(event) => {
  const value = event.target.value;

  setIsCustomCategory(false);

  if (value === "__custom__") {
    setIsCustomSection(true);
    onChange("section", "");
    onChange("category", "");
    return;
  }

  onChange("section", value);
  onChange("category", "");
}}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      >
        <option value="">Select section</option>

        {sections.map((section) => (
  <option key={section.slug} value={section.slug}>
    {section.name}
  </option>
))}

        <option value="__custom__">
          + Add new section
        </option>
      </select>
    </>
  ) : (
    <div className="space-y-2">
      <input
        id="managed-content-section"
        type="text"
        value={values.section}
        onChange={(event) =>
          onChange("section", event.target.value)
        }
        placeholder="e.g. Prophecy"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      />

      <button
        type="button"
        onClick={() => {
          setIsCustomSection(false);
          onChange("section", "");
          onChange("category", "");
        }}
        className="text-xs font-medium text-sam-blue hover:underline"
      >
        ← Choose existing section
      </button>
    </div>
  )}
</div>

          <div>
  <label
    htmlFor="managed-content-category"
    className="mb-1.5 block text-sm font-medium text-gray-700"
  >
    Category
    {values.section !== "articles" && (
      <span className="ml-1 text-red-500">*</span>
    )}
  </label>

  {values.section === "articles" ? (
    <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
      Articles do not require a category.
    </p>
  ) : !isCustomCategory ? (
    <>
      <select
        id="managed-content-category"
        value={values.category}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "__custom__") {
            setIsCustomCategory(true);
            onChange("category", "");
            return;
          }

          onChange("category", value);
        }}
        disabled={!values.section}
        required={Boolean(values.section)}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">
          {!values.section
            ? "Select section first"
            : "Select category"}
        </option>

        {sections
  .find((section) => section.slug === values.section)
  ?.categories.map((category) => {
    const isDefault = isDefaultContentCategory(
      values.section,
      category.slug
    );

    return (
      <option
        key={category.slug}
        value={category.slug}
        disabled={isDefault}
      >
        {category.name}
        {isDefault ? " (Static content)" : ""}
      </option>
    );
  })}

        <option value="__custom__">
          + Add new category
        </option>
      </select>

      <p className="mt-1.5 text-xs text-gray-500">
        Default categories contain static content. Create a new category
        to add managed content under this section.
      </p>
    </>
  ) : (
    <div className="space-y-2">
      <input
        id="managed-content-category"
        type="text"
        value={values.category}
        onChange={(event) =>
  onChange("category", event.target.value)
}
        placeholder="e.g. Christian Parenting"
        required
        maxLength={100}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      />

      <button
        type="button"
        onClick={() => {
          setIsCustomCategory(false);
          onChange("category", "");
        }}
        className="text-xs font-medium text-sam-blue hover:underline"
      >
        ← Choose category
      </button>

      <p className="text-xs text-gray-500">
        Enter a new category for this section. Its URL slug will be
        generated from the category name by the application.
      </p>
    </div>
  )}
</div>
        </div>

        <div>
          <label
            htmlFor="managed-content-slug"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Slug
          </label>

          <input
            id="managed-content-slug"
            type="text"
            value={values.slug}
            onChange={(event) =>
              onChange("slug", event.target.value)
            }
            required
            maxLength={200}
            placeholder="my-content-slug"
            className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
          />

          <p className="mt-1.5 text-xs text-gray-500">
            Use lowercase letters, numbers, and hyphens.
          </p>
        </div>

        <div>
          <label
            htmlFor="managed-content-hero-image"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Hero Image
          </label>

          <input
            id="managed-content-hero-image"
            type="text"
            value={values.heroImage}
            onChange={(event) =>
              onChange("heroImage", event.target.value)
            }
            maxLength={500}
            placeholder="/images/articles/example.jpg"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
          />

          <p className="mt-1.5 text-xs text-gray-500">
            Optional path or URL for the content hero image.
          </p>
        </div>
        <div>
  <label
    htmlFor="managed-content-order"
    className="mb-1.5 block text-sm font-medium text-gray-700"
  >
    Display Order
  </label>

  <input
    id="managed-content-order"
    type="number"
    value={values.order ?? ""}
    onChange={(event) => {
      const value = event.target.value;

      onChange(
        "order",
        value === "" ? undefined : Number(value)
      );
    }}
    min={0}
    step={1}
    placeholder="e.g. 1"
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 md:w-64"
  />

  <p className="mt-1.5 text-xs text-gray-500">
    Optional. Lower numbers appear first. Items without an assigned
    order follow explicitly ordered items.
  </p>
</div>
        {mode === "create" && (
          <div>
            <label
              htmlFor="managed-content-status"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Initial Status
            </label>

            <select
              id="managed-content-status"
              value={values.status}
              onChange={(event) =>
                onChange(
                  "status",
                  event.target.value as ManagedContentStatus
                )
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 md:w-64"
            >
              <option value="draft">Draft</option>
              <option value="published">
                Published
              </option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}