import { redirect } from 'next/navigation';

import GeneralUserSettings from '../../_components/GeneralUserSettings';
import ConfirmDelete from '../../_components/ConfirmDelete';

import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: 'Update profile',
};

export default async function Page() {
  //TODO: Getting user from auth.session
  // const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'unauthenticated') {
  //   return <div>Please sign in to view your account.</div>;
  // }

  const session = await auth();
  console.log('this is session ', session);
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
