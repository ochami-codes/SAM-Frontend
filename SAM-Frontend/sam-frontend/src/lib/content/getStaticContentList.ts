import "server-only";

import fs from "fs/promises";
import path from "path";

import type { ManagedContentSection } from "@/src/lib/api/managedContent";

export interface StaticContentListItem {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
  heroImage: string | null;
  category: string | null;
  section: ManagedContentSection;
  source: "static";
}

const contentDirectory = path.join(
  process.cwd(),
  "src",
  "content"
);

interface GetStaticContentListOptions {
  section: ManagedContentSection;
  category?: string;
}

export async function getStaticContentList({
  section,
  category,
}: GetStaticContentListOptions): Promise<StaticContentListItem[]> {
  const sectionDirectory = path.join(
    contentDirectory,
    section
  );

  try {
    const entries = await fs.readdir(
      sectionDirectory,
      { withFileTypes: true }
    );

    const content: StaticContentListItem[] = [];

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const item = await readMdxFile(
          section,
          sectionDirectory,
          entry.name
        );

        if (!item) {
          continue;
        }

        if (
          category &&
          item.category !== category
        ) {
          continue;
        }

        content.push(item);
        continue;
      }

      if (entry.isDirectory()) {
        const categoryName = entry.name;

        if (
          category &&
          categoryName !== category
        ) {
          continue;
        }

        const categoryDirectory = path.join(
          sectionDirectory,
          categoryName
        );

        const categoryEntries = await fs.readdir(
          categoryDirectory,
          { withFileTypes: true }
        );

        for (const categoryEntry of categoryEntries) {
          if (
            !categoryEntry.isFile() ||
            !categoryEntry.name.endsWith(".mdx")
          ) {
            continue;
          }

          const item = await readMdxFile(
            section,
            categoryDirectory,
            categoryEntry.name,
            categoryName
          );

          if (item) {
            content.push(item);
          }
        }
      }
    }

    return content;
  } catch {
    return [];
  }
}

async function readMdxFile(
  section: ManagedContentSection,
  directory: string,
  fileName: string,
  category?: string
): Promise<StaticContentListItem | null> {
  const slug = fileName.replace(/\.mdx$/, "");

  const filePath = path.join(
    directory,
    fileName
  );

  try {
    const source = await fs.readFile(
      filePath,
      "utf8"
    );

    return {
      id: `static:${section}:${category ?? ""}:${slug}`,
      slug,
      title: extractFrontmatterValue(
        source,
        "title"
      ),
      description: extractFrontmatterValue(
        source,
        "description"
      ),
      heroImage: extractFrontmatterValue(
        source,
        "heroImage"
      ),
      category:
        extractFrontmatterValue(
          source,
          "category"
        ) ?? category ?? null,
      section,
      source: "static",
    };
  } catch {
    return null;
  }
}

function extractFrontmatterValue(
  source: string,
  field: string
): string | null {
  const match = source.match(
    new RegExp(
      `${field}:\\s*["'](.+?)["']`
    )
  );

  return match ? match[1] : null;
}