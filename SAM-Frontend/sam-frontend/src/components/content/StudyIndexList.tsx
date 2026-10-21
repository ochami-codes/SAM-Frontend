import Link from "next/link";

import type {
  PublicContentListItem,
} from "@/src/lib/content/getPublicContentList";

interface StudyIndexListProps {
  studies: PublicContentListItem[];
  section: string;
  category: string;
}

export default function StudyIndexList({
  studies,
  section,
  category,
}: StudyIndexListProps) {
  if (studies.length === 0) {
    return (
      <p className="text-center text-gray-600">
        Studies are currently being prepared. Please check
        back soon.
      </p>
    );
  }

  return (
    <nav
      aria-label="Study chapters"
      className="flex flex-col gap-3"
    >
      {studies.map((study, index) => (
        <Link
          key={study.id}
          href={`/public/${section}/${category}/${study.slug}`}
          className="rounded-md px-4 py-3 font-medium transition-colors hover:opacity-80"
          style={{
            color: "var(--study-accent)",
            backgroundColor: "#e3f1fc",
          }}
        >
          {index + 1}. {study.title}
        </Link>
      ))}
    </nav>
  );
}