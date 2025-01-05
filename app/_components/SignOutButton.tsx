import ButtonIcon from './ButtonIcon';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';
import { signOutAction } from '../_lib/actions';

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <ButtonIcon>
        <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-indigo-600" />
      </ButtonIcon>
    </form>
  );
}

export default SignOutButton;
