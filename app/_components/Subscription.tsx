import Table from './Table';
import Tag from './Tag';
import Button from './Button';

function Subscription() {
  return (
    <>
      <Table.Row>
        <span className="text-xs">10 May 2024 - 13 May 2024</span>
        <span>10/12</span>
        <span>1 month 12 trainings</span>
        <Tag color="text-red-100" background="bg-red-700">
          Unpaid
        </Tag>
      </Table.Row>
      <Table.Row>
        <span className="text-xs">10 May 2024 - 13 May 2024</span>
        <span>10/12</span>
        <span>1 month 12 trainings</span>
        <Tag color="text-green-100" background="bg-green-700">
          Paid
        </Tag>
      </Table.Row>
      <Table.Row>
        <Button>Add Subscription</Button>
      </Table.Row>
    </>
  );
}

export default Subscription;
