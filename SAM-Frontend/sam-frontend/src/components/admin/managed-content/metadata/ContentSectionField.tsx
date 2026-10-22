"use client";

import { useState } from "react";
import type { ContentSection } from "@/src/config/contentMetadata";
import type { ManagedContentSection } from "@/src/lib/api/managedContent";

interface ContentSectionFieldProps {
value: ManagedContentSection | "";
sections: ContentSection[];
onChange: (value: string) => void;
onResetCategory: () => void;
}

export function ContentSectionField({
value,
sections,
onChange,
onResetCategory,
}: ContentSectionFieldProps) {
const [isCustomSection, setIsCustomSection] = useState(false);

return ( <div> <label
     htmlFor="managed-content-section"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Section </label>
  {!isCustomSection ? (
    <select
      id="managed-content-section"
      value={value}
      onChange={(event) => {
        const selectedValue = event.target.value;

        onResetCategory();

        if (selectedValue === "__custom__") {
          setIsCustomSection(true);
          onChange("");
          return;
        }

        onChange(selectedValue);
      }}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
    >
      <option value="">Select section</option>

      {sections.map((section) => (
        <option key={section.slug} value={section.slug}>
          {section.name}
        </option>
      ))}

      <option value="__custom__">+ Add new section</option>
    </select>
  ) : (
    <div className="space-y-2">
      <input
        id="managed-content-section"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Prophecy"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      />

      <button
        type="button"
        onClick={() => {
          setIsCustomSection(false);
          onChange("");
          onResetCategory();
        }}
        className="text-xs font-medium text-sam-blue hover:underline"
      >
        ← Choose existing section
      </button>
    </div>
  )}
</div>

);
}
