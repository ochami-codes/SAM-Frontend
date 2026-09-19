"use client";

import type {
  ManagedContentSection,
  ManagedContentStatus,
} from "@/src/lib/api/managedContent";

export interface ManagedContentMetadataValues {
  title: string;
  slug: string;
  section: ManagedContentSection;
  category: string;
  heroImage: string;
  status: ManagedContentStatus;
}

interface ManagedContentMetadataProps {
  values: ManagedContentMetadataValues;
  mode: "create" | "edit";
  onChange: <K extends keyof ManagedContentMetadataValues>(
    field: K,
    value: ManagedContentMetadataValues[K]
  ) => void;
}

const sectionOptions: {
  value: ManagedContentSection;
  label: string;
}[] = [
  {
    value: "articles",
    label: "Articles",
  },
  {
    value: "bible-study",
    label: "Bible Study",
  },
  {
    value: "family",
    label: "Family",
  },
  {
    value: "health",
    label: "Health",
  },
];

export function ManagedContentMetadata({
  values,
  mode,
  onChange,
}: ManagedContentMetadataProps) {
  function handleSectionChange(
    value: ManagedContentSection
  ) {
    onChange("section", value);

    if (value === "articles") {
      onChange("category", "");
    }
  }

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

            <select
              id="managed-content-section"
              value={values.section}
              onChange={(event) =>
                handleSectionChange(
                  event.target.value as ManagedContentSection
                )
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            >
              {sectionOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="managed-content-category"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="managed-content-category"
              value={values.category}
              onChange={(event) =>
                onChange("category", event.target.value)
              }
              disabled={values.section === "articles"}
              required={values.section !== "articles"}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            >
              <option value="">
                {values.section === "articles"
                  ? "Not applicable"
                  : "Select category"}
              </option>

              {values.section === "bible-study" && (
                <>
                  <option value="redemption">
                    Redemption
                  </option>
                  <option value="standards">
                    Standards
                  </option>
                  <option value="the-law">
                    The Law
                  </option>
                  <option value="the-sabbath">
                    The Sabbath
                  </option>
                </>
              )}

              {values.section === "family" && (
                <>
                  <option value="dating-courting">
                    Dating & Courting
                  </option>
                  <option value="immorality">
                    Immorality
                  </option>
                  <option value="marriage-purpose">
                    Marriage & Purpose
                  </option>
                  <option value="relationships">
                    Relationships
                  </option>
                </>
              )}

              {values.section === "health" && (
                <>
                  <option value="bible-sop">
                    Bible & SOP
                  </option>
                  <option value="junk-foods">
                    Junk Foods
                  </option>
                  <option value="lifestyle-diseases">
                    Lifestyle Diseases
                  </option>
                  <option value="truth">
                    Truth
                  </option>
                </>
              )}
            </select>
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