import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';
import bycryptjs from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = await prisma.user.findUnique({
          where: {
            email: (credentials.email as string).toLowerCase(),
          },
        });

        if (!user) {
          throw new Error('User not found.');
        }

        if (!bycryptjs.compareSync(credentials.password as string, user.password)) {
          return null;
        }

        const { password: _, ...rest } = user;

        console.log('user', rest);

        return rest;
      },
    }),
  ],
});
