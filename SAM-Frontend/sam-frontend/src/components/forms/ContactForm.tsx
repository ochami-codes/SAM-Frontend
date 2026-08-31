"use client";

import { useState } from "react";
import Button from "../ui/Button";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    setStatus("sending");

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md sm:p-8"
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-800"
        >
          Full Name
        </label>

        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block font-semibold text-gray-800"
        >
          Email Address
        </label>

        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="subject"
          className="mb-2 block font-semibold text-gray-800"
        >
          Subject
        </label>

        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Prayer Request, Bible Study, Question, etc."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-2 block font-semibold text-gray-800"
        >
          Your Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>

      {status === "success" && (
        <p className="mt-4 text-center font-semibold text-green-600">
          Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-center font-semibold text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}