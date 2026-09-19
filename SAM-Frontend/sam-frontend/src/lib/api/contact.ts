import { api } from "./client";

export interface SubmitContactMessageData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SubmitContactMessageResponse {
  success: boolean;
  message: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "archived";
  readAt?: string;
  readBy?: string;
  createdAt: string;
  updatedAt: string;
}

export async function submitContactMessage(
  data: SubmitContactMessageData
): Promise<SubmitContactMessageResponse> {
  return api<SubmitContactMessageResponse>(
    "/api/contact",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function getContactMessages(): Promise<
  ContactMessage[]
> {
  const response = await api<{
    success: boolean;
    messages: ContactMessage[];
  }>("/api/admin/contact-messages");

  return response.messages;
}

export async function getContactMessage(
  messageId: string
): Promise<ContactMessage> {
  const response = await api<{
    success: boolean;
    message: ContactMessage;
  }>(
    `/api/admin/contact-messages/${messageId}`
  );

  return response.message;
}

export async function markContactMessageAsRead(
  messageId: string
): Promise<void> {
  await api<{
    success: boolean;
    message: string;
  }>(
    `/api/admin/contact-messages/${messageId}/read`,
    {
      method: "PATCH",
    }
  );
}

export async function archiveContactMessage(
  messageId: string
): Promise<void> {
  await api<{
    success: boolean;
    message: string;
  }>(
    `/api/admin/contact-messages/${messageId}/archive`,
    {
      method: "PATCH",
    }
  );
}