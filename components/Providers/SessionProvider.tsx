'use client';

import { SessionProvider } from 'next-auth/react';

interface IProviders {
  children: React.ReactNode;
}

export const UserSessionProvider = ({ children }: IProviders) => {
  return <SessionProvider>{children}</SessionProvider>;
};
