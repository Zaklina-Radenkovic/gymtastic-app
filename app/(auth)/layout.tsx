import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

import { ThemeProvider } from '../_context/ThemeContext';
import '@/app/_styles/globals.css';

import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: {
    template: '%s | Gymtastic App',
    default: 'Login | Gymtastic App',
  },
  description: 'Sports scheduling app',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  //temporary
  if (session) {
    redirect('/');
  }

  return (
    <ThemeProvider>
      <main className="mx-auto bg-primary-100">
        <div className="mx-auto my-0 flex max-w-3xl flex-col gap-12 px-12 pb-16 pt-10">
          {children}
        </div>
      </main>
    </ThemeProvider>
  );
}
