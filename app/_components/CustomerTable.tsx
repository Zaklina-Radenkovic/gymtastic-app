'use client';
import Table from './Table';
import CustomerRow from './CustomerRow';
import Pagination from './Pagination';

const CustomerTable = ({ users }: any) => {
  return (
    <Table columns="grid-cols-[14rem_1fr_1.2fr_1fr]">
      <Table.Header as="header">
        <div>Name</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={JSON.parse(users)}
        render={(user: any) => <CustomerRow key={user.name} customer={user} />}
      />

      <Table.Footer>
        <Pagination />
      </Table.Footer>
    </Table>
  );
};
export default CustomerTable;
