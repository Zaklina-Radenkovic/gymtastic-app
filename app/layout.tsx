import { Inter } from 'next/font/google';
import Header from './_components/Header';
import SideNavigation from './_components/SideNavigation';
import '@/app/_styles/globals.css';

import { DarkModeProvider } from './_context/DarkModeContext';

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
    <html lang="en" suppressHydrationWarning>
      <DarkModeProvider>
        <body
          className={`${inter.className} grid min-h-screen grid-cols-[18rem,_1fr] grid-rows-[auto,_1fr] text-primary-800 antialiased transition-colors duration-300`}
        >
          <Header />
          <SideNavigation />

          <main className="bg-primary-100 px-12 pb-16 pt-10">
            <div className="mx-auto my-0 flex flex-col gap-12">{children}</div>
          </main>
        </body>
      </DarkModeProvider>
    </html>
  );
}
