"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

import FadeIn from "./FadeIn";

const articles = [
{
title: "Undue Familiarity — A Subtle Snare",
description:
"Discover how undue familiarity is silently eroding the spiritual strength of Christian youth. It’s death wrapped in harmless appearances. It’s friendliness with a trap beneath.",
href: "/public/articles/familiarity",
},
{
title: "“I Never Knew You” — Does God Really Know You?",
description:
"Yes, the Lord is aware that you exist—but does He know you? Let's see if God knows you...",
href: "/public/articles/never-knew-you",
},
{
title: "Almost Saved, Eternally Lost",
description:
"Read the sad tale of Guonzou and how he missed the only chance to be saved. Learn how to avoid the same mistake in the spiritual realm.",
href: "/public/articles/almost-saved",
},
];

export default function FeaturedArticles() {
const [currentArticle, setCurrentArticle] = useState(0);

useEffect(() => {
const interval = window.setInterval(() => {
setCurrentArticle(
(index) => (index + 1) % articles.length
);
}, 6000);

return () => window.clearInterval(interval);

}, []);

const article = articles[currentArticle];

return ( <section
   className="bg-gray-50 px-5 py-12 sm:py-16"
   aria-labelledby="featured-articles-heading"
 > <div className="mx-auto max-w-3xl"> <FadeIn> <h2
         id="featured-articles-heading"
         className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl"
       >
Featured Articles </h2>

      <Card className="relative overflow-hidden bg-sam-yellow p-6 text-center shadow-lg sm:p-8">
        <div
          key={article.title}
          className="animate-fade-in"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3 className="text-2xl font-bold text-sam-deep-blue">
            {article.title}
          </h3>

          <p className="mt-4 text-base leading-7 text-gray-800 sm:text-lg">
            {article.description}
          </p>

          <div className="mt-6">
            <Button variant="secondary" size="md">
              <Link href={article.href}>
                Read More
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      <div
        className="mt-5 flex justify-center gap-2"
        aria-label="Choose a featured article"
      >
        {articles.map((item, index) => (
          <button
            key={item.href}
            type="button"
            onClick={() => setCurrentArticle(index)}
            aria-label={`Show article ${index + 1}: ${item.title}`}
            aria-pressed={index === currentArticle}
            className={`h-2.5 rounded-full transition-all ${
              index === currentArticle
                ? "w-8 bg-sam-deep-blue"
                : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="md">
          <Link href="/public/articles">
            View More Articles
          </Link>
        </Button>
      </div>
    </FadeIn>
  </div>
</section>

);
}
