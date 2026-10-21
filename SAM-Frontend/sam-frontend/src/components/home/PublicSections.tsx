import Image from "next/image";
import Link from "next/link";

import FadeIn from "./FadeIn";

import {
publicSections,
} from "@/src/config/publicSections";

import type {
ContentSection,
} from "@/src/config/contentMetadata";

interface PublicSectionsProps {
sections: ContentSection[];
}

const DEFAULT_SECTION_IMAGE =
"/images/bible-study/bible-light.jpg";

export default function PublicSections({
sections,
}: PublicSectionsProps) {
if (sections.length === 0) {
return null;
}

return ( <section
   className="bg-gray-100 px-5 py-12 sm:py-16"
   aria-labelledby="public-sections-heading"
 > <div className="mx-auto max-w-7xl"> <FadeIn> <div className="mx-auto mb-10 max-w-3xl text-center"> <h2
           id="public-sections-heading"
           className="text-3xl font-bold text-sam-deep-blue sm:text-4xl"
         >
Explore Our Resources </h2>


        <p className="mt-4 text-lg leading-8 text-gray-600">
          Explore Bible studies, health resources, family
          guidance, and other materials to strengthen your
          faith and enrich your life.
        </p>
      </div>
    </FadeIn>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((section, index) => {
        const config = publicSections[section.slug];

        const title =
          config?.title ?? section.name;

        const image =
          config?.heroImage ?? DEFAULT_SECTION_IMAGE;

        return (
          <FadeIn
            key={section.slug}
            delay={index * 0.1}
          >
            <Link
              href={`/public/${section.slug}`}
              className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sam-deep-blue"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-sam-deep-blue/20 transition-colors duration-300 group-hover:bg-sam-deep-blue/35" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-sam-deep-blue transition-colors group-hover:text-sam-blue-dark">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
  {config?.description ??
    `Explore our ${section.name.toLowerCase()} resources and discover materials prepared to support your spiritual growth and understanding.`}
</p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-sam-blue-dark">
                  Explore resources
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  </div>
</section>

);
}