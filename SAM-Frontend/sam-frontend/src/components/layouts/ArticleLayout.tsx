"use client";

import type { ReactNode, CSSProperties } from "react";
import { useRouter } from "next/navigation";

import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import {
  pageThemes,
  type PageThemeName,
} from "../../config/pageThemes";

interface NavigationItem {
  slug: string;
  href: string;
  title?: string;
}

interface ArticleLayoutProps {
  title: string;
  heroImage: string;
  theme?: PageThemeName;
  category?: string;
  previous?: NavigationItem | null;
  next?: NavigationItem | null;
  children: ReactNode;
}

export default function ArticleLayout({
  title,
  heroImage,
  theme = "default",
  category,
  previous,
  next,
  children,
}: ArticleLayoutProps) {
  const router = useRouter();
  const colors = pageThemes[theme];

  const articleStyles = {
    "--article-accent": colors.accent,
    "--article-section-title": colors.sectionTitle,
  } as CSSProperties;

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={articleStyles}
    >
      {/* Hero */}
      <header
        className="relative flex min-h-[260px] items-center justify-center bg-cover bg-center px-6 py-16 text-center sm:min-h-[320px] lg:min-h-[360px]"
        style={{
          backgroundImage: `
            linear-gradient(
              ${colors.heroOverlay},
              ${colors.heroOverlay}
            ),
            url("${heroImage}")
          `,
        }}
      >
        <div className="relative max-w-4xl">
          {category && (
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              {category}
            </span>
          )}

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </header>

      {/* Article Content */}
      <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-12 lg:py-16">
        <article
          className="
            article-content
            rounded-2xl
            bg-white
            px-6
            py-8
            shadow-sm
            sm:px-10
            sm:py-10
            lg:px-14
            lg:py-12
          "
        >
          {children}
        </article>

        {/* Article Navigation */}
        {(previous || next) && (
          <nav
            aria-label="Article navigation"
            className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-8"
          >
            {/* Previous */}
            <div>
              {previous ? (
                <BackButton
                  onClick={() => router.push(previous.href)}
                />
              ) : (
                <span />
              )}
            </div>

            {/* Next */}
            <div>
              {next ? (
                <Button
                  type="button"
                  onClick={() => router.push(next.href)}
                  variant="primary"
                >
                  Next Article
                </Button>
              ) : (
                <span />
              )}
            </div>
          </nav>
        )}
      </main>

      {/* Footer */}
      <footer
        className="px-5 py-7 text-center text-sm"
        style={{
          backgroundColor: colors.footer,
          color: colors.footerText,
        }}
      >
        © {new Date().getFullYear()} Second Advent Ministries.
        All rights reserved.
      </footer>
    </div>
  );
}