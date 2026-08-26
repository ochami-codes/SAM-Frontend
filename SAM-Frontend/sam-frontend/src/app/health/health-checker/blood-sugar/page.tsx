"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Droplets, RotateCcw } from "lucide-react";

import {
  checkBloodSugar,
  type CheckerResult,
  type SugarContext,
  type SugarUnit,
} from "../../../../utils/healthChecker";

export default function BloodSugarPage() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<SugarUnit>("mgdl");
  const [context, setContext] = useState<SugarContext>("fasting");
  const [result, setResult] = useState<CheckerResult | null>(null);

  const handleCheck = () => {
    if (!value) {
      setResult({
        message: "Please enter your blood sugar value.",
        style: "warning",
      });
      return;
    }

    const checkResult = checkBloodSugar(
      Number(value),
      unit,
      context
    );

    setResult(checkResult);
  };

  const handleClear = () => {
    setValue("");
    setUnit("mgdl");
    setContext("fasting");
    setResult(null);
  };

  const resultStyles = {
    normal: "border-green-200 bg-green-50 text-green-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    danger: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <Link
            href="/health/health-checker"
            className="mb-8 inline-flex items-center gap-2 text-sm text-emerald-100 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Health Checker
          </Link>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Droplets size={34} />
            </div>

            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              Blood Sugar Checker
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Check your blood glucose reading and understand how the value
              may be interpreted depending on when it was measured.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-800">
            Understanding Blood Sugar
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Blood glucose levels change throughout the day. Meals, exercise,
            medication, stress, illness, and other factors can affect your
            reading.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            For this reason, the time at which your blood sugar was measured
            is important when interpreting the result.
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 md:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-slate-800">
                Enter Your Reading
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the value exactly as shown on your glucose meter.
              </p>
            </div>

            {/* Blood Sugar */}
            <div>
              <label
                htmlFor="blood-sugar"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Blood Sugar
              </label>

              <div className="flex gap-3">
                <input
                  id="blood-sugar"
                  type="number"
                  min="0"
                  step="0.1"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setResult(null);
                  }}
                  placeholder="e.g. 95"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <select
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value as SugarUnit);
                    setResult(null);
                  }}
                  className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="mgdl">mg/dL</option>
                  <option value="mmol">mmol/L</option>
                </select>
              </div>
            </div>

            {/* Measurement Context */}
            <div className="mt-6">
              <label
                htmlFor="measurement-context"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                When was the reading taken?
              </label>

              <select
                id="measurement-context"
                value={context}
                onChange={(e) => {
                  setContext(e.target.value as SugarContext);
                  setResult(null);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="fasting">
                  Fasting
                </option>

                <option value="before-meal">
                  Before a meal
                </option>

                <option value="after-meal">
                  2 hours after a meal
                </option>

                <option value="random">
                  Random / Any time
                </option>
              </select>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Select the option that best describes when you measured your
                blood sugar.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={handleCheck}
                className="flex-1 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
              >
                Check Blood Sugar
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <RotateCcw size={17} />
                Clear
              </button>
            </div>

            {/* Result */}
            {result && (
              <div
                className={`mt-6 rounded-xl border p-5 ${
                  resultStyles[result.style]
                }`}
                role="status"
              >
                <h3 className="font-semibold">
                  Result
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-6">
                  {result.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reference Information */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-emerald-800">
            About Blood Sugar Readings
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Fasting
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                A fasting reading is generally taken after not eating for at
                least 8 hours.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Before a Meal
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                A pre-meal reading can be useful for monitoring glucose,
                particularly for people managing diabetes.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                2 Hours After a Meal
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Post-meal glucose provides information about how the body is
                responding to food.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Random
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                A random reading can be taken at any time, but its meaning
                depends on factors such as when you last ate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Important Health Notice
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            This tool is intended for educational purposes only. It does not
            diagnose diabetes, hypoglycemia, or any other medical condition.
            Blood sugar targets can vary between individuals, particularly for
            people living with diabetes.
          </p>

          <p className="mt-3 text-sm leading-6 text-amber-800">
            A single abnormal reading should not be used to make a diagnosis.
            Persistent abnormal readings or concerning symptoms should be
            discussed with a qualified healthcare professional.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 px-6 py-8 text-center text-white">
        <p className="text-sm italic text-emerald-100">
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