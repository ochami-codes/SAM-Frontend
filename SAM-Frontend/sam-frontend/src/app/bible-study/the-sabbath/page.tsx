import Link from "next/link";

import StudyIndexLayout from "../../../components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "The Sabbath in Creation",
    href: "/bible-study/the-sabbath/creation",
  },
  {
    title: "The Sabbath in the Ten Commandments",
    href: "/bible-study/the-sabbath/ten-commandments",
  },
  {
    title: "The Sabbath and Jesus",
    href: "/bible-study/the-sabbath/christ",
  },
  {
    title: "The Sabbath and the Apostles",
    href: "/bible-study/the-sabbath/apostles",
  },
  {
    title: "The Change of the Sabbath – History and Prophecy",
    href: "/bible-study/the-sabbath/change",
  },
  {
    title: "Sabbath as the Seal of God",
    href: "/bible-study/the-sabbath/seal",
  },
  {
    title: "Preparing for the Sabbath",
    href: "/bible-study/the-sabbath/preparation",
  },
  {
    title: "The Sabbath and the New Testament",
    href: "/bible-study/the-sabbath/new-testament",
  },
];

export default function TheSabbathPage() {
  return (
    <StudyIndexLayout
      title="The Sabbath"
      heroImage="/images/bible-study/sabbath.jpg"
      theme="bible"
      heroQuote={
        <>
          “If thou turn away thy foot from the sabbath, from doing thy
          pleasure on my holy day... then shalt thou delight thyself in
          the Lord.”
          <br />
          <strong>— Isaiah 58:13–14</strong>
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