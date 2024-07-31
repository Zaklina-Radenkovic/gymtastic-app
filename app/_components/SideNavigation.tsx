'use client';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  UserIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  {
    href: '/',
    title: 'Calendar',
    icon: (
      <CalendarDaysIcon className="text-primary-50 hover:text-primary-100 h-5 w-5" />
    ),
  },
  {
    href: '/customers',
    title: 'Customers',
    icon: (
      <UsersIcon className="text-primary-50 hover:text-primary-100 h-5 w-5" />
    ),
  },
  {
    href: '/account',
    title: 'Account',
    icon: (
      <UserIcon className="text-primary-50 hover:text-primary-100 h-5 w-5" />
    ),
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: (
      <Cog6ToothIcon className="text-primary-50 hover:text-primary-100 h-5 w-5" />
    ),
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside className="bg-primary-900 border-primary-950 row-span-full flex flex-col gap-12 border-r px-8 py-10">
      <Logo />
      <nav>
        <ul className="flex flex-col gap-3 text-lg">
          {navLinks.map((link) => {
            return (
              <li key={link.title}>
                <span></span>
                <Link
                  className={`text-primary-50 hover:text-primary-100 hover:bg-primary-800 flex items-center gap-4 px-5 py-3 font-semibold transition-colors ${
                    pathname === link.href ? 'bg-primary-800' : ''
                  }`}
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideNavigation;
