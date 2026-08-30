// src/lib/content/getArticleBySlug.ts

import { getArticle } from "./getArticle";

export function getArticleBySlug(slug: string) {
  return getArticle("articles", "", slug);
}