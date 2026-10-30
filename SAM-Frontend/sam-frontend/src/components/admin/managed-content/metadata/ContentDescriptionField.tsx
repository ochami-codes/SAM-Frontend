"use client";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";

interface ContentDescriptionFieldProps {
  section: ManagedContentSection;
  value: string;
  onChange: (value: string) => void;
}

const MAX_LENGTH = 300;

export function ContentDescriptionField({
  section,
  value,
  onChange,
}: ContentDescriptionFieldProps) {
  if (section !== "articles") {
    return null;
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="description"
        className="block text-sm font-medium text-slate-700"
      >
        Article Description <span className="text-red-500">*</span>
      </label>

      <textarea
        id="description"
        name="description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write a brief description of what readers will learn..."
        required
        maxLength={MAX_LENGTH}
        rows={3}
        className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#238ac4] focus:ring-2 focus:ring-[#238ac4]/10"
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>A short summary displayed on the articles listing page.</p>

        <span>
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}