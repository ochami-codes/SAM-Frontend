"use client";

import { useState } from "react";
import Button from "@/src/components/ui/Button";
import { useInviteAdmin } from "@/src/hooks/admin/useInviteAdmin";

interface InviteAdministratorFormProps {
  onCancel: () => void;
}

export default function InviteAdministratorForm({
  onCancel,
}: InviteAdministratorFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const inviteAdminMutation = useInviteAdmin();

  function handleInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) return;

    inviteAdminMutation.mutate(
      {
        fullName: trimmedName,
        email: trimmedEmail,
      },
      {
        onSuccess: () => {
          setFullName("");
          setEmail("");
          onCancel();
        },
      }
    );
  }

  return (
    <div className="rounded-2xl border border-sam-border bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-sam-text">
            Invite an Administrator
          </h2>

          <p className="mt-1 text-sm text-sam-muted">
            Provide the administrator's full name and email address to send an
            invitation.
          </p>
        </div>

        <form
          onSubmit={handleInvite}
          className="grid gap-6 sm:grid-cols-2 sm:items-end"
        >
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-sam-text"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Jane Doe"
              minLength={2}
              maxLength={100}
              autoComplete="name"
              required
              className="w-full rounded-xl border border-sam-border bg-sam-surface px-4 py-3 text-sm text-sam-text outline-none transition placeholder:text-sam-muted focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-sam-text"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-sam-border bg-sam-surface px-4 py-3 text-sm text-sam-text outline-none transition placeholder:text-sam-muted focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
            />
          </div>

          <div className="flex gap-3 sm:col-span-2">
            <Button
              type="submit"
              disabled={inviteAdminMutation.isPending}
              className="w-full sm:w-auto"
            >
              {inviteAdminMutation.isPending
                ? "Sending..."
                : "Send Invitation"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={inviteAdminMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}