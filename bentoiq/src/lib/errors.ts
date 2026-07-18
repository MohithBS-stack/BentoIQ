import type { ApiError } from "@/types";

/**
 * Typed application error class.
 * All service layer errors should be wrapped in this.
 */
export class AppError extends Error {
  public readonly code:    string;
  public readonly details?: Record<string, string[]>;

  constructor(message: string, code: string = "UNKNOWN_ERROR", details?: Record<string, string[]>) {
    super(message);
    this.name    = "AppError";
    this.code    = code;
    this.details = details;
  }

  toApiError(): ApiError {
    return {
      code:    this.code,
      message: this.message,
      details: this.details,
    };
  }
}

/**
 * Converts an unknown caught error into a readable ApiError.
 */
export function normalizeError(error: unknown): ApiError {
  if (error instanceof AppError) {
    return error.toApiError();
  }

  if (error instanceof Error) {
    return {
      code:    "UNEXPECTED_ERROR",
      message: error.message,
    };
  }

  if (typeof error === "object" && error !== null && "code" in error && "message" in error) {
    return error as ApiError;
  }

  return {
    code:    "UNKNOWN",
    message: "An unknown error occurred.",
  };
}

/**
 * User-friendly error messages by code.
 */
export const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR:    "Unable to reach the server. Check your internet connection.",
  401:              "You are not authenticated. Please sign in.",
  403:              "You do not have permission to perform this action.",
  404:              "The requested resource was not found.",
  429:              "Too many requests. Please slow down.",
  500:              "Something went wrong on our side. Please try again.",
  UNKNOWN:          "An unexpected error occurred.",
};

export function getFriendlyError(code: string): string {
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN;
}
