"use client";

import type {
  ManagedContentSection,
} from "@/src/lib/api/managedContent";

import {ManagedContentMdxRenderer} from "./ManagedContentMdxRenderer";

interface ManagedContentPreviewProps {
  title: string;
  heroImage: string;
  section: ManagedContentSection;
  category?: string;
  content: string;
}

export function ManagedContentPreview({
  title,
  heroImage,
  section,
  category,
  content,
}: ManagedContentPreviewProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Preview how this content will appear on the public website.
        </p>
      </div>

      <div className="overflow-hidden">
        <ManagedContentMdxRenderer
          title={title}
          heroImage={heroImage}
          section={section}
          category={category}
          content={content}
        />
      </div>
    </div>
  );
}