"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";

import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import { useContent } from "@/src/hooks/content/useContent";
import { useUpdateContent } from "@/src/hooks/content/useUpdateContent";
import type { ContentIdentifier } from "@/src/lib/api/content";

export default function ContentEditorPage() {
  const params = useParams();

  const router = useRouter();

  const segments = Array.isArray(params.segments)
    ? params.segments
    : [];

  const identifier = createIdentifier(segments);

  const { data, isLoading, isError, error } =
    useContent(identifier);

  const updateMutation = useUpdateContent();

  const [content, setContent] = useState("");
  const [message, setMessage] = useState(
    "Update default content"
  );

  useEffect(() => {
    if (data) {
      setContent(data.content);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading content...
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="p-6">
          <h2 className="font-semibold text-slate-900">
            Unable to load content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {error.message}
          </p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const handleSave = () => {
    updateMutation.mutate({
      identifier,
      data: {
        content,
        sha: data.sha,
        message,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/default-content"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Edit Content
            </h1>

            <p className="text-sm text-slate-500">
              {identifier.slug}
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={updateMutation.isPending}
        >
          <Save className="mr-2 h-4 w-4" />

          {updateMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>

      <Card>
        <div className="space-y-5 p-6">
          <div>
            <label
              htmlFor="commit-message"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Commit message
            </label>

            <input
              id="commit-message"
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              MDX Content
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              spellCheck={false}
              className="min-h-[600px] w-full resize-y rounded-lg border border-slate-300 bg-slate-950 p-4 font-mono text-sm leading-6 text-white outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push("/admin/default-content")
              }
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              disabled={
                updateMutation.isPending ||
                content.trim().length === 0 ||
                message.trim().length === 0
              }
            >
              <Save className="mr-2 h-4 w-4" />

              {updateMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function createIdentifier(
  segments: string[]
): ContentIdentifier {
  if (segments.length === 2) {
    const [section, slug] = segments;

    if (section !== "articles") {
      throw new Error("Invalid content section");
    }

    if (!slug) {
      throw new Error("Invalid article URL");
    }

    return {
      section: "articles",
      slug,
    };
  }

  if (segments.length === 3) {
    const [section, category, slug] = segments;

    if (
      section !== "bible-study" &&
      section !== "family" &&
      section !== "health"
    ) {
      throw new Error("Invalid content section");
    }

    if (!category || !slug) {
      throw new Error("Invalid content URL");
    }

    return {
      section,
      category,
      slug,
    };
  }

  throw new Error("Invalid content URL");
}