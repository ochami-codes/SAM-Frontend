import Link from "next/link";

import StudyIndexLayout from "../../../components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Truth About Proteins",
    href: "/health/truth/proteins",
  },
  {
    title: "Truth About Fats",
    href: "/health/truth/fats",
  },
  {
    title: "Truth About Carbohydrates",
    href: "/health/truth/carbohydrates",
  },
];

export default function TruthPage() {
  return (
    <StudyIndexLayout
      title="Truth About Proteins, Fats and Carbohydrates"
      heroImage="/images/health/research.png"
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