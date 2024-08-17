'use client';
import Button from './Button';
import { useFormStatus } from 'react-dom';

function SubmitButton({
  children,
  pendingLabel,
}: {
  children: any;
  pendingLabel?: any;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-[140px] bg-indigo-600 px-4 py-3 text-sm font-medium text-indigo-50 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {' '}
      {pending ? pendingLabel : children}{' '}
    </button>
  );
}

export default SubmitButton;
