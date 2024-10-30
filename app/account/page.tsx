import GeneralUserSettings from '../_components/GeneralUserSettings';
import ConfirmDelete from '../_components/ConfirmDelete';

export const metadata = {
  title: 'Update profile',
};

const user = {
  fullName: 'Zaklina Radenkovic',
  image: '',
  email: 'zradenkovic@hotmail.com',
  id: 'HBeeg3E2PP0DpTMqcUHi',
};

export default function Page() {
  //TODO: Getting user from auth.session

  return (
    <>
      <GeneralUserSettings user={user} />

      <ConfirmDelete />
    </>
  );
}
