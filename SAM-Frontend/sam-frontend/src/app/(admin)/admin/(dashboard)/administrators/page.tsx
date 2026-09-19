"use client";

import { useState } from "react";
import { useInviteAdmin } from "@/src/hooks/admin/useInviteAdmin";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

interface Administrator {
  id: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface PendingInvitation {
  id: string;
  email: string;
  expiresAt: string;
}

const administrators: Administrator[] = [
  {
    id: "1",
    email: "admin@example.com",
    status: "active",
    createdAt: "September 1, 2026",
  },
];

const pendingInvitations: PendingInvitation[] = [];

export default function AdministratorsPage() {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const inviteAdminMutation = useInviteAdmin();
  function handleInvite(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    // Call the mutation to send the invitation
    inviteAdminMutation.mutate({ fullName, email });

    setFullName("");
    setEmail("");
    setShowInviteForm(false);
  }

  return (
    <div className="space-y-10">
      {/* Page header */}
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
          Invite Administrator
        </Button>
      </header>

      {/* Invitation form */}
      {showInviteForm && (
        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-sam-text">
                Invite an Administrator
              </h2>
              <p className="mt-1 text-sm text-sam-muted">
                Provide the administrator’s full name and email address to send an invitation.
              </p>
            </div>

            <form
              onSubmit={handleInvite}
              className="grid gap-6 sm:grid-cols-2 sm:items-end"
            >
              {/* Full name */}
              <div className="flex-1">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-sam-text"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full rounded-xl border border-sam-border bg-sam-surface px-4 py-3 text-sm text-sam-text outline-none transition placeholder:text-sam-muted focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
                />
              </div>

              {/* Email */}
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-sam-text"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-sam-border bg-sam-surface px-4 py-3 text-sm text-sam-text outline-none transition placeholder:text-sam-muted focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
                />
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <Button
  type="submit"
  className="w-full sm:w-auto"
  disabled={inviteAdminMutation.isPending}
>
  {inviteAdminMutation.isPending
    ? "Sending..."
    : "Send Invitation"}
</Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Administrator accounts */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-sam-text">
            Administrator Accounts
          </h2>
          <p className="mt-1 text-sm text-sam-muted">
            Users who currently have administrator access.
          </p>
        </div>

        {administrators.length === 0 ? (
          <Card>
            <div className="py-8 text-center">
              <p className="text-sm text-sam-muted">
                No administrator accounts found.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {administrators.map((administrator) => (
              <Card key={administrator.id}>
                <div className="space-y-5">
                  {/* Admin info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sam-text">
                        {administrator.email}
                      </p>
                      <p className="mt-1 text-sm text-sam-muted">
                        Administrator
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="border-t border-sam-border pt-4">
                    <p className="text-xs text-sam-muted">Account created</p>
                    <p className="mt-1 text-sm text-sam-text">
                      {administrator.createdAt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button type="button" variant="secondary" className="flex-1">
                      View
                    </Button>
                    <Button type="button" variant="secondary" className="flex-1">
                      Deactivate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Pending invitations */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-sam-text">
            Pending Invitations
          </h2>
          <p className="mt-1 text-sm text-sam-muted">
            Invitations that have not yet been accepted.
          </p>
        </div>

        {pendingInvitations.length === 0 ? (
          <Card>
            <div className="py-8 text-center">
              <p className="text-sm text-sam-muted">No pending invitations.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingInvitations.map((invitation) => (
              <Card key={invitation.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-sam-text">
                      {invitation.email}
                    </p>
                    <p className="mt-1 text-sm text-sam-muted">
                      Expires {invitation.expiresAt}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="secondary">
                      Resend
                    </Button>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
