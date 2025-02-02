import Image from 'next/image';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateUserDataForm from './UpdateUserDataForm';

function GeneralUserSettings({ user }: any) {
  return (
    <>
      <div className="flex items-center gap-5">
        <div className="relative h-16 w-16">
          <Image
            fill
            className="rounded-full object-cover"
            src={user?.image || '/default-user.jpg'}
            alt={`Avatar of ${user?.name || user?.fullName}`}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold leading-snug">{user?.name}</h1>
          <span className="text-primary-600">{user?.email}</span>
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
