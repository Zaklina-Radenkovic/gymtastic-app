'use client';
import { Children, createContext, useContext } from 'react';

type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<E> & {
    as?: E;
  }
>;

type TableContextProps = {
  children: React.ReactNode;
  columns: String;
  // as?: React.ReactNode | String;
};

const TableContext = createContext({});

function Table({ columns, children }: TableContextProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="rounded-sm border border-primary-300 bg-primary-50 text-sm">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className: String;
}) {
  const { columns }: any = useContext(TableContext);
  return (
    <div
      className={`grid items-center gap-x-8 border-b-[1px] border-primary-200 bg-primary-100 px-6 py-4 font-semibold uppercase tracking-[.4rem] text-primary-700 ${columns} ${className}`}
    >
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns }: any = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid items-center gap-x-8 border-b-[1px] border-primary-200 px-6 py-3 ${columns} last:border-b-0`}
    >
      {children}
    </div>
  );
}

// function Body({ data, render }) {
//   if (!data.length) return <Empty>No data to show at the moment</Empty>;

//   return <StyledBody>{data.map(render)}</StyledBody>;
// }

function Body({ children }: { children: React.ReactNode }) {
  return <section className="mx-0 my-2">{children}</section>;
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
