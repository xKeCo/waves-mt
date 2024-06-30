'use server';

import { signIn } from '@/auth';

export const loginUser = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'Ha ocurrido un error durante el inicio de sesión.',
    };
  }
};
