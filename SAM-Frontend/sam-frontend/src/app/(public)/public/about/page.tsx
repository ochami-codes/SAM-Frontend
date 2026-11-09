import type { Metadata } from "next";

import {
  BookOpen,
  Cross,
  Heart,
  HeartHandshake,
  Globe,
  ShieldCheck,
  Sprout,
  Sun,
  Video,
  BookMarked,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import Footer from "@/src/components/Footer";
import FadeIn from "@/src/components/home/FadeIn";

import { seo } from "@/src/app/seo";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
};

const beliefs = [
  {
    icon: BookOpen,
    title: "The Word of God",
    description:
      "The Bible is the inspired Word of God, our foundation for faith, doctrine, and Christian living.",
  },
  {
    icon: Cross,
    title: "Jesus Christ",
    description:
      "Jesus Christ is our Savior, High Priest, and soon-coming King. Through Him alone we have salvation.",
  },
  {
    icon: Heart,
    title: "Salvation by Grace",
    description:
      "Salvation is a gift of God's grace received through faith. True obedience is the fruit of a transformed life.",
  },
  {
    icon: ShieldCheck,
    title: "God's Holy Law",
    description:
      "God's Ten Commandments remain His unchanging standard of righteousness, including the seventh-day Sabbath.",
  },
  {
    icon: Sprout,
    title: "Health and Wholeness",
    description:
      "The health message is part of God's plan to restore His image in humanity and promote abundant living.",
  },
  {
    icon: Globe,
    title: "The Three Angels' Messages",
    description:
      "We believe in proclaiming Revelation 14:6–12, calling the world to worship the Creator and prepare for Christ's return.",
  },
];

const ministries = [
  {
    icon: Video,
    title: "Bible Teachings",
    description:
      "Christ-centered teachings, sermons, and devotionals that help people understand and apply Scripture.",
  },
  {
    icon: BookMarked,
    title: "Bible Study Resources",
    description:
      "Free Bible study materials designed to help individuals discover biblical truth for themselves.",
  },
  {
    icon: Globe,
    title: "Digital Evangelism",
    description:
      "Using digital platforms and social media to share the everlasting gospel beyond geographical boundaries.",
  },
  {
    icon: HeartHandshake,
    title: "Christian Living",
    description:
      "Practical biblical guidance on health, family life, relationships, and personal spiritual growth.",
  },
];

export default function AboutPage() {
  return (
    <>

      <main className="overflow-hidden">

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sam-deepBlue via-sam-blue-dark to-sam-blue px-6 py-24 text-white sm:py-32">

          {/* Decorative elements */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -bottom-48 -left-24 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-sam-yellow/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            <FadeIn>
              <div className="max-w-3xl">

                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-sam-yellow backdrop-blur-sm">
                  <Cross size={15} />
                  SECOND ADVENT MINISTRIES
                </span>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                  Proclaiming Christ.
                  <span className="mt-2 block text-sam-yellow">
                    Preparing for His Soon Return.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                  A digital ministry committed to sharing the everlasting
                  gospel, uplifting Jesus Christ, and calling people
                  everywhere to prepare for His soon return.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">

                  <Link
                    href="/public/bible-study"
                    className="inline-flex items-center gap-2 rounded-full bg-sam-yellow px-7 py-3.5 font-bold text-slate-900 transition hover:bg-white"
                  >
                    Explore Bible Studies
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/public/articles"
                    className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                  >
                    Explore Our Resources
                  </Link>

                </div>

              </div>
            </FadeIn>

            {/* Ministry statement */}
            <FadeIn delay={0.2}>
              <div className="mt-20 grid gap-6 border-t border-white/20 pt-10 sm:grid-cols-3">

                <div>
                  <p className="text-3xl font-bold text-sam-yellow">
                    Christ
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    The center of our message
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-sam-yellow">
                    Scripture
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    The foundation of our faith
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-sam-yellow">
                    Mission
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    The reason we exist
                  </p>
                </div>

              </div>
            </FadeIn>

          </div>
        </section>


        {/* WHO WE ARE */}
        <section className="px-6 py-24 sm:py-28">

          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

            <FadeIn>
              <div>

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Who We Are
                </span>

                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Sharing timeless truth in a changing world.
                </h2>

                <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">

                  <p>
                    Second Advent Ministries is a Christian digital ministry
                    committed to spreading the everlasting gospel of Jesus
                    Christ, with a special emphasis on the three angels'
                    messages of Revelation 14.
                  </p>

                  <p>
                    Rooted in the historic Seventh-day Adventist faith, we
                    exist to uplift Christ, call people to repentance, and
                    prepare souls for His soon return.
                  </p>

                  <p>
                    We believe that digital evangelism provides an
                    extraordinary opportunity to reach hearts across
                    geographical boundaries. Through Bible-based teachings,
                    spiritual resources, and practical Christian living
                    guides, we seek to help people experience genuine
                    conversion and grow in grace.
                  </p>

                </div>

              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative">

                <div className="absolute -right-5 -top-5 h-full w-full rounded-3xl bg-sam-blue/10" />

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sam-blue-dark to-sam-deepBlue p-10 text-white shadow-xl sm:p-14">

                  <BookOpen
                    size={55}
                    className="mb-10 text-sam-yellow"
                  />

                  <blockquote className="text-2xl font-semibold leading-relaxed sm:text-3xl">
                    &ldquo;Fear God, and give glory to him; for the hour
                    of his judgment is come: and worship him that made
                    heaven, and earth, and the sea, and the fountains
                    of waters.&rdquo;
                  </blockquote>

                  <p className="mt-8 font-bold text-sam-yellow">
                    Revelation 14:7 (KJV)
                  </p>

                </div>

              </div>
            </FadeIn>

          </div>
        </section>


        {/* VISION AND MISSION */}
        <section className="bg-slate-50 px-6 py-24 sm:py-28">

          <div className="mx-auto max-w-7xl">

            <FadeIn>
              <div className="mx-auto mb-16 max-w-2xl text-center">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Our Purpose
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Why We Exist
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Everything we do is guided by a clear purpose:
                  proclaiming the gospel and preparing a people to meet Jesus.
                </p>

              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2">

              <FadeIn>
                <div className="h-full rounded-3xl border border-sam-blue/20 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-10">

                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-sam-blue/10 text-sam-blue-dark">
                    <Sun size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Our Vision
                  </h3>

                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    To see lives transformed through the preaching of the
                    present truth and to help prepare a people ready to meet
                    Jesus at His Second Coming.
                  </p>

                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="h-full rounded-3xl border border-sam-blue/20 bg-gradient-to-br from-sam-deepBlue to-sam-blue-dark p-8 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-10">

                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-sam-yellow">
                    <HeartHandshake size={30} />
                  </div>

                  <h3 className="text-2xl font-bold">
                    Our Mission
                  </h3>

                  <ul className="mt-5 space-y-4 text-lg leading-8 text-white/85">

                    <li className="flex gap-3">
                      <span className="mt-1 text-sam-yellow">✓</span>
                      Share Bible truth with clarity and love.
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-1 text-sam-yellow">✓</span>
                      Inspire daily personal revival and reform.
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-1 text-sam-yellow">✓</span>
                      Equip believers to be faithful witnesses in their homes,
                      churches, and communities.
                    </li>

                  </ul>

                </div>
              </FadeIn>

            </div>

          </div>
        </section>


        {/* BELIEFS */}
        <section className="px-6 py-24 sm:py-28">

          <div className="mx-auto max-w-7xl">

            <FadeIn>
              <div className="mb-16 max-w-2xl">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Our Foundation
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  What We Believe
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Our beliefs are grounded in Scripture and centered
                  on Jesus Christ. These convictions shape our message,
                  ministry, and way of life.
                </p>

              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {beliefs.map((belief, index) => {
                const Icon = belief.icon;

                return (
                  <FadeIn key={belief.title} delay={index * 0.08}>

                    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sam-blue/50 hover:shadow-xl">

                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sam-blue/10 text-sam-blue-dark transition group-hover:bg-sam-blue-dark group-hover:text-white">

                        <Icon size={25} />

                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {belief.title}
                      </h3>

                      <p className="mt-4 leading-7 text-slate-600">
                        {belief.description}
                      </p>

                    </div>

                  </FadeIn>
                );
              })}

            </div>

          </div>
        </section>


        {/* HOW WE SERVE */}
        <section className="bg-slate-50 px-6 py-24 sm:py-28">

          <div className="mx-auto max-w-7xl">

            <FadeIn>
              <div className="mx-auto mb-16 max-w-2xl text-center">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Our Outreach
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  How We Serve
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Through various digital platforms and resources,
                  we seek to make biblical truth accessible to everyone.
                </p>

              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {ministries.map((ministry, index) => {
                const Icon = ministry.icon;

                return (
                  <FadeIn key={ministry.title} delay={index * 0.1}>

                    <div className="h-full rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sam-blue-dark text-white">

                        <Icon size={27} />

                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {ministry.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {ministry.description}
                      </p>

                    </div>

                  </FadeIn>
                );
              })}

            </div>

          </div>
        </section>


        {/* CLOSING CTA */}
        <section className="relative overflow-hidden bg-sam-deepBlue px-6 py-24 text-center text-white sm:py-28">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sam-blue/20 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sam-yellow/10 blur-3xl" />

          <FadeIn>
            <div className="relative mx-auto max-w-3xl">

              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-sam-yellow">

                <Cross size={34} />

              </div>

              <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                The Gospel Must Be Preached.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
                There is a world waiting to hear the everlasting gospel.
                Join us in discovering biblical truth, growing in Christ,
                and preparing for His soon return.
              </p>

              <Link
                href="/public/bible-study"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-sam-yellow px-8 py-4 font-bold text-slate-900 transition hover:bg-white"
              >
                Begin Your Bible Study
                <ArrowRight size={19} />
              </Link>

            </div>
          </FadeIn>

        </section>

      </main>

      <Footer />
    </>
  );
}