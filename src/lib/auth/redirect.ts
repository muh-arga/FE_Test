import { DEFAULT_REDIRECT_PATH } from "./constants";

const PARSE_BASE = "http://internal.invalid";

export function getSafeRedirectPath(path: string | null | undefined): string {
  if (!path || !path.startsWith("/") || /[\x00-\x1F\x7F\\]/.test(path)) {
    return DEFAULT_REDIRECT_PATH;
  }

  let url: URL;
  try {
    url = new URL(path, PARSE_BASE);
  } catch {
    return DEFAULT_REDIRECT_PATH;
  }

  if (url.origin !== PARSE_BASE || url.pathname.startsWith("//") || url.pathname.startsWith("/login")) {
    return DEFAULT_REDIRECT_PATH;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
