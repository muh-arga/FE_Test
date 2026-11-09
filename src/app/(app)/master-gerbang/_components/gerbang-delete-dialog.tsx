"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Gerbang } from "@/types/gerbang";
import { deleteGerbangAction, type GerbangFormState } from "../actions";

const initialState: GerbangFormState = { status: "idle" };

export function GerbangDeleteDialog({ gerbang }: { gerbang: Gerbang }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        aria-label={`Hapus ${gerbang.NamaGerbang}`}
        title="Hapus"
        className="size-9 px-0 hover:bg-danger-soft hover:text-danger"
      >
        <Trash2 className="size-4" aria-hidden />
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Hapus gerbang?">
        {isOpen && <DeleteConfirmation gerbang={gerbang} onDone={() => setIsOpen(false)} />}
      </Modal>
    </>
  );
}

function DeleteConfirmation({ gerbang, onDone }: { gerbang: Gerbang; onDone: () => void }) {
  const [state, formAction, isPending] = useActionState(
    async (previousState: GerbangFormState, formData: FormData) => {
      const result = await deleteGerbangAction(previousState, formData);
      if (result.status === "success") {
        toast.success(result.message);
        onDone();
      }
      return result;
    },
    initialState,
  );

  return (
    <>
      <p className="text-sm text-muted">
        Gerbang <span className="font-semibold text-ink">{gerbang.NamaGerbang}</span> (ruas {gerbang.NamaCabang}) akan
        dihapus permanen. Tindakan ini tidak bisa dibatalkan.
      </p>

      {state.status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {state.message}
        </p>
      )}

      <form action={formAction} className="mt-6 flex justify-end gap-2">
        <input type="hidden" name="id" value={gerbang.id} />
        <input type="hidden" name="IdCabang" value={gerbang.IdCabang} />
        <Button variant="secondary" onClick={onDone}>
          Batal
        </Button>
        <Button type="submit" variant="danger" disabled={isPending}>
          {isPending ? "Menghapus..." : "Ya, hapus"}
        </Button>
      </form>
    </>
  );
}
