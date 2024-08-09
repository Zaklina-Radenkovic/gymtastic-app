import Link from 'next/link';
import Image from 'next/image';
import { ArrowLongLeftIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import CustomerDetails from '@/app/_components/CustomerDetails';

import { getUser } from '@/app/_lib/data-service';
import { DocumentData } from 'firebase/firestore';

type User = {
  name: string;
  email: string;
  image?: string;
  id: string;
} | null;

export default async function Page({ params: { customerId } }: any) {
  const user: DocumentData | undefined = await getUser(customerId);
  if (!user) return null;

  const { name, image, id, email } = user;
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
          href={`/customers/${customerId}/edit`}
          className="flex items-center rounded-sm border border-indigo-500 bg-primary-100 px-5 py-3 text-sm font-medium text-indigo-500 hover:bg-primary-50"
        >
          <span>Edit</span>
          <PencilSquareIcon className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <CustomerDetails customer={user} />
    </>
  );
}
