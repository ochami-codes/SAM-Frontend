export interface ContentItem {
  path: string;
  section: "articles" | "bible-study" | "family" | "health";
  category?: string; // optional because articles may not have category
  slug: string;
}
