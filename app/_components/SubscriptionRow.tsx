import {
  Squares2X2Icon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/16/solid';
import Table from './Table';
import Modal from './Modal';
import AddSubscriptionForm from './AddSubscriptionForm';
import ButtonIcon from './ButtonIcon';
import ConfirmDeleteForm from './ConfirmDeleteForm';

import { Subscription } from '../_types/models';

function SubscriptionRow({
  subscription: {
    intervalCount,
    interval,
    price,
    id: subscriptionId,
    currency,
    totalTrainings,
  },
}: {
  subscription: Subscription;
}) {
  return (
    <Table.Row className="has-[button]:grid">
      <div>
        <Squares2X2Icon className="h-5 w-5" />
      </div>

      <div className="text-center font-medium">{intervalCount}</div>
      <div className="text-center font-medium">{interval}</div>
      <div className="text-center font-medium">{price}</div>
      <div className="text-center font-medium">{currency}</div>
      <div className="text-center font-medium">{totalTrainings}</div>
      <div className="text-center font-medium">
        <Modal>
          <Modal.Open opens="add">
            <ButtonIcon>
              <PencilSquareIcon className="h-5 w-5" />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="add">
            <AddSubscriptionForm subscriptionId={subscriptionId} />
          </Modal.Window>
        </Modal>
      </div>
      <div className="text-center font-medium">
        <Modal>
          <Modal.Open opens="delete">
            <ButtonIcon>
              <TrashIcon className="h-5 w-5 hover:bg-primary-200" />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDeleteForm resourceName="subscription" />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
export default SubscriptionRow;
