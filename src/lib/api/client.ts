import { env } from "../../config/env";
import { ApiError } from "./errors";

type ApiSuccessResponse<T> = {
  status: "ok";
  data: T;
};

type ApiErrorResponse = {
  status: "error";
  message: string;
  code?: string;
  errors?: Record<string, string>;
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      0,
      `Cannot reach the server at ${env.apiUrl}. Check that the backend is running and your device is on the same Wi‑Fi.`
    );
  }

  const json = (await response.json()) as ApiSuccessResponse<T> | ApiErrorResponse;

  if (!response.ok || json.status === "error") {
    const err = json as ApiErrorResponse;
    throw new ApiError(response.status, err.message ?? "Request failed", {
      code: err.code,
      errors: err.errors,
    });
  }

  return (json as ApiSuccessResponse<T>).data;
}
