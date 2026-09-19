export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const MAX_EMAIL_LENGTH = 254;

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(
  value: string
): string | undefined {
  const name = value.trim();

  if (!name) {
    return "Name is required.";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (name.length > 100) {
    return "Name must not exceed 100 characters.";
  }

  return undefined;
}

export function validateEmail(
  value: string
): string | undefined {
  const email = value.trim();

  if (!email) {
    return "Email address is required.";
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return "Email address must not exceed 254 characters.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address.";
  }

  return undefined;
}

export function validateSubject(
  value: string
): string | undefined {
  const subject = value.trim();

  if (subject.length > 200) {
    return "Subject must not exceed 200 characters.";
  }

  return undefined;
}

export function validateMessage(
  value: string
): string | undefined {
  const message = value.trim();

  if (!message) {
    return "Message is required.";
  }

  if (message.length > 5000) {
    return "Message must not exceed 5000 characters.";
  }

  return undefined;
}

export function validateContactField(
  field: keyof ContactFormValues,
  value: string
): string | undefined {
  switch (field) {
    case "name":
      return validateName(value);

    case "email":
      return validateEmail(value);

    case "subject":
      return validateSubject(value);

    case "message":
      return validateMessage(value);
  }
}

export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const nameError = validateName(values.name);
  const emailError = validateEmail(values.email);
  const subjectError = validateSubject(values.subject);
  const messageError = validateMessage(values.message);

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (subjectError) {
    errors.subject = subjectError;
  }

  if (messageError) {
    errors.message = messageError;
  }

  return errors;
}