'use client';

import { usePathname } from 'next/navigation';
import {
  CalendarDaysIcon,
  UserIcon,
  UsersIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/16/solid';
import Logo from './Logo';
import NavLink from './NavLink';

const navLinks = [
  {
    href: '/',
    title: 'Calendar',
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    href: '/customers',
    title: 'Customers',
    icon: <UsersIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    href: '/account',
    title: 'Account',
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: <Cog6ToothIcon className="h-5 w-5 text-primary-600" />,
    subsections: [
      {
        href: '/settings',
        title: 'General',
        icon: (
          <ClipboardDocumentListIcon className="h-5 w-5 text-primary-600" />
        ),
      },
      {
        href: '/settings/subscriptions',
        title: 'Subscriptions',
        icon: (
          <ClipboardDocumentListIcon className="h-5 w-5 text-primary-600" />
        ),
      },
    ],
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside className="row-span-full flex flex-col gap-12 border-r border-primary-950 bg-primary-900 px-8 py-10">
      <Logo />
      <nav>
        <ul className="flex flex-col gap-3 text-lg">
          {navLinks.map((link) => {
            return <NavLink link={link} key={link.title} pathname={pathname} />;
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideNavigation;
