import { ReactNode } from 'react';

type AlignType = 'left' | 'center' | 'right';

const ALIGN_CLASS: Record<AlignType, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: BaseProps) => {
  return (
    <div className="overflow-hidden rounded border border-gray-200">
      <table className={`w-full text-sm ${className}`}>{children}</table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }: BaseProps) => {
  return <thead className={`border-b border-gray-200 bg-gray-50 ${className}`}>{children}</thead>;
};

export const TableBody = ({ children, className = '' }: BaseProps) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableFooter = ({ children, className = '' }: BaseProps) => {
  return (
    <tfoot className={`border-t border-gray-200 bg-gray-50 text-sm font-semibold ${className}`}>
      {children}
    </tfoot>
  );
};

export const TableRow = ({ children, className = '' }: BaseProps) => {
  return (
    <tr className={`border-b border-gray-200/60 last:border-none ${className}`}>{children}</tr>
  );
};

interface TableHeadProps extends BaseProps {
  colSpan?: number;
  align?: AlignType;
}

export const TableHead = ({
  children,
  className = '',
  colSpan,
  align = 'left',
}: TableHeadProps) => {
  return (
    <th
      colSpan={colSpan}
      className={`px-3 py-2 text-sm font-semibold text-gray-700 ${ALIGN_CLASS[align]} ${className}`}
    >
      {children}
    </th>
  );
};

interface TableCellProps extends BaseProps {
  colSpan?: number;
  align?: AlignType;
}

export const TableCell = ({
  children,
  className = '',
  colSpan,
  align = 'left',
}: TableCellProps) => {
  return (
    <td colSpan={colSpan} className={`px-3 py-2 text-sm ${ALIGN_CLASS[align]} ${className}`}>
      {children}
    </td>
  );
};

export default Table;
