'use client';
import {
  UserIcon,
  SunIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import defaultUser from '@/public/default-user.jpg';
import Image from 'next/image';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import { useRouter } from 'next/navigation';

type User = {
  user: {
    name: string;
    image: string;
  };
};

const user = {
  name: 'Jackie',
  image: '',
};

function Navigation() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/account');
  };

  return (
    <nav className="flex items-center justify-between gap-10">
      <User user={user} />

      <ul className="flex gap-2">
        <li>
          <ButtonIcon onClick={handleClick}>
            <UserIcon className="h-6 w-6 text-indigo-600" />
          </ButtonIcon>
        </li>
        {/* <li>
          <ButtonIcon>
            <SunIcon className="h-6 w-6 text-indigo-600" />
          </ButtonIcon>
        </li> */}
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon>
            <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-indigo-600" />
          </ButtonIcon>
        </li>
      </ul>
    </nav>
  );
}

function User({ user: { name, image } }: User) {
  return (
    <>
      <Image
        width="40"
        height="40"
        src={image || '/default-user.jpg'}
        alt={`Avatar of ${name}`}
        referrerPolicy="no-referrer"
        className="rounded-full"
      />
      <span>{name}</span>
    </>
  );
}

export default Navigation;
