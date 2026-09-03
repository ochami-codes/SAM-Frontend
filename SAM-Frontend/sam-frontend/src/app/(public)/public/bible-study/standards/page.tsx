import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "The Christian Lifestyle – A New Life in Christ",
    href: "/public/bible-study/standards/christian-life",
  },
  {
    title: "Health and the Body Temple",
    href: "/public/bible-study/standards/body-temple",
  }, 
  {
    title: "Dress and Simplicity",
    href: "/public/bible-study/standards/dress-simplicity",
  },
  {
    title: "Entertainment and Media",
    href: "/public/bible-study/standards/media",
  },
  {
    title: "Music and Worship",
    href: "/public/bible-study/standards/music",
  },
  {
    title: "Social Life and Friendships",
    href: "/public/bible-study/standards/social-life",
  },
  {
    title: "Financial Stewardship",
    href: "/public/bible-study/standards/financial-stewardship",
  },
  {
    title: "Work and Purpose",
    href: "/public/bible-study/standards/work",
  },
  {
    title: "Christian Standards and the End-Time Remnant",
    href: "/public/bible-study/standards/remnant",
  },
  {
    title: "Daily Victory Through Christ",
    href: "/public/bible-study/standards/daily-victory",
  },
];

export default function ChristianStandardsPage() {
  return (
    <StudyIndexLayout
      title="The Christian Living and Standards"
      heroImage="/images/bible-study/standards.jpg"
      theme="bible"
      heroQuote={
        <>
          “Be not conformed to this world: but be ye transformed by the
          renewing of your mind...”
          <br />
          <strong>— Romans 12:2</strong>
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