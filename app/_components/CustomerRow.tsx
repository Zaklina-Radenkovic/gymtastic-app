import Link from 'next/link';
import { PencilSquareIcon, EyeIcon } from '@heroicons/react/16/solid';
import Table from './Table';

type Customer = {
  customer: {
    name: String;
    email: String;
    status: String;
    id: String;
    role: String;
    memberSince: Date;
    expirationDate: Date;
    trainings: String;
  };
};

function CustomerRow({ customer }: Customer) {
  // console.log(customer);
  const {
    name,
    email,
    status,
    id: customerId,
    role,
    memberSince,
    expirationDate,
    trainings,
  } = customer;

  return (
    <Table.Row>
      <div>p </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-primary-600">{email}</span>
      </div>
      <div className="font-medium">{role}</div>
      <div className="font-medium">{status}</div>
      <div className="font-medium">07/08/2023</div>
      <div className="font-medium">07-08-2024</div>
      <div className="font-medium">{trainings}</div>

      <div className="flex flex-col justify-center gap-1 text-primary-600">
        <Link
          href={`/customers/${customerId}/edit`}
          className="flex h-6 w-6 items-center justify-center hover:bg-primary-200"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
        <Link
          href={`/customers/${customerId}`}
          className="flex h-6 w-6 items-center justify-center hover:bg-primary-200"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </div>
    </Table.Row>
  );
}
export default CustomerRow;
