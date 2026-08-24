import fs from "fs/promises";
import path from "path";

export async function getArticle(
  section: string,
  study: string,
  article: string
) {
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

    // Simple regex to capture meta exports
    const titleMatch = source.match(/title:\s*["'](.+?)["']/);
    const heroImageMatch = source.match(/heroImage:\s*["'](.+?)["']/);

    const title = titleMatch ? titleMatch[1] : null;
    const heroImage = heroImageMatch ? heroImageMatch[1] : null;

    return {
      slug: article,
      source,
      title,
      heroImage,
    };
  } catch {
    return null;
  }
}
