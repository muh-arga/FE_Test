"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ApiError } from "@/lib/api/api-error";
import { requestLoginToken } from "@/lib/api/auth";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { saveSession } from "@/lib/auth/session";
import { getFieldErrors } from "@/lib/validation";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  username?: string;
};

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const parsed = loginSchema.safeParse({ username, password: formData.get("password") ?? "" });

  if (!parsed.success) {
    return { fieldErrors: getFieldErrors(parsed.error), username };
  }

  try {
    const token = await requestLoginToken(parsed.data.username, parsed.data.password);
    await saveSession(token);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 422)) {
      return { error: "Username atau password salah.", username };
    }
    return { error: "Server API tidak dapat dihubungi. Coba lagi beberapa saat.", username };
  }

  redirect(getSafeRedirectPath(String(formData.get("from") ?? "")));
}
