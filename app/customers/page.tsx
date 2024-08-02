import InputSearch from '../_components/InputSearch';
import Table from '../_components/Table';
import SortBy from '../_components/SortBy';
import CustomersList from '../_components/CustomersList';

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

      <CustomersList />
    </>
  );
}
