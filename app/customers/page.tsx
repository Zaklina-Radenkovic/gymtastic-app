import { Suspense } from 'react';
import { PlusIcon } from '@heroicons/react/16/solid';
import Button from '../_components/Button';
import Spinner from '../_components/Spinner';
import CustomersList from '../_components/CustomersList';
import { PAGE_SIZE } from '../_utils/constants';

import { getUsers } from '../_lib/data-service';
import { collection, getDocs } from 'firebase/firestore';

export const metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sortBy?: string | undefined;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const term = searchParams?.query || '';

  const { usersList, count } = await getUsers(currentPage, term);

  if (!usersList.length) return null;

  const serializeUsers = JSON.stringify(usersList);
  const sortBy = searchParams?.sortBy || 'name-asc';

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button className="flex items-center">
          <PlusIcon className="mr-2 h-5 w-5" /> <span>Add</span>
        </Button>
      </div>

      <Suspense fallback={<Spinner />} key={currentPage}>
        <CustomersList
          currentPage={currentPage}
          sortBy={sortBy}
          serializeUsers={serializeUsers}
          term={term}
          count={count}
        />
      </Suspense>
    </>
  );
}
