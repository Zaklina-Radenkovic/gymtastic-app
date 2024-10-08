'use client';
import Table from './Table';
import CustomerRow from './CustomerRow';
import Pagination from './Pagination';
import { Customer } from '../_types/models';

const CustomerTable = ({
  users,
  count,
}: {
  users: Customer[];
  count: number;
}) => {
  return (
    <Table columns="grid-cols-[2rem_1.8fr_0.6fr_0.6fr_1.4fr_1.4fr_1fr_3.2rem]">
      <Table.Header as="header">
        <div></div>
        <div>Name</div>
        <div>Role</div>
        <div>Status</div>
        <div>Member since</div>
        <div>Expiration date</div>
        <div>Trainings</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={users}
        render={(user: Customer) => (
          <CustomerRow key={user.id} customer={user} />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};
export default CustomerTable;
