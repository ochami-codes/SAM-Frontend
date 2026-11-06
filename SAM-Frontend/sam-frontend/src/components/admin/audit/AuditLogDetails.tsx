"use client";

import {
  X,
  User,
  ShieldCheck,
  Globe,
  Calendar,
  FileText,
  Image,
  Mail,
  Settings,
  Server,
  Info,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type {
  AuditLog,
  AuditCategory,
} from "@/src/types/audit";

import { AuditCategoryBadge } from "./AuditCategoryBadge";
import { AuditActionBadge } from "./AuditActionBadge";

interface AuditLogDetailsProps {
  auditLog: AuditLog | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

interface DetailItem {
  label: string;
  value: string;
}

const categoryIcons: Record<AuditCategory, LucideIcon> = {
  authentication: ShieldCheck,
  administrators: User,
  content: FileText,
  media: Image,
  settings: Settings,
  contact: Mail,
  system: Server,
};

const metadataLabels: Record<string, string> = {
  role: "Role",
  section: "Section",
  slug: "Slug",
  category: "Content Category",
  status: "Status",
  previousStatus: "Previous Status",
  newStatus: "New Status",
  publicId: "Public ID",
  format: "File Format",
  bytes: "File Size",
  resourceType: "Resource Type",
};

const visibleMetadata: Record<AuditCategory, string[]> = {
  authentication: ["role"],
  administrators: ["role", "status", "previousStatus", "newStatus"],
  content: ["section", "slug", "category", "status"],
  media: ["publicId", "format", "bytes", "resourceType"],
  settings: [],
  contact: ["previousStatus", "newStatus"],
  system: [],
};

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(parsedDate);
}

function formatBytes(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return "Unavailable";
  }

  if (value < 1024) {
    return `${value} Bytes`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(2)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function getMetadataDetails(
  log: AuditLog
): DetailItem[] {
  const metadata = log.metadata ?? {};

  return visibleMetadata[log.category]
    .filter((key) => metadata[key] !== undefined)
    .map((key) => {
      const value = metadata[key];

      return {
        label: metadataLabels[key] ?? key,
        value:
          key === "bytes"
            ? formatBytes(value)
            : typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "boolean"
              ? String(value)
              : "Unavailable",
      };
    });
}

function getSecureMediaUrl(log: AuditLog): string | null {
  if (log.category !== "media") return null;

  const url = log.metadata?.secureUrl;

  if (typeof url !== "string") return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") return null;

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

function DetailRow({
  label,
  value,
}: DetailItem) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 py-3 last:border-0 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-xs font-medium text-gray-500">
        {label}
      </dt>

      <dd className="break-all text-sm text-gray-800 sm:max-w-[65%] sm:text-right">
        {value || "Unavailable"}
      </dd>
    </div>
  );
}

export function AuditLogDetails({
  auditLog,
  isOpen,
  isLoading = false,
  onClose,
}: AuditLogDetailsProps) {
  if (!isOpen) return null;

  const log = auditLog;

  const CategoryIcon = log
    ? categoryIcons[log.category]
    : Info;

  const metadataDetails = log
    ? getMetadataDetails(log)
    : [];

  const mediaUrl = log
    ? getSecureMediaUrl(log)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-details-title"
        className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2
              id="audit-details-title"
              className="text-lg font-semibold text-gray-900"
            >
              Audit Event Details
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Inspect the recorded activity and its context.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close audit details"
            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center text-sm text-gray-500">
              Loading audit event...
            </div>
          ) : !log ? (
            <div className="flex h-40 flex-col items-center justify-center text-center">
              <Info className="mb-3 h-8 w-8 text-gray-400" />

              <p className="text-sm font-medium text-gray-700">
                Audit event unavailable
              </p>

              <p className="mt-1 text-xs text-gray-500">
                The requested audit record could not be loaded.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Event summary */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sam-blue/10 text-sam-blue-dark">
                    <CategoryIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <AuditActionBadge action={log.action} />

                      <AuditCategoryBadge category={log.category} />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-900">
                      {log.description}
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />

                      {formatDate(log.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Administrator */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <User
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  Administrator
                </h3>

                <dl className="rounded-lg border border-gray-200 px-4">
                  <DetailRow
                    label="Full Name"
                    value={log.actor?.fullName || "Unknown administrator"}
                  />

                  <DetailRow
                    label="Email"
                    value={log.actor?.email || "Unavailable"}
                  />

                  <DetailRow
                    label="User ID"
                    value={log.actor?.userId || "Unavailable"}
                  />
                </dl>
              </section>

              {/* Resource */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FileText
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  Resource
                </h3>

                <dl className="rounded-lg border border-gray-200 px-4">
                  <DetailRow
                    label="Resource Type"
                    value={log.resource?.type?.replace(/_/g, " ") || "Unavailable"}
                  />

                  <DetailRow
                    label="Resource ID"
                    value={log.resource?.id || "Unavailable"}
                  />
                </dl>
              </section>

              {/* Event metadata */}
              {metadataDetails.length > 0 && (
                <section>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Info
                      className="h-4 w-4 text-gray-500"
                      aria-hidden="true"
                    />
                    Event Metadata
                  </h3>

                  <dl className="rounded-lg border border-gray-200 px-4">
                    {metadataDetails.map((item) => (
                      <DetailRow
                        key={item.label}
                        {...item}
                      />
                    ))}
                  </dl>
                </section>
              )}

              {/* Media URL */}
              {mediaUrl && (
                <section>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Image
                      className="h-4 w-4 text-gray-500"
                      aria-hidden="true"
                    />
                    Media Asset
                  </h3>

                  <a
                    href={mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-sm text-sam-blue-dark underline hover:text-sam-blue"
                  >
                    View media asset
                  </a>
                </section>
              )}

              {/* Request information */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Globe
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  Request Information
                </h3>

                <dl className="rounded-lg border border-gray-200 px-4">
                  <DetailRow
                    label="IP Address"
                    value={log.ipAddress || "Unavailable"}
                  />

                  <DetailRow
                    label="User Agent"
                    value={log.userAgent || "Unavailable"}
                  />
                </dl>
              </section>

              {/* Event identifier */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-400">
                  Audit Record ID
                </p>

                <p className="mt-1 break-all font-mono text-xs text-gray-500">
                  {log._id}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}