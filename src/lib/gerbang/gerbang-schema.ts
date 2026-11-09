import { z } from "zod";

const MAX_DB_INT = 2147483647;

export const gerbangSchema = z.object({
  id: z.coerce
    .number({ error: "ID Gerbang harus berupa angka" })
    .int("ID Gerbang harus bilangan bulat")
    .positive("ID Gerbang harus lebih dari 0")
    .max(MAX_DB_INT, "ID Gerbang terlalu besar"),
  IdCabang: z.coerce
    .number({ error: "ID Ruas harus berupa angka" })
    .int("ID Ruas harus bilangan bulat")
    .positive("ID Ruas harus lebih dari 0")
    .max(MAX_DB_INT, "ID Ruas terlalu besar"),
  NamaGerbang: z.string().trim().min(1, "Nama Gerbang wajib diisi").max(100, "Nama Gerbang maksimal 100 karakter"),
  NamaCabang: z.string().trim().min(1, "Nama Ruas wajib diisi").max(100, "Nama Ruas maksimal 100 karakter"),
});

export type GerbangInput = z.infer<typeof gerbangSchema>;

export const gerbangKeySchema = gerbangSchema.pick({ id: true, IdCabang: true });
