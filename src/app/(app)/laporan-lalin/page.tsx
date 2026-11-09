import { Download } from "lucide-react";
import type { Metadata } from "next";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate } from "@/lib/format";
import { loadDailyReport } from "@/lib/lalin/load-report";
import { paginate } from "@/lib/paginate";
import { buildHref, readPage, type SearchParams } from "@/lib/search-params";
import { CategoryTabs } from "./_components/category-tabs";
import { ReportTable } from "./_components/report-table";

export const metadata: Metadata = { title: "Laporan Lalin per Hari" };

const PATHNAME = "/laporan-lalin";
const PER_PAGE = 10;

type PageProps = { searchParams: Promise<SearchParams> };

export default async function LaporanLalinPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const report = await loadDailyReport(params);
  const pagination = paginate(report.rows, readPage(params), PER_PAGE);
  const periodLabel = report.tanggal ? formatDate(report.tanggal) : "Semua tanggal";
  const exportHref = buildHref(`${PATHNAME}/export`, params, { page: undefined });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Lalin per Hari"
        description="Jumlah kendaraan per gardu, dipisah berdasarkan jenis pembayaran."
        actions={
          <a href={exportHref} className={buttonStyles("secondary")}>
            <Download className="size-4" aria-hidden />
            Export CSV
          </a>
        }
      />

      <Card className="p-4">
        <FilterBar
          pathname={PATHNAME}
          query={report.query}
          showDate
          date={report.tanggal}
          keepParams={{ metode: report.category.key }}
          searchPlaceholder="Cari ruas, gerbang, gardu, atau tanggal..."
        />
      </Card>

      <CategoryTabs summary={report.summary} activeKey={report.category.key} pathname={PATHNAME} searchParams={params} />

      <Card>
        <div className="flex flex-col gap-1 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold">Rincian {report.category.label}</h2>
          <p className="text-sm text-muted">{periodLabel}</p>
        </div>

        {pagination.totalItems === 0 ? (
          <EmptyState title="Tidak ada data lalin" description="Coba pilih tanggal lain atau ubah kata kunci pencarian." />
        ) : (
          <ReportTable
            rows={pagination.items}
            startNumber={pagination.from}
            paymentLabel={report.category.shortLabel}
            totals={report.totals}
          />
        )}

        <div className="border-t border-border p-4">
          <Pagination pagination={pagination} pathname={PATHNAME} searchParams={params} />
        </div>
      </Card>
    </div>
  );
}
