import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

type Link =
  | {
      href: string;
      title: string;
      icon: JSX.Element;
      subsections?: undefined;
    }
  | {
      href: string;
      title: string;
      icon: JSX.Element;
      subsections: {
        href: string;
        title: string;
        icon: JSX.Element;
      }[];
    };

export default function NavLink({
  link,
  pathname,
}: {
  link: Link;
  pathname: string;
}) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      {link.subsections ? (
        <>
          <MenuItem
            link={link}
            pathname={pathname}
            open={subMenuOpen}
            onClick={() => setSubMenuOpen((prev) => !prev)}
          />
          <ul className="flex flex-col gap-3 text-lg">
            {subMenuOpen &&
              link.subsections.map((link) => (
                <li key={link.title}>
                  <Link
                    className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-300 transition-colors hover:bg-primary-800 hover:text-primary-50 ${
                      pathname === link.href ? 'bg-primary-800' : ''
                    }`}
                    href={link?.href}
                  >
                    {link.icon}
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <MenuItem link={link} pathname={pathname} />
      )}
    </>
  );
}

function MenuItem({
  link,
  pathname,
  onClick,
  open,
}: {
  link: Link;
  pathname: string;
  onClick?: () => void;
  open?: boolean;
}) {
  return (
    <li key={link.title}>
      <Link
        className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-300 transition-colors hover:bg-primary-800 hover:text-primary-50 ${
          pathname === link.href ? 'bg-primary-800' : ''
        }`}
        href={link?.href}
        onClick={onClick}
      >
        {link.icon}
        <span>{link.title}</span>
        {link.subsections && (
          <ChevronDownIcon
            className={`ml-auto h-6 w-6 text-primary-50 ${open && 'rotate-180'}`}
          />
        )}
      </Link>
    </li>
  );
}
