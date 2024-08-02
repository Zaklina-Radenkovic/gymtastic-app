import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

function Pagination() {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-2 text-sm">
        Showing <span className="font-semibold">1</span> page of{' '}
        <span className="font-semibold">3</span> results
      </p>

      <div className="flex gap-2">
        <button className="btn-pagination">
          <ChevronLeftIcon />
          <span className="pl-1">Previous</span>
        </button>
        <button className="btn-pagination">
          <span className="pr-1">Next</span>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
