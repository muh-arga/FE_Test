"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Gerbang } from "@/types/gerbang";

export function GerbangDetailDialog({ gerbang }: { gerbang: Gerbang }) {
  const [isOpen, setIsOpen] = useState(false);

  const details = [
    { label: "ID Gerbang", value: gerbang.id },
    { label: "Nama Gerbang", value: gerbang.NamaGerbang },
    { label: "ID Ruas (Cabang)", value: gerbang.IdCabang },
    { label: "Nama Ruas (Cabang)", value: gerbang.NamaCabang },
  ];

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} aria-label={`Lihat detail ${gerbang.NamaGerbang}`} title="Lihat detail" className="size-9 px-0">
        <Eye className="size-4" aria-hidden />
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Detail Gerbang">
        <dl className="divide-y divide-border rounded-lg border border-border">
          {details.map((detail) => (
            <div key={detail.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
              <dt className="text-muted">{detail.label}</dt>
              <dd className="font-medium">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Modal>
    </>
  );
}
