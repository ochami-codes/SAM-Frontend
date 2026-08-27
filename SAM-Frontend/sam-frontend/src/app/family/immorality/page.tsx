import Link from "next/link";

import StudyIndexLayout from "../../../components/layouts/StudyIndexLayout";

const chapters = [
  {
    title: "Introduction",
    href: "/family/immorality/introduction",
  },
  {
    title: "Sex: A Gift From God",
    href: "/family/immorality/sex-gift",
  },
  {
    title: "Adultery",
    href: "/family/immorality/adultery",
  },
  {
    title: "Fornication",
    href: "/family/immorality/fornication",
  },
  {
    title: "Pornography",
    href: "/family/immorality/pornography"
  },
  {
    title: "Masturbation",
    href: "/family/immorality/masturbation",
  },
  {
    title: "LGBTQ+ and Associated Evils",
    href: "/family/immorality/lgbtq",
  },
  {
    title: "Trifling With Hearts",
    href: "/family/immorality/trifling",
  },
  {
    title: "Polygamy",
    href: "/family/immorality/polygamy",
  },
  {
    title: "Call For Purity",
    href: "/family/immorality/purity"
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