import type { Lalin, PaymentField } from "@/types/lalin";

const TUNAI: PaymentField[] = ["Tunai"];
const E_TOLL: PaymentField[] = ["eMandiri", "eBri", "eBni", "eBca", "eNobu", "eDKI", "eMega"];
const FLO: PaymentField[] = ["eFlo"];
const KTP: PaymentField[] = ["DinasOpr", "DinasMitra", "DinasKary"];

export const ALL_PAYMENT_FIELDS: PaymentField[] = [...TUNAI, ...E_TOLL, ...FLO, ...KTP];

export type PaymentCategoryKey =
  | "tunai"
  | "etoll"
  | "flo"
  | "ktp"
  | "keseluruhan"
  | "etoll_tunai_flo";

export type PaymentCategory = {
  key: PaymentCategoryKey;
  label: string;
  shortLabel: string;
  fields: PaymentField[];
};

const KESELURUHAN: PaymentCategory = {
  key: "keseluruhan",
  label: "Total Keseluruhan",
  shortLabel: "Semua",
  fields: ALL_PAYMENT_FIELDS,
};

export const PAYMENT_CATEGORIES: PaymentCategory[] = [
  { key: "tunai", label: "Total Tunai", shortLabel: "Tunai", fields: TUNAI },
  { key: "etoll", label: "Total E-Toll", shortLabel: "E-Toll", fields: E_TOLL },
  { key: "flo", label: "Total Flo", shortLabel: "Flo", fields: FLO },
  { key: "ktp", label: "Total KTP", shortLabel: "KTP", fields: KTP },
  KESELURUHAN,
  {
    key: "etoll_tunai_flo",
    label: "Total E-Toll + Tunai + Flo",
    shortLabel: "E-Toll + Tunai + Flo",
    fields: [...E_TOLL, ...TUNAI, ...FLO],
  },
];

export function findPaymentCategory(key: string): PaymentCategory {
  return PAYMENT_CATEGORIES.find((category) => category.key === key) ?? KESELURUHAN;
}

export function sumFields(lalin: Lalin, fields: PaymentField[]): number {
  return fields.reduce((sum, field) => sum + lalin[field], 0);
}

export function totalLalin(lalin: Lalin): number {
  return sumFields(lalin, ALL_PAYMENT_FIELDS);
}

export type CategorySummary = { category: PaymentCategory; total: number };

export function summarizeByCategory(lalins: Lalin[]): CategorySummary[] {
  return PAYMENT_CATEGORIES.map((category) => ({
    category,
    total: lalins.reduce((sum, lalin) => sum + sumFields(lalin, category.fields), 0),
  }));
}

export const DASHBOARD_PAYMENT_METHODS: { label: string; fields: PaymentField[] }[] = [
  { label: "BCA", fields: ["eBca"] },
  { label: "BRI", fields: ["eBri"] },
  { label: "BNI", fields: ["eBni"] },
  { label: "DKI", fields: ["eDKI"] },
  { label: "Mandiri", fields: ["eMandiri"] },
  { label: "Flo", fields: FLO },
  { label: "KTP", fields: KTP },
];
