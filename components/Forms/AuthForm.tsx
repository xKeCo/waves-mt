'use client';
import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/actions/auth/register';
import { useRouter } from 'next/navigation';

export default function AuthForm({ isRegister = false }: Readonly<{ isRegister?: boolean }>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    username: z
      .string()
      .min(3, {
        message: 'Username must be at least 3 characters long',
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: isRegister ? '' : undefined,
    },
  });

  const startLogin = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    try {
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setLoading(false);

      if (signInResult?.error) {
        return toast.error('Credenciales inválidas');
      }

      toast.success('Inicio de sesión exitoso');

      router.replace('/');
    } catch (error) {
      setLoading(false);
      console.error('error', error);
      toast.error('Ha ocurrido un error durante el inicio de sesión');
    }
  };

  const startRegister = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    try {
      const { email, password, username } = data;
      const { ok, error, errorMessage } = await registerUser(email, password, username!);

      setLoading(false);

      if (!ok) {
        if (error === 'emailExists') {
          form.setError('email', {
            message: 'Email already exists.',
          });
        }

        if (error === 'usernameExists') {
          form.setError('username', {
            message: 'Username already exists.',
          });
        }

        return toast.error(errorMessage);
      }

      await startLogin(data);

      toast.success('Account created successfully.');
    } catch (error) {
      console.error('error', error);
      toast.error('An error occurred while registering.');
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isRegister) {
      startRegister(data);
    } else {
      startLogin(data);
    }
  }

  return (
    <div className="max-w-sm min-h-[calc(100vh-64px)] mx-auto py-20 px-5">
      <h1 className="text-lg font-medium text-neutral-200 mb-2">
        {isRegister ? 'Register' : 'Login'}
      </h1>

      <p className="text-neutral-400 text-sm mt-1 tracking-tight font-medium">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link href={isRegister ? '/login' : '/register'} className="text-neutral-400 underline">
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </p>

      <div className="h-px bg-neutral-800 w-full my-4"></div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@doe.com" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRegister && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="john" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" variant="secondary" disabled={loading}>
            {loading && <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />}
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </form>
      </Form>

      {!isRegister && (
        <>
          <div className="h-px bg-neutral-800 w-full my-4"></div>

          <p className="text-neutral-400 text-sm mt-1 tracking-tight font-medium">
            Forgot your password?{' '}
            <span className="text-neutral-400 underline">I cannot do anything yet</span>.
          </p>
        </>
      )}
    </div>
  );
}
