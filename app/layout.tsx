import Header from './_components/Header';

import '@/app/_styles/globals.css';
import SideNavigation from './_components/SideNavigation';

export const metadata = {
  title: {
    template: '%s | Gymtastic App',
    default: 'Calendar | Gymtastic App',
  },
  description: 'Sports scheduling app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className="bg-primary-50 text-primary-950 flex min-h-screen flex-col">
        <Header />
        <div className="grid h-full flex-1 grid-cols-[16rem_1fr] gap-12">
          <SideNavigation />
          <main className="py-1">{children}</main>
        </div>
      </body> */}
      <body className="bg-primary-50 text-primary-950 flex min-h-screen">
        <SideNavigation />
        <div className="h-full flex-1">
          <Header />
          <main className="py-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
