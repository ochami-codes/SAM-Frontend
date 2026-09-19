"use client";

import type { ContactMessage } from "@/src/lib/api/contact";

import ContactMessageItem from "./ContactMessageItem";

interface ContactMessageListProps {
  messages: ContactMessage[];
  selectedMessageId?: string;
  onSelectMessage: (messageId: string) => void;
}

export default function ContactMessageList({
  messages,
  selectedMessageId,
  onSelectMessage,
}: ContactMessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center p-6">
        <p className="text-center text-sm text-gray-500">
          No messages found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto"
      aria-label="Contact messages"
    >
      {messages.map((message) => (
        <ContactMessageItem
          key={message._id}
          message={message}
          isSelected={
            selectedMessageId === message._id
          }
          onSelect={onSelectMessage}
        />
      ))}
    </div>
  );
}