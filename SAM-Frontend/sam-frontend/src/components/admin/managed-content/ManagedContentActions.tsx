"use client";

import type { ManagedContentListItem } from "@/src/lib/api/managedContent";
import { usePublishManagedContent } from "@/src/hooks/managed-content/usePublishManagedContent";
import { useUnpublishManagedContent } from "@/src/hooks/managed-content/useUnpublishManagedContent";
import type { ManagedContentIdentifier } from "@/src/lib/api/managedContent";
interface ManagedContentActionsProps {
  item: ManagedContentListItem;
}

export function ManagedContentActions({ item }: ManagedContentActionsProps) {
  const publishMutation = usePublishManagedContent();
  const unpublishMutation = useUnpublishManagedContent();

  const isPublishing = publishMutation.isPending;
  const isUnpublishing = unpublishMutation.isPending;
  const isPending = isPublishing || isUnpublishing;

  // Build identifier safely based on section
  const identifier: ManagedContentIdentifier =
  item.section === "articles"
    ? { section: "articles", slug: item.slug }
    : {
        section: item.section as "bible-study" | "family" | "health",
        slug: item.slug,
        category: item.category!,
      };


  function handlePublish() {
    publishMutation.mutate(identifier);
  }

  function handleUnpublish() {
    unpublishMutation.mutate(identifier);
  }

  const buttonLabel = isPublishing
    ? "Publishing..."
    : isUnpublishing
    ? "Unpublishing..."
    : item.status === "draft"
    ? "Publish"
    : "Unpublish";

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={item.status === "draft" ? handlePublish : handleUnpublish}
        className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        {buttonLabel}
      </button>
    </div>
  );
}