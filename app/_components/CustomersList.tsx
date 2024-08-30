import InputSearch from './InputSearch';
import SortBy from './SortBy';
import CustomerTable from './CustomerTable';

async function CustomersList({ sortBy, serializeUsers }: any) {
  const usersArray = JSON.parse(serializeUsers);

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedUsers =
    field === 'name'
      ? //@ts-ignore
        usersArray.sort(
          (a, b) => a.fullName.localeCompare(b.fullName) * modifier,
        )
      : //@ts-ignore
        usersArray.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <>
      <div className="flex flex-wrap items-center gap-10 pr-5">
        <InputSearch />
        <SortBy sortBy={sortBy} />
      </div>

      <CustomerTable users={sortedUsers} />
    </>
  );
}

export default CustomersList;
