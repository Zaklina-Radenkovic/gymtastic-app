'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { PAGE_SIZE } from '../_utils/constants';

interface PaginationProps {
  count: number;
}

function Pagination({ count }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const createPageURL = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', pageNumber.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-2 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold">
          {/* {currentPage === totalPages ? count : currentPage * PAGE_SIZE} */}
          {currentPage === totalPages
            ? count
            : Math.min(currentPage * PAGE_SIZE, count)}
        </span>{' '}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          className="btn-pagination"
          // onClick={() => {
          //   const prev = currentPage === 1 ? currentPage : currentPage - 1;
          //   createPageURL(prev);
          // }}
          onClick={() => createPageURL(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
          <span className="pl-1">Previous</span>
        </button>

        <button
          className="btn-pagination"
          // onClick={() => {
          //   const next =
          //     currentPage === totalPages ? currentPage : currentPage + 1;
          //   createPageURL(next);
          // }}
          onClick={() => createPageURL(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <span className="pr-1">Next</span>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
