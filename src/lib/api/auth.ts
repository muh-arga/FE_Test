import "server-only";
import type { LoginResponse } from "@/types/api";
import { apiFetch } from "./http";

export async function requestLoginToken(username: string, password: string): Promise<string> {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: { username, password },
  });
  return response.token;
}
