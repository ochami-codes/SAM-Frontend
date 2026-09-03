"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Scale } from "lucide-react";

import {
  calculateBMI,
  type CheckerResult,
  type HeightUnit,
} from "@/src/utils/healthChecker";

export default function BMIPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");

  const [result, setResult] = useState<CheckerResult | null>(null
    
  );

  const handleCheck = () => {
    if (!weight || !height) {
      setResult({
        message: "Please enter your weight and height.",
        style: "warning",
      });
      return;
    }

    const checkResult = calculateBMI(
      Number(weight),
      Number(height),
      heightUnit
    );

    setResult(checkResult);
  };

  const handleClear = () => {
    setWeight("");
    setHeight("");
    setHeightUnit("cm");
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
              <Scale size={34} />
            </div>

            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              BMI Checker
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Calculate your Body Mass Index using your weight and height and
              learn what the result may indicate.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-800">
            Understanding BMI
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Body Mass Index (BMI) is a simple measurement based on a person's
            weight and height. It is commonly used as one way of screening for
            weight categories in adults.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            BMI is only one measure of health. It does not directly measure
            body fat or account for factors such as muscle mass, age, sex,
            body composition, or where body fat is distributed.
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 md:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-slate-800">
                Enter Your Measurements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Use your current weight and height for the calculation.
              </p>
            </div>

            {/* Weight */}
            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Weight
                <span className="ml-1 text-slate-400">(kg)</span>
              </label>

              <input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. 65"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Height */}
            <div className="mt-5">
              <label
                htmlFor="height"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Height
              </label>

              <div className="flex gap-3">
                <input
                  id="height"
                  type="number"
                  min="0"
                  step="0.1"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setResult(null);
                  }}
                  placeholder={heightUnit === "cm" ? "e.g. 170" : "e.g. 1.70"}
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <select
                  value={heightUnit}
                  onChange={(e) => {
                    setHeightUnit(e.target.value as HeightUnit);
                    setResult(null);
                  }}
                  className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={handleCheck}
                className="flex-1 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
              >
                Calculate BMI
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

      {/* BMI Categories */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-emerald-800">
            Adult BMI Categories
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            These categories are commonly used for adults aged 20 and older.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-2 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              <span>BMI</span>
              <span>Category</span>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-200 px-5 py-3 text-sm">
              <span>Below 18.5</span>
              <span>Underweight</span>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-200 px-5 py-3 text-sm">
              <span>18.5 – 24.9</span>
              <span>Healthy weight</span>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-200 px-5 py-3 text-sm">
              <span>25.0 – 29.9</span>
              <span>Overweight</span>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-200 px-5 py-3 text-sm">
              <span>30.0 or higher</span>
              <span>Obesity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Important Health Notice
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            BMI is a screening measurement, not a diagnosis. It may not
            accurately represent health status in people with high muscle
            mass, athletes, older adults, pregnant women, or certain other
            groups.
          </p>

          <p className="mt-3 text-sm leading-6 text-amber-800">
            This calculator is intended for educational purposes and should
            not replace professional medical or nutritional assessment.
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