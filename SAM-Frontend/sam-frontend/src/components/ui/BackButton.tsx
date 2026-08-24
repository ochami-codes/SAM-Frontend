"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEventHandler } from "react";

interface BackButtonProps {
  label?: string;
  fallback?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BackButton({
  label = "Back",
  fallback = "/",
  className = "",
  onClick,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick ?? handleBack}
      className={`
        inline-flex
        items-center
        gap-2
        text-sm
        font-medium
        text-sam-deep-blue
        transition-colors
        hover:text-sam-blue-dark
        ${className}
      `}
    >
      <ArrowLeft size={18} aria-hidden="true" />
      {label}
    </button>
  );
}