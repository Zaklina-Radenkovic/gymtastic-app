'use client';
import React from 'react';
import InputSearch from './InputSearch';
import SortBy from './SortBy';
import Table from './Table';
import CustomerRow from './CustomerRow';
import Pagination from './Pagination';

function CustomersList() {
  return (
    <>
      <div className="flex flex-wrap items-center p-6">
        <InputSearch />
        <SortBy />
      </div>

      <Table columns="grid-cols-[2fr_1.4fr_1fr_1fr]">
        <Table.Header as="header">
          <div>Name</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body>
          <CustomerRow />
          <CustomerRow />
          <CustomerRow />
        </Table.Body>

        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
    </>
  );
}

export default CustomersList;
