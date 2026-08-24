"use client";

import type { ReactNode, CSSProperties } from "react";
import { useRouter } from "next/navigation";

import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import { studyThemes, type StudyThemeName } from "../../config/studyThemes";

interface NavigationItem {
  slug: string;
  href: string;
}

interface StudyLayoutProps {
  title: string;
  heroImage: string;
  theme?: StudyThemeName;
  previous?: NavigationItem | null;
  next?: NavigationItem | null;
  children: ReactNode;
}

export default function StudyLayout({
  title,
  heroImage,
  theme = "default",
  previous,
  next,
  children,
}: StudyLayoutProps) {
  const router = useRouter();
  const colors = studyThemes[theme];

  const studyStyles = {
    "--study-accent": colors.accent,
    "--study-quote-border": colors.quoteBorder,
    "--study-section-title": colors.sectionTitle,
  } as CSSProperties;

  return (
    <div className="min-h-screen" style={studyStyles}>
      {/* Hero */}
      <header
        className="relative flex min-h-[280px] items-center justify-center bg-cover bg-center px-6 py-16 text-center sm:min-h-[350px]"
        style={{
          backgroundImage: `
            linear-gradient(${colors.heroOverlay}, ${colors.heroOverlay}),
            url("${heroImage}")
          `,
        }}
      >
        <h1 className="relative max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 lg:py-14">
        <article className="study-content text-base leading-8 text-gray-800 sm:text-lg">
          {children}
        </article>

        {/* Study Navigation */}
        <nav
          aria-label="Study navigation"
          className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-8"
        >
          {/* Previous */}
          <div>
            {previous ? (
              <BackButton
                onClick={() => router.push(previous.href)}
              />
            ) : null}
          </div>

          {/* Next */}
          <div>
            {next ? (
              <Button
                type="button"
                onClick={() => router.push(next.href)}
                variant="primary"
              >
                Next Study
              </Button>
            ) : null}
          </div>
        </nav>
      </main>

      {/* Footer */}
      <footer
        className="px-5 py-6 text-center text-sm"
        style={{
          backgroundColor: colors.footer,
          color: colors.footerText,
        }}
      >
        © {new Date().getFullYear()} Second Advent Ministries. All rights reserved.
      </footer>
    </div>
  );
}
