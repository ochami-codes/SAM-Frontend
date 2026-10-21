import "server-only";

import fs from "fs/promises";
import path from "path";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";
import { getPublishedManagedContent } from "./getPublishedManagedContent";

export interface ArticleMeta {
id: string;
slug: string;
title: string | null;
description: string | null;
heroImage: string | null;
category: string | null;
section: ManagedContentSection;
order?: number;
source: string;
origin: "static" | "managed";
}

export async function getArticle(
section: ManagedContentSection,
study: string,
article: string
): Promise<ArticleMeta | null> {
// 1. Try published managed content first.
// Managed content takes precedence over static MDX.
try {
const managedArticle = await getPublishedManagedContent(
section,
study,
article
);

if (managedArticle) {
  return {
    id: managedArticle.id,
    slug: managedArticle.slug,
    title: managedArticle.title,
    description: managedArticle.description ?? null,
    heroImage: managedArticle.heroImage ?? null,
    category: managedArticle.category ?? study,
    section: managedArticle.section,
    order: managedArticle.order,
    source: managedArticle.content,
    origin: "managed",
  };
}

} catch (error) {
console.error(
`Failed to retrieve managed content for ${section}/${study}/${article}:`,
error
);
}

// 2. Fall back to static MDX.
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
const orderMatch = source.match(/order:\s*(\d+)/);

return {
  id: `${section}:${study}:${article}`,
  slug: article,
  title: titleMatch ? titleMatch[1] : null,
  description: descriptionMatch ? descriptionMatch[1] : null,
  heroImage: heroImageMatch ? heroImageMatch[1] : null,
  category: categoryMatch ? categoryMatch[1] : study,
  section,
  order: orderMatch ? Number(orderMatch[1]) : undefined,
  source,
  origin: "static",
};

} catch {
return null;
}
}
