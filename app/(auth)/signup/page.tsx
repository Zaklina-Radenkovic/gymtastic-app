import Logo from '../../_components/Logo';
import SignupForm from '../../_components/SignupForm';

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-[38rem] content-center gap-9 bg-primary-100">
      <div className="text-center">
        <Logo />
      </div>
      <h4 className="text-center text-3xl font-semibold leading-5">Sign up</h4>
      <SignupForm />
    </main>
  );
}
