import type { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  reference?: string;
  category?: "bible" | "sop" | "science";
  showCategory?: boolean;
  className?: string;
}

export default function Quote({
  children,
  author,
  source,
  reference,
  category = "bible",
  showCategory = true,
  className = "",
}: QuoteProps) {
  return (
    <article
      className={`my-8 rounded-r-lg border-l-4 bg-gray-50 px-5 py-4 ${className}`}
      style={{
        borderLeftColor: "var(--study-quote-border)",
      }}
    >
      {/* Quote */}
      <blockquote className="text-lg italic leading-8 text-gray-700">
        “{children}”
      </blockquote>

      {/* Quote metadata */}
      {(author || source || reference || showCategory) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          {author && (
            <span className="font-medium text-gray-700">
              — {author}
            </span>
          )}

          {source && (
            <span className="text-gray-600">
              {source}
            </span>
          )}

          {reference && (
            <span className="text-gray-600">
              {reference}
            </span>
          )}

          {showCategory && (
            <span
              className="rounded-full px-2 py-1 text-xs font-semibold capitalize"
              style={{
                color: "var(--study-accent)",
                backgroundColor: "color-mix(in srgb, var(--study-accent) 10%, white)",
              }}
            >
              {category}
            </span>
          )}
        </div>
      )}
    </article>
  );
}