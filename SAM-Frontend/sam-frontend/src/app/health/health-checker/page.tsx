import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Droplets,
  HeartPulse,
  Scale,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    title: "Blood Pressure & Pulse",
    description:
      "Check your systolic and diastolic blood pressure together with your pulse rate.",
    icon: HeartPulse,
    href: "/health/health-checker/blood-pressure",
  },
  {
    title: "Blood Sugar",
    description:
      "Enter your blood glucose reading and understand what the value may indicate.",
    icon: Droplets,
    href: "/health/health-checker/blood-sugar",
  },
  {
    title: "BMI Checker",
    description:
      "Calculate your Body Mass Index using your height and weight.",
    icon: Scale,
    href: "/health/health-checker/bmi",
  },
];

export default function HealthCheckerPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-900">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 lg:py-20">
          {/* Text */}
          <div className="text-center text-white md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <Activity size={18} />
              Health Corner
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Health Checker
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">
              Know your numbers. Understand your health. Use our simple
              health-checking tools to become more informed about important
              health indicators.
            </p>

            <p className="mt-6 text-sm italic text-emerald-100">
              “Beloved, I wish above all things that thou mayest prosper and be
              in health...” — 3 John 1:2
            </p>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-3xl bg-white/10 p-2 shadow-2xl backdrop-blur">
              <Image
                src="/images/health/health-tools.jpg"
                alt="Health assessment"
                width={800}
                height={550}
                priority
                className="h-[280px] w-full rounded-2xl object-cover md:h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-emerald-800">
          Why Check Your Health?
        </h2>

        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-500" />

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Regularly checking certain health measurements can help you become
          more aware of changes in your body. Blood pressure, blood sugar,
          pulse, and body weight can provide useful information about your
          general health and may encourage healthier lifestyle choices.
        </p>

        <p className="mt-4 text-slate-600">
          These tools are designed to provide simple educational information.
          They are not intended to diagnose disease or replace examination and
          advice from a qualified healthcare professional.
        </p>
      </section>

      {/* Tools */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-emerald-800">
              Choose a Health Checker
            </h2>

            <p className="mt-3 text-slate-600">
              Select a tool below to enter your measurements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.title}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-800">
                    {tool.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] leading-7 text-slate-600">
                    {tool.description}
                  </p>

                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
                  >
                    Check Now
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Important Health Notice
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            The results provided by these tools are for educational and
            informational purposes only. They should not be used to diagnose,
            treat, or rule out a medical condition. If you have concerning
            symptoms or abnormal readings, seek appropriate professional
            medical advice.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 px-6 py-8 text-center text-white">
        <p className="text-sm text-emerald-100">
          “Taste and see that the Lord is good!”
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="hover:text-emerald-300">
            Home
          </Link>

          <Link href="/bible-study" className="hover:text-emerald-300">
            Bible Studies
          </Link>

          <Link href="/health" className="hover:text-emerald-300">
            Health Corner
          </Link>

          <Link href="/about" className="hover:text-emerald-300">
            About
          </Link>

          <Link href="/contacts" className="hover:text-emerald-300">
            Contacts
          </Link>
        </div>

        <p className="mt-5 text-xs text-emerald-300">
          © {new Date().getFullYear()} Second Advent Ministries
        </p>
      </footer>
    </main>
  );
}