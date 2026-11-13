import type { AdminContentMetadataSection } from "@/src/lib/api/contentMetadata";

import { MetadataActions } from "./MetadataActions";
import { isDefaultContentSection } from "@/src/config/contentMetadata";

interface SectionsPanelProps {
  sections: AdminContentMetadataSection[];
  selectedSectionSlug: string;
  onSelectSection: (slug: string) => void;
  onRenameSection?: (section: AdminContentMetadataSection) => void;
  onDeleteSection?: (section: AdminContentMetadataSection) => void;
  deletingSectionSlug?: string | null;
}

export function SectionsPanel({
  sections,
  selectedSectionSlug,
  onSelectSection,
  onRenameSection,
  onDeleteSection,
  deletingSectionSlug,
}: SectionsPanelProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">
          Sections
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select a section to manage its categories.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {sections.length === 0 ? (
          <p className="p-5 text-sm text-gray-500">
            No sections found.
          </p>
        ) : (
          sections.map((section) => {
            const isDefault = isDefaultContentSection(section.slug);
            const isSelected =
              section.slug === selectedSectionSlug;

            return (
              <div
                key={section.slug}
                className={`flex items-center justify-between gap-2 px-3 py-2 transition ${
                  isSelected ? "bg-sam-blue/10" : "hover:bg-gray-50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectSection(section.slug)}
                  className="min-w-0 flex-1 px-2 py-2 text-left"
                >
                  <p className="font-medium text-gray-900">
                    {section.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {section.slug}
                  </p>
                </button>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    {section.categories.length}{" "}
                    {section.categories.length === 1
                      ? "category"
                      : "categories"}
                  </span>

                  {!isDefault && onRenameSection && onDeleteSection && (
  <MetadataActions
    onRename={() => onRenameSection(section)}
    onDelete={() => onDeleteSection(section)}
    isDeleting={deletingSectionSlug === section.slug}
  />
)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}