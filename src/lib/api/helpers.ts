import type { ApiListResponse } from "@/types/api";

export type QueryParams = Record<string, string | number | undefined>;

export function buildUrl(baseUrl: string, path: string, query: QueryParams = {}): string {
  const url = new URL(`${baseUrl.replace(/\/$/, "")}${path}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export type PageResult<T> = { items: T[]; totalPages: number };

export function toPageResult<T>(response: ApiListResponse<T>): PageResult<T> {
  return { items: response.data.rows.rows, totalPages: response.data.total_pages };
}

export async function fetchAllPages<T>(
  fetchPage: (page: number) => Promise<PageResult<T>>,
): Promise<T[]> {
  const firstPage = await fetchPage(1);
  if (firstPage.totalPages <= 1) return firstPage.items;

  const remainingPageNumbers = Array.from({ length: firstPage.totalPages - 1 }, (_, index) => index + 2);
  const remainingPages = await Promise.all(remainingPageNumbers.map((page) => fetchPage(page)));

  return [...firstPage.items, ...remainingPages.flatMap((page) => page.items)];
}
