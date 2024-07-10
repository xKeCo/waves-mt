'use client';
import { cn } from '@/lib/utils';
import { House, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = ({
  params,
}: {
  params: {
    username: string;
    workspaceSlug: string;
  };
}) => {
  const pathanme = usePathname();

  const sideBarItems = [
    {
      label: 'Dashboard',
      href: `/${params.username}/${params.workspaceSlug}/dashboard`,
      icon: <House size={18} />,
    },
    {
      label: 'Mi Cuenta',
      href: `/${params.username}/${params.workspaceSlug}`,
      icon: <UserCog size={18} />,
    },
  ];

  return (
    <div className="sticky top-0 flex h-[calc(100vh-64px)] w-full min-w-56 max-w-56 flex-col gap-5 border-r border-neutral-800 p-4">
      <nav className="flex h-[calc(100vh-96px)] flex-col gap-2 overflow-y-auto text-sm text-foreground">
        {sideBarItems.map(({ label, href, icon }) => (
          <div key={label} className="grid gap-1">
            <Link
              href={href}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-neutral-200',
                pathanme === href && 'bg-neutral-800 text-neutral-200',
              )}
            >
              {icon} {label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};
