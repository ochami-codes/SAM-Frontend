import { api } from "./client";

export interface ActiveSession {
  sessionId: string;
  deviceName: string;
  ipAddress: string | null;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
  isCurrent: boolean;
}

export interface ActiveSessionsResponse {
  sessions: ActiveSession[];
  total: number;
}

export interface RevokeOtherSessionsResponse {
  revokedCount: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Retrieve the authenticated administrator's active sessions.
 */
export async function getActiveSessions(): Promise<ActiveSessionsResponse> {
  const response = await api<ApiResponse<ActiveSessionsResponse>>(
    "/api/auth/sessions",
    {
      method: "GET",
    },
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to retrieve active sessions.");
  }

  return response.data;
}

/**
 * Revoke a specific session.
 */
export async function revokeSession(
  sessionId: string,
): Promise<void> {
  const response = await api<ApiResponse<undefined>>(
    `/api/auth/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.success) {
    throw new Error("Unable to revoke the selected session.");
  }
}

/**
 * Revoke all other sessions while preserving the current session.
 */
export async function revokeOtherSessions(): Promise<RevokeOtherSessionsResponse> {
  const response = await api<ApiResponse<RevokeOtherSessionsResponse>>(
    "/api/auth/sessions/others",
    {
      method: "DELETE",
    },
  );

  if (!response.success || !response.data) {
    throw new Error("Unable to revoke other sessions.");
  }

  return response.data;
}