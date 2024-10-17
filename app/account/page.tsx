import Image from 'next/image';

import UpdateUserDataForm from '@/app/_components/UpdateUserDataForm';
import UpdatePasswordForm from '@/app/_components/UpdatePasswordForm';
import ConfirmDelete from '../_components/ConfirmDelete';

export const metadata = {
  title: 'Update profile',
};

const user = {
  fullName: 'Zaklina Radenkovic',
  image: '',
  email: 'zradenkovic@hotmail.com',
  customerId: 'HBeeg3E2PP0DpTMqcUHi',
};

export default function Page() {
  //TODO: Getting user from auth.session

  return (
    <>
      <div className="flex items-center gap-5">
        <Image
          width="60"
          height="60"
          src={user.image || '/default-user.jpg'}
          alt={`Avatar of ${user.fullName}`}
          referrerPolicy="no-referrer"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold leading-snug">
            {user.fullName}
          </h1>
          <span className="text-primary-600">{user.email}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">
          Update customer data
        </h3>
        <UpdateUserDataForm user={user} id={user.customerId} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Update password</h3>
        <UpdatePasswordForm />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">
          Delete your account
        </h3>
        <div className="flex items-center justify-between rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm">
          <p className="font-medium">
            Delete your account and all of your source data.
          </p>

          <ConfirmDelete />
        </div>
      </div>
    </>
  );
}
