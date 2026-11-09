import { formatDate, formatDayName, formatNumber } from "@/lib/format";
import { GOLONGAN_LABELS, type DailyReportRow, type ReportTotals } from "@/lib/lalin/report";

type ReportTableProps = {
  rows: DailyReportRow[];
  startNumber: number;
  paymentLabel: string;
  totals: ReportTotals;
};

const numberCell = "px-3 py-3 text-right tabular-nums";

export function ReportTable({ rows, startNumber, paymentLabel, totals }: ReportTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm whitespace-nowrap">
        <caption className="sr-only">Rincian lalin per gardu dengan jumlah kendaraan per golongan</caption>
        <thead className="bg-canvas text-left text-xs font-semibold tracking-wide text-muted uppercase">
          <tr>
            <th scope="col" className="px-3 py-3">No</th>
            <th scope="col" className="px-3 py-3">Ruas</th>
            <th scope="col" className="px-3 py-3">Gerbang</th>
            <th scope="col" className="px-3 py-3">Gardu</th>
            <th scope="col" className="px-3 py-3">Hari</th>
            <th scope="col" className="px-3 py-3">Tanggal</th>
            <th scope="col" className="px-3 py-3 whitespace-normal">Metode Pembayaran</th>
            {GOLONGAN_LABELS.map((label) => (
              <th key={label} scope="col" className="px-3 py-3 text-right">{label}</th>
            ))}
            <th scope="col" className="px-3 py-3 text-right">Total Lalin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.key} className="border-t border-border hover:bg-canvas/60">
              <td className="px-3 py-3 text-muted tabular-nums">{startNumber + index}</td>
              <td className="px-3 py-3">{row.namaRuas}</td>
              <td className="px-3 py-3 font-medium">{row.namaGerbang}</td>
              <td className="px-3 py-3 tabular-nums">{row.gardu}</td>
              <td className="px-3 py-3">{formatDayName(row.tanggal)}</td>
              <td className="px-3 py-3">{formatDate(row.tanggal)}</td>
              <td className="px-3 py-3">{paymentLabel}</td>
              {row.perGolongan.map((value, golonganIndex) => (
                <td key={golonganIndex} className={numberCell}>{formatNumber(value)}</td>
              ))}
              <td className={`${numberCell} font-semibold`}>{formatNumber(row.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t-2 border-border bg-canvas font-semibold">
          <tr>
            <th scope="row" colSpan={7} className="px-3 py-3 text-left">
              Total (semua halaman)
            </th>
            {totals.perGolongan.map((value, golonganIndex) => (
              <td key={golonganIndex} className={numberCell}>{formatNumber(value)}</td>
            ))}
            <td className={numberCell}>{formatNumber(totals.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
