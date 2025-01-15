import FormRowVertical from '@/app/_components/FormRowVertical';
import LoginForm from '../../_components/LoginForm';
import Logo from '../../_components/Logo';
import GoogleSigninBtn from '@/app/_components/GoogleSigninBtn';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-[28rem] content-center justify-center gap-9 bg-primary-100 pt-10">
      <div className="text-center">
        <Logo />
      </div>
      <h4 className="text-center text-3xl font-semibold leading-5">
        Log in to your account
      </h4>
      <LoginForm />

      <p className="text-center text-sm text-primary-700">
        Don&apos;t have an account?{' '}
        <Link className="p-1 font-bold text-indigo-700" href="/sign-up">
          Sign Up
        </Link>
      </p>

      <FormRowVertical>
        <GoogleSigninBtn />
      </FormRowVertical>
    </main>
  );
}
