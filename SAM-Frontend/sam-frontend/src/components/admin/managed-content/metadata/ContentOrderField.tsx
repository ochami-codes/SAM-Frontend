"use client";

interface ContentOrderFieldProps {
value: number | undefined;
onChange: (value: number | undefined) => void;
}

export function ContentOrderField({
value,
onChange,
}: ContentOrderFieldProps) {
return ( <div> <label
     htmlFor="managed-content-order"
     className="mb-1.5 block text-sm font-medium text-gray-700"
   >
Display Order </label>

  <input
    id="managed-content-order"
    type="number"
    value={value ?? ""}
    onChange={(event) => {
      const inputValue = event.target.value;

      onChange(
        inputValue === "" ? undefined : Number(inputValue)
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
);
}
