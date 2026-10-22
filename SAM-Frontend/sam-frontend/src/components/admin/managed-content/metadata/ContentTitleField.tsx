"use client";

interface ContentTitleFieldProps {
value: string;
onChange: (value: string) => void;
}

export function ContentTitleField({
value,
onChange,
}: ContentTitleFieldProps) {
return ( <div> <label
     htmlFor="managed-content-title"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Title </label>

  <input
    id="managed-content-title"
    type="text"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    required
    maxLength={200}
    placeholder="Enter content title"
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
  />
</div>

);
}
