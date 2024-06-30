import { Navbar } from '@/components/Navbar/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen overflow-x-hidden overflow-y-auto">
      <Navbar username="xKeCo" />
      {children}
    </main>
  );
}
