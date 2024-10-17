'use client';
import Button from './Button';
import Modal from './Modal';
import ConfirmDeleteForm from './ConfirmDeleteForm';

function ConfirmDelete() {
  return (
    <Modal>
      <Modal.Open opens="delete">
        <Button variation="danger">Delete account</Button>
      </Modal.Open>

      <Modal.Window name="delete">
        <ConfirmDeleteForm
          resourceName="account"
          onCloseModal={() => close()}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ConfirmDelete;
