import { Metadata } from 'next';
import AuthForm from '@/components/Forms/AuthForm';

export const metadata: Metadata = {
  title: 'Waves - Login',
  description: 'Waves MT login page',
};

export default function LoginPage() {
  return <AuthForm />;
}
