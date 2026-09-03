import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Introduction",
    href: "/public/family/dating-courting/introduction",
  },
  {
    title: "Biblical Courtship",
    href: "/public/family/dating-courting/biblical-courting",
  },
  {
    title: "Who Should I Court?",
    href: "/public/family/dating-courting/who",
  },
  {
    title: "Set Apart For Purity",
    href: "/public/family/dating-courting/purity",
  },
];

export default function MarriagePage() {
  return (
    <StudyIndexLayout
      title="Dating Vs Courtship"
      heroImage="/images/family/courting.jpg"
      theme="family"
      heroQuote={
        <>
          “As for me and my house, we will serve the Lord”
          <br />
          <strong>— Joshua 24:15</strong>
        </>
      }
    >
      <nav className="flex flex-col gap-3">
        {chapters.map((chapter, index) => (
          <Link
            key={chapter.href}
            href={chapter.href}
            className="rounded-md px-4 py-3 font-medium transition"
            style={{
              color: "var(--study-accent)",
              backgroundColor: "#e3f1fc",
            }}
          >
            {index + 1}. {chapter.title}
          </Link>
        ))}
      </nav>
    </StudyIndexLayout>
  );
}