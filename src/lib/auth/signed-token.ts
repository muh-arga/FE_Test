const encoder = new TextEncoder();

async function importKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [usage]);
}

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> | null {
  if (hex.length === 0 || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function signToken(token: string, secret: string): Promise<string> {
  const key = await importKey(secret, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(token));
  return `${token}.${toHex(signature)}`;
}

export async function verifySignedToken(value: string, secret: string): Promise<string | null> {
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex <= 0) return null;

  const token = value.slice(0, separatorIndex);
  const signature = fromHex(value.slice(separatorIndex + 1));
  if (!signature) return null;

  const key = await importKey(secret, "verify");
  const isValid = await crypto.subtle.verify("HMAC", key, signature, encoder.encode(token));
  return isValid ? token : null;
}
