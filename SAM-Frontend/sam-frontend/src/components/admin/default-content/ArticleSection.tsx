// src/components/content/ArticlesSection.tsx
"use client";

import Link from "next/link";
import { FileText, ChevronDown, ChevronRight } from "lucide-react";
import { ContentItem } from "@/src/types/content";
import Card from "@/src/components/ui/Card";

// Metadata specific to Articles
const meta = {
  label: "Articles",
  description: "General ministry articles and publications.",
  icon: FileText,
};

export default function ArticlesSection({
  content,
  isOpen,
  toggle,
}: {
  content: ContentItem[];
  isOpen: boolean;
  toggle: () => void;
}) {
  const sectionContent = content.filter((item) => item.section === "articles");
  if (sectionContent.length === 0) return null;

  const Icon = meta.icon;

  return (
    <section>
      <button onClick={toggle} className="flex w-full items-start gap-3 text-left">
        <div className="rounded-lg bg-slate-100 p-2">
          <Icon className="h-5 w-5 text-slate-600" />
        </div>
        <div className="flex-1">
          <h2 className="flex items-center text-lg font-semibold text-slate-900">
            {isOpen ? (
              <ChevronDown className="mr-2 h-4 w-4 text-slate-600" />
            ) : (
              <ChevronRight className="mr-2 h-4 w-4 text-slate-600" />
            )}
            {meta.label}
          </h2>
          <p className="text-sm text-slate-500">{meta.description}</p>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sectionContent.map((item) => {
            const href = `/admin/default-content/edit/articles/${item.slug}`;

            return (
              <Link key={item.path} href={href} className="block">
                <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-slate-900">
                          {formatTitle(item.slug)}
                        </h3>
                        {item.category && (
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            {formatTitle(item.category)}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        MDX
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">Edit default content</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

function formatTitle(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
