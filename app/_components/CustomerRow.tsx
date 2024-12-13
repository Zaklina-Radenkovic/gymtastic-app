import Link from 'next/link';
import { PencilSquareIcon, EyeIcon } from '@heroicons/react/16/solid';
import Table from './Table';
import { Customer } from '../_types/models';
import convertTimestamp from '../_utils/helpers';

function CustomerRow({
  customer: {
    fullName,
    email,
    status,
    id: customerId,
    role,
    memberSince,
    expirationDate,
    trainings,
  },
}: {
  customer: Customer;
}) {
  return (
    <Table.Row>
      <div>p </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{fullName}</span>
        <span className="text-xs text-primary-600">{email}</span>
      </div>
      <div className="font-medium">{role}</div>
      <div className="font-medium">{status}</div>
      <div className="font-medium">
        {memberSince ? convertTimestamp(memberSince) : `-`}
      </div>
      <div className="font-medium">
        {expirationDate ? convertTimestamp(expirationDate) : `-`}
      </div>
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
