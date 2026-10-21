import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Card from "@/src/components/ui/Card";
import PageLayout from "@/src/components/layouts/PageLayout";

import { publicSections } from "@/src/config/publicSections";
import { getPublicContentMetadata } from "@/src/lib/content/getPublicContentMetadata";

import {
BIBLE_STUDY_IMAGES,
DEFAULT_BIBLE_STUDY_IMAGE,
} from "@/src/lib/content/bibleStudyImages";

import {
HEALTH_IMAGES,
DEFAULT_HEALTH_IMAGE,
} from "@/src/lib/content/healthImages";

import {
FAMILY_IMAGES,
DEFAULT_FAMILY_IMAGE,
} from "@/src/lib/content/familyImages";

interface SectionPageProps {
params: Promise<{
section: string;
}>;
}

const HEALTH_CHECKER = {
title: "Health Checker Tools",
href: "/public/health/health-checker",
image: "/images/health/health-tools.jpg",
alt: "Health assessment tools",
};

const DEFAULT_SECTION_IMAGE = "/images/brand/secondadvent2.png";

export default async function SectionPage({
params,
}: SectionPageProps) {
const { section: sectionSlug } = await params;

const sections = await getPublicContentMetadata();

const section = sections.find(
(item) => item.slug === sectionSlug
);

if (!section) {
notFound();
}

const config = publicSections[section.slug];

const title = config?.title ?? section.name;
const heroImage =
config?.heroImage ?? DEFAULT_SECTION_IMAGE;

const getCategoryImage = (slug: string, name: string) => {
switch (section.slug) {
case "bible-study":
return {
image:
BIBLE_STUDY_IMAGES[slug]?.image ??
DEFAULT_BIBLE_STUDY_IMAGE,
alt: BIBLE_STUDY_IMAGES[slug]?.alt ?? name,
};


  case "health":
    return {
      image:
        HEALTH_IMAGES[slug]?.image ??
        DEFAULT_HEALTH_IMAGE,
      alt: HEALTH_IMAGES[slug]?.alt ?? name,
    };

  case "family":
    return {
      image:
        FAMILY_IMAGES[slug]?.image ??
        DEFAULT_FAMILY_IMAGE,
      alt: FAMILY_IMAGES[slug]?.alt ?? name,
    };

  default:
    return {
      image: DEFAULT_SECTION_IMAGE,
      alt: name,
    };
}

};

return ( <PageLayout
   title={title}
   heroImage={heroImage}
   theme={config?.theme}
   subtitle={config?.subtitle}
 > <section aria-labelledby="section-categories-heading"> <h2
       id="section-categories-heading"
       className="mb-8 text-center text-2xl font-bold text-[var(--page-section-title)] sm:text-3xl"
     >
Explore {title} </h2>

    {section.categories.length > 0 ||
    section.slug === "health" ? (
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {section.categories.map(({ name, slug }) => {
          const categoryImage = getCategoryImage(
            slug,
            name
          );

          return (
            <Link
              key={slug}
              href={`/public/${section.slug}/${slug}`}
              className="group w-full max-w-[280px]"
            >
              <Card>
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <Image
                    src={categoryImage.image}
                    alt={categoryImage.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>

                <span className="mt-3 block text-center text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-700">
                  {name}
                </span>
              </Card>
            </Link>
          );
        })}

        {section.slug === "health" && (
          <Link
            href={HEALTH_CHECKER.href}
            className="group w-full max-w-[280px]"
          >
            <Card>
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={HEALTH_CHECKER.image}
                  alt={HEALTH_CHECKER.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>

              <span className="mt-3 block text-center text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-700">
                {HEALTH_CHECKER.title}
              </span>
            </Card>
          </Link>
        )}
      </div>
    ) : (
      <p className="text-center text-gray-600">
        Resources are currently being prepared. Please
        check back soon.
      </p>
    )}
  </section>
</PageLayout>

);
}