import Link from "next/link";
import Image from "next/image";

import Button from "@/src/components/ui/Button";
import FadeIn from "./FadeIn";

export default function HeroSection() {
return ( <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[80vh] lg:min-h-[90vh]"> <Image
     src="/images/brand/secondadvent2.png"
     alt="Second Advent Ministries"
     fill
     priority
     sizes="100vw"
     className="absolute inset-0 object-cover"
   />

```
  <div className="absolute inset-0 bg-sam-deep-blue/70" />

  <FadeIn className="relative z-10 mx-4 max-w-3xl rounded-3xl bg-sam-deep-blue/80 px-6 py-10 text-center text-white backdrop-blur-sm sm:px-10">
    <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
      Welcome to Second Advent Ministries
    </h1>

    <p className="mt-4 text-lg text-gray-100 sm:text-xl">
      Proclaiming the Everlasting Gospel with Truth and Love
    </p>

    <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button variant="primary" size="md">
        <Link href="/public/bible-study">
          Explore Bible Studies
        </Link>
      </Button>

      <Button variant="primary" size="md">
        <Link href="/public/articles">
          Explore Devotional Articles
        </Link>
      </Button>
    </div>
  </FadeIn>
</section>
);
}
