type Page = number | 'LEFT_ELLIPSIS' | 'RIGHT_ELLIPSIS';

export function getVisiblePages(currentPage: number, totalPages: number): Page[] {
  const pages: Page[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push('LEFT_ELLIPSIS');
  }

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - 3) {
    pages.push('RIGHT_ELLIPSIS');
  }

  pages.push(totalPages);

  return pages;
}
