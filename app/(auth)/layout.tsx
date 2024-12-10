import { Inter } from 'next/font/google';
import { ThemeProvider } from '../_context/ThemeContext';
import '@/app/_styles/globals.css';
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
      <ThemeProvider>
        <body className={`${inter.className}`}>
          <main className="mx-auto bg-primary-100">
            <div className="mx-auto my-0 flex max-w-xl flex-col gap-12 px-12 pb-16 pt-10">
              {children}
            </div>
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
