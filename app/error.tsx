'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  function handleClick() {
    window.location.href = '/';
  }
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-yellow-500 px-6 py-3 text-lg text-primary-900"
        // TODO: navigate user to home page
        onClick={handleClick}
      >
        Try again
      </button>
    </main>
  );
}
