"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import type {
  AuditLog,
  AuditLogPagination,
} from "@/src/types/audit";

import {
  ResponsiveDataView,
} from "@/src/components/ui/ResponsiveDataView";

import type {
  DataTableColumn,
} from "@/src/components/ui/DataTable";

import { AuditCategoryBadge } from "./AuditCategoryBadge";
import { AuditActionBadge } from "./AuditActionBadge";

interface AuditActivityTableProps {
  data: AuditLog[];
  pagination: AuditLogPagination;
  isLoading?: boolean;
  isFetching?: boolean;
  onPageChange: (page: number) => void;
  onViewDetails: (auditLogId: string) => void;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getActorName(log: AuditLog): string {
  return log.actor?.fullName || "Unknown administrator";
}

function getActorEmail(log: AuditLog): string {
  return log.actor?.email || "No email available";
}

function getResource(log: AuditLog): string {
  if (!log.resource) return "No resource";

  return log.resource.type
    ? log.resource.type.replace(/_/g, " ")
    : "Unknown resource";
}

export function AuditActivityTable({
  data,
  pagination,
  isLoading = false,
  isFetching = false,
  onPageChange,
  onViewDetails,
}: AuditActivityTableProps) {
  const columns: DataTableColumn<AuditLog>[] = [
    {
      key: "actor",
      header: "Administrator",
      render: (log) => (
        <div className="min-w-[150px]">
          <p className="font-medium text-gray-900">
            {getActorName(log)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {getActorEmail(log)}
          </p>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (log) => (
        <AuditActionBadge action={log.action} />
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (log) => (
        <AuditCategoryBadge category={log.category} />
      ),
    },
    {
      key: "resource",
      header: "Resource",
      render: (log) => (
        <div className="min-w-[120px]">
          <p className="font-medium capitalize text-gray-700">
            {getResource(log)}
          </p>

          {log.resource?.id && (
            <p
              className="mt-1 max-w-[150px] truncate text-xs text-gray-400"
              title={log.resource.id}
            >
              {log.resource.id}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "ipAddress",
      header: "IP Address",
      render: (log) => (
        <span className="whitespace-nowrap text-xs text-gray-500">
          {log.ipAddress || "Unavailable"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (log) => (
        <span className="whitespace-nowrap text-xs text-gray-500">
          {formatDate(log.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      headerClassName: "text-right",
      className: "text-right",
      render: (log) => (
        <button
          type="button"
          onClick={() => onViewDetails(log._id)}
          aria-label={`View details for ${log.action}`}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-sam-blue-dark transition hover:bg-sam-blue/10"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Details
        </button>
      ),
    },
  ];

  function renderMobileItem(log: AuditLog) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <AuditActionBadge action={log.action} />
          <AuditCategoryBadge category={log.category} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">
            {getActorName(log)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {getActorEmail(log)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-400">Resource</p>
            <p className="mt-1 capitalize text-gray-700">
              {getResource(log)}
            </p>
          </div>

          <div>
            <p className="text-gray-400">IP Address</p>
            <p className="mt-1 text-gray-700">
              {log.ipAddress || "Unavailable"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-500">
            {formatDate(log.createdAt)}
          </span>

          <button
            type="button"
            onClick={() => onViewDetails(log._id)}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-sam-blue-dark transition hover:bg-sam-blue/10"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-1 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Review administrative and system activity.
          </p>
        </div>

        <p className="text-xs text-gray-500">
          {pagination.total.toLocaleString()} total events
        </p>
      </div>

      {isLoading ? (
        <div className="px-4 py-12 text-center text-sm text-gray-500">
          Loading audit activity...
        </div>
      ) : (
        <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
          <ResponsiveDataView
            data={data}
            columns={columns}
            getRowKey={(log) => log._id}
            renderMobileItem={renderMobileItem}
            emptyMessage="No audit activity found."
          />
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          Page {pagination.totalPages === 0 ? 0 : pagination.page} of{" "}
          {pagination.totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={
              !pagination.hasPreviousPage || isFetching
            }
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>

          <button
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={
              !pagination.hasNextPage || isFetching
            }
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}