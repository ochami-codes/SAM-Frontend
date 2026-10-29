"use client";

import type { ContentSection } from "@/src/config/contentMetadata";
import type { ManagedContentSection } from "@/src/lib/api/managedContent";

interface ContentSectionFieldProps {
  value: ManagedContentSection | "";
  sections: ContentSection[];
  onChange: (value: string) => void;
  onResetCategory: () => void;
  onAddCustomSection: () => void;
}

export function ContentSectionField({
  value,
  sections,
  onChange,
  onResetCategory,
  onAddCustomSection,
}: ContentSectionFieldProps) {
  function handleSectionChange(selectedValue: string) {
    if (selectedValue === "__manage_sections__") {
      onAddCustomSection();
      return;
    }

    onResetCategory();
    onChange(selectedValue);
  }

  return (
    <div>
      <label
        htmlFor="managed-content-section"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Section
      </label>

      <select
        id="managed-content-section"
        value={value}
        onChange={(event) =>
          handleSectionChange(event.target.value)
        }
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      >
        <option value="">Select section</option>

        {sections.map((section) => (
          <option key={section.slug} value={section.slug}>
            {section.name}
          </option>
        ))}

        <option value="__manage_sections__">
          + Manage sections
        </option>
      </select>

      <p className="mt-1.5 text-xs text-gray-500">
        Need a new section? Use Manage Structure to create sections
        and categories.
      </p>
    </div>
  );
}