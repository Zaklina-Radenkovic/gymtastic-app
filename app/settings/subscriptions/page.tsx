import { Subscription } from '@/app/_types/models';
import SubscriptionTable from '@/app/_components/SubscriptionTable';

export const metadata = {
  title: 'Subscriptions',
};

const subscriptions: Subscription[] = [
  {
    intervalCount: 1,
    interval: 'month',
    price: 20.0,
    currency: 'RSD',
    totalTrainings: 8,
    id: '1',
  },
  {
    intervalCount: 1,
    interval: 'month',
    price: 25.0,
    currency: 'RSD',
    totalTrainings: 12,
    id: '2',
  },
  {
    intervalCount: 1,
    interval: 'month',
    price: 30.0,
    currency: 'RSD',
    totalTrainings: 16,
    id: '3',
  },
  {
    intervalCount: 1,
    interval: 'month',
    price: 35.0,
    currency: 'RSD',
    totalTrainings: 20,
    id: '4',
  },
  {
    intervalCount: 14,
    interval: 'day',
    price: 0.0,
    currency: 'RSD',
    totalTrainings: 6,
    id: '5',
  },
  {
    intervalCount: 13,
    interval: 'month',
    price: 0.0,
    currency: 'RSD',
    totalTrainings: 1000,
    id: '6',
  },
  {
    intervalCount: 1,
    interval: 'month',
    price: 2000.0,
    currency: 'RSD',
    totalTrainings: 100,
    id: '7',
  },
];

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Subscriptions</h1>
      <SubscriptionTable subscriptions={subscriptions} />
    </>
  );
}
