import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Introduction: The Law of God – Why Study It?",
    href: "/public/bible-study/the-law/why",
  },
  {
    title: "The Law in Heaven Before Sin",
    href: "/public/bible-study/the-law/law-heaven",
  },
  {
    title: "The Law at Sinai",
    href: "/public/bible-study/the-law/sinai",
  },
  {
    title: "The Law and Jesus Christ",
    href: "/public/bible-study/the-law/christ-law",
  },
  {
    title: "The Law and the Gospel – Perfect Harmony",
    href: "/public/bible-study/the-law/law-gospel",
  },
  {
    title: "The Sabbath Commandment – A Forgotten Law",
    href: "/public/bible-study/the-law/forgotten-law",
  },
  {
    title: "The Law in the New Covenant",
    href: "/public/bible-study/the-law/new-covenant",
  },
  {
    title: "The End-Time Relevance of God's Law",
    href: "/public/bible-study/the-law/end-time",
  },
  {
    title: "Loving Obedience – Law and Relationship",
    href: "/public/bible-study/the-law/loving-obedience",
  },
  {
    title: "Living the Law – Practical Holiness",
    href: "/public/bible-study/the-law/living-law",
  },
];

export default function TheLawPage() {
  return (
    <StudyIndexLayout
      title="The Law of God"
      heroImage="/images/bible-study/law.jpg"
      theme="bible"
      heroQuote={
        <>
          “Here is the patience of the saints: here are they that keep
          the commandments of God, and the faith of Jesus.”
          <br />
          <strong>— Revelation 14:12</strong>
        </>
      }
    >
      <nav className="flex flex-col gap-3">
        {chapters.map((chapter, index) => (
          <Link
            key={chapter.href}
            href={chapter.href}
            className="rounded-md px-4 py-3 font-medium transition-all hover:-translate-y-0.5"
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