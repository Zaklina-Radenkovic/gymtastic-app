'use client';
import Table from '@/app/_components/Table';
import SubscriptionRow from './SubscriptionRow';

import { Subscription } from '@/app/_types/models';

function SubscriptionTable({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  return (
    <Table columns="grid-cols-[2rem_1fr_1fr_1fr_1fr_1fr_0.2fr_0.2fr]">
      <Table.Header as="header" className="text-center">
        <div></div>
        <div>Interval Count</div>
        <div>Interval</div>
        <div>Price</div>
        <div>Currency</div>
        <div>Total Trainings</div>
        <div></div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={subscriptions}
        render={(subscription: Subscription) => (
          <SubscriptionRow key={subscription.id} subscription={subscription} />
        )}
      />
    </Table>
  );
}

export default SubscriptionTable;
