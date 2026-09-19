"use client";

import { useState } from "react";

import {
  type ContactFormErrors,
  type ContactFormValues,
  validateContactField,
  validateContactForm,
} from "@/src/lib/validation/contact";

export function useContactFormValidation() {
  const [errors, setErrors] =
    useState<ContactFormErrors>({});

  function validateField(
    field: keyof ContactFormValues,
    value: string
  ): void {
    const error = validateContactField(
      field,
      value
    );

    setErrors((current) => {
      if (!error) {
        const next = { ...current };
        delete next[field];
        return next;
      }

      return {
        ...current,
        [field]: error,
      };
    });
  }

  function validateForm(
    values: ContactFormValues
  ): boolean {
    const nextErrors =
      validateContactForm(values);

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function clearErrors(): void {
    setErrors({});
  }

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
  };
}