"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/api-error";
import { createGerbang, deleteGerbang, updateGerbang } from "@/lib/api/gerbang";
import { requireSession } from "@/lib/auth/session";
import { getGerbangErrorMessage } from "@/lib/gerbang/gerbang";
import { gerbangKeySchema, gerbangSchema } from "@/lib/gerbang/gerbang-schema";
import { getFieldErrors } from "@/lib/validation";

export type GerbangFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

export async function saveGerbangAction(
  _previousState: GerbangFormState,
  formData: FormData,
): Promise<GerbangFormState> {
  await requireSession();

  const isEdit = formData.get("mode") === "edit";
  const read = (name: string) => String(formData.get(name) ?? "");
  const values = {
    id: read("id"),
    IdCabang: read("IdCabang"),
    NamaGerbang: read("NamaGerbang"),
    NamaCabang: read("NamaCabang"),
  };

  const parsed = gerbangSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: getFieldErrors(parsed.error),
      values,
    };
  }

  try {
    if (isEdit) await updateGerbang(parsed.data);
    else await createGerbang(parsed.data);
  } catch (error) {
    return { status: "error", message: getGerbangErrorMessage(error), values };
  }

  revalidatePath("/master-gerbang");
  return {
    status: "success",
    message: isEdit
      ? `Gerbang ${parsed.data.NamaGerbang} berhasil diperbarui.`
      : `Gerbang ${parsed.data.NamaGerbang} berhasil ditambahkan.`,
  };
}

export async function deleteGerbangAction(
  _previousState: GerbangFormState,
  formData: FormData,
): Promise<GerbangFormState> {
  await requireSession();

  const parsed = gerbangKeySchema.safeParse({ id: formData.get("id"), IdCabang: formData.get("IdCabang") });
  if (!parsed.success) {
    return { status: "error", message: "Data gerbang tidak valid." };
  }

  try {
    await deleteGerbang(parsed.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) revalidatePath("/master-gerbang");
    return { status: "error", message: getGerbangErrorMessage(error) };
  }

  revalidatePath("/master-gerbang");
  return { status: "success", message: "Gerbang berhasil dihapus." };
}
