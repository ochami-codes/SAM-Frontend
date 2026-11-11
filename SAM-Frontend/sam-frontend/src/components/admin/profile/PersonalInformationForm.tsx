"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, Save, UserRound } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/src/hooks/auth/useAuth";
import { updateProfile } from "@/src/lib/api/profile";

export default function PersonalInformationForm() {
  const { user, refreshAuth } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName ?? "");
  }, [user?.fullName]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();

    if (trimmedName.length < 2) {
      toast.error("Full name must contain at least 2 characters.");
      return;
    }

    if (trimmedName.length > 100) {
      toast.error("Full name cannot exceed 100 characters.");
      return;
    }

    if (trimmedName === user?.fullName) {
      toast.info("No changes were made.");
      return;
    }

    setIsSaving(true);

    try {
      await updateProfile({
        fullName: trimmedName,
      });

      await refreshAuth();

      toast.success("Personal information updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your personal information.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (!user) return null;

  const hasChanges = fullName.trim() !== user.fullName;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sam-blue/10 text-sam-blue">
          <UserRound className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Personal information
          </h2>

          <p className="text-sm text-gray-500">
            Update your administrator account details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            minLength={2}
            maxLength={100}
            required
            disabled={isSaving}
            autoComplete="name"
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/10 disabled:bg-gray-50"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Your name will appear across the administration dashboard.
          </p>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={user.email}
            disabled
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Your email address cannot be changed from this page.
          </p>
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Administrator role
          </label>

          <input
            id="role"
            type="text"
            value={user.role.replace("_", " ")}
            disabled
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm capitalize text-gray-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className="inline-flex items-center gap-2 rounded-lg bg-sam-blue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sam-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}