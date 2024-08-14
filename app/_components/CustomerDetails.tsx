'use client';

import Subscription from './Subscription';
import Table from './Table';

const CustomerDetails = ({ email, phone }: any) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Personal info:</h3>
        <Table columns="grid-cols-[14rem_1fr]">
          <Table.Row>
            <h6 className="text-sm font-medium">Email</h6>
            <p className="text-primary-600">{email}</p>
          </Table.Row>
          <Table.Row>
            <h6 className="text-sm font-medium">Phone</h6>
            <p className="text-primary-600">{phone}</p>
          </Table.Row>
        </Table>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium leading-snug">Subscription</h3>
        <Table columns="grid-cols-[10rem_8rem_1fr_1fr]">
          <Table.Header className="tracking-normal" as="header">
            <div>Period</div>
            <div>Trainings</div>
            <div>Product</div>
            <div>Payment status</div>
          </Table.Header>

          <div className="mx-0 my-2">
            <Subscription />
          </div>
        </Table>
      </div>
    </>
  );
};

export default CustomerDetails;
