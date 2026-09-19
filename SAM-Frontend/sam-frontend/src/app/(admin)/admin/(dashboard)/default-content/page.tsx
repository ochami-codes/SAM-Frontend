// src/app/admin/default-content/page.tsx
"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import Card from "@/src/components/ui/Card";
import { useContentList } from "@/src/hooks/content/useContentList";

// Import modular sections
import ArticlesSection from "@/src/components/admin/default-content/ArticleSection";
import BibleStudySection from "@/src/components/admin/default-content/BibleStudySection";
import FamilySection from "@/src/components/admin/default-content/FamilySection";
import HealthSection from "@/src/components/admin/default-content/HealthSection";

export default function ContentPage() {
  const { data: content, isLoading, isError, error } = useContentList();
  const realcontent = content ?? [];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <Card>
          <div className="p-6 text-sm text-slate-500">Loading content...</div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <Card>
          <div className="p-6">
            <h2 className="text-base font-semibold text-slate-900">Unable to load content</h2>
            <p className="mt-1 text-sm text-slate-500">{error.message}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      {realcontent.length === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-base font-semibold text-slate-900">No content found</h2>
            <p className="mt-1 text-sm text-slate-500">
              There is currently no default content available.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          <ArticlesSection
            content={realcontent}
            isOpen={openSections["articles"]}
            toggle={() => toggleSection("articles")}
          />
          <BibleStudySection
            content={realcontent}
            isOpen={openSections["bible-study"]}
            toggle={() => toggleSection("bible-study")}
          />
          <FamilySection
            content={realcontent}
            isOpen={openSections["family"]}
            toggle={() => toggleSection("family")}
          />
          <HealthSection
            content={realcontent}
            isOpen={openSections["health"]}
            toggle={() => toggleSection("health")}
          />
        </div>
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Content Management</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage the default ministry content published on the website.
      </p>
    </div>
  );
}