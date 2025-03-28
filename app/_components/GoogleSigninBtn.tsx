import { signInWithGoogle } from '../_lib/actions';

export default function GoogleSigninBtn() {
  return (
    <form action={signInWithGoogle}>
      <button className="flex items-center gap-6 justify-self-center border border-primary-300 px-10 py-4 text-lg font-medium hover:bg-primary-400">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
