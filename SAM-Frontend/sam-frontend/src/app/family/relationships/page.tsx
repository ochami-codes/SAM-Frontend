import Link from "next/link";

import StudyIndexLayout from "../../../components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "At What Age Am I Ready For Marriage?",
    href: "/family/relationships/age",
  },
  {
    title: "Can I Date Someone We Don't Share Faith With?",
    href: "/family/relationships/faith",
  },
  {
    title: "What are Red Flags and Green Flags to Look For?",
    href: "/family/relationships/flags",
  },
  {
    title: "Can I Marry Someone Older Than Me?",
    href: "/family/relationships/old",
  },
  {
    title: "What if My Parents Refuse My Partner?",
    href: "/family/relationships/parents"
  },
  {
    title: "Must I Be Financially Stable To Marry?",
    href: "/family/relationships/finances",
  },
  {
    title: "Can We Engage In Intimacy During Our Courtship?",
    href: "/family/relationships/intimacy",
  },
  {
    title: "How To Handle a Heartbreak?",
    href: "/family/relationships/heartbreak",
  },
  {
    title: "Unfaithful Partner In Courtship?",
    href: "/family/relationships/unfaithful"
  },
  {
    title: "Is “Come We Stay” and Cohabiting Biblical?",
    href: "/family/relationships/cohabiting"
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