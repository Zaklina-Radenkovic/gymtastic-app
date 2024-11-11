import Link from 'next/link';
import { DocumentData } from 'firebase/firestore';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import GeneralUserSettings from '@/app/_components/GeneralUserSettings';

import { getUser } from '@/app/_lib/data-service';

export const metadata = {
  title: 'Update profile',
};

export default async function Page({
  params: { customerId },
}: {
  params: { customerId: string };
}) {
  const user: DocumentData | undefined = await getUser(customerId);

  if (!user) return null;

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

      <GeneralUserSettings user={user} />
    </>
  );
}
