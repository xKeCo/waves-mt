'use server';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { createWorkspaceRegister } from '../workspace/createWorkspace';

export const registerUser = async (email: string, password: string, username: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return {
          ok: false,
          errorMessage: 'An account with that email already exists.',
          error: 'emailExists',
        };
      }

      if (existingUser.username === username.toLowerCase()) {
        return {
          ok: false,
          errorMessage: 'An account with that username already exists.',
          error: 'usernameExists',
        };
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        username: username.toLowerCase(),
        photoURL: `https://source.boringavatars.com/marble/50/${username.toLowerCase()}`,
      },
      select: {
        id: true,
        email: true,
        username: true,
        photoURL: true,
        workspaces: true,
      },
    });

    await createWorkspaceRegister(`${newUser.username} - space 1`, `space-1`, newUser.id);

    return {
      ok: true,
      user: newUser,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      errorMessage: 'Ha ocurrido un error durante el registro.',
      error: 'unknown',
    };
  }
};
