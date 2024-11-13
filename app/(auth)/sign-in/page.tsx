import LoginForm from '../../_components/LoginForm';
import Logo from '../../_components/Logo';

export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-[28rem] content-center gap-9 bg-primary-100">
      <div className="text-center">
        <Logo />
      </div>
      <h4 className="text-center text-3xl font-semibold leading-5">
        Log in to your account
      </h4>
      <LoginForm />
    </main>
  );
}
