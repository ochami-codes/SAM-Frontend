"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";

import { setAccessToken } from "@/src/lib/api/client";

import TwoFactorSettings from "@/src/components/admin/profile/TwoFactorSettings";

export default function TwoFactorEnrollmentPage() {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enrollmentToken = sessionStorage.getItem(
      "twoFactorEnrollmentToken"
    );

    if (!enrollmentToken) {
      router.replace("/admin/auth/login");
      return;
    }

    setAccessToken(enrollmentToken);
    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <LoaderCircle
          size={30}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <ShieldCheck size={28} className="text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Secure Your Account
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Complete two-factor authentication enrollment to
            continue to the SAM administrator dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <TwoFactorSettings mode="required" />
        </div>

        <p className="text-center text-xs text-gray-500">
          Second Advent Ministries · Administrator Security
        </p>
      </div>
    </main>
  );
}