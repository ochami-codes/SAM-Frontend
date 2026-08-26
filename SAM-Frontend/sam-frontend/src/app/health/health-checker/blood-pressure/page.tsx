"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HeartPulse, RotateCcw } from "lucide-react";

import {
  checkBloodPressure,
  type CheckerResult,
} from "../../../../utils/healthChecker";

export default function BloodPressurePage() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");

  const [result, setResult] = useState<CheckerResult | null>(null);

  const handleCheck = () => {
    if (!systolic || !diastolic || !pulse) {
      setResult({
        message: "Please fill in all fields.",
        style: "warning",
      });
      return;
    }

    const checkResult = checkBloodPressure(
      Number(systolic),
      Number(diastolic),
      Number(pulse)
    );

    setResult(checkResult);
  };

  const handleClear = () => {
    setSystolic("");
    setDiastolic("");
    setPulse("");
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
              <HeartPulse size={34} />
            </div>

            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              Blood Pressure & Pulse Checker
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Enter your blood pressure and resting pulse readings to receive
              a simple educational interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-800">
            Understanding Blood Pressure
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Blood pressure measures the force of blood against the walls of
            your arteries. It is recorded using two numbers: systolic pressure
            and diastolic pressure.
          </p>

          <p className="mt-3 leading-7 text-slate-600">
            Your pulse, measured in beats per minute, tells you how quickly
            your heart is beating. Checking these measurements regularly can
            help you become more aware of changes in your cardiovascular
            health.
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
                Enter the measurements shown on your blood pressure monitor.
              </p>
            </div>

            {/* Systolic */}
            <div>
              <label
                htmlFor="systolic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Systolic Pressure
                <span className="ml-1 text-slate-400">(mmHg)</span>
              </label>

              <input
                id="systolic"
                type="number"
                min="0"
                step="1"
                value={systolic}
                onChange={(e) => {
                  setSystolic(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. 120"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Diastolic */}
            <div className="mt-5">
              <label
                htmlFor="diastolic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Diastolic Pressure
                <span className="ml-1 text-slate-400">(mmHg)</span>
              </label>

              <input
                id="diastolic"
                type="number"
                min="0"
                step="1"
                value={diastolic}
                onChange={(e) => {
                  setDiastolic(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. 80"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Pulse */}
            <div className="mt-5">
              <label
                htmlFor="pulse"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Resting Pulse
                <span className="ml-1 text-slate-400">(bpm)</span>
              </label>

              <input
                id="pulse"
                type="number"
                min="0"
                step="1"
                value={pulse}
                onChange={(e) => {
                  setPulse(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. 70"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500">
                For the most useful comparison, measure your pulse while you
                are resting.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={handleCheck}
                className="flex-1 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
              >
                Check Blood Pressure
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

      {/* Understanding the Numbers */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-emerald-800">
            Understanding the Numbers
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Systolic Pressure
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The upper number represents the pressure in your arteries when
                your heart contracts and pumps blood.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Diastolic Pressure
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The lower number represents the pressure in your arteries when
                your heart relaxes between beats.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Pulse
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Pulse is the number of heartbeats per minute. A resting adult
                pulse commonly falls between 60 and 100 beats per minute.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-800">
                Take Measurements Correctly
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Rest quietly before measuring, keep your arm supported, and
                avoid talking during the measurement.
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
            diagnose high blood pressure, low blood pressure, heart disease,
            or any other medical condition.
          </p>

          <p className="mt-3 text-sm leading-6 text-amber-800">
            Blood pressure can vary throughout the day and can be affected by
            stress, activity, medications, illness, caffeine, and other
            factors. Repeated abnormal readings should be discussed with a
            qualified healthcare professional.
          </p>

          <p className="mt-3 text-sm font-medium leading-6 text-amber-900">
            If your blood pressure is extremely high or you have symptoms such
            as chest pain, difficulty breathing, severe headache, weakness,
            confusion, or vision changes, seek urgent medical attention.
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