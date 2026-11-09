type TokenPayload = { id?: number; username?: string; exp?: number };

export function decodeTokenPayload(token: string): TokenPayload | null {
  const payloadPart = token.split(".")[1];
  if (!payloadPart) return null;
  try {
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const parsed: unknown = JSON.parse(atob(base64));
    return typeof parsed === "object" && parsed !== null ? (parsed as TokenPayload) : null;
  } catch {
    return null;
  }
}

export function getTokenExpiry(token: string): Date | null {
  const exp = decodeTokenPayload(token)?.exp;
  return typeof exp === "number" ? new Date(exp * 1000) : null;
}

export function isTokenExpired(token: string, now: Date = new Date()): boolean {
  const expiry = getTokenExpiry(token);
  return expiry === null || expiry <= now;
}
