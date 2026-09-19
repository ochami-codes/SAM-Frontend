"use client";

export type ContactMessageFilter =
  | "all"
  | "unread"
  | "read"
  | "archived";

interface ContactMessageFiltersProps {
  activeFilter: ContactMessageFilter;
  onFilterChange: (
    filter: ContactMessageFilter
  ) => void;
  unreadCount?: number;
}

const filters: {
  label: string;
  value: ContactMessageFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
  {
    label: "Read",
    value: "read",
  },
  {
    label: "Archived",
    value: "archived",
  },
];

export default function ContactMessageFilters({
  activeFilter,
  onFilterChange,
  unreadCount = 0,
}: ContactMessageFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Contact message filters"
    >
      {filters.map((filter) => {
        const isActive =
          activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() =>
              onFilterChange(filter.value)
            }
            className={[
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              "focus:outline-none focus:ring-2 focus:ring-sam-blue/20",
              isActive
                ? "bg-sam-blue text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            ].join(" ")}
          >
            {filter.label}

            {filter.value === "unread" &&
              unreadCount > 0 && (
                <span
                  className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs"
                  aria-label={`${unreadCount} unread messages`}
                >
                  {unreadCount}
                </span>
              )}
          </button>
        );
      })}
    </div>
  );
}