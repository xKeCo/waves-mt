'use client';
import { HelpCircle, LogOut } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { deleteActiveWorkspace } from '../../../actions/workspace/setActiveWorkspace';

export const UserAvatar = ({ photoURL, username }: { photoURL: string; username: string }) => {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto flex w-auto items-center justify-start gap-2 rounded-full border-none px-3 py-2 pr-3 hover:bg-neutral-700">
          <Image src={photoURL} alt="Profile" width={16} height={16} />
          <h1 className="text-sm text-neutral-400">{username}</h1>
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
