import InputSearch from './InputSearch';
import SortBy from './SortBy';
import CustomerTable from './CustomerTable';
import { getUsers } from '../_lib/data-service';

// const applyFilters = (customers, filter) =>
//   customers.filter((customer) => {
//     if (filter) {
//       let queryMatched = false;
//       const properties = ['email', 'fullName'];

//       properties.forEach((property) => {
//         if (customer[property].toLowerCase().includes(filter.toLowerCase())) {
//           queryMatched = true;
//         }
//       });

//       if (!queryMatched) {
//         return <p>Sorry, no such term</p>;
//       }
//     }

//     return true;
//   });

async function CustomersList({ sortBy, serializeUsers, count }: any) {
  const usersArray = JSON.parse(serializeUsers);

  console.log('count in list ', count);
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedUsers =
    field === 'name'
      ? usersArray.sort(
          //@ts-ignore
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

      <CustomerTable users={sortedUsers} count={count} />
    </>
  );
}

export default CustomersList;
