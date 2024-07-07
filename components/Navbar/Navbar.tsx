import Image from 'next/image';
import { auth } from '@/auth';
import logo from '@/public/logo.svg';
import { UserInfo } from './components/UserInfo';

export const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <nav className="flex h-16 w-full items-center border-b border-neutral-800 px-6">
      <Image src={logo} alt="Sisas" width={35} height={35} className="mr-2" />

      <UserInfo session={session} />
    </nav>
  );
};
