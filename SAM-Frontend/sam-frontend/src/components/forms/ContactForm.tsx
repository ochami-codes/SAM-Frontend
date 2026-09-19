"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { useSubmitContactMessage } from "@/src/hooks/contact/useSubmitContactMessage";
import { useContactFormValidation } from "@/src/hooks/validation/useContactFormValidation";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const submitMessageMutation = useSubmitContactMessage();
  const { errors, validateField, validateForm, clearErrors } =
    useContactFormValidation();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    if (!validateForm(values)) return;

    submitMessageMutation.mutate(values, {
      onSuccess: () => {
        setSubmitted(true);
        clearErrors();
        form.reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md sm:p-8"
    >
      {/* Name */}
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
          disabled={submitMessageMutation.isPending}
          onBlur={(e) => validateField("name", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
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
          disabled={submitMessageMutation.isPending}
          onBlur={(e) => validateField("email", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Subject */}
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
          disabled={submitMessageMutation.isPending}
          onBlur={(e) => validateField("subject", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
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
          disabled={submitMessageMutation.isPending}
          onBlur={(e) => validateField("message", e.target.value)}
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-sam-blue focus:ring-2 focus:ring-sam-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={submitMessageMutation.isPending}
      >
        {submitMessageMutation.isPending ? "Sending..." : "Send Message"}
      </Button>

      {submitted && (
        <p className="mt-4 text-center font-semibold text-green-600">
          Message sent successfully!
        </p>
      )}
    </form>
  );
}
