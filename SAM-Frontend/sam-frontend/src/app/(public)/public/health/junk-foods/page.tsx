import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "What's Wrong With Junk Food?",
    href: "/public/health/junk-foods/junk-food",
  },
  {
    title: "What About Sugar?",
    href: "/public/health/junk-foods/sugar",
  },
  {
    title: "Coffee, Tea and Caffeinated Drinks",
    href: "/public/health/junk-foods/caffein",
  },
];

export default function JunkFoodPage() {
  return (
    <StudyIndexLayout
      title="Junk and Harmful Food Articles"
      heroImage="/images/health/junk.jpg"
      theme="health"
      heroQuote={
        <>
          “Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness. ”
          <br />
          <strong>— Isaiah 55:2</strong>
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