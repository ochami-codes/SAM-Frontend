import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "The Origin of Evil",
    href: "/public/bible-study/redemption/evil",
  },
  {
    title: "The Fall of Man",
    href: "/public/bible-study/redemption/fall",
  },
  {
    title: "The Plan of Redemption",
    href: "/public/bible-study/redemption/plan",
  },
  {
    title: "The Covenant & Patriarchs",
    href: "/public/bible-study/redemption/covenant",
  },
  {
    title: "Christ's Mission",
    href: "/public/bible-study/redemption/mission",
  },
  {
    title: "Victory Over Sin",
    href: "/public/bible-study/redemption/victory",
  },
  {
    title: "Resurrection & Ascension",
    href: "/public/bible-study/redemption/resurrection",
  },
  {
    title: "Heavenly Sanctuary",
    href: "/public/bible-study/redemption/ministry",
  },
  {
    title: "End-Time Conflict",
    href: "/public/bible-study/redemption/conflict",
  },
  {
    title: "Second Coming",
    href: "/public/bible-study/redemption/second-coming",
  },
  {
    title: "The New Earth",
    href: "/public/bible-study/redemption/new-earth",
  },
  {
    title: "Your Place in the Story",
    href: "/public/bible-study/redemption/your-place",
  },
];

export default function RedemptionPage() {
  return (
    <StudyIndexLayout
      title="The Story of Redemption"
      heroImage="/images/bible-study/redemption~2.jpg"
      theme="bible"
      heroQuote={
        <>
          “And I will put enmity between thee and the woman... it shall
          bruise thy head, and thou shalt bruise his heel.”
          <br />
          <strong>— Genesis 3:15</strong>
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