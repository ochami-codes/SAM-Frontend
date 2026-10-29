"use client";

import Image from "next/image";
import Link from "next/link";

import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

import FadeIn from "./FadeIn";

const articles = [
{
title: "Undue Familiarity — A Subtle Snare",
description:
"Discover how seemingly harmless familiarity can weaken Christian principles and spiritual discernment.",
image: "/images/articles/familiarity.jpg",
imageAlt: "A thoughtful reflection on Christian relationships",
href: "/public/articles/familiarity",
},
{
title: "“I Never Knew You” — Does God Really Know You?",
description:
"God knows you exist, but what does it mean to be truly known by Him? Explore this searching question.",
image: "/images/articles/never_knew.png",
imageAlt: "An open Bible representing a personal walk with God",
href: "/public/articles/never-knew-you",
},
{
title: "Even the Monkeys Kept the Sabbath",
description:
"A testimony from Mozambique shows how God honors obedience to His Sabbath, even protecting farms from monkeys.",
image: "/images/articles/sunset.png",
imageAlt: "A sundown scene representing Sabbath beginning",
href: "/public/articles/monkey",
},
];

export default function FeaturedArticles() {
return ( <section
   className="bg-gray-50 px-5 py-12 sm:py-16"
   aria-labelledby="featured-articles-heading"
 > <div className="mx-auto max-w-6xl"> <FadeIn> <div className="mb-10 text-center"> <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sam-blue-dark">
Read and Reflect </p>

        <h2
          id="featured-articles-heading"
          className="text-3xl font-bold text-gray-800 sm:text-4xl"
        >
          Featured Articles
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Explore biblical insights and practical lessons to strengthen
          your faith and deepen your understanding of God's Word.
        </p>
      </div>
    </FadeIn>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {articles.map((article, index) => (
    <FadeIn
      key={article.href}
      delay={index * 0.15}
      distance={24}
      duration={0.7}
    >
          <Card
            className="group h-full overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <article className="flex h-full flex-col">
              <Link
                href={article.href}
                className="relative block aspect-[16/10] overflow-hidden bg-gray-100"
                aria-label={`Read ${article.title}`}
                tabIndex={-1}
              >
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-sam-deep-blue shadow-sm">
                  Featured
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-sam-blue-dark">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600 sm:text-base">
                  {article.description}
                </p>

                <div className="mt-5">
                  <Button variant="secondary" size="md">
                    <Link href={article.href}>
                      Read Article
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </Card>
        </FadeIn>
      ))}
    </div>

    <FadeIn>
      <div className="mt-10 text-center">
        <Button variant="outline" size="md">
          <Link href="/public/articles">
            Explore All Articles
          </Link>
        </Button>
      </div>
    </FadeIn>
  </div>
</section>
);
}