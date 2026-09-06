import type { ApiError } from "./ApiError";

const ERROR_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR:
    "Please check the information you entered.",

  INVALID_CREDENTIALS:
    "Invalid email or password.",

  ACCOUNT_INACTIVE:
    "Your account is inactive. Please contact an administrator.",

  AUTHENTICATION_REQUIRED:
    "Please sign in to continue.",

  INVALID_AUTHORIZATION:
    "Your authentication information is invalid.",

  INVALID_ACCESS_TOKEN:
    "Your session has expired. Please sign in again.",

  FORBIDDEN:
    "You do not have permission to perform this action.",

  USER_NOT_FOUND:
    "User account not found.",

  ACCOUNT_ALREADY_EXISTS:
    "An account with this email already exists.",

  INVALID_CURRENT_PASSWORD:
    "The current password is incorrect.",

  PASSWORD_UNCHANGED:
    "Your new password must be different from your current password.",

  INVALID_RESET_TOKEN:
    "This password reset link is invalid or has expired.",

  INVALID_INVITATION:
    "This invitation link is invalid or has expired.",

  NETWORK_ERROR:
    "Unable to connect to the server. Please check your internet connection.",

  INTERNAL_SERVER_ERROR:
    "Something went wrong on the server. Please try again later.",
};

const FALLBACK_ERROR_MESSAGE =
  "Something went wrong. Please try again.";

export function getErrorMessage(
  error: ApiError
): string {
  if (error.code) {
    return (
      ERROR_MESSAGES[error.code] ??
      FALLBACK_ERROR_MESSAGE
    );
  }

  return FALLBACK_ERROR_MESSAGE;
}