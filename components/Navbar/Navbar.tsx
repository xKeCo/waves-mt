import Image from 'next/image';
import { UserAvatar } from './components/UserAvatar';
import { SpaceSwitcher } from './components/SpaceSwitcher';
import { auth } from '@/auth';
import logo from '@/public/logo.svg';

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center  w-full h-16 px-6 ">
      <Image src={logo} alt="Sisas" width={35} height={35} className="mr-2" />

      {session && (
        <>
          <hr className="bg-neutral-700 w-px h-5 mx-3 rotate-12" />

          <SpaceSwitcher />
          <UserAvatar photoURL={session.user.photoURL} username={session.user.username} />
        </>
      )}
    </nav>
  );
};
