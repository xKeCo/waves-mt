import { Navbar } from '@/components/Navbar/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full overflow-y-auto overflow-x-hidden">
      <Navbar />
      {children}
    </main>
  );
}
