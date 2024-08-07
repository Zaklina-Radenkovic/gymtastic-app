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
      <div className="pe flex flex-wrap items-center gap-10 pr-5">
        <InputSearch />
        <SortBy />
      </div>

      <Table columns="grid-cols-[14rem_1fr_1.2fr_1fr]">
        <Table.Header as="header">
          <div>Name</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Actions</div>
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
