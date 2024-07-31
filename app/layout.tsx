import Header from './_components/Header';
import SideNavigation from './_components/SideNavigation';
import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';

export const metadata = {
  title: {
    template: '%s | Gymtastic App',
    default: 'Calendar | Gymtastic App',
  },
  description: 'Sports scheduling app',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-primary-800 grid min-h-screen grid-cols-[18rem,_1fr] grid-rows-[auto,_1fr] antialiased`}
      >
        <Header />
        <SideNavigation />

        <main className="bg-primary-200 px-20 pb-24 pt-16">
          <div className="mx-auto my-0 flex flex-col gap-12">{children}</div>
        </main>
      </body>
    </html>
  );
}
