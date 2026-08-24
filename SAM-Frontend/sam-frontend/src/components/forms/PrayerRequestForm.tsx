"use client";

import { useState } from "react";
import type { SubmitEventHandler } from "react";

export default function PrayerRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // TODO: Connect to your API
    console.log(Object.fromEntries(formData));

    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus(
      "Thank you for sharing your prayer request. We’ll keep you in prayer."
    );

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-2xl flex-col gap-5"
    >
      <div>
        <label
          htmlFor="prayer-name"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Your Name
        </label>

        <input
          type="text"
          id="prayer-name"
          name="name"
          required
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="prayer-email"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Your Email
        </label>

        <input
          type="email"
          id="prayer-email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="prayer-request"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Message or Prayer Request
        </label>

        <textarea
          id="prayer-request"
          name="message"
          rows={7}
          required
          placeholder="Share your message or prayer request..."
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-sam-deep-blue px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Prayer Request"}
      </button>

      {status && (
        <p
          role="status"
          className="rounded-lg bg-green-50 p-4 text-center text-green-700"
        >
          {status}
        </p>
      )}
    </form>
  );
}