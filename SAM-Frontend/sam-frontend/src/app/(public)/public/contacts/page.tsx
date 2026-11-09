import type { Metadata } from "next";

import Link from "next/link";

import {
  Mail,
  Phone,
  MessageCircle,
  Globe,
  Video,
  Heart,
  BookOpen,
  ArrowRight,
  Cross,
  Clock,
} from "lucide-react";

import Footer from "@/src/components/Footer";
import ContactForm from "@/src/components/forms/ContactForm";
import FadeIn from "@/src/components/home/FadeIn";

import { seo } from "@/src/app/seo";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "info@second-advent-ministries.co.ke",
    href: "mailto:info@second-advent-ministries.co.ke",
    description: "Send us an email anytime.",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+254 795 044 356",
    href: "tel:+254795044356",
    description: "Reach us directly by phone.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/254795044356",
    description: "Connect with us on WhatsApp.",
  },
];

export default function ContactPage() {
  return (
    <>

      <main className="overflow-hidden">

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sam-deepBlue via-sam-blue-dark to-sam-blue px-6 py-24 text-white sm:py-32">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-sam-yellow/10 blur-3xl" />

          <FadeIn>
            <div className="relative mx-auto max-w-7xl">

              <div className="max-w-3xl">

                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-sam-yellow backdrop-blur-sm">
                  <MessageCircle size={16} />
                  WE'D LOVE TO HEAR FROM YOU
                </span>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                  Let's Connect.
                  <span className="mt-2 block text-sam-yellow">
                    We're Here to Serve.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                  Whether you have a question, need spiritual encouragement,
                  have a prayer request, or want to study the Bible, we'd
                  love to hear from you. Every conversation is an opportunity
                  to share God's love and grow together in Christ.
                </p>

                <Link
                  href="#contact-form"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-sam-yellow px-7 py-3.5 font-bold text-slate-900 transition hover:bg-white"
                >
                  Send Us a Message
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>
          </FadeIn>
        </section>


        {/* CONTACT INTRODUCTION */}
        <section className="px-6 py-20 sm:py-24">

          <div className="mx-auto max-w-7xl">

            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Get in Touch
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  How Can We Help You?
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                  We believe that no sincere question is too small and
                  no prayer request is insignificant. Reach out, and
                  let's grow in faith together.
                </p>

              </div>
            </FadeIn>


            {/* CONTACT METHODS */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">

              {contactMethods.map((method, index) => {
                const Icon = method.icon;

                return (
                  <FadeIn key={method.title} delay={index * 0.1}>

                    <a
                      href={method.href}
                      target={method.href.startsWith("https") ? "_blank" : undefined}
                      rel={method.href.startsWith("https") ? "noopener noreferrer" : undefined}
                      className="group flex h-full items-start gap-5 rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sam-blue/50 hover:shadow-xl"
                    >

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sam-blue/10 text-sam-blue-dark transition group-hover:bg-sam-blue-dark group-hover:text-white">

                        <Icon size={26} />

                      </div>

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-slate-900">
                          {method.title}
                        </h3>

                        <p className="mt-2 break-words font-semibold text-sam-blue-dark">
                          {method.value}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {method.description}
                        </p>

                      </div>

                    </a>

                  </FadeIn>
                );
              })}

            </div>

          </div>
        </section>


        {/* CONTACT FORM */}
        <section
          id="contact-form"
          className="bg-slate-50 px-6 py-24 sm:py-28"
        >

          <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">

            {/* FORM INTRODUCTION */}
            <FadeIn>

              <div className="lg:sticky lg:top-28">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-sam-blue-dark">
                  Send a Message
                </span>

                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                  We'd Love to Hear Your Story.
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                  Have something on your heart? Share your thoughts,
                  questions, suggestions, or prayer requests with us.
                  Our desire is to serve you with love and biblical truth.
                </p>

                <div className="mt-10 space-y-6">

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sam-blue/10 text-sam-blue-dark">
                      <Heart size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Prayer and Spiritual Support
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        You don't have to walk your spiritual journey alone.
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sam-blue/10 text-sam-blue-dark">
                      <BookOpen size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Bible Study
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Let us help you discover the wonderful truths
                        found in God's Word.
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sam-blue/10 text-sam-blue-dark">
                      <Clock size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        We're Listening
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        We appreciate every message and will respond
                        as soon as possible.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </FadeIn>


            {/* EXISTING CONTACT FORM */}
            <FadeIn delay={0.15}>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

                <div className="mb-8">

                  <h3 className="text-2xl font-bold text-slate-900">
                    Send Us a Message
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in the form below and we'll get back to you.
                  </p>

                </div>

                <ContactForm />

              </div>

            </FadeIn>

          </div>

        </section>


        {/* SOCIAL MEDIA */}
        <section className="px-6 py-20 sm:py-24">

          <div className="mx-auto max-w-5xl">

            <FadeIn>

              <div className="rounded-3xl bg-gradient-to-br from-sam-deepBlue to-sam-blue-dark px-8 py-14 text-center text-white sm:px-14">

                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-sam-yellow">

                  <Cross size={32} />

                </div>

                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Stay Connected With Us
                </h2>

                <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/80">
                  Follow Second Advent Ministries as we continue sharing
                  biblical teachings, spiritual encouragement, and messages
                  of hope through digital platforms.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">

                  {/* Replace these with actual ministry social URLs */}

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
                  >
                    <Globe size={19} />
                    Facebook
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
                  >
                    <Video size={19} />
                    YouTube
                  </a>

                </div>

              </div>

            </FadeIn>

          </div>

        </section>


        {/* FINAL INVITATION */}
        <section className="border-t border-slate-100 px-6 py-16 text-center">

          <FadeIn>

            <div className="mx-auto max-w-2xl">

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Seeking Something Deeper?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Explore the Scriptures and discover the everlasting
                truths of God's Word.
              </p>

              <Link
                href="/public/bible-study"
                className="mt-7 inline-flex items-center gap-2 font-bold text-sam-blue-dark transition hover:text-sam-deepBlue"
              >
                Explore Bible Studies
                <ArrowRight size={18} />
              </Link>

            </div>

          </FadeIn>

        </section>

      </main>

      <Footer />
    </>
  );
}