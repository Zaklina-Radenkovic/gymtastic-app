import { Inter } from 'next/font/google';
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
    <html
      lang="en"
      // data-theme={initialTheme}
      //suppressHydrationWarning
    >
      <body className={`${inter.className}`}>
        <div className="min-h-screen text-primary-800 antialiased transition-colors duration-300">
          <main className="bg-primary-100 px-12 pb-16 pt-10">
            <div className="mx-auto my-0 flex flex-col gap-12">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
