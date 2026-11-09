import "server-only";
import type { ApiListResponse } from "@/types/api";
import type { Gerbang } from "@/types/gerbang";
import { fetchAllPages, toPageResult } from "./helpers";
import { apiFetch } from "./http";

const GERBANG_PAGE_SIZE = 100;

export async function getAllGerbangs(): Promise<Gerbang[]> {
  return fetchAllPages(async (page) => {
    const response = await apiFetch<ApiListResponse<Gerbang>>("/gerbangs", {
      query: { page, limit: GERBANG_PAGE_SIZE },
    });
    return toPageResult(response);
  });
}

export async function createGerbang(gerbang: Gerbang): Promise<void> {
  await apiFetch("/gerbangs", { method: "POST", body: gerbang });
}

export async function updateGerbang(gerbang: Gerbang): Promise<void> {
  await apiFetch("/gerbangs", { method: "PUT", body: gerbang });
}

export async function deleteGerbang(key: Pick<Gerbang, "id" | "IdCabang">): Promise<void> {
  await apiFetch("/gerbangs", { method: "DELETE", body: key });
}
