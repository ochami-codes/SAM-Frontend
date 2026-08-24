"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // TODO: Connect to your API
    console.log(Object.fromEntries(formData));

    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("Thank you for contacting us. We’ll get back to you soon.");
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
          htmlFor="contact-name"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Your Name
        </label>

        <input
          type="text"
          id="contact-name"
          name="name"
          required
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Your Email
        </label>

        <input
          type="email"
          id="contact-email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Subject
        </label>

        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          placeholder="What would you like to ask about?"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-medium text-sam-deep-blue"
        >
          Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="Write your message here..."
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-sam-deep-blue px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
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