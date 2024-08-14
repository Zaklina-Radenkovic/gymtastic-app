import { PlusIcon } from '@heroicons/react/16/solid';
import CustomersList from '../_components/CustomersList';
import Button from '../_components/Button';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';

export const metadata = {
  title: 'Customers',
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button className="flex items-center">
          <PlusIcon className="mr-2 h-5 w-5" /> <span>Add</span>
        </Button>
      </div>

      <Suspense fallback={<Spinner />}>
        <CustomersList />
      </Suspense>
    </>
  );
}
