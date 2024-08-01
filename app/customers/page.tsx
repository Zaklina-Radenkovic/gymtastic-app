import InputSearch from '../_components/InputSearch';
import SortBy from '../_components/SortBy';

export const metadata = {
  title: 'Customers',
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <button>Add</button>
      </div>

      <div className="flex flex-wrap items-center p-6">
        <InputSearch />
        <SortBy />
      </div>
    </>
  );
}
