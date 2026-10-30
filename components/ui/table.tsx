import { ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: BaseProps) => {
  return <table className={`w-full text-sm ${className}`}>{children}</table>;
};

export const TableHeader = ({ children, className = '' }: BaseProps) => {
  return <thead className={`border-b border-gray-200 ${className}`}>{children}</thead>;
};

export const TableBody = ({ children, className = '' }: BaseProps) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableFooter = ({ children, className = '' }: BaseProps) => {
  return <tfoot className={`text-xs font-semibold ${className}`}>{children}</tfoot>;
};

export const TableRow = ({ children, className = '' }: BaseProps) => {
  return <tr className={`border-b border-gray-100 ${className}`}>{children}</tr>;
};

export const TableHead = ({ children, className = '' }: BaseProps) => {
  return (
    <th className={`pb-2 text-left text-xs font-medium text-gray-500 ${className}`}>{children}</th>
  );
};

export const TableCell = ({ children, className = '' }: BaseProps) => {
  return <td className={`py-1.5 ${className}`}>{children}</td>;
};

export default Table;
