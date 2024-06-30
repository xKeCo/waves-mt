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

export const UserAvatar = ({ photoURL, username }: { photoURL: string; username: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto pr-3 flex items-center justify-start gap-2 w-auto border-none rounded-full py-2 px-3 hover:bg-neutral-700">
          <Image src={photoURL} alt="Profile" width={16} height={16} />
          <h1 className="text-neutral-400 text-sm">{username}</h1>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
