import InputSearch from './InputSearch';
import SortBy from './SortBy';

import { getUsers } from '../_lib/data-service';
import CustomerTable from './CustomerTable';

async function CustomersList() {
  const users = await getUsers();
  const serializeUsers = JSON.stringify(users);

  return (
    <>
      <div className="flex flex-wrap items-center gap-10 pr-5">
        <InputSearch />
        <SortBy />
      </div>

      <CustomerTable users={serializeUsers} />
    </>
  );
}

export default CustomersList;
