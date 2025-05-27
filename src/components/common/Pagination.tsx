'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@src/components/shadcn/ui/pagination';

export function Pagination({ pageCount }: { pageCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const setPageIndex = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const items = [];
    const maxVisiblePages = 3;
    const siblingsCount = Math.floor((maxVisiblePages - 1) / 2);

    let startPage = Math.max(1, currentPage - siblingsCount);
    let endPage = Math.min(pageCount, currentPage + siblingsCount);

    if (currentPage <= siblingsCount) {
      endPage = Math.min(pageCount, maxVisiblePages);
    } else if (currentPage >= pageCount - siblingsCount) {
      startPage = Math.max(1, pageCount - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setPageIndex(1)}
            isActive={currentPage === 1}
            className="h-9 w-9 cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationLink className="h-9 w-9 cursor-default">...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setPageIndex(i)}
            isActive={currentPage === i}
            className="h-9 w-9 cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationLink className="h-9 w-9 cursor-default">...</PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            onClick={() => setPageIndex(pageCount)}
            isActive={currentPage === pageCount}
            className="h-9 w-9 cursor-pointer"
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <PaginationUI>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => setPageIndex(1)}
              isActive={currentPage === 1}
              aria-disabled={currentPage === 1}
              className={`h-9 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            >
              First
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPageIndex(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={`h-9 ${
                currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPageIndex(currentPage + 1)}
              aria-disabled={currentPage === pageCount}
              className={`h-9 ${
                currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => setPageIndex(pageCount)}
              isActive={currentPage === pageCount}
              aria-disabled={currentPage === pageCount}
              className={`h-9 ${currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            >
              Last
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </div>
  );
}
