import { Inter } from 'next/font/google';
import Header from './_components/Header';
import SideNavigation from './_components/SideNavigation';
import '@/app/_styles/globals.css';
import { cookies } from 'next/headers';

import { ThemeProvider } from './_context/DarkModeContext';

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
  const cookieStore = cookies();

  const initialTheme = cookieStore.get('theme')?.value || 'light';

  // const initialTheme = 'light';
  // console.log('initialTheme ', initialTheme);
  return (
    <html lang="en" data-theme={initialTheme}>
      {/* <DarkModeProvider> */}
      <ThemeProvider initialTheme={initialTheme}>
        <body
          className={`${inter.className} grid min-h-screen grid-cols-[18rem,_1fr] grid-rows-[auto,_1fr] text-primary-800 antialiased transition-colors duration-300`}
        >
          <Header />
          <SideNavigation />

          <main className="bg-primary-100 px-12 pb-16 pt-10">
            <div className="mx-auto my-0 flex flex-col gap-12">{children}</div>
          </main>
        </body>
      </ThemeProvider>

      {/* </DarkModeProvider> */}
    </html>
  );
}
