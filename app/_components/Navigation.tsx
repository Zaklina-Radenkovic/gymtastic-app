import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/16/solid';

function Navigation() {
  return (
    <div className="ml-auto flex items-center justify-between">
      <Link href="/account">
        <UserCircleIcon className="h-10 w-10" />
        {/* <img
        src=""
        alt="user`s photo"
        className="h-8 rounded-full"
        referrerPolicy="no-referrer"
      /> */}
      </Link>
    </div>
  );
}

export default Navigation;
