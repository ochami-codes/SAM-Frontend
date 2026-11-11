"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Server,
  XCircle,
} from "lucide-react";

import { useSystemHealth } from "@/src/hooks/settings/useSystemHealth";

import { ServiceHealthCard } from "./ServiceHealthCard";

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    `${minutes}m`,
  ]
    .filter(Boolean)
    .join(" ");
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

const statusConfig = {
  operational: {
    label: "All Systems Operational",
    description: "All monitored services are running normally.",
    icon: CheckCircle2,
    styles: "border-green-200 bg-green-50 text-green-700",
  },
  degraded: {
    label: "System Degraded",
    description: "Some services are experiencing issues.",
    icon: AlertCircle,
    styles: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
  down: {
    label: "System Unavailable",
    description: "One or more critical services are unavailable.",
    icon: XCircle,
    styles: "border-red-200 bg-red-50 text-red-700",
  },
};

export function SystemHealthSection() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useSystemHealth();

  const status = data
    ? statusConfig[data.status]
    : null;

  const StatusIcon = status?.icon;

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              className="h-5 w-5 text-sam-blue"
              aria-hidden="true"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              System Health
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Monitor the availability of your platform services.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              isFetching ? "animate-spin" : ""
            }`}
            aria-hidden="true"
          />

          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-sam-blue" />

          <p className="mt-3 text-sm text-gray-500">
            Checking system health...
          </p>
        </div>
      )}

      {isError && !data && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />

            <div>
              <h3 className="text-sm font-semibold text-red-800">
                Unable to retrieve system health
              </h3>

              <p className="mt-1 text-sm text-red-700">
                The health monitoring endpoint could not be reached.
                Check your connection and try again.
              </p>
            </div>
          </div>
        </div>
      )}

      {data && (
        <>
          {status && StatusIcon && (
            <div
              className={`rounded-lg border p-5 ${status.styles}`}
            >
              <div className="flex items-start gap-3">
                <StatusIcon className="mt-0.5 h-6 w-6 shrink-0" />

                <div>
                  <h3 className="font-semibold">
                    {status.label}
                  </h3>

                  <p className="mt-1 text-sm opacity-90">
                    {status.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ServiceHealthCard
              name="backend"
              health={data.services.backend}
            />

            <ServiceHealthCard
              name="database"
              health={data.services.database}
            />

            <ServiceHealthCard
              name="cloudinary"
              health={data.services.cloudinary}
            />

            <ServiceHealthCard
              name="github"
              health={data.services.github}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Server className="h-4 w-4" />

                <span className="text-xs font-medium">
                  Environment
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold capitalize text-gray-900">
                {data.system.environment}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />

                <span className="text-xs font-medium">
                  Server Uptime
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {formatUptime(data.system.uptime)}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Activity className="h-4 w-4" />

                <span className="text-xs font-medium">
                  Last Checked
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {formatDate(data.system.checkedAt)}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}