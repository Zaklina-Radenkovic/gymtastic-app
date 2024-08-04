import Link from 'next/link';
import { ArrowLongLeftIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';

import CustomerDetails from '@/app/_components/CustomerDetails';

const user = {
  name: 'Jackie',
  image: '',
  id: '123',
};

export default function Page() {
  const { name, image, id } = user;
  return (
    <>
      <div className="mb-4">
        <Link
          href="/customers"
          className="flex items-center text-sm hover:underline"
        >
          <ArrowLongLeftIcon className="mr-1 h-4 w-4" />
          <p>Customers</p>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Image
            width="40"
            height="40"
            src={image || '/default-user.jpg'}
            alt={`Avatar of ${name}`}
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
          <h1 className="text-3xl font-semibold leading-snug">{name}</h1>
        </div>

        <Link
          href={`/customers/${id}/edit`}
          className="flex items-center text-sm"
        >
          <span>Edit</span>
          <PencilSquareIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <CustomerDetails />
    </>
  );
}
