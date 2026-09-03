import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Back To Eden",
    href: "/public/health/bible-sop/eden",
  },
  {
    title: "The Temple of God",
    href: "/public/health/bible-sop/temple",
  },
  {
    title: "Temperance and Self Control",
    href: "/public/health/bible-sop/temperance",
  },
  {
    title: "Eight Principles For Better Health",
    href: "/public/health/bible-sop/newstart",
  },
  {
    title: "Whole Plant Based Foods Diet- a Way to Go",
    href: "/public/health/bible-sop/whole-foods"
  },
];

export default function LifestylePage() {
  return (
    <StudyIndexLayout
      title="Bible $ Spirit of Prophecy: Diet and Lifestyle"
      heroImage="/images/health/bsop.png"
      theme="health"
      heroQuote={
        <>
          “I will put none of these diseases upon thee... for I am the Lord that healeth thee”
          <br />
          <strong>— Exodus 15:26</strong>
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