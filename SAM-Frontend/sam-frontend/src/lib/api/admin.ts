import { api } from "./client";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "admin";
  isActive: boolean;
  createdAt: string;
}

export interface AdminInvitation {
  id: string;
  fullName: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  invitedBy?: {
    fullName: string;
    email: string;
  };
}

export interface InviteAdminData {
  fullName: string;
  email: string;
}

export interface InviteAdminResponse {
  success: boolean;
  message: string;
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

interface RawAdminUser {
  _id: string;
  fullName: string;
  email: string;
  role: "admin";
  isActive: boolean;
  createdAt: string;
}

interface RawAdminInvitation {
  _id: string;
  fullName: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  invitedBy?: {
    fullName: string;
    email: string;
  };
}

/**
 * Get registered administrators.
 */
export async function getAdministrators(): Promise<AdminUser[]> {
  const response = await api<ApiListResponse<RawAdminUser>>(
    "/api/admin"
  );

  return response.data.map((admin) => ({
    id: admin._id,
    fullName: admin.fullName,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
    createdAt: admin.createdAt,
  }));
}

/**
 * Get pending administrator invitations.
 */
export async function getAdminInvitations(): Promise<AdminInvitation[]> {
  const response = await api<ApiListResponse<RawAdminInvitation>>(
    "/api/admin/invitations"
  );

  return response.data.map((invitation) => ({
    id: invitation._id,
    fullName: invitation.fullName,
    email: invitation.email,
    expiresAt: invitation.expiresAt,
    createdAt: invitation.createdAt,
    invitedBy: invitation.invitedBy,
  }));
}

/**
 * Invite an administrator.
 */
export async function adminInvitations(
  data: InviteAdminData
): Promise<InviteAdminResponse> {
  return api<InviteAdminResponse>("/api/admin/invitations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Resend an administrator invitation.
 */
export async function resendAdminInvitation(
  invitationId: string
): Promise<{ success: boolean; message: string }> {
  return api(`/api/admin/invitations/${invitationId}/resend`, {
    method: "POST",
  });
}

/**
 * Cancel an administrator invitation.
 */
export async function cancelAdminInvitation(
  invitationId: string
): Promise<{ success: boolean; message: string }> {
  return api(`/api/admin/invitations/${invitationId}`, {
    method: "DELETE",
  });
}

/**
 * Activate or suspend an administrator.
 */
export async function updateAdministratorStatus(
  adminId: string,
  isActive: boolean
): Promise<{ success: boolean; message: string }> {
  return api(`/api/admin/${adminId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });
}