import Image from 'next/image';
import { UserAvatar } from './components/UserAvatar';
import { SpaceSwitcher } from './components/SpaceSwitcher';
import { auth } from '@/auth';
import logo from '@/public/logo.svg';

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex h-16 w-full items-center px-6">
      <Image src={logo} alt="Sisas" width={35} height={35} className="mr-2" />

      {session && (
        <>
          <hr className="mx-3 h-5 w-px rotate-12 bg-neutral-700" />

          <SpaceSwitcher />
          <UserAvatar photoURL={session.user.photoURL} username={session.user.username} />
        </>
      )}
    </nav>
  );
};
