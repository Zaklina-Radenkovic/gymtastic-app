import Link from 'next/link';
import UpdateUserDataForm from '@/app/_components/UpdateUserDataForm';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import UpdatePasswordForm from '@/app/_components/UpdatePasswordForm';

const user = {
  name: 'Jackie',
  image: '',
  id: '123',
  email: 'test@test.org',
};

export default function Page() {
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
        <UpdateUserDataForm email={email} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">
          Update customer data
        </h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
