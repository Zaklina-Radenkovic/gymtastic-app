import { useTransition } from 'react';
import { deleteAccount } from '../_lib/actions';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { SpinnerMini } from './SpinnerMini';

type ConfirmDeleteProps = {
  resourceName: string;
  onCloseModal?: () => void;
  [key: string]: any;
};

function ConfirmDelete({
  resourceName,
  onCloseModal,
  ...props
}: ConfirmDeleteProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteAccount(props.user?.id);
      if (res.success) router.push('/sign-up');
    });
  }

  return (
    <div className="flex w-96 flex-col gap-4">
      <h3>Delete {resourceName}</h3>
      <p className="mb-4 text-primary-600">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <Button variation="secondary" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={handleDelete}
          className="flex w-[136px]"
        >
          {isPending ? (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          ) : (
            'Delete Account'
          )}
        </Button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
