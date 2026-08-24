import type { ReactNode } from "react";
import BackButton from "../ui/BackButton";
import {
  studyThemes,
  type StudyThemeName,
} from "../../config/studyThemes";

interface StudyIndexLayoutProps {
  title: string;
  heroImage: string;
  heroQuote: ReactNode;
  children: ReactNode;
  theme?: StudyThemeName;
  backHref?: string;
  backLabel?: string;
}

export default function StudyIndexLayout({
  title,
  heroImage,
  heroQuote,
  children,
  theme = "default",
  backHref = "/bible-study",
  backLabel = "Back",
}: StudyIndexLayoutProps) {
  const colors = studyThemes[theme];

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={
        {
          "--study-accent": colors.accent,
          "--study-section-title": colors.sectionTitle,
        } as React.CSSProperties
      }
    >
      {/* Hero */}
      <header className="relative h-[60vh] min-h-[400px] overflow-hidden sm:h-[70vh]">
        <img
          src={heroImage}
          alt={title}
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 flex items-center justify-center px-5 text-center"
          style={{
            backgroundColor: colors.heroOverlay,
          }}
        >
          <div className="max-w-3xl text-xl italic leading-relaxed text-white drop-shadow-lg sm:text-2xl lg:text-3xl">
            {heroQuote}
          </div>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 mx-auto -mt-12 w-full max-w-4xl px-4 pb-10 sm:-mt-16 sm:px-6">
        <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
          {/* Title */}
          <h1
            className="mb-8 text-center text-2xl font-bold sm:text-3xl"
            style={{
              color: colors.sectionTitle,
            }}
          >
            {title}
          </h1>

          {/* Navigation / Content */}
          {children}

          {/* Back */}
         <BackButton/>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-4 px-5 py-6 text-center text-sm"
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