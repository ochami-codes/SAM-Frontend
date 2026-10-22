"use client";

import { useState } from "react";

import {
isDefaultContentCategory,
type ContentSection,
} from "@/src/config/contentMetadata";

interface ContentCategoryFieldProps {
section: string;
value: string;
sections: ContentSection[];
onChange: (value: string) => void;
}

export function ContentCategoryField({
section,
value,
sections,
onChange,
}: ContentCategoryFieldProps) {
const [isCustomCategory, setIsCustomCategory] = useState(false);

return ( <div> <label
     htmlFor="managed-content-category"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Category
{section !== "articles" && ( <span className="ml-1 text-red-500">*</span>
)} </label>
  {section === "articles" ? (
    <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
      Articles do not require a category.
    </p>
  ) : !isCustomCategory ? (
    <>
      <select
        id="managed-content-category"
        value={value}
        onChange={(event) => {
          const selectedValue = event.target.value;

          if (selectedValue === "__custom__") {
            setIsCustomCategory(true);
            onChange("");
            return;
          }

          onChange(selectedValue);
        }}
        disabled={!section}
        required={Boolean(section)}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">
          {!section ? "Select section first" : "Select category"}
        </option>

        {sections
          .find((item) => item.slug === section)
          ?.categories.map((category) => {
            const isDefault = isDefaultContentCategory(
              section,
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

        <option value="__custom__">+ Add new category</option>
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Christian Parenting"
        required
        maxLength={100}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
      />

      <button
        type="button"
        onClick={() => {
          setIsCustomCategory(false);
          onChange("");
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
);
}
