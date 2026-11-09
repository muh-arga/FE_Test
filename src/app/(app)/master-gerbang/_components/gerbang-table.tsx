import type { Gerbang } from "@/types/gerbang";
import { GerbangDeleteDialog } from "./gerbang-delete-dialog";
import { GerbangDetailDialog } from "./gerbang-detail-dialog";
import { GerbangFormDialog } from "./gerbang-form-dialog";

type GerbangTableProps = {
  gerbangs: Gerbang[];
  startNumber: number;
};

export function GerbangTable({ gerbangs, startNumber }: GerbangTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm whitespace-nowrap">
        <caption className="sr-only">Daftar gerbang tol</caption>
        <thead className="bg-canvas text-left text-xs font-semibold tracking-wide text-muted uppercase">
          <tr>
            <th scope="col" className="w-16 px-4 py-3">No</th>
            <th scope="col" className="px-4 py-3">ID Gerbang</th>
            <th scope="col" className="px-4 py-3">Nama Gerbang</th>
            <th scope="col" className="px-4 py-3">ID Ruas</th>
            <th scope="col" className="px-4 py-3">Nama Ruas</th>
            <th scope="col" className="sticky right-0 bg-canvas px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {gerbangs.map((gerbang, index) => (
            <tr key={`${gerbang.IdCabang}-${gerbang.id}`} className="group border-t border-border hover:bg-canvas">
              <td className="px-4 py-3 text-muted tabular-nums">{startNumber + index}</td>
              <td className="px-4 py-3 tabular-nums">{gerbang.id}</td>
              <td className="px-4 py-3 font-medium">{gerbang.NamaGerbang}</td>
              <td className="px-4 py-3 tabular-nums">{gerbang.IdCabang}</td>
              <td className="px-4 py-3">{gerbang.NamaCabang}</td>
              <td className="sticky right-0 bg-surface px-2 py-1.5 group-hover:bg-canvas">
                <div className="flex justify-end gap-1">
                  <GerbangDetailDialog gerbang={gerbang} />
                  <GerbangFormDialog mode="edit" gerbang={gerbang} />
                  <GerbangDeleteDialog gerbang={gerbang} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
