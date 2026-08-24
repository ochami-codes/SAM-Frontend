import type { ReactNode } from "react";

import {
  pageThemes,
  type PageThemeName,
} from "../../config/pageThemes";

interface PageLayoutProps {
  title: string;
  heroImage: string;
  children: ReactNode;
  theme?: PageThemeName;
  subtitle?: ReactNode;
}

export default function PageLayout({
  title,
  heroImage,
  children,
  theme = "default",
  subtitle,
}: PageLayoutProps) {
  const colors = pageThemes[theme];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header
        className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-cover bg-center px-6 py-16 text-center sm:min-h-[350px]"
        style={{
          backgroundImage: `linear-gradient(
            ${colors.heroOverlay},
            ${colors.heroOverlay}
          ), url("${heroImage}")`,
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <div className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
              {subtitle}
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        {children}
      </main>

      {/* Simple Footer */}
      <footer
        className="px-5 py-6 text-center text-sm"
        style={{
          backgroundColor: colors.footer,
          color: colors.footerText,
        }}
      >
        © {new Date().getFullYear() } Second Advent Ministries. All rights reserved.
      </footer>
    </div>
  );
}