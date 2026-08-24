"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const articles = [
  {
    title: "Undue Familiarity — A Subtle Snare",
    description:
      "Discover how undue familiarity is silently eroding the spiritual strength of Christian youth. It’s death wrapped in harmless appearances. It’s friendliness with a trap beneath.",
    href: "/familiarity",
  },
  {
    title: "“I Never Knew You” — Does God Really Know You?",
    description:
      "Yes, the Lord is aware that you exist—but does He know you? Let's see if God knows you...",
    href: "/never-knew",
  },
  {
    title: "Almost Saved, Eternally Lost",
    description:
      "Read the sad tale of Guonzou and how he missed the only chance to be saved. Learn how to avoid the same mistake in the spiritual realm.",
    href: "/almost-saved",
  },
];

export default function HomePage() {
  const [currentArticle, setCurrentArticle] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentArticle((i) => (i + 1) % articles.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const article = articles[currentArticle];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 text-gray-800">
        {/* HERO */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh] lg:min-h-[90vh]">
          <Image
            src="/images/brand/secondadvent2.png"
            alt="Second Advent Ministries"
            fill
            className="absolute inset-0 object-cover"
            priority
          />

          <div className="absolute inset-0 bg-sam-deep-blue/70" />

          <div className="relative z-10 mx-4 max-w-3xl rounded-3xl bg-sam-deep-blue/80 px-6 py-10 text-center text-white backdrop-blur-sm sm:px-10">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Welcome to Second Advent Ministries
            </h1>
            <p className="mt-4 text-lg text-gray-100 sm:text-xl">
              Proclaiming the Everlasting Gospel with Truth and Love
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
              <Button variant="primary" size="md">
                <Link href="/bible-study">Explore Bible Studies</Link>
              </Button>
              <Button variant="primary" size="md">
                <Link href="/devotionals">Explore Devotional Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* WELCOME */}
        <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16">
          <h2 className="text-3xl font-bold text-sam-deep-blue sm:text-4xl">
            Welcome!
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Preaching the end-time message while radiating love to others.
          </p>
        </section>

        {/* MISSION */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16">
            <h2 className="text-3xl font-bold text-sam-deep-blue sm:text-4xl">
              Our Mission
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              To lead souls to Christ, uplift present truth, and prepare a
              people for the Second Coming through digital evangelism, Bible
              studies, and health reform.
            </p>
          </div>
        </section>

        {/* FEATURED ARTICLES */}
        <section className="bg-gray-50 px-5 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
              Featured Articles
            </h2>

            <Card className="relative overflow-hidden bg-sam-yellow p-6 text-center shadow-lg sm:p-8">
              <div key={article.title} className="animate-fade-in">
                <h3 className="text-2xl font-bold text-sam-deep-blue">
                  {article.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-800 sm:text-lg">
                  {article.description}
                </p>
                <div className="mt-6">
                  <Button variant="secondary" size="md">
                    <Link href={article.href}>Read More</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-5 flex justify-center gap-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentArticle(index)}
                  aria-label={`Show article ${index + 1}`}
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
                <Link href="/articles">View More Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SCROLL TO TOP */}
        {showScrollTop && (
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-900 text-xl text-white shadow-lg transition-all duration-300 hover:bg-gray-800"
          >
            ↑
          </button>
        )}
      </main>

      <Footer />
    </>
  );
}
