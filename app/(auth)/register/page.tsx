import { Metadata } from "next";
import AuthForm from "@/components/Forms/AuthForm";

export const metadata: Metadata = {
  title: "Waves - Register",
  description: "Waves MT register page",
};

export default function RegisterPage() {
  return <AuthForm isRegister />;
}
