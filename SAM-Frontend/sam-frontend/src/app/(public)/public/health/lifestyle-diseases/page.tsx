import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Obesity",
    href: "/public/health/lifestyle-diseases/obesity",
  },
  {
    title: "Diabetes",
    href: "/public/health/lifestyle-diseases/diabetes",
  },
  {
    title: "Heart Disease",
    href: "/public/health/lifestyle-diseases/heart-disease",
  },
];

export default function LifestylePage() {
  return (
    <StudyIndexLayout
      title="Lifestyle Diseases"
      heroImage="/images/health/glucometer.jpg"
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