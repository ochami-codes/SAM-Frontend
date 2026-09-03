import Link from "next/link";
import Image from "next/image";

import Card from "@/src/components/ui/Card";
import PageLayout from "@/src/components/layouts/PageLayout";

const studies = [
  {
    title: "The Story of Redemption",
    href: "/public/bible-study/redemption",
    image: "/images/bible-study/redemption~2.jpg",
    alt: "The Story of Redemption",
  },
  {
    title: "The Law of God",
    href: "/public/bible-study/the-law",
    image: "/images/bible-study/law.jpg",
    alt: "The Law",
  },
  {
    title: "The Sabbath",
    href: "/public/bible-study/the-sabbath",
    image: "/images/bible-study/sabbath.jpg",
    alt: "The Sabbath",
  },
  {
    title: "Christian Living & Standards",
    href: "/public/bible-study/standards",
    image: "/images/bible-study/standards.jpg",
    alt: "Christian Living",
  },
];

export default function BibleStudyPage() {
  return (
    <PageLayout
      title="Bible Study Resources"
      heroImage="/images/bible-study/bible-light.jpg"
      theme="bible"
      subtitle={
        <em>
          “Thy word is a lamp unto my feet, and a light unto my path.”
          – Psalm 119:105
        </em>
      }
    >
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-[var(--page-section-title)] sm:text-3xl">
          Topical Studies
        </h2>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studies.map(({ title, href, image, alt }) => (
            <Link key={href} href={href} className="w-full max-w-[280px]">
              <Card>
                <div className="relative w-full h-40">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 280px"
                    priority={false}
                  />
                </div>

                <span className="mt-3 block text-center text-lg font-semibold text-gray-900 transition-colors hover:text-green-700">
                  {title}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

