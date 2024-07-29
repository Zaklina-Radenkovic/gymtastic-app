import Header from "./_components/Header";

import "@/app/_styles/globals.css";
import SideNavigation from "./_components/SideNavigation";

export const metadata = {
  title: {
    template: "%s | Gymtastic App",
    default: "Calendar | Gymtastic App",
  },
  description: "Sports scheduling app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-300 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[16rem_1fr] gap-12 h-full flex-1">
          <SideNavigation />
          <main className="py-1 bg-red-300">{children}</main>
        </div>
      </body>
    </html>
  );
}
