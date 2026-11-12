"use client";

import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <ShieldX
            size={40}
            className="text-red-600"
          />
        </div>

        {/* Error code */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
          Error 403
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Access Denied
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          You don't have permission to access this resource.
          Your account is authenticated, but the requested
          operation requires additional privileges.
        </p>

        {/* Notice */}
        <div className="mt-8 rounded-xl border border-red-100 bg-red-50 p-4 text-left">
          <p className="text-sm font-semibold text-red-800">
            Why am I seeing this?
          </p>

          <p className="mt-1 text-sm leading-6 text-red-700">
            Access to this resource is restricted based on
            administrator roles and permissions. If you
            believe this is a mistake, contact your system
            administrator.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => router.replace("/admin")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sam-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-sam-blue-dark"
          >
            <Home size={17} />
            Dashboard
          </button>
        </div>

        {/* Branding */}
        <p className="mt-10 text-xs text-gray-400">
          Second Advent Ministries · Administrator Portal
        </p>
      </div>
    </div>
  );
}