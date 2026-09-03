import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "At What Age Am I Ready For Marriage?",
    href: "/public/family/relationships/age",
  },
  {
    title: "Can I Date Someone We Don't Share Faith With?",
    href: "/public/family/relationships/faith",
  },
  {
    title: "What are Red Flags and Green Flags to Look For?",
    href: "/public/family/relationships/flags",
  },
  {
    title: "Can I Marry Someone Older Than Me?",
    href: "/public/family/relationships/old",
  },
  {
    title: "What if My Parents Refuse My Partner?",
    href: "/public/family/relationships/parents"
  },
  {
    title: "Must I Be Financially Stable To Marry?",
    href: "/public/family/relationships/finances",
  },
  {
    title: "Can We Engage In Intimacy During Our Courtship?",
    href: "/public/family/relationships/intimacy",
  },
  {
    title: "How To Handle a Heartbreak?",
    href: "/public/family/relationships/heartbreak",
  },
  {
    title: "Unfaithful Partner In Courtship?",
    href: "/public/family/relationships/unfaithful"
  },
  {
    title: "Is “Come We Stay” and Cohabiting Biblical?",
    href: "/public/family/relationships/cohabiting"
  }
];

export default function MarriagePage() {
  return (
    <StudyIndexLayout
      title="Common Relationships Questions"
      heroImage="/images/family/relationship.jpg"
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