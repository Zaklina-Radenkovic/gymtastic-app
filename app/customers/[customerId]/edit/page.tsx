import Link from 'next/link';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';

import UpdateUserDataForm from '@/app/_components/UpdateUserDataForm';
import UpdatePasswordForm from '@/app/_components/UpdatePasswordForm';

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

  const { name, image, email } = user;

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

      <div className="flex items-center gap-5">
        <Image
          width="60"
          height="60"
          src={image || '/default-user.jpg'}
          alt={`Avatar of ${name}`}
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold leading-snug">{name}</h1>
          <span className="text-primary-600">{email}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">
          Update customer data
        </h3>
        <UpdateUserDataForm user={user} id={customerId} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
