import FadeIn from "./FadeIn";

export default function MissionSection() {
return ( <section className="bg-white"> <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16"> <FadeIn> <h2 className="text-3xl font-bold text-sam-deep-blue sm:text-4xl">
Our Mission </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        To lead souls to Christ, uplift present truth, and prepare a
        people for the Second Coming through digital evangelism.
      </p>
    </FadeIn>
  </div>
</section>


);
}
