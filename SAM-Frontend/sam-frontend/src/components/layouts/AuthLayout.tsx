import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sam-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >
            <Image
              src="/images/brand/secondadvent2.png"
              alt="Second Advent Ministries Logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
              priority
            />

            <div className="text-left">
              <h1 className="text-lg font-bold text-sam-deep-blue">
                Second Advent
              </h1>

              <p className="text-sm text-sam-blue">
                Ministries
              </p>
            </div>
          </Link>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-sam-border bg-sam-surface p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sam-text">
              {title}
            </h2>

            {description && (
              <p className="mt-2 text-sm leading-6 text-sam-muted">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>

        {/* Return to website */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-sam-muted transition-colors hover:text-sam-deep-blue"
          >
            ← Return to website
          </Link>
        </div>
      </div>
    </main>
  );
}