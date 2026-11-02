"use client";

import { useState } from "react";

import Button from "@/src/components/ui/Button";

import InviteAdministratorForm from "@/src/components/admin/administrators/InviteAdministratorForm";
import AdministratorsSection from "@/src//components/admin/administrators/AdministratorsSection";
import PendingInvitationsSection from "@/src//components/admin/administrators/PendingInvitationsSection";

import type {
  Administrator,
  PendingInvitation,
} from "@/src/types/administrator";

// Temporary data until the API integration is implemented.
const administrators: Administrator[] = [
  {
    id: "1",
    email: "admin@example.com",
    isActive: true,
    fullName: "John Doe",
    role: "admin",
    createdAt: "September 1, 2026",
  },
];

const pendingInvitations: PendingInvitation[] = [];

export default function AdministratorsPage() {
  const [showInviteForm, setShowInviteForm] = useState(false);

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sam-text">
            Administrators
          </h1>

          <p className="mt-1 text-sm text-sam-muted">
            Manage administrator accounts and invitations.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setShowInviteForm((current) => !current)}
        >
          {showInviteForm ? "Close Form" : "Invite Administrator"}
        </Button>
      </header>

      {showInviteForm && (
        <InviteAdministratorForm
          onCancel={() => setShowInviteForm(false)}
        />
      )}

      <AdministratorsSection administrators={administrators} />

      <PendingInvitationsSection invitations={pendingInvitations} />
    </div>
  );
}
