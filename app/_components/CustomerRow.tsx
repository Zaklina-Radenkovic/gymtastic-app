import { PencilSquareIcon, EyeIcon } from '@heroicons/react/16/solid';
import Table from './Table';
import Link from 'next/link';

type Customer = {
  name: String;
  email: String;
  customerId: String;
};

const customer = {
  name: 'Jackie Radenkovic',
  email: 'test@test.org',
  id: '123',
};

function CustomerRow({ customerId }: any) {
  const { name, email, id } = customer;

  return (
    <Table.Row>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-primary-600">{email}</span>
      </div>

      <span className="rounded-[100px] font-semibold uppercase">Paid</span>
      <div className="font-medium">3.000,00</div>

      <div className="flex items-center gap-4 text-primary-600">
        <Link href="">
          <PencilSquareIcon className="h-6 w-6" />
        </Link>
        <Link href={`/customers/${id}`}>
          <EyeIcon className="h-6 w-6" />
        </Link>
      </div>
    </Table.Row>
  );
}
export default CustomerRow;
