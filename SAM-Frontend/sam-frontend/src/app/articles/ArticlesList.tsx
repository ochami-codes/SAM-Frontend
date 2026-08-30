"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import type { ArticleMeta } from "../../lib/content/getArticles";

interface ArticlesListProps {
  articles: ArticleMeta[];
}

export default function ArticlesList({
  articles,
}: ArticlesListProps) {
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return articles;
    }

    return articles.filter((article) => {
      return (
        article.title?.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query)
      );
    });
  }, [articles, search]);

  return (
    <>
      {/* Search */}
      <div className="mx-auto mt-10 max-w-2xl">
        <label htmlFor="article-search" className="sr-only">
          Search articles
        </label>

        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="article-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search devotional articles..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-[#1c2e60] focus:ring-2 focus:ring-[#1c2e60]/10"
          />
        </div>
      </div>

      {/* Articles */}
      <div className="mt-10 space-y-5">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block"
            >
              <article className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:p-5">
                {/* Image */}
                <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                  {article.heroImage ? (
                    <Image
                      src={article.heroImage}
                      alt={article.title ?? article.slug}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-200 text-sm text-slate-500">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  {article.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#1c2e60]">
                      {article.category}
                    </span>
                  )}

                  <h3 className="mt-1 text-xl font-bold text-slate-800 transition group-hover:text-[#1c2e60]">
                    {article.title ?? "Untitled Article"}
                  </h3>

                  {article.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>
                  )}

                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1c2e60]">
                    Read Article

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              No articles found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different title or keyword.
            </p>
          </div>
        )}
      </div>
    </>
  );
}