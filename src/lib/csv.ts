type CsvCell = string | number;

export function escapeCsvCell(value: CsvCell): string {
  if (typeof value === "number") return String(value);

  let text = value;
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  if (/[",\r\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsv(header: string[], rows: CsvCell[][]): string {
  return [header, ...rows].map((row) => row.map(escapeCsvCell).join(",")).join("\r\n");
}
