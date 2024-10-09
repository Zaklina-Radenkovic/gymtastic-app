'use client';
import { createContext, useContext } from 'react';

interface TableContextValue {
  columns?: string;
}

type TableContextProps = {
  children: React.ReactNode;
  columns: string;
};

const TableContext = createContext<TableContextValue | undefined>(undefined);

function Table({ columns, children }: TableContextProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="rounded-sm border border-primary-300 bg-primary-50 text-sm"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  as: JSX.IntrinsicElements | React.ComponentType<any> | string;
}) {
  const { columns } = useContext(TableContext) || {};

  return (
    <div
      role="row"
      className={`grid items-center gap-x-7 border-b-[1px] border-primary-200 bg-primary-100 px-6 py-3 font-semibold tracking-[.025rem] text-primary-700 ${columns} ${className} `}
    >
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext) || {};

  return (
    <div
      role="row"
      className={`grid items-center gap-x-7 border-b-[1px] border-primary-200 px-4 py-3 ${columns} *:ml-1 last:border-b-0 has-[button]:flex has-[button]:justify-end has-[button]:pb-2`}
    >
      {children}
    </div>
  );
}

// function Body({ data, render }) {
//   if (!data.length) return <Empty>No data to show at the moment</Empty>;

//   return <StyledBody>{data.map(render)}</StyledBody>;
// }

interface BodyProps<T> {
  data: T[];
  render: (item: T) => React.ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length)
    return (
      <p className="m-8 text-center text-sm font-medium">
        No data to show at the moment
      </p>
    );

  return <section className="mx-0 my-2">{data.map(render)}</section>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex justify-center bg-primary-100 p-4">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
