import { Navbar } from '@/components/Navbar/Navbar';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<IDashboardLayoutProps>) {
  return (
    <main className="w-full overflow-y-auto overflow-x-hidden">
      <Navbar />
      {children}
    </main>
  );
}
