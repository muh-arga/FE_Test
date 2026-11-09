import { formatDate, formatDayName, toDateKey } from "@/lib/format";
import { createGerbangLookup, describeGerbang } from "@/lib/gerbang/gerbang";
import { matchesSearch } from "@/lib/search";
import type { Gerbang } from "@/types/gerbang";
import type { Lalin } from "@/types/lalin";

export function filterLalinsBySearch(lalins: Lalin[], gerbangs: Gerbang[], query: string): Lalin[] {
  if (query.trim() === "") return lalins;

  const lookup = createGerbangLookup(gerbangs);
  return lalins.filter((lalin) => {
    const { namaGerbang, namaRuas } = describeGerbang(lookup, lalin.IdCabang, lalin.IdGerbang);
    const dateKey = toDateKey(lalin.Tanggal);
    return matchesSearch(query, [
      namaRuas,
      namaGerbang,
      `Gardu ${lalin.IdGardu}`,
      `Shift ${lalin.Shift}`,
      dateKey,
      formatDate(dateKey),
      formatDayName(dateKey),
    ]);
  });
}
