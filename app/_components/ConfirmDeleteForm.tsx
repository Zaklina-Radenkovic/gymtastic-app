import Button from './Button';

type ConfirmDeleteProps = {
  resourceName: string;
  onCloseModal?: () => void;
};

function ConfirmDelete({ resourceName, onCloseModal }: ConfirmDeleteProps) {
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
        <Button variation="danger">Delete</Button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
