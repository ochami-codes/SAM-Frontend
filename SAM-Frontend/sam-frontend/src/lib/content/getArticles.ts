import fs from "fs/promises";
import path from "path";

export interface ArticleMeta {
  slug: string;
  title: string | null;
  description: string | null;
  heroImage: string | null;
  category: string | null;
}

const articlesDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "articles"
);

export async function getArticles(): Promise<ArticleMeta[]> {
  try {
    const files = await fs.readdir(articlesDirectory);

    const mdxFiles = files.filter((file) =>
      file.endsWith(".mdx")
    );

    const articles = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");

        const filePath = path.join(
          articlesDirectory,
          file
        );

        try {
          const source = await fs.readFile(
            filePath,
            "utf8"
          );

          const titleMatch = source.match(
            /title:\s*["'](.+?)["']/
          );

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
            slug,

            title: titleMatch
              ? titleMatch[1]
              : null,

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
      })
    );

    return articles.filter(
      (article): article is ArticleMeta =>
        article !== null
    );
  } catch {
    return [];
  }
}