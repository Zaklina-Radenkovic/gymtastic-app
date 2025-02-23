'use client';
import Button from './Button';
import Modal from './Modal';
import ConfirmDeleteForm from './ConfirmDeleteForm';

interface ConfirmDeleteProps {
  user: any; // Replace 'any' with the appropriate type for 'user'
}

function ConfirmDelete({ user }: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium leading-snug">Delete your account</h3>
      <div className="flex items-center justify-between rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm">
        <p className="font-medium">
          Delete your account and all of your source data.
        </p>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete account</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDeleteForm
              resourceName="account"
              onCloseModal={() => close()}
              user={user}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default ConfirmDelete;
