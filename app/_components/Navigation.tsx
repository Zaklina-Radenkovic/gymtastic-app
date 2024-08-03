import Link from 'next/link';
import {
  UserIcon,
  SunIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import defaultUser from '@/public/default-user.jpg';
import Image from 'next/image';

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
  return (
    <nav className="flex items-center justify-between gap-10">
      <User user={user} />
      <ul className="flex gap-2">
        <li>
          <UserIcon className="h-6 w-6 text-indigo-600" />
        </li>
        <li>
          <SunIcon className="h-6 w-6 text-indigo-600" />
        </li>
        <li>
          <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-indigo-600" />
        </li>
      </ul>
    </nav>
  );
}

function User({ user: { name, image } }: User) {
  return (
    <Link href="/account" className="flex items-center gap-3">
      <Image
        width="40"
        height="40"
        src={image || '/default-user.jpg'}
        alt={`Avatar of ${name}`}
        referrerPolicy="no-referrer"
        className="rounded-full"
      />
      <span>{name}</span>
    </Link>
  );
}

export default Navigation;
