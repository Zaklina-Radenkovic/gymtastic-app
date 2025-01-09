import GeneralUserSettings from '../../_components/GeneralUserSettings';
import ConfirmDelete from '../../_components/ConfirmDelete';

import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: 'Update profile',
};

export default async function Page() {
  const session = await auth();

  return (
    <>
      <GeneralUserSettings user={session?.user} />

      <ConfirmDelete />
    </>
  );
}
