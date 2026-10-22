"use client";

import type { ManagedContentStatus } from "@/src/lib/api/managedContent";

interface ContentStatusFieldProps {
value: ManagedContentStatus;
onChange: (value: ManagedContentStatus) => void;
}

export function ContentStatusField({
value,
onChange,
}: ContentStatusFieldProps) {
return ( <div> <label
     htmlFor="managed-content-status"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Initial Status </label>

  <select
    id="managed-content-status"
    value={value}
    onChange={(event) =>
      onChange(event.target.value as ManagedContentStatus)
    }
    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 md:w-64"
  >
    <option value="draft">Draft</option>
    <option value="published">Published</option>
  </select>
</div>

);
}
