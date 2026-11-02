"use client";

import Button from "@/src/components/ui/Button";
import type { AdminInvitation } from "@/src/lib/api/admin";
import { useResendAdminInvitation } from "@/src/hooks/admin/useResendAdminInvitation";
import { useCancelAdminInvitation } from "@/src/hooks/admin/useCancelAdminInvitation";

interface PendingInvitationsSectionProps {
  invitations: AdminInvitation[];
}

export default function PendingInvitationsSection({
  invitations,
}: PendingInvitationsSectionProps) {
  const resendMutation = useResendAdminInvitation();
  const cancelMutation = useCancelAdminInvitation();

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  }

  function handleCancel(invitation: AdminInvitation) {
    const confirmed = window.confirm(
      `Are you sure you want to cancel the invitation sent to ${invitation.email}?`
    );

    if (confirmed) {
      cancelMutation.mutate(invitation.id);
    }
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-sam-text">
          Pending Invitations
        </h2>

        <p className="mt-1 text-sm text-sam-muted">
          Invitations that have not yet been accepted.
        </p>
      </div>

      {invitations.length === 0 ? (
        <div className="rounded-2xl border border-sam-border bg-white p-6 shadow-sm">
          <div className="py-8 text-center">
            <p className="text-sm text-sam-muted">
              No pending invitations.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="rounded-2xl border border-sam-border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-sam-text">
                    {invitation.fullName}
                  </p>

                  <p className="mt-1 text-sm text-sam-muted">
                    {invitation.email}
                  </p>

                  <p className="mt-2 text-xs text-sam-muted">
                    Expires {formatDate(invitation.expiresAt)}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={resendMutation.isPending || cancelMutation.isPending}
                    onClick={() => resendMutation.mutate(invitation.id)}
                  >
                    {resendMutation.isPending ? "Resending..." : "Resend"}
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    disabled={resendMutation.isPending || cancelMutation.isPending}
                    onClick={() => handleCancel(invitation)}
                  >
                    {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}