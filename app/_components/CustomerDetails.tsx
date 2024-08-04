'use client';
import Table from './Table';

const CustomerDetails = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Personal info:</h3>
        <Table columns="grid-cols-[14rem_1fr]">
          <Table.Row>
            <h6 className="text-sm font-medium">Email</h6>
            <p className="text-primary-600">test@test.org</p>
          </Table.Row>
          <Table.Row>
            <h6 className="text-sm font-medium">Phone</h6>
          </Table.Row>
        </Table>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Subscription</h3>
        <Table columns="grid-cols-[10rem_8rem_1fr_1fr]">
          <Table.Header className="tracking-normal">
            <div>Period</div>
            <div>Trainings</div>
            <div>Product</div>
            <div>Payment status</div>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <span className="text-xs">10 May 2024 - 13 May 2024</span>
              <span>10/12</span>
              <span>1 month 12 trainings</span>
              <span className="rounded-[100px] font-semibold uppercase">
                Paid
              </span>
            </Table.Row>
            <Table.Row>
              <span className="text-xs">10 May 2024 - 13 May 2024</span>
              <span>10/12</span>
              <span>1 month 12 trainings</span>
              <span className="rounded-[100px] font-semibold uppercase">
                Paid
              </span>
            </Table.Row>
            <Table.Row>
              <button className="col-start-4">Add Subscription</button>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default CustomerDetails;
