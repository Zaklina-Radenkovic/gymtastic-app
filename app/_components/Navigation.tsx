'use client';
import Link from 'next/link';
import {
  UserIcon,
  SunIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import defaultUser from '@/public/default-user.jpg';
import Image from 'next/image';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';

import { useSession } from 'next-auth/react';

type User = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
};

function Navigation() {
  const { data: session }: any = useSession();

  console.log(session);
  return (
    <nav className="flex">
      <ul className="flex items-center justify-between gap-2">
        {session ? (
          <Link href="/account">
            <User user={session.user} />
          </Link>
        ) : (
          <UserIcon className="mr-4 h-6 w-6 text-indigo-600" />
        )}

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
  const firstName = name?.split(' ').at(0);
  const lastName = name?.split(' ').at(1)?.charAt(0);
  const fullName = `${firstName} ${lastName}.`;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8">
        <Image
          fill
          className="rounded-full object-cover"
          src={image || '/default-user.jpg'}
          alt={`Avatar of ${name}`}
          referrerPolicy="no-referrer"
        />
      </div>

      <span>{fullName}</span>
    </div>
  );
}

export default Navigation;
