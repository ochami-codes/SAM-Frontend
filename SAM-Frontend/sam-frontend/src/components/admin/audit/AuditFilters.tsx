import {
  Search,
  RotateCcw,
} from "lucide-react";

import type { AuditCategory } from "@/src/types/audit";

interface AuditFiltersProps {
  search: string;
  category: AuditCategory | "all";
  action: string;
  adminId: string;
  startDate: string;
  endDate: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: AuditCategory | "all") => void;
  onActionChange: (value: string) => void;
  onAdminIdChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

const categories: {
  label: string;
  value: AuditCategory | "all";
}[] = [
  { label: "All Categories", value: "all" },
  { label: "Authentication", value: "authentication" },
  { label: "Administrators", value: "administrators" },
  { label: "Content", value: "content" },
  { label: "Media", value: "media" },
  { label: "Settings", value: "settings" },
  { label: "Contact", value: "contact" },
  { label: "System", value: "system" },
];

const inputStyles =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20";

export function AuditFilters({
  search,
  category,
  action,
  adminId,
  startDate,
  endDate,
  onSearchChange,
  onCategoryChange,
  onActionChange,
  onAdminIdChange,
  onStartDateChange,
  onEndDateChange,
}: AuditFiltersProps) {
  function clearFilters() {
    onSearchChange("");
    onCategoryChange("all");
    onActionChange("");
    onAdminIdChange("");
    onStartDateChange("");
    onEndDateChange("");
  }

  const hasActiveFilters =
    search !== "" ||
    category !== "all" ||
    action !== "" ||
    adminId !== "" ||
    startDate !== "" ||
    endDate !== "";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Filter Audit Logs
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Narrow down activity by category, action, administrator or date.
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
        >
          <RotateCcw
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Search */}
        <div className="sm:col-span-2 xl:col-span-1">
          <label
            htmlFor="audit-search"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            Search
          </label>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />

            <input
              id="audit-search"
              type="search"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search audit activity..."
              className={`${inputStyles} pl-9`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="audit-category"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            Category
          </label>

          <select
            id="audit-category"
            value={category}
            onChange={(event) =>
              onCategoryChange(
                event.target.value as AuditCategory | "all"
              )
            }
            className={inputStyles}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action */}
        <div>
          <label
            htmlFor="audit-action"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            Action
          </label>

          <input
            id="audit-action"
            type="text"
            value={action}
            onChange={(event) =>
              onActionChange(event.target.value.toUpperCase())
            }
            placeholder="e.g. LOGIN_FAILED"
            className={inputStyles}
          />
        </div>

        {/* Administrator ID */}
        <div>
          <label
            htmlFor="audit-admin"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            Administrator ID
          </label>

          <input
            id="audit-admin"
            type="text"
            value={adminId}
            onChange={(event) =>
              onAdminIdChange(event.target.value.trim())
            }
            placeholder="Enter administrator ID"
            className={inputStyles}
          />
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="audit-start-date"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            Start Date
          </label>

          <input
            id="audit-start-date"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(event) =>
              onStartDateChange(event.target.value)
            }
            className={inputStyles}
          />
        </div>

        {/* End Date */}
        <div>
          <label
            htmlFor="audit-end-date"
            className="mb-1.5 block text-xs font-medium text-gray-600"
          >
            End Date
          </label>

          <input
            id="audit-end-date"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(event) =>
              onEndDateChange(event.target.value)
            }
            className={inputStyles}
          />
        </div>
      </div>
    </div>
  );
}