import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen max-w-xl mx-auto py-36 px-5 text-justify">
      <nav className="flex items-center justify-between mb-16">
        <Image src="/logo.svg" alt="Waves Money Tracker" width={38} height={38} />
        <Link href="/login" className="text-[15px] text-neutral-400 underline tracking-tight">
          Login
        </Link>
      </nav>

      <h1 className="mt-6 tracking-tight font-semibold text-neutral-200">Waves Money Tracker</h1>
      <p className="text-neutral-400 mt-1 tracking-tight text-md font-medium text-[15px]">
        A simple money tracker web app. You should probably be using something else, though.
      </p>

      <h1 className="mt-6 tracking-tight font-semibold text-neutral-200">About</h1>
      <p className="text-neutral-400 mt-1 tracking-tight text-md font-medium text-[15px]">
        Built for personal usage, designed with personal preferences. Minimal and simple interface.
        Ideal for it purposes. Lerning and testing new technologies. This is a work in progress.
      </p>

      <h1 className="mt-6 tracking-tight font-semibold text-neutral-200">Join</h1>
      <p className="text-neutral-400 mt-1 tracking-tight text-md font-medium text-[15px]">
        This is a public project. This is{' '}
        <Link href="/register" className="text-neutral-400 underline">
          Free to use
        </Link>
      </p>

      <div className="h-px bg-neutral-800 w-full mt-8 mb-6"></div>

      <div className="flex justify-between items-center text-sm text-neutral-400">
        <i>v0.0.1</i>
        <span>© 2024 K.C.</span>
      </div>
    </main>
  );
}
