"use client";

import { useSubmitContactMessage } from "@/src/hooks/contact/useSubmitContactMessage";
import { useContactFormValidation } from "@/src/hooks/validation/useContactFormValidation";

export default function PrayerRequestForm() {
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
      subject: "Prayer Request",
      message: String(formData.get("message") ?? ""),
    };

    if (!validateForm(values)) return;

    submitMessageMutation.mutate(values, {
      onSuccess: () => {
        clearErrors();
        form.reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-2xl flex-col gap-5"
    >
      {/* Name */}
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
          disabled={submitMessageMutation.isPending}
          placeholder="Enter your name"
          onBlur={(e) => validateField("name", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
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
          disabled={submitMessageMutation.isPending}
          placeholder="Enter your email"
          onBlur={(e) => validateField("email", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Message */}
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
          disabled={submitMessageMutation.isPending}
          placeholder="Share your message or prayer request..."
          onBlur={(e) => validateField("message", e.target.value)}
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-sam-deep-blue focus:ring-2 focus:ring-sam-deep-blue/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitMessageMutation.isPending}
        className="rounded-lg bg-sam-deep-blue px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitMessageMutation.isPending
          ? "Sending..."
          : "Send Prayer Request"}
      </button>

      {submitMessageMutation.isSuccess && (
        <p
          role="status"
          className="rounded-lg bg-green-50 p-4 text-center text-green-700"
        >
          Thank you for sharing your prayer request.
          We’ll keep you in prayer.
        </p>
      )}
    </form>
  );
}
