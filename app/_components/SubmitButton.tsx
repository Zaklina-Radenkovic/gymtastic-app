'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({
  children,
  pendingLabel,
  onClick,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-[140px] rounded-sm bg-indigo-600 px-4 py-3 text-sm font-medium text-indigo-50 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {' '}
      {pending ? pendingLabel : children}{' '}
    </button>
  );
}

export default SubmitButton;
