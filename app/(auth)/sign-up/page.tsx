import FormRowVertical from '@/app/_components/FormRowVertical';
import Logo from '../../_components/Logo';
import SignupForm from '../../_components/SignupForm';
import GoogleSigninBtn from '@/app/_components/GoogleSigninBtn';

export const metadata = {
  title: 'Sign up',
};

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-[48rem] content-center justify-center gap-9 bg-primary-100">
      <div className="text-center">
        <Logo />
      </div>
      <h4 className="text-center text-3xl font-semibold leading-5">Sign up</h4>
      <SignupForm />

      <FormRowVertical>
        <GoogleSigninBtn />
      </FormRowVertical>
    </main>
  );
}
