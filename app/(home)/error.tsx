'use client';

import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState('Something went wrong!');

  useEffect(() => {
    try {
      const parsedError = JSON.parse(error.message); // Check if it's JSON
      if (parsedError.errors) {
        setErrorMessage(
          parsedError.errors.image?.[0] ||
            parsedError.errors._form?.[0] ||
            'Something went wrong! Please try again.',
        );
      }
    } catch {
      setErrorMessage(error.message); // Fallback to the default error message
    }
  }, [error]);

  function handleClick() {
    window.location.href = '/';
  }
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{errorMessage}</p>

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
