import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateUserDataForm from './UpdateUserDataForm';

function GeneralUserSettings({ user }: DocumentData) {
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
        <UpdateUserDataForm user={user} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}

export default GeneralUserSettings;
