export type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  from: number;
  to: number;
};

export function paginate<T>(items: T[], page: number, perPage: number): Paginated<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);

  return {
    items: pageItems,
    page: currentPage,
    totalPages,
    totalItems,
    perPage,
    from: totalItems === 0 ? 0 : start + 1,
    to: start + pageItems.length,
  };
}

export function getPageNumbers(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const candidates = [1, current - 1, current, current + 1, total].filter(
    (page) => page >= 1 && page <= total,
  );
  const pages = [...new Set(candidates)].sort((a, b) => a - b);

  const result: Array<number | "ellipsis"> = [];
  pages.forEach((page, index) => {
    const previous = pages[index - 1];
    if (previous !== undefined) {
      const hiddenCount = page - previous - 1;
      if (hiddenCount === 1) result.push(previous + 1);
      else if (hiddenCount > 1) result.push("ellipsis");
    }
    result.push(page);
  });
  return result;
}
