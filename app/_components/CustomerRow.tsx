import Link from 'next/link';
import { PencilSquareIcon, EyeIcon } from '@heroicons/react/16/solid';
import Table from './Table';
import Tag from './Tag';

type Customer = {
  name: String;
  email: String;
  customerId: String;
};

function CustomerRow({ customer }: any) {
  const { name, email, status, id = '123' } = customer;

  return (
    <Table.Row>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-primary-600">{email}</span>
      </div>
      <Tag color="text-green-100" background="bg-green-700">
        Paid
      </Tag>

      <div className="font-medium">3.000,00</div>

      <div className="flex items-center gap-4 text-primary-600">
        <Link href={`/customers/${id}/edit`}>
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
