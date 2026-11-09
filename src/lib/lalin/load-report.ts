import "server-only";
import { getAllGerbangs } from "@/lib/api/gerbang";
import { getLalins } from "@/lib/api/lalin";
import { readDate, readString, type SearchParams } from "@/lib/search-params";
import { filterLalinsBySearch } from "./filter";
import { findPaymentCategory, summarizeByCategory, type CategorySummary, type PaymentCategory } from "./payment";
import { buildDailyReport, sumReportRows, type DailyReportRow, type ReportTotals } from "./report";

export type DailyReportData = {
  query: string;
  tanggal: string;
  category: PaymentCategory;
  summary: CategorySummary[];
  rows: DailyReportRow[];
  totals: ReportTotals;
};

export async function loadDailyReport(params: SearchParams): Promise<DailyReportData> {
  const query = readString(params, "q");
  const tanggal = readDate(params, "tanggal");
  const category = findPaymentCategory(readString(params, "metode"));

  const [lalins, gerbangs] = await Promise.all([getLalins(tanggal), getAllGerbangs()]);

  const filtered = filterLalinsBySearch(lalins, gerbangs, query);
  const rows = buildDailyReport(filtered, gerbangs, category);

  return {
    query,
    tanggal,
    category,
    summary: summarizeByCategory(filtered),
    rows,
    totals: sumReportRows(rows),
  };
}
