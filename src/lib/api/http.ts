import "server-only";
import { getSessionToken } from "@/lib/auth/session";
import { config } from "@/lib/config";
import { ApiError } from "./api-error";
import { buildUrl, type QueryParams } from "./helpers";

const API_TIMEOUT_MS = 10_000;

type ApiRequest = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: QueryParams;
  body?: unknown;
};

export async function apiFetch<T>(path: string, request: ApiRequest = {}): Promise<T> {
  const token = await getSessionToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(config.API_BASE_URL, path, request.query), {
      method: request.method ?? "GET",
      headers,
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
      cache: "no-store",
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
  } catch {
    throw new ApiError(503, "API tidak dapat dihubungi");
  }

  const json: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(response.status, readErrorMessage(json));
  }
  return json as T;
}

function readErrorMessage(json: unknown): string {
  if (typeof json === "object" && json !== null && "message" in json && typeof json.message === "string") {
    return json.message;
  }
  return "Terjadi kesalahan pada server";
}
