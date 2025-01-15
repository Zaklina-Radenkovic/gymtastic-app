import FormRowVertical from '@/app/_components/FormRowVertical';
import Logo from '../../_components/Logo';
import SignupForm from '../../_components/SignupForm';
import GoogleSigninBtn from '@/app/_components/GoogleSigninBtn';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-[48rem] content-center justify-center gap-9 bg-primary-100">
      <div className="text-center">
        <Logo />
      </div>
      <h4 className="text-center text-3xl font-semibold leading-5">Sign up</h4>
      <SignupForm />

      <p className="text-center text-sm text-primary-700">
        Already have an account?{' '}
        <Link className="p-1 font-bold text-indigo-700" href="/sign-in">
          Sign In
        </Link>
      </p>

      <FormRowVertical>
        <GoogleSigninBtn />
      </FormRowVertical>
    </main>
  );
}
