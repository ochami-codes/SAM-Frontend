"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

import Quote from "@/src/components/ui/Quote";
import PrayerRequestForm from "@/src/components/forms/PrayerRequestForm";
import { ManagedContentSection } from "@/src/lib/api/managedContent";

interface ManagedContentMdxPreviewProps {
  title: string;
  heroImage: string;
  section: ManagedContentSection;
  category?: string;
  content: string;
}

export function ManagedContentMdxPreview({
  content,
}: ManagedContentMdxPreviewProps) {
  const [source, setSource] =
    useState<MDXRemoteSerializeResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function compileContent() {
      try {
        setError(null);

        const compiled = await serialize(content);

        if (!cancelled) {
          setSource(compiled);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to render MDX preview."
          );
        }
      }
    }

    compileContent();

    return () => {
      cancelled = true;
    };
  }, [content]);

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-medium text-red-800">
          MDX Preview Error
        </p>

        <p className="mt-1 whitespace-pre-wrap text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  if (!source) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-gray-500">
          Rendering preview...
        </p>
      </div>
    );
  }

  return (
    <div className="prose max-w-none">
      <MDXRemote
        {...source}
        components={{
          Quote,
          PrayerRequestForm,
        }}
      />
    </div>
  );
}