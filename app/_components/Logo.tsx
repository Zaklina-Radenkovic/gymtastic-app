import logo from '@/public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <div className="border-primary-100 border-b px-5 py-10">
      <Link href="/" className="z-10 flex items-center gap-4">
        <Image
          src={logo}
          alt="Gymtastic Logo"
          height="40"
          quality={100}
          width="40"
        />
        <span className="text-primary-100 text-xl font-semibold">
          Gymtastic App
        </span>
      </Link>
    </div>
  );
}

export default Logo;
