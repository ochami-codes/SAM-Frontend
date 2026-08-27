import Link from "next/link";

import StudyIndexLayout from "../../../components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Introduction",
    href: "/family/marriage-purpose/introduction",
  },
  {
    title: "The World's View - A Distorted Vision",
    href: "/family/marriage-purpose/world-view",
  },
  {
    title: "God's View",
    href: "/family/marriage-purpose/gods-view",
  },
  {
    title: "Can We Collaborate With God?",
    href: "/family/marriage-purpose/collaborate",
  },
  {
    title: "Why Satan Wars Against Marriage?",
    href: "/family/marriage-purpose/war",
  },
];

export default function MarriagePage() {
  return (
    <StudyIndexLayout
      title="The Purpose of Marriage"
      heroImage="/images/family/why_marriage.png"
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