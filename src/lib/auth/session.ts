import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "./constants";
import { getSessionSecret } from "./session-secret";
import { signToken, verifySignedToken } from "./signed-token";
import { decodeTokenPayload, getTokenExpiry, isTokenExpired } from "./token";

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE)?.value;
  if (!cookieValue) return null;
  const token = await verifySignedToken(cookieValue, getSessionSecret());
  if (!token || isTokenExpired(token)) return null;
  return token;
}

export async function getCurrentUsername(): Promise<string | null> {
  const token = await getSessionToken();
  return token ? (decodeTokenPayload(token)?.username ?? null) : null;
}

export async function saveSession(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await signToken(token, getSessionSecret()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: getTokenExpiry(token) ?? new Date(Date.now() + ONE_HOUR_IN_MS),
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireSession(): Promise<string> {
  const token = await getSessionToken();
  if (!token) redirect("/login");
  return token;
}
