import InputSearch from './InputSearch';
import SortBy from './SortBy';
import CustomerTable from './CustomerTable';

async function CustomersList({
  sortBy,
  serializeUsers,
  count,
}: {
  sortBy: string;
  serializeUsers: string;
  count: number;
}) {
  const users = JSON.parse(serializeUsers);

  return (
    <>
      <div className="flex flex-wrap items-center gap-10 pr-5">
        <InputSearch />
        <SortBy sortBy={sortBy} />
      </div>

      <CustomerTable users={users} count={count} />
    </>
  );
}

export default CustomersList;
