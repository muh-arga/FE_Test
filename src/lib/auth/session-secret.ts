const MIN_SECRET_LENGTH = 32;

export const SESSION_SECRET_PLACEHOLDER = "ganti-dengan-string-acak-minimal-32-karakter";

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH || secret === SESSION_SECRET_PLACEHOLDER) {
    throw new Error(
      `SESSION_SECRET belum diisi, kurang dari ${MIN_SECRET_LENGTH} karakter, atau masih berisi nilai contoh. Buat dengan: openssl rand -hex 32`,
    );
  }
  return secret;
}
