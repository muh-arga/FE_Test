export function matchesSearch(query: string, values: Array<string | number>): boolean {
  const keyword = query.trim().toLowerCase();
  if (keyword === "") return true;
  return values.some((value) => String(value).toLowerCase().includes(keyword));
}
