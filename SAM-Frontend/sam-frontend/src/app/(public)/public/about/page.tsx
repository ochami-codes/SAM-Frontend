import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Card from "@/src/components/ui/Card";
import type { Metadata } from "next";
import { seo } from "@/src/app/seo";
export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl space-y-16 px-6 py-12">
        {/* Introduction */}
        <section>
          <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-sam-blue to-sam-yellow bg-clip-text text-transparent sm:text-4xl">
            Proclaiming Christ. Preparing for His Soon Return.
          </h2>

          <div className="space-y-6 text-base leading-8 text-muted sm:text-lg">
            <p>
              Second Advent Ministries is a Christian digital ministry
              committed to spreading the everlasting gospel of Jesus Christ,
              with a special emphasis on the three angels’ messages of
              Revelation 14. Rooted in the historic Seventh-day Adventist
              faith, we exist to uplift Christ, call people to repentance, and
              prepare souls for His soon return.
            </p>
            <p>
              We believe in the power of digital evangelism to reach hearts
              across the world. Through Bible-based content, spiritual
              resources, and practical Christian living guides, we aim to help
              people experience true conversion, grow in grace, and stand firm
              in these last days.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="space-y-10">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-sam-deepBlue sm:text-3xl">
              Our Vision
            </h2>
            <p className="text-base leading-8 text-muted sm:text-lg">
              To see lives transformed through the preaching of the present
              truth and to help prepare a people ready to meet Jesus at His
              Second Coming.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-sam-deepBlue sm:text-3xl">
              Our Mission
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-base leading-7 text-muted sm:text-lg">
              <li>Share Bible truth with clarity and love</li>
              <li>Inspire daily personal revival and reform</li>
              <li>
                Equip believers to be faithful witnesses in their homes,
                churches, and communities
              </li>
            </ul>
          </div>
        </section>

        {/* Beliefs */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-sam-deepBlue sm:text-3xl">
            What We Believe
          </h2>
          <Card className="p-8">
            <ul className="list-disc space-y-3 pl-6 text-base leading-7 text-muted sm:text-lg">
              <li>
                The Bible is the inspired Word of God and our foundation for
                all faith and practice.
              </li>
              <li>
                Jesus Christ is our Savior, High Priest, and soon-coming King.
              </li>
              <li>
                Salvation is by grace through faith, and true obedience is the
                fruit of a converted life.
              </li>
              <li>
                God&apos;s Ten Commandments, including the Sabbath, are still
                binding and relevant today.
              </li>
              <li>
                The health message is part of God&apos;s plan to restore His
                image in man.
              </li>
              <li>
                The three angels&apos; messages are a divine call to come out
                of Babylon and worship the Creator in spirit and truth.
              </li>
            </ul>
          </Card>
        </section>

        {/* How We Serve */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-sam-deepBlue sm:text-3xl">
            How We Serve
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-base leading-7 text-muted sm:text-lg">
            <li>YouTube Bible teachings and devotionals</li>
            <li>Free Bible study resources and guides</li>
            <li>Social media evangelism and digital outreach</li>
            <li>Practical Christian living messages and testimonies</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

