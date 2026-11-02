export interface Administrator {
  id: string;
  fullName: string;
  email: string;
  role: "admin";
  isActive: boolean;
  createdAt: string;
}

export interface PendingInvitation {
  fullName: string;
  id: string;
  email: string;
  expiresAt: string;
  createdAt: string;
}