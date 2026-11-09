"use client";

import { Pencil, Plus } from "lucide-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import type { Gerbang } from "@/types/gerbang";
import { saveGerbangAction, type GerbangFormState } from "../actions";

type GerbangFormDialogProps = { mode: "create" } | { mode: "edit"; gerbang: Gerbang };

export function GerbangFormDialog(props: GerbangFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const gerbang = props.mode === "edit" ? props.gerbang : undefined;

  return (
    <>
      {gerbang ? (
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} aria-label={`Ubah ${gerbang.NamaGerbang}`} title="Ubah" className="size-9 px-0">
          <Pencil className="size-4" aria-hidden />
        </Button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4" aria-hidden />
          Tambah Gerbang
        </Button>
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={gerbang ? "Ubah Gerbang" : "Tambah Gerbang"}
        description={gerbang ? `${gerbang.NamaGerbang} · ${gerbang.NamaCabang}` : "Isi data gerbang baru."}
      >
        {isOpen && <GerbangForm gerbang={gerbang} onSuccess={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />}
      </Modal>
    </>
  );
}

const FIELDS = [
  { name: "id", label: "ID Gerbang", type: "number", lockedOnEdit: true },
  { name: "IdCabang", label: "ID Ruas (Cabang)", type: "number", lockedOnEdit: true },
  { name: "NamaGerbang", label: "Nama Gerbang", type: "text", lockedOnEdit: false },
  { name: "NamaCabang", label: "Nama Ruas (Cabang)", type: "text", lockedOnEdit: false },
] as const;

const initialState: GerbangFormState = { status: "idle" };

type GerbangFormProps = { gerbang?: Gerbang; onSuccess: () => void; onCancel: () => void };

function GerbangForm({ gerbang, onSuccess, onCancel }: GerbangFormProps) {
  const isEdit = gerbang !== undefined;

  const [state, formAction, isPending] = useActionState(
    async (previousState: GerbangFormState, formData: FormData) => {
      const result = await saveGerbangAction(previousState, formData);
      if (result.status === "success") {
        toast.success(result.message);
        onSuccess();
      }
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="mode" value={isEdit ? "edit" : "create"} />

      {state.status === "error" && state.message && (
        <div role="alert" className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const inputId = `gerbang-${field.name}`;
          const error = state.fieldErrors?.[field.name];
          const isLocked = isEdit && field.lockedOnEdit;
          return (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={inputId}
              error={error}
              hint={isLocked ? "Tidak bisa diubah karena menjadi kunci data." : undefined}
            >
              <Input
                id={inputId}
                name={field.name}
                type={field.type}
                min={field.type === "number" ? 1 : undefined}
                defaultValue={state.values?.[field.name] ?? gerbang?.[field.name]}
                readOnly={isLocked}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${inputId}-error` : isLocked ? `${inputId}-hint` : undefined}
              />
            </Field>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
