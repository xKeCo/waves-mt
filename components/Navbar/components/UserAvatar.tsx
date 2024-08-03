'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from 'boring-avatars';

import { HelpCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import type { TUser } from '../../../types/TUser';

export const UserAvatar = ({ photoURL, user }: { photoURL: string; user: TUser }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto flex w-auto items-center justify-start gap-2 rounded-full border-none px-3 py-2 pr-3 hover:bg-neutral-700">
          <Avatar name={user.username} size={16} variant="beam" />
          <h1 className="text-sm text-neutral-400">{user.username}</h1>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
