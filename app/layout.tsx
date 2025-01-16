import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/_context/ThemeContext';
import { AuthProvider } from '@/app/_context/AuthProvider';
import '@/app/_styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// const cookieStore = cookies();

// const initialTheme = cookieStore.get('theme')?.value || 'light';

// console.log('initialTheme ', initialTheme);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = document.cookie.match(/theme=(dark|light)/)?.[1] || 'light';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
