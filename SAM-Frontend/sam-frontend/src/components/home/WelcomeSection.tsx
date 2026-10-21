import FadeIn from "./FadeIn";

export default function WelcomeSection() {
return ( <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16"> <FadeIn> <h2 className="text-3xl font-bold text-sam-deep-blue sm:text-4xl">
Welcome! </h2>

    <p className="mt-4 text-lg text-gray-600">
      Preaching the end-time message while radiating love to others.
    </p>
  </FadeIn>
</section>

);
}
