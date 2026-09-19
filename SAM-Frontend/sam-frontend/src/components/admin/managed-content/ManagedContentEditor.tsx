"use client";

import { useState } from "react";

interface ManagedContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  preview?: React.ReactNode;
}

export function ManagedContentEditor({
  value,
  onChange,
  preview,
}: ManagedContentEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-gray-900">
            MDX Content
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Write the content using MDX syntax.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview((current) => !current)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sam-blue/20"
        >
          {showPreview ? "Edit MDX" : "Live Preview"}
        </button>
      </div>

      <div className="p-5">
        {showPreview ? (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-5">
            {preview ?? (
              <p className="text-sm text-gray-500">
                Preview is not available yet.
              </p>
            )}
          </div>
        ) : (
          <>
            <label
              htmlFor="managed-content-body"
              className="sr-only"
            >
              MDX content
            </label>

            <textarea
              id="managed-content-body"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              required
              rows={24}
              spellCheck={false}
              placeholder="Write your MDX content here..."
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 font-mono text-sm leading-6 outline-none transition focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            />

            <div className="mt-2 flex justify-end">
              <span className="text-xs text-gray-400">
                {value.length.toLocaleString()} characters
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}