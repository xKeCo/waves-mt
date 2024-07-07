import { Navbar } from '@/components/Navbar/Navbar';
import { Sidebar } from '@/components/Sidebar/Sidebar';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<IDashboardLayoutProps>) {
  return (
    <main className="w-full overflow-y-auto overflow-x-hidden">
      <Navbar />
      <div className="flex w-full gap-2">
        <Sidebar />
        <div className="h-[calc(100vh-64px)] w-full overflow-y-auto rounded-md p-6">{children}</div>
      </div>
    </main>
  );
}
