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
    <Button
      className="w-[140px] disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {' '}
      {pending ? pendingLabel : children}{' '}
    </Button>
  );
}

export default SubmitButton;
