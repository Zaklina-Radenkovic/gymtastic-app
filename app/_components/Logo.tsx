import logo from '@/public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="z-10 flex flex-col items-center gap-4">
      <Image
        src={logo}
        alt="Gymtastic Logo"
        height="60"
        quality={100}
        width="60"
      />
      <span className="text-primary-50 text-lg font-bold">Gymtastic App</span>
    </Link>
  );
}

export default Logo;
