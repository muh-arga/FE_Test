import "server-only";
import type { ApiListResponse } from "@/types/api";
import type { Lalin } from "@/types/lalin";
import { fetchAllPages, toPageResult } from "./helpers";
import { apiFetch } from "./http";

const LALIN_PAGE_SIZE = 500;

export async function getLalins(tanggal: string): Promise<Lalin[]> {
  return fetchAllPages(async (page) => {
    const response = await apiFetch<ApiListResponse<Lalin>>("/lalins", {
      query: { tanggal, page, limit: LALIN_PAGE_SIZE },
    });
    return toPageResult(response);
  });
}
