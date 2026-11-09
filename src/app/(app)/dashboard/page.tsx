import type { Metadata } from "next";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { DonutChartCard } from "@/components/charts/donut-chart-card";
import { FilterBar } from "@/components/filter-bar";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getAllGerbangs } from "@/lib/api/gerbang";
import { getLalins } from "@/lib/api/lalin";
import { formatDate } from "@/lib/format";
import { countByGerbang, countByPaymentMethod, countByRuas, countByShift } from "@/lib/lalin/dashboard";
import { filterLalinsBySearch } from "@/lib/lalin/filter";
import { summarizeByCategory } from "@/lib/lalin/payment";
import { readDate, readString, type SearchParams } from "@/lib/search-params";
import { StatTile } from "./_components/stat-tile";

export const metadata: Metadata = { title: "Dashboard" };

type PageProps = { searchParams: Promise<SearchParams> };

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = readString(params, "q");
  const tanggal = readDate(params, "tanggal");

  const [lalins, gerbangs] = await Promise.all([getLalins(tanggal), getAllGerbangs()]);
  const filtered = filterLalinsBySearch(lalins, gerbangs, query);

  const kpis = summarizeByCategory(filtered).filter((item) => item.category.key !== "etoll_tunai_flo");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={tanggal ? `Ringkasan lalu lintas tanggal ${formatDate(tanggal)}` : "Ringkasan lalu lintas seluruh tanggal"}
      />

      <Card className="p-4">
        <FilterBar pathname="/dashboard" query={query} showDate date={tanggal} searchPlaceholder="Cari ruas, gerbang, gardu, atau shift..." />
      </Card>

      <section aria-label="Ringkasan jumlah lalin" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {kpis.map(({ category, total }) => (
          <StatTile key={category.key} label={category.label} value={total} highlight={category.key === "keseluruhan"} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Lalin per Metode Pembayaran"
          description="Jumlah kendaraan untuk BCA, BRI, BNI, DKI, Mandiri, Flo, dan KTP (Tunai, Mega, dan Nobu tidak termasuk)."
          data={countByPaymentMethod(filtered)}
        />
        <BarChartCard title="Lalin per Gerbang" description="Jumlah kendaraan di setiap gerbang." data={countByGerbang(filtered, gerbangs)} />
        <DonutChartCard title="Proporsi Lalin per Shift" description="Persentase kendaraan di shift 1, 2, dan 3." data={countByShift(filtered)} />
        <DonutChartCard title="Proporsi Lalin per Ruas" description="Persentase kendaraan di setiap ruas (cabang)." data={countByRuas(filtered, gerbangs)} />
      </div>
    </div>
  );
}
