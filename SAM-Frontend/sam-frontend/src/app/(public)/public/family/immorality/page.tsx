import Link from "next/link";

import StudyIndexLayout from "@/src/components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Introduction",
    href: "/public/family/immorality/introduction",
  },
  {
    title: "Sex: A Gift From God",
    href: "/public/family/immorality/sex-gift",
  },
  {
    title: "Adultery",
    href: "/public/family/immorality/adultery",
  },
  {
    title: "Fornication",
    href: "/public/family/immorality/fornication",
  },
  {
    title: "Pornography",
    href: "/public/family/immorality/pornography"
  },
  {
    title: "Masturbation",
    href: "/public/family/immorality/masturbation",
  },
  {
    title: "LGBTQ+ and Associated Evils",
    href: "/public/family/immorality/lgbtq",
  },
  {
    title: "Trifling With Hearts",
    href: "/public/family/immorality/trifling",
  },
  {
    title: "Polygamy",
    href: "/public/family/immorality/polygamy",
  },
  {
    title: "Call For Purity",
    href: "/public/family/immorality/purity"
  }
];

export default function MarriagePage() {
  return (
    <StudyIndexLayout
      title="Sexual Immorality"
      heroImage="/images/family/purity.jpg"
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