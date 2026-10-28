import PageLayout from "@/src/components/layouts/PageLayout";
import { getPublicContentList } from "@/src/lib/content/getPublicContentList";
import ArticlesList from "./ArticlesList";
import type { Metadata } from "next";
import { seo } from "@/src/app/seo";
export const metadata: Metadata = {
  title: seo.articles.title,
  description: seo.articles.description,
};

export default async function ArticlesPage() {
  const articles = await getPublicContentList({section:"articles"});

  return (
    <PageLayout
      title="Devotional Articles"
      heroImage="/images/bible-study/bible-light.jpg"
      theme="default"
      subtitle={
        <em>
          “Sanctify them through Thy truth: Thy word is truth.”
          – John 17:17
        </em>
      }
    >
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-[var(--page-section-title)] sm:text-3xl">
          Devotional Articles
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-center leading-7 text-slate-600">
          Be inspired, convicted, and drawn closer to Christ through these
          truth-filled devotionals, rooted in Scripture and the Spirit of
          Prophecy.
        </p>

        <ArticlesList articles={articles} />
      </section>
    </PageLayout>
  );
}                   
