import { toCsv } from "@/lib/csv";
import { formatDayName } from "@/lib/format";
import type { PaymentCategory } from "./payment";
import { GOLONGAN_LABELS, type DailyReportRow } from "./report";

export function reportToCsv(rows: DailyReportRow[], category: PaymentCategory): string {
  const header = ["No", "Ruas", "Gerbang", "Gardu", "Hari", "Tanggal", "Metode Pembayaran", ...GOLONGAN_LABELS, "Total Lalin"];
  const body = rows.map((row, index) => [
    index + 1,
    row.namaRuas,
    row.namaGerbang,
    row.gardu,
    formatDayName(row.tanggal),
    row.tanggal,
    category.shortLabel,
    ...row.perGolongan,
    row.total,
  ]);
  return toCsv(header, body);
}
