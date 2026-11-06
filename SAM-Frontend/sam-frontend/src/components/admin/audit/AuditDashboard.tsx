"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, AlertCircle } from "lucide-react";

import type {
  AuditCategory,
  AuditLogFilters,
} from "@/src/types/audit";

import { useAuditLogs } from "@/src/hooks/audit/useAuditLogs";
import { useAuditLog } from "@/src/hooks/audit/useAuditLog";
import { useAuditStats } from "@/src/hooks/audit/useAuditStats";
import { AuditFilters } from "./AuditFilters";
import { AuditActivityTable } from "./AuditActivityTable";
import { AuditLogDetails } from "./AuditLogDetails";
import { AuditSummaryCards } from "./AuditSummaryCards";

const PAGE_SIZE = 20;

export function AuditDashboard() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState<
    AuditCategory | "all"
  >("all");

  const [action, setAction] = useState("");
  const [adminId, setAdminId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedAuditLogId, setSelectedAuditLogId] =
    useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    category,
    action,
    adminId,
    startDate,
    endDate,
  ]);

  // Build API filters
  const filters = useMemo<AuditLogFilters>(
    () => ({
      page,
      limit: PAGE_SIZE,
      ...(debouncedSearch && {
        search: debouncedSearch,
      }),
      ...(category !== "all" && {
        category,
      }),
      ...(action && {
        action,
      }),
      ...(adminId && {
        adminId,
      }),
      ...(startDate && {
        startDate,
      }),
      ...(endDate && {
        endDate,
      }),
    }),
    [
      page,
      debouncedSearch,
      category,
      action,
      adminId,
      startDate,
      endDate,
    ]
  );

  // Fetch audit logs
  const {
    data: auditResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAuditLogs(filters);

  const auditLogs = auditResponse?.data ?? [];

  const pagination = auditResponse?.pagination ?? {
    page,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  // Fetch selected audit log
  const {
    data: selectedAuditLog,
    isLoading: isDetailLoading,
  } = useAuditLog(selectedAuditLogId ?? "");
  // Fetch audit stats
  const {
  data: statsResponse,
  isPending: isStatsPending,
  isError: isStatsError,
} = useAuditStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              className="h-6 w-6 text-sam-blue-dark"
              aria-hidden="true"
            />

            <h1 className="text-2xl font-semibold text-gray-900">
              Audit Logs
            </h1>
          </div>

          <p className="mt-1 max-w-xl text-sm text-gray-500">
            Monitor administrative actions, authentication
            events and system activity across Second Advent
            Ministries.
          </p>
        </div>
      </div>
      {/* Summary Cards */}
      <AuditSummaryCards
  stats={statsResponse?.data ?? {
    total: 0,
    categories: {
      authentication: 0,
      administrators: 0,
      content: 0,
      media: 0,
      settings: 0,
      contact: 0,
      system: 0,
    },
  }}
  isLoading={isStatsPending}
/>
      {/* Filters */}
      <AuditFilters
        search={search}
        category={category}
        action={action}
        adminId={adminId}
        startDate={startDate}
        endDate={endDate}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onActionChange={setAction}
        onAdminIdChange={setAdminId}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Error State */}
      {isError && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-medium text-red-800">
                Unable to load audit logs.
              </p>

              <p className="mt-1 text-xs text-red-600">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Activity Table */}
      <AuditActivityTable
        data={auditLogs}
        pagination={pagination}
        isLoading={isLoading}
        isFetching={isFetching}
        onPageChange={setPage}
        onViewDetails={setSelectedAuditLogId}
      />

      {/* Details Panel */}
      <AuditLogDetails
        auditLog={selectedAuditLog ?? null}
        isOpen={Boolean(selectedAuditLogId)}
        isLoading={isDetailLoading}
        onClose={() => setSelectedAuditLogId(null)}
      />
    </div>
  );
}