export type SearchParams = Record<string, string | string[] | undefined>;

export function readString(params: SearchParams, key: string): string {
  const value = params[key];
  const first = Array.isArray(value) ? value[0] : value;
  return first?.trim() ?? "";
}

export function readPage(params: SearchParams): number {
  const page = Number(readString(params, "page"));
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function readDate(params: SearchParams, key: string): string {
  const value = readString(params, key);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value) ? value : "";
}

export function buildHref(
  pathname: string,
  params: SearchParams,
  changes: Record<string, string | number | undefined>,
): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first) query.set(key, first);
  }
  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined || value === "") query.delete(key);
    else query.set(key, String(value));
  }
  const queryString = query.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}
