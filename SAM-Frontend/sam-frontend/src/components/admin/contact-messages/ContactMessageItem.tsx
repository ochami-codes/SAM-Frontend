"use client";

import type { ContactMessage } from "@/src/lib/api/contact";

interface ContactMessageItemProps {
  message: ContactMessage;
  isSelected: boolean;
  onSelect: (messageId: string) => void;
}

function getMessageType(subject?: string): string {
  if (!subject) {
    return "General Message";
  }

  return subject;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function ContactMessageItem({
  message,
  isSelected,
  onSelect,
}: ContactMessageItemProps) {
  const isUnread =
    message.status === "unread";

  return (
    <button
      type="button"
      onClick={() => onSelect(message._id)}
      className={[
        "w-full border-b border-gray-200 p-4 text-left transition",
        "hover:bg-gray-50",
        "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sam-blue/20",
        isSelected
          ? "bg-sam-blue/5"
          : "bg-white",
      ].join(" ")}
      aria-current={
        isSelected ? "true" : undefined
      }
    >
      <div className="flex items-start gap-3">
        {/* Unread indicator */}
        <div className="pt-2">
          <span
            className={[
              "block h-2.5 w-2.5 rounded-full",
              isUnread
                ? "bg-sam-blue"
                : "bg-transparent",
            ].join(" ")}
            aria-label={
              isUnread
                ? "Unread"
                : undefined
            }
          />
        </div>

        <div className="min-w-0 flex-1">
          {/* Sender + date */}
          <div className="flex items-start justify-between gap-3">
            <p
              className={[
                "truncate text-sm",
                isUnread
                  ? "font-bold text-gray-900"
                  : "font-medium text-gray-700",
              ].join(" ")}
            >
              {message.name}
            </p>

            <time
              dateTime={message.createdAt}
              className="shrink-0 text-xs text-gray-500"
            >
              {formatDate(message.createdAt)}
            </time>
          </div>

          {/* Email */}
          <p className="mt-1 truncate text-xs text-gray-500">
            {message.email}
          </p>

          {/* Subject */}
          <p
            className={[
              "mt-2 truncate text-sm",
              isUnread
                ? "font-semibold text-gray-900"
                : "font-medium text-gray-700",
            ].join(" ")}
          >
            {getMessageType(message.subject)}
          </p>

          {/* Message preview */}
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {message.message}
          </p>
        </div>
      </div>
    </button>
  );
}