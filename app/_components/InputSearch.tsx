import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

const InputSearch = () => {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-5">
        <MagnifyingGlassIcon className="h-5 w-5 text-primary-500" />
      </div>

      <input
        type="search"
        name="search"
        placeholder="Search customers..."
        className="m-3 w-full rounded-sm border border-primary-200 bg-primary-50 px-3 py-4 ps-10 font-medium shadow-sm placeholder:italic"
      />
      {/* <button
        type="submit"
        class="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button> */}
    </div>
  );
};
export default InputSearch;
