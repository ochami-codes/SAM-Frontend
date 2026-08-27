import Link from "next/link";
import Image from "next/image";

import Card from "../../components/ui/Card";
import PageLayout from "../../components/layouts/PageLayout";

const studies = [
  {
    title: "Purpose of Marriage and Family",
    href: "/family/marriage-purpose",
    image: "/images/family/why_marriage.png",
    alt: "Why Marriage",
  },
  {
    title: "Dating Vs Courting",
    href: "/family/dating-courting",
    image: "/images/family/courting.jpg",
    alt: "Courting",
  },
  {
    title: "Common Questions on Relationships",
    href: "/family/relationships",
    image: "/images/family/relationship.jpg",
    alt: "The Relationship",
  },
  {
    title: "Sex and Sexual Immorality",
    href: "/family/immorality",
    image: "/images/family/purity.jpg",
    alt: "Purity",
  },
];

export default function FamilyPage() {
  return (
    <PageLayout
      title="Family Life Corner"
      heroImage="/images/family/why_marriage.png"
      theme="family"
      subtitle={
        <em>
          “As for me and my house, we will serve the Lord.”
          – Joshua 24:15
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