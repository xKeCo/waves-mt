import Image from 'next/image';
import { UserAvatar } from './components/UserAvatar';
import { SpaceSwitcher } from './components/SpaceSwitcher';

type TNavbarProps = {
  username: string;
};

export const Navbar = ({ username }: TNavbarProps) => {
  return (
    <nav className="flex items-center  w-full h-16 px-6 ">
      <Image src="/logo.svg" alt="Sisas" width={35} height={35} className="mr-2" />

      <hr className="bg-neutral-700 w-px h-5 mx-3 rotate-12" />

      <SpaceSwitcher />

      <UserAvatar username={username} />
    </nav>
  );
};
