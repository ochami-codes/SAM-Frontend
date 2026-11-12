"use client";

import {
  AlertCircle,
  Clock3,
  Laptop,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

import { toast } from "sonner";

import { useActiveSessions } from "@/src/hooks/auth/useActiveSessions";
import { useRevokeSession } from "@/src/hooks/auth/useRevokeSession";
import { useRevokeOtherSessions } from "@/src/hooks/auth/useRevokeOtherSessions";

import type { ActiveSession } from "@/src/lib/api/sessions";
import { createElement } from "react";

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function getDeviceIcon(deviceName: string) {
  const device = deviceName.toLowerCase();

  if (
    device.includes("android") ||
    device.includes("ios")
  ) {
    return Smartphone;
  }

  if (
    device.includes("windows") ||
    device.includes("macos") ||
    device.includes("linux")
  ) {
    return Laptop;
  }

  return MonitorSmartphone;
}

function SessionCard({
  session,
  isRevoking,
  onRevoke,
}: {
  session: ActiveSession;
  isRevoking: boolean;
  onRevoke: (sessionId: string) => void;
}) {
 const DeviceIcon = getDeviceIcon(session.deviceName);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {createElement(DeviceIcon, { size: 22 })}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900">
              {session.deviceName || "Unknown device"}
            </h3>

            {session.isCurrent && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                <ShieldCheck size={13} />
                This device
              </span>
            )}
          </div>

          <div className="mt-2 space-y-1.5 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <Wifi size={14} />
              {session.ipAddress || "IP address unavailable"}
            </p>

            <p className="flex items-center gap-2">
              <Clock3 size={14} />
              Last active: {formatDate(session.lastActiveAt)}
            </p>

            <p className="text-xs text-gray-400">
              Signed in: {formatDate(session.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {!session.isCurrent && (
        <button
          type="button"
          onClick={() => onRevoke(session.sessionId)}
          disabled={isRevoking}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={15} />

          {isRevoking ? "Revoking..." : "Revoke"}
        </button>
      )}
    </div>
  );
}

export default function ActiveSessions() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useActiveSessions();

  const revokeSessionMutation = useRevokeSession();
  const revokeOtherSessionsMutation = useRevokeOtherSessions();

  const sessions = data?.sessions ?? [];
  const otherSessions = sessions.filter(
    (session) => !session.isCurrent,
  );

  async function handleRevokeSession(sessionId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to revoke this session? The device will need to log in again.",
    );

    if (!confirmed) return;

    try {
      await revokeSessionMutation.mutateAsync(sessionId);

      toast.success("Session revoked successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to revoke this session.",
      );
    }
  }

  async function handleRevokeOtherSessions() {
    if (otherSessions.length === 0) return;

    const confirmed = window.confirm(
      `This will revoke ${otherSessions.length} other session(s). Your current session will remain active. Continue?`,
    );

    if (!confirmed) return;

    try {
      const result =
        await revokeOtherSessionsMutation.mutateAsync();

      toast.success(
        `${result.revokedCount} other session(s) revoked successfully.`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to revoke other sessions.",
      );
    }
  }

  return (
    <section className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MonitorSmartphone
              size={21}
              className="text-blue-600"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              Active Sessions
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Review devices currently signed in to your administrator
            account.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw
            size={15}
            className={isFetching ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Session summary */}
      {!isLoading && !isError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-blue-900">
              {sessions.length} active{" "}
              {sessions.length === 1 ? "session" : "sessions"}
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              {otherSessions.length} other{" "}
              {otherSessions.length === 1 ? "device" : "devices"}
            </p>
          </div>

          {otherSessions.length > 0 && (
            <button
              type="button"
              onClick={handleRevokeOtherSessions}
              disabled={revokeOtherSessionsMutation.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={15} />

              {revokeOtherSessionsMutation.isPending
                ? "Revoking..."
                : "Revoke other sessions"}
            </button>
          )}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3" aria-label="Loading sessions">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle
            size={28}
            className="text-red-500"
          />

          <div>
            <p className="font-medium text-red-800">
              Unable to load active sessions.
            </p>

            <p className="mt-1 text-sm text-red-600">
              Please check your connection and try again.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && sessions.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center">
          <MonitorSmartphone
            size={32}
            className="mx-auto text-gray-400"
          />

          <h3 className="mt-3 font-semibold text-gray-900">
            No active sessions found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your active sessions will appear here.
          </p>
        </div>
      )}

      {/* Session list */}
      {!isLoading && !isError && sessions.length > 0 && (
        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionCard
              key={session.sessionId}
              session={session}
              isRevoking={
                revokeSessionMutation.isPending &&
                revokeSessionMutation.variables === session.sessionId
              }
              onRevoke={handleRevokeSession}
            />
          ))}
        </div>
      )}

      {/* Security note */}
      <div className="flex items-start gap-2 border-t border-gray-200 pt-4 text-xs leading-relaxed text-gray-500">
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-green-600"
        />

        <p>
          If you notice an unfamiliar device, revoke its session
          immediately. Revoked devices will need to authenticate again.
        </p>
      </div>
    </section>
  );
}