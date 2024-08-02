import Table from './Table';

type Customer = {
  name: String;
  email: String;
};

function CustomerRow() {
  const customer = {
    name: 'Jackie Radenkovic',
    email: 'test@test.org',
  };
  return (
    <Table.Row>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{customer.name}</span>
        <span className="text-xs text-primary-600">{customer.email}</span>
      </div>

      <span className="rounded-[100px] font-semibold uppercase">Paid</span>
      <div className="font-medium">3.000,00</div>
    </Table.Row>
  );
}
export default CustomerRow;
