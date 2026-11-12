"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/src/hooks/auth/useAuth";
import ProfilePhotoUploader from "@/src/components/admin/profile/ProfilePhotoUploader";
import PersonalInformationForm from "@/src/components/admin/profile/PersonalInformationForm";
import ChangePasswordForm from "@/src/components/admin/profile/ChangePasswordForm";
import TwoFactorSettings from "@/src/components/admin/profile/TwoFactorSettings";
import ActiveSessions from "@/src/components/admin/profile/ActiveSessions";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-sam-blue" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-sam-blue"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account security.
          </p>
        </div>
      </div>

      {/* Profile overview */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sam-blue/10 text-sam-blue">
            <UserRound className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Profile overview
            </h2>
            <p className="text-sm text-gray-500">
              Your administrator account information.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ProfilePhotoUploader
            currentImage={user.profileImage ?? null}
          />

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Account holder
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {user.fullName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Email address
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Administrator role
              </p>

              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-sam-blue/10 px-3 py-1 text-xs font-semibold capitalize text-sam-blue">
                <ShieldCheck className="h-3.5 w-3.5" />
                {user.role.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal information */}
<PersonalInformationForm />

      {/* Password and account security */}
<ChangePasswordForm />

<TwoFactorSettings />

<ActiveSessions />
    </div>
  );
}