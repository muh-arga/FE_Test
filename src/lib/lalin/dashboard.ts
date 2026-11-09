import { createGerbangLookup, describeGerbang, gerbangKey } from "@/lib/gerbang/gerbang";
import type { Gerbang } from "@/types/gerbang";
import type { Lalin } from "@/types/lalin";
import { DASHBOARD_PAYMENT_METHODS, sumFields, totalLalin } from "./payment";

export type ChartDatum = { name: string; value: number; detail?: string };

const SHIFTS = [1, 2, 3];

export function countByPaymentMethod(lalins: Lalin[]): ChartDatum[] {
  return DASHBOARD_PAYMENT_METHODS.map((method) => ({
    name: method.label,
    value: lalins.reduce((sum, lalin) => sum + sumFields(lalin, method.fields), 0),
  }));
}

export function countByShift(lalins: Lalin[]): ChartDatum[] {
  return SHIFTS.map((shift) => ({
    name: `Shift ${shift}`,
    value: lalins.filter((lalin) => lalin.Shift === shift).reduce((sum, lalin) => sum + totalLalin(lalin), 0),
  }));
}

export function countByGerbang(lalins: Lalin[], gerbangs: Gerbang[]): ChartDatum[] {
  const lookup = createGerbangLookup(gerbangs);
  return groupTotals(lalins, (lalin) => {
    const { namaGerbang, namaRuas } = describeGerbang(lookup, lalin.IdCabang, lalin.IdGerbang);
    return { key: gerbangKey(lalin.IdCabang, lalin.IdGerbang), name: namaGerbang, detail: `Ruas ${namaRuas}` };
  });
}

export function countByRuas(lalins: Lalin[], gerbangs: Gerbang[]): ChartDatum[] {
  const lookup = createGerbangLookup(gerbangs);
  return groupTotals(lalins, (lalin) => ({
    key: String(lalin.IdCabang),
    name: describeGerbang(lookup, lalin.IdCabang, lalin.IdGerbang).namaRuas,
  }));
}

function groupTotals(
  lalins: Lalin[],
  describe: (lalin: Lalin) => { key: string; name: string; detail?: string },
): ChartDatum[] {
  const groups = new Map<string, ChartDatum>();
  for (const lalin of lalins) {
    const { key, name, detail } = describe(lalin);
    const group = groups.get(key) ?? { name, detail, value: 0 };
    group.value += totalLalin(lalin);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => b.value - a.value);
}
