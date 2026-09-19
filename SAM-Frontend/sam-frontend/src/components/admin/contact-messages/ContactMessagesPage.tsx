"use client";

import { useMemo, useState } from "react";

import { useContactMessages } from "@/src/hooks/contact/admin/useContactMessages";

import ContactMessageFilters, {
  type ContactMessageFilter,
} from "./ContactMessageFilters";
import ContactMessageList from "./ContactMessageList";
import ContactMessageDetail from "./ContactMessageDetail";
import ContactMessageEmpty from "./ContactMessageEmpty";

export default function ContactMessagesPage() {
  const [activeFilter, setActiveFilter] =
    useState<ContactMessageFilter>("all");

  const [selectedMessageId, setSelectedMessageId] =
    useState<string | undefined>();

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useContactMessages();

  const filteredMessages = useMemo(() => {
    if (activeFilter === "all") {
      return messages;
    }

    return messages.filter(
      (message) =>
        message.status === activeFilter
    );
  }, [messages, activeFilter]);

  const selectedMessage = messages.find(
    (message) =>
      message._id === selectedMessageId
  );

  const unreadCount = messages.filter(
    (message) =>
      message.status === "unread"
  ).length;

  function handleSelectMessage(
    messageId: string
  ): void {
    setSelectedMessageId(messageId);
  }

  function handleFilterChange(
    filter: ContactMessageFilter
  ): void {
    setActiveFilter(filter);
    setSelectedMessageId(undefined);
  }

  function handleBackToMessages(): void {
    setSelectedMessageId(undefined);
  }

  function handleArchived(): void {
    setSelectedMessageId(undefined);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading messages...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-96 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Unable to load messages
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Something went wrong while loading contact
            messages. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Contact Messages
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage contact messages and prayer requests.
            </p>
          </div>

          {unreadCount > 0 && (
            <span className="inline-flex w-fit rounded-full bg-sam-blue/10 px-3 py-1 text-sm font-semibold text-sam-blue">
              {unreadCount} unread
            </span>
          )}
        </div>
      </header>

      <ContactMessageFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        unreadCount={unreadCount}
      />

      {filteredMessages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white">
          <ContactMessageEmpty
            title={
              activeFilter === "all"
                ? "No messages yet"
                : `No ${activeFilter} messages`
            }
            description={
              activeFilter === "all"
                ? "Contact messages and prayer requests will appear here."
                : `There are currently no ${activeFilter} contact messages or prayer requests.`
            }
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Mobile */}
          <div className="lg:hidden">
            {selectedMessage ? (
              <div>
                <div className="border-b border-gray-200 p-4">
                  <button
                    type="button"
                    onClick={handleBackToMessages}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sam-blue hover:underline focus:outline-none focus:ring-2 focus:ring-sam-blue/20"
                  >
                    <span aria-hidden="true">
                      ←
                    </span>
                    Back to messages
                  </button>
                </div>

                <ContactMessageDetail
                  message={selectedMessage}
                  onArchived={handleArchived}
                />
              </div>
            ) : (
              <ContactMessageList
                messages={filteredMessages}
                selectedMessageId={
                  selectedMessageId
                }
                onSelectMessage={
                  handleSelectMessage
                }
              />
            )}
          </div>

          {/* Desktop */}
          <div className="hidden min-h-[600px] lg:grid lg:grid-cols-[360px_1fr]">
            <aside className="border-r border-gray-200">
              <ContactMessageList
                messages={filteredMessages}
                selectedMessageId={
                  selectedMessageId
                }
                onSelectMessage={
                  handleSelectMessage
                }
              />
            </aside>

            <main>
              <ContactMessageDetail
                message={selectedMessage}
                onArchived={handleArchived}
              />
            </main>
          </div>
        </div>
      )}
    </section>
  );
}