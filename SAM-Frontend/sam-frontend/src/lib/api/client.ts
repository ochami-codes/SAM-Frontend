import { ApiError } from "../errors/ApiError";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

let accessToken: string | null = null;

export function setAccessToken(
  token: string | null
): void {
  accessToken = token;
}

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  if (accessToken) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }

  let response: Response;

  try {
    response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
        credentials: "include",
      }
    );
  } catch {
    throw new ApiError(
      "Unable to connect to the server. Please check your internet connection and try again.",
      0,
      "NETWORK_ERROR"
    );
  }

  if (!response.ok) {
    let errorData: {
      message?: string;
      code?: string;
    } = {};

    try {
      errorData = await response.json();
    } catch {
      // Response was not valid JSON.
    }

    throw new ApiError(
      errorData.message ||
        "Something went wrong. Please try again.",
      response.status,
      errorData.code
    );
  }

  return response.json();
}