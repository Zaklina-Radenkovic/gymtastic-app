import { Suspense } from 'react';
import { PlusIcon } from '@heroicons/react/16/solid';
import Button from '../_components/Button';
import Spinner from '../_components/Spinner';
import CustomersList from '../_components/CustomersList';

import { getUsers } from '../_lib/data-service';

export const metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { sortBy?: string | undefined };
}) {
  const users = await getUsers();
  if (!users.length) return null;
  const serializeUsers = JSON.stringify(users);
  const sortBy = searchParams?.sortBy || 'name-asc';

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button className="flex items-center">
          <PlusIcon className="mr-2 h-5 w-5" /> <span>Add</span>
        </Button>
      </div>

      <Suspense fallback={<Spinner />}>
        <CustomersList sortBy={sortBy} serializeUsers={serializeUsers} />
      </Suspense>
    </>
  );
}
