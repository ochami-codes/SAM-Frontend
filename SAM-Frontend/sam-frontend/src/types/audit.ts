export type AuditCategory =
  | "authentication"
  | "administrators"
  | "content"
  | "media"
  | "settings"
  | "contact"
  | "system";

export interface AuditActor {
  userId?: string;
  fullName?: string;
  email?: string;
}

export interface AuditResource {
  type?: string;
  id?: string;
}

export interface AuditLog {
  _id: string;
  actor?: AuditActor;
  action: string;
  category: AuditCategory;
  resource?: AuditResource;
  description: string;
  metadata: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface AuditLogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AuditLogsResponse {
  success: boolean;
  data: AuditLog[];
  pagination: AuditLogPagination;
}

export interface AuditLogResponse {
  success: boolean;
  data: AuditLog;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  category?: AuditCategory;
  action?: string;
  adminId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface AuditStats {
  total: number;
  categories: Record<AuditCategory, number>;
}

export interface AuditStatsResponse {
  success: boolean;
  data: AuditStats;
}