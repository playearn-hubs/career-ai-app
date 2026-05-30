export class ApiError extends Error {
  readonly statusCode: number;
  readonly code?: string;
  readonly errors?: Record<string, string>;

  constructor(
    statusCode: number,
    message: string,
    options?: { code?: string; errors?: Record<string, string> }
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = options?.code;
    this.errors = options?.errors;
  }
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
