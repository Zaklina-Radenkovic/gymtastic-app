"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    title: "Calendar",
  },
  {
    href: "/customers",
    title: "Customers",
  },
  {
    href: "/account",
    title: "Account",
  },
  {
    href: "/settings",
    title: "Settings",
  },
];

function SideNavigation() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="border-r border-blue-800 bg-gray-500">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => {
          return (
            <li
              key={link.title}
              className={`py-3 px-5 hover:bg-blue-950 hover:text-yellow-100 transition-colors flex items-center gap-4 font-semibold text-yellow-50 ${
                pathname === link.href ? "bg-blue-950" : ""
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          );
        })}
        {/* <li>
          <Link href="/">Calendar</Link>
        </li>
        <li>
          <Link href="/customers">Customers</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default SideNavigation;
