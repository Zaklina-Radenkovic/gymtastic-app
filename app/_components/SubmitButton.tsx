'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`w-[150px] rounded-sm bg-indigo-600 px-4 py-3 text-sm font-medium text-indigo-50 hover:bg-indigo-500 hover:text-indigo-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${className}`}
      disabled={pending}
    >
      {' '}
      {pending ? pendingLabel : children}{' '}
    </button>
  );
}

export default SubmitButton;
