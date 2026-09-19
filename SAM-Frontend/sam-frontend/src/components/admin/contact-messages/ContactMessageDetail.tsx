"use client";

import type { ContactMessage } from "@/src/lib/api/contact";

import { useMarkContactMessageRead } from "@/src/hooks/contact/admin/useMarkContactMessageRead";
import { useArchiveContactMessage } from "@/src/hooks/contact/admin/useArchiveContactMessage";

interface ContactMessageDetailProps {
  message: ContactMessage | undefined;
  onArchived?: () => void;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
function getReplySubject(subject?: string): string {
  if (!subject) {
    return "Re: Your message to Second Advent Ministries";
  }

  return subject.startsWith("Re:")
    ? subject
    : `Re: ${subject}`;
}

export default function ContactMessageDetail({
  message,
  onArchived,
}: ContactMessageDetailProps) {
  const markAsReadMutation =
    useMarkContactMessageRead();

  const archiveMutation =
    useArchiveContactMessage();

  if (!message) {
    return (
      <div className="flex h-full min-h-96 items-center justify-center p-8">
        <div className="max-w-sm text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Select a message
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Select a contact message or prayer request
            from the list to view it here.
          </p>
        </div>
      </div>
    );
  }
  const selectedMessage = message;
  const isUnread =
    selectedMessage.status === "unread";

  const isArchived =
    selectedMessage.status === "archived";

  function handleMarkAsRead() {
    markAsReadMutation.mutate(selectedMessage._id);
  }

  function handleArchive() {
    archiveMutation.mutate(selectedMessage._id, {
      onSuccess: () => {
        onArchived?.();
      },
    });
  }

  return (
    <article className="flex h-full min-h-96 flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">
              {message.name}
            </h1>

            <a
              href={`mailto:${message.email}`}
              className="mt-1 block truncate text-sm text-sam-blue hover:underline"
            >
              {message.email}
            </a>
          </div>

          <time
            dateTime={message.createdAt}
            className="shrink-0 text-sm text-gray-500"
          >
            {formatDate(message.createdAt)}
          </time>
        </div>

        <div className="mt-5">
          <span className="inline-flex rounded-full bg-sam-blue/10 px-3 py-1 text-xs font-semibold text-sam-blue">
            {message.subject || "General Message"}
          </span>
        </div>
      </header>

      {/* Message */}
      <div className="flex-1 overflow-y-auto p-6">
        <p className="whitespace-pre-wrap text-base leading-7 text-gray-700">
          {message.message}
        </p>
      </div>

      {/* Status */}
      {isArchived && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <p className="text-sm font-medium text-gray-500">
            This message has been archived.
          </p>
        </div>
      )}

      {message.status === "read" &&
        message.readAt && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
            <p className="text-sm text-gray-500">
              Read on{" "}
              {formatDate(message.readAt)}
            </p>
          </div>
        )}

      {/* Actions */}
      {!isArchived && (
        <footer className="flex flex-wrap gap-3 border-t border-gray-200 p-6">
  <a
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      selectedMessage.email
    )}&su=${encodeURIComponent(
      getReplySubject(selectedMessage.subject)
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg bg-sam-blue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
  >
    Reply via Gmail
  </a>

  {isUnread && (
    <button
      type="button"
      onClick={handleMarkAsRead}
      disabled={
        markAsReadMutation.isPending ||
        archiveMutation.isPending
      }
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {markAsReadMutation.isPending
        ? "Marking..."
        : "Mark as read"}
    </button>
  )}

  <button
    type="button"
    onClick={handleArchive}
    disabled={
      archiveMutation.isPending ||
      markAsReadMutation.isPending
    }
    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {archiveMutation.isPending
      ? "Archiving..."
      : "Archive"}
  </button>
</footer>
      )}
    </article>
  );
}