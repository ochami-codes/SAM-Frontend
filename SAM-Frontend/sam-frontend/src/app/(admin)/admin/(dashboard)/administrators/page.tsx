"use client";

import { useState } from "react";
import RequireRole  from "@/src/components/auth/RequireRole";
import Button from "@/src/components/ui/Button";

import InviteAdministratorForm from "@/src/components/admin/administrators/InviteAdministratorForm";
import AdministratorsSection from "@/src/components/admin/administrators/AdministratorsSection";
import PendingInvitationsSection from "@/src/components/admin/administrators/PendingInvitationsSection";

import { useAdministrators } from "@/src/hooks/admin/useAdministrators";
import { useAdminInvitations } from "@/src/hooks/admin/useAdminInvitations";

export default function AdministratorsPage() {
  const [showInviteForm, setShowInviteForm] = useState(false);

  const {
    data: administrators = [],
    isLoading: administratorsLoading,
    isError: administratorsError,
    refetch: refetchAdministrators,
  } = useAdministrators();

  const {
    data: invitations = [],
    isLoading: invitationsLoading,
    isError: invitationsError,
    refetch: refetchInvitations,
  } = useAdminInvitations();

  const isLoading = administratorsLoading || invitationsLoading;

  return (
    <RequireRole roles={["super_admin"]}>
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

      {isLoading ? (
        <div className="rounded-2xl border border-sam-border bg-white p-8 text-center">
          <p className="text-sm text-sam-muted">
            Loading administrator information...
          </p>
        </div>
      ) : (
        <>
          {administratorsError ? (
            <div className="rounded-2xl border border-red-200 bg-white p-6">
              <p className="text-sm text-red-600">
                Unable to load administrators.
              </p>

              <Button
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={() => refetchAdministrators()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <AdministratorsSection administrators={administrators} />
          )}

          {invitationsError ? (
            <div className="rounded-2xl border border-red-200 bg-white p-6">
              <p className="text-sm text-red-600">
                Unable to load pending invitations.
              </p>

              <Button
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={() => refetchInvitations()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <PendingInvitationsSection invitations={invitations} />
          )}
        </>
      )}
    </div>
    </RequireRole>
  );
}