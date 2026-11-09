import { ApiError } from "@/lib/api/api-error";
import type { Gerbang } from "@/types/gerbang";

export function gerbangKey(IdCabang: number, idGerbang: number): string {
  return `${IdCabang}-${idGerbang}`;
}

export function createGerbangLookup(gerbangs: Gerbang[]): Map<string, Gerbang> {
  return new Map(gerbangs.map((gerbang) => [gerbangKey(gerbang.IdCabang, gerbang.id), gerbang]));
}

export function describeGerbang(
  lookup: Map<string, Gerbang>,
  IdCabang: number,
  IdGerbang: number,
): { namaGerbang: string; namaRuas: string } {
  const gerbang = lookup.get(gerbangKey(IdCabang, IdGerbang));
  return {
    namaGerbang: gerbang?.NamaGerbang ?? `Gerbang ${IdGerbang}`,
    namaRuas: gerbang?.NamaCabang ?? `Ruas ${IdCabang}`,
  };
}

export function sortGerbangs(gerbangs: Gerbang[]): Gerbang[] {
  return [...gerbangs].sort((a, b) => a.NamaCabang.localeCompare(b.NamaCabang) || a.id - b.id);
}

export function getGerbangErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.message.toLowerCase().includes("already exist")) {
      return "Kombinasi ID Gerbang dan ID Ruas sudah terdaftar. Gunakan ID lain.";
    }
    if (error.status === 404) return "Data gerbang tidak ditemukan. Mungkin sudah dihapus.";
    if (error.status === 503) return "Server API tidak dapat dihubungi. Pastikan service API berjalan.";
  }
  return "Terjadi kesalahan. Silakan coba lagi.";
}
