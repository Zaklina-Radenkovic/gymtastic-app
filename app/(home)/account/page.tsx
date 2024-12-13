import { redirect } from 'next/navigation';

import GeneralUserSettings from '../../_components/GeneralUserSettings';
import ConfirmDelete from '../../_components/ConfirmDelete';

import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: 'Update profile',
};

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/sign-in'); // Redirect unauthorized users
  }

  return (
    <>
      <GeneralUserSettings user={session?.user} />

      <ConfirmDelete />
    </>
  );
}
