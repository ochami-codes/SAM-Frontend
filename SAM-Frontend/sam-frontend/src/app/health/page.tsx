import Link from "next/link";
import Image from "next/image";

import Card from "../../components/ui/Card";
import PageLayout from "../../components/layouts/PageLayout";

const studies = [
  {
    title: "Bible $ Spirit of Prophecy On Diet and Lifestyle",
    href: "/health/bible-sop",
    image: "/images/health/bsop.png",
    alt: "Bible and SOP",
  },
  {
    title: "Truth About Fats, Proteins and Carbs",
    href: "/health/truth",
    image: "/images/health/research.png",
    alt: "Scientific Research",
  },
  {
    title: "Lifestyle Diseases",
    href: "/health/lifestyle-diseases",
    image: "/images/health/glucometer.jpg",
    alt: "Glucometer"
  },
  {
    title: "Harmful Food Articles",
    href: "/health/junk-foods",
    image: "/images/health/junk.jpg",
    alt: "Junk Foods"
  },
  {
    title: "Health Checker Tools",
    href: "/health/health-checker",
    image: "/images/health/health-tools.jpg",
    alt: "Health Tools",
  },
];

export default function HealthPage() {
  return (
    <PageLayout
      title="Health Corner"
      heroImage="/images/health/eden.png"
      theme="health"
      subtitle={
        <em>
          “Beloved, I wish above all things that thou mayest prosper and be in health...”
          – 3 John 1:2
        </em>
      }
    >
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-[var(--page-section-title)] sm:text-3xl">
          Health Sections
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
