import InputSearch from './InputSearch';
import SortBy from './SortBy';
import CustomerTable from './CustomerTable';

import { getUsers } from '../_lib/data-service';

async function CustomersList() {
  const users = await getUsers();
  if (!users.length) return null;
  const serializeUsers = JSON.stringify(users);

  return (
    <>
      <div className="flex flex-wrap items-center gap-10 pr-5">
        <InputSearch />
        <SortBy />
      </div>

      <CustomerTable serializeUsers={serializeUsers} />
    </>
  );
}

export default CustomersList;
