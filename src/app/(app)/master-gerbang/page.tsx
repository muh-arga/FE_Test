import type { Metadata } from "next";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getAllGerbangs } from "@/lib/api/gerbang";
import { sortGerbangs } from "@/lib/gerbang/gerbang";
import { paginate } from "@/lib/paginate";
import { matchesSearch } from "@/lib/search";
import { readPage, readString, type SearchParams } from "@/lib/search-params";
import { GerbangFormDialog } from "./_components/gerbang-form-dialog";
import { GerbangTable } from "./_components/gerbang-table";

export const metadata: Metadata = { title: "Master Data Gerbang" };

const PATHNAME = "/master-gerbang";
const PER_PAGE = 10;

type PageProps = { searchParams: Promise<SearchParams> };

export default async function MasterGerbangPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = readString(params, "q");

  const gerbangs = await getAllGerbangs();

  const filtered = sortGerbangs(gerbangs).filter((gerbang) =>
    matchesSearch(query, [gerbang.id, gerbang.IdCabang, gerbang.NamaGerbang, gerbang.NamaCabang]),
  );
  const pagination = paginate(filtered, readPage(params), PER_PAGE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Data Gerbang"
        description="Kelola daftar gerbang tol beserta ruasnya."
        actions={<GerbangFormDialog mode="create" />}
      />

      <Card>
        <div className="border-b border-border p-4">
          <FilterBar pathname={PATHNAME} query={query} searchPlaceholder="Cari ID, nama gerbang, atau nama ruas..." />
        </div>

        {pagination.totalItems === 0 ? (
          <EmptyState
            title={query ? `Tidak ada gerbang yang cocok dengan "${query}"` : "Belum ada data gerbang"}
            description={query ? "Coba kata kunci lain atau klik Reset." : "Tambahkan gerbang pertama."}
          />
        ) : (
          <GerbangTable gerbangs={pagination.items} startNumber={pagination.from} />
        )}

        <div className="border-t border-border p-4">
          <Pagination pagination={pagination} pathname={PATHNAME} searchParams={params} />
        </div>
      </Card>
    </div>
  );
}
