// lib/api/contact.ts

import { api } from "./client";

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export function submitContact(data: ContactData) {
  return api("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}