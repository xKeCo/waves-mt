import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.svg';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-36 text-justify">
      <nav className="mb-16 flex items-center justify-between">
        <Image src={logo} alt="Waves Money Tracker" width={38} height={38} />
        <Link href="/login" className="text-[15px] tracking-tight text-neutral-400 underline">
          Login
        </Link>
      </nav>

      <h1 className="mt-6 font-semibold tracking-tight text-neutral-200">Waves MT</h1>
      <p className="text-md mt-1 text-[15px] font-medium tracking-tight text-neutral-400">
        A simple money tracker web app. You should probably be using something else, though.
      </p>

      <h1 className="mt-6 font-semibold tracking-tight text-neutral-200">About</h1>
      <p className="text-md mt-1 text-[15px] font-medium tracking-tight text-neutral-400">
        Built for personal usage, designed with personal preferences. Minimal and simple interface.
        Ideal for it purposes. Lerning and testing new technologies. This is a work in progress.
      </p>

      <h1 className="mt-6 font-semibold tracking-tight text-neutral-200">Join</h1>
      <p className="text-md mt-1 text-[15px] font-medium tracking-tight text-neutral-400">
        This is a public project. This is{' '}
        <Link href="/register" className="text-neutral-400 underline">
          Free to use
        </Link>
      </p>

      <div className="mb-6 mt-8 h-px w-full bg-neutral-800"></div>

      <div className="flex items-center justify-between text-sm text-neutral-400">
        <i>v0.0.1</i>
        <span>© 2024 K.C.</span>
      </div>
    </main>
  );
}
