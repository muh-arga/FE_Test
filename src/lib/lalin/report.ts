import { toDateKey } from "@/lib/format";
import { createGerbangLookup, describeGerbang } from "@/lib/gerbang/gerbang";
import type { Gerbang } from "@/types/gerbang";
import type { Lalin } from "@/types/lalin";
import { sumFields, type PaymentCategory } from "./payment";

export const GOLONGAN_LABELS = ["Gol I", "Gol II", "Gol III", "Gol IV", "Gol V"];

export type DailyReportRow = {
  key: string;
  namaRuas: string;
  namaGerbang: string;
  gardu: number;
  tanggal: string;
  perGolongan: number[];
  total: number;
};

export type ReportTotals = { perGolongan: number[]; total: number };

export function buildDailyReport(lalins: Lalin[], gerbangs: Gerbang[], category: PaymentCategory): DailyReportRow[] {
  const lookup = createGerbangLookup(gerbangs);
  const rowsByKey = new Map<string, DailyReportRow>();

  for (const lalin of lalins) {
    const tanggal = toDateKey(lalin.Tanggal);
    const key = [lalin.IdCabang, lalin.IdGerbang, lalin.IdGardu, tanggal].join("|");

    let row = rowsByKey.get(key);
    if (!row) {
      const { namaGerbang, namaRuas } = describeGerbang(lookup, lalin.IdCabang, lalin.IdGerbang);
      row = { key, namaRuas, namaGerbang, gardu: lalin.IdGardu, tanggal, perGolongan: GOLONGAN_LABELS.map(() => 0), total: 0 };
      rowsByKey.set(key, row);
    }

    const amount = sumFields(lalin, category.fields);
    const golonganIndex = lalin.Golongan - 1;
    if (golonganIndex >= 0 && golonganIndex < GOLONGAN_LABELS.length) {
      row.perGolongan[golonganIndex] += amount;
    }
    row.total += amount;
  }

  return [...rowsByKey.values()].sort(
    (a, b) =>
      a.tanggal.localeCompare(b.tanggal) ||
      a.namaRuas.localeCompare(b.namaRuas) ||
      a.namaGerbang.localeCompare(b.namaGerbang) ||
      a.gardu - b.gardu,
  );
}

export function sumReportRows(rows: DailyReportRow[]): ReportTotals {
  return {
    perGolongan: GOLONGAN_LABELS.map((_, index) => rows.reduce((sum, row) => sum + row.perGolongan[index], 0)),
    total: rows.reduce((sum, row) => sum + row.total, 0),
  };
}
