import { api } from "./client";
import type {
  AuditLog,
  AuditLogFilters,
  AuditLogResponse,
  AuditLogsResponse,
  AuditStatsResponse,
} from "@/src/types/audit";

export async function getAuditLogs(
  filters: AuditLogFilters = {}
): Promise<AuditLogsResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const query = params.toString();

  return api<AuditLogsResponse>(
    `/api/audit${query ? `?${query}` : ""}`
  );
}

export async function getAuditLogById(
  auditLogId: string
): Promise<AuditLog> {
  const response = await api<AuditLogResponse>(
    `/api/audit/${encodeURIComponent(auditLogId)}`
  );

  return response.data;
}

export async function getAuditStats(): Promise<AuditStatsResponse> {
  return api<AuditStatsResponse>("/api/audit/stats");
}