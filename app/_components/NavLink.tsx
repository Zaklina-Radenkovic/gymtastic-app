import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useOutsideClick } from '../_hooks/useOutsideClick';

type NavLinkType =
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
  link: NavLinkType;
  pathname: string;
}) {
  const [isExpanded, setExpanded] = useState(false);

  const ref = useOutsideClick<HTMLLIElement>(() => setExpanded(false));

  function handleToggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <li ref={ref}>
      {link.subsections ? (
        <>
          <button
            className="flex w-full items-center gap-4 px-5 py-3 font-semibold text-primary-300 transition-colors hover:bg-primary-800 hover:text-primary-50 focus:outline-none"
            onClick={handleToggle}
          >
            {link.icon}
            {link.title}
            <ChevronDownIcon
              className={`ml-auto h-6 w-6 text-primary-50 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {isExpanded && (
            <ul className="flex flex-col gap-3 text-lg">
              {link.subsections.map((subLink: NavLinkType) => (
                <MenuItem
                  link={subLink}
                  pathname={pathname}
                  key={subLink.href}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <MenuItem link={link} pathname={pathname} />
      )}
    </li>
  );
}

function MenuItem({
  link,
  pathname,
  isExpanded,
  onOpen,
}: {
  link: NavLinkType;
  pathname: string;
  isExpanded?: boolean;
  onOpen?: () => void;
}) {
  return (
    <>
      <Link
        className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-300 transition-colors hover:bg-primary-800 hover:text-primary-50 ${
          pathname === link.href ? 'bg-primary-800' : ''
        }`}
        href={link?.href}
      >
        {link.icon}
        <span>{link.title}</span>
        {link.subsections && (
          <ChevronDownIcon
            onClick={onOpen}
            className={`ml-auto h-6 w-6 text-primary-50 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        )}
      </Link>
    </>
  );
}
