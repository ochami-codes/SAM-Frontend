"use client";

interface ContactMessageEmptyProps {
  title?: string;
  description?: string;
}

export default function ContactMessageEmpty({
  title = "No messages found",
  description = "There are no contact messages or prayer requests to display.",
}: ContactMessageEmptyProps) {
  return (
    <div className="flex min-h-64 items-center justify-center p-8">
      <div className="max-w-sm text-center">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.69 6.15a2.25 2.25 0 0 1-2.62 0L2.25 6.75"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}