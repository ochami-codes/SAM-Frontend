"use client";

interface ContentSlugFieldProps {
value: string;
onChange: (value: string) => void;
}

export function ContentSlugField({
value,
onChange,
}: ContentSlugFieldProps) {
return ( <div> <label
     htmlFor="managed-content-slug"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Slug </label>
  <input
    id="managed-content-slug"
    type="text"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    required
    maxLength={200}
    placeholder="my-content-slug"
    className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
  />

  <p className="mt-1.5 text-xs text-gray-500">
    Use lowercase letters, numbers, and hyphens.
  </p>
</div>
);
}
