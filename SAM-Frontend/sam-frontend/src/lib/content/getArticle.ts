// src/lib/content/getArticle.ts

import fs from "fs/promises";
import path from "path";

export interface ArticleMeta {
  slug: string;
  title: string | null;
  description: string | null;
  heroImage: string | null;
  category?: string | null;
  source: string;
}

export async function getArticle(
  section: string,
  study: string,
  article: string
): Promise<ArticleMeta | null> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    section,
    study,
    `${article}.mdx`
  );

  try {
    const source = await fs.readFile(filePath, "utf8");

    const titleMatch = source.match(/title:\s*["'](.+?)["']/);
    const descriptionMatch = source.match(
      /description:\s*["'](.+?)["']/
    );
    const heroImageMatch = source.match(
      /heroImage:\s*["'](.+?)["']/
    );
    const categoryMatch = source.match(
      /category:\s*["'](.+?)["']/
    );

    return {
      slug: article,
      source,
      title: titleMatch ? titleMatch[1] : null,
      description: descriptionMatch
        ? descriptionMatch[1]
        : null,
      heroImage: heroImageMatch
        ? heroImageMatch[1]
        : null,
      category: categoryMatch
        ? categoryMatch[1]
        : null,
    };
  } catch {
    return null;
  }
}
