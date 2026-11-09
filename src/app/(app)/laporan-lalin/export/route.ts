import type { NextRequest } from "next/server";
import { getSessionToken } from "@/lib/auth/session";
import { loadDailyReport } from "@/lib/lalin/load-report";
import { reportToCsv } from "@/lib/lalin/report-csv";

const UTF8_BOM = "\uFEFF";

export async function GET(request: NextRequest) {
  if (!(await getSessionToken())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const params = Object.fromEntries(request.nextUrl.searchParams);

  let report;
  let csv: string;
  try {
    report = await loadDailyReport(params);
    csv = reportToCsv(report.rows, report.category);
  } catch {
    return new Response("Export gagal: server API tidak merespons. Kembali dan coba lagi.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const filename = `laporan-lalin_${report.tanggal || "semua-tanggal"}_${report.category.key}.csv`;

  return new Response(`${UTF8_BOM}${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
