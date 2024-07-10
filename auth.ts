import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/lib/prisma';
import bycryptjs from 'bcryptjs';
import { cookies } from 'next/headers';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          include: {
            workspaces: true,
          },
        });

        if (!user) {
          throw new Error('User not found.');
        }

        if (!bycryptjs.compareSync(credentials.password as string, user.password)) {
          throw new Error('Password does not match.');
        }

        const { password: _, ...rest } = user;

        cookies().set('activeWorkspace', rest.workspaces[0].slug);

        return rest;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
});
