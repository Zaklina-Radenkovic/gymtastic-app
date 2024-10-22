import {
  Squares2X2Icon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/16/solid';
import Table from './Table';
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
    <Table.Row>
      <div>
        <Squares2X2Icon className="h-5 w-5" />
      </div>

      <div className="text-center font-medium">{intervalCount}</div>
      <div className="text-center font-medium">{interval}</div>
      <div className="text-center font-medium">{price}</div>
      <div className="text-center font-medium">{currency}</div>
      <div className="text-center font-medium">{totalTrainings}</div>
      <div className="text-center font-medium">
        <PencilSquareIcon className="h-5 w-5" />
      </div>
      <div className="text-center font-medium">
        <TrashIcon className="h-5 w-5" />
      </div>
    </Table.Row>
  );
}
export default SubscriptionRow;
