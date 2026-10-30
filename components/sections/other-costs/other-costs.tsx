'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/ui/number-input';
import { Table, TableBody, TableFooter, TableRow, TableCell } from '@/components/ui/table';
import { defaultOtherCosts, type OtherCostItem } from '@/components/sections/other-costs/data';

const OtherCosts = () => {
  const [costs, setCosts] = useState<OtherCostItem[]>(defaultOtherCosts);

  const handleUpdateAmount = (id: string, amount: number) => {
    setCosts((prev) => prev.map((item) => (item.id === id ? { ...item, amount } : item)));
  };

  const otherCostTotal = useMemo(() => {
    return costs.reduce((sum, item) => sum + (item.amount || 0), 0);
  }, [costs]);

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">10. Other Costs</h2>

      <div className="max-w-md">
        <Table>
          <TableBody>
            {costs.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell align="right">
                  <NumberInput
                    value={item.amount}
                    onChange={(val) => handleUpdateAmount(item.id, val)}
                    min={0}
                    className="w-28 px-2 py-1 text-right"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold text-gray-900">Other Cost Total</TableCell>
              <TableCell align="right" className="font-semibold text-gray-900">
                ₹ {otherCostTotal.toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default OtherCosts;
