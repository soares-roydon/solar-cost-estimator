'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/ui/number-input';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { defaultWalkwayMaterials } from '@/components/sections/walkway/data';

const Walkway = () => {
  const [numberOfWalkways, setNumberOfWalkways] = useState<number>(3);

  const items = useMemo(() => {
    return defaultWalkwayMaterials.map((mat) => {
      const qty = (numberOfWalkways || 0) * mat.qtyPerWalkway;
      const total = qty * mat.unitPrice;
      return {
        ...mat,
        qty,
        total,
      };
    });
  }, [numberOfWalkways]);

  const walkwayTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">6. Walkway</h2>

      <div className="flex flex-col gap-4">
        {/* Number of Walkways Field */}
        <div className="flex items-center justify-between sm:justify-start sm:gap-6">
          <span className="text-xs text-gray-600">Number of Walkways</span>
          <NumberInput
            value={numberOfWalkways}
            onChange={setNumberOfWalkways}
            min={0}
            className="w-24 px-3 py-1.5 text-right text-sm"
          />
        </div>

        {/* Materials Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead align="center">Qty (Auto)</TableHead>
              <TableHead align="center">Unit Price (₹)</TableHead>
              <TableHead align="right">Total (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell align="center" className="text-gray-700">
                  {item.qty}
                </TableCell>
                <TableCell align="center" className="text-gray-700">
                  {item.unitPrice.toLocaleString('en-IN')}
                </TableCell>
                <TableCell align="right" className="text-gray-700">
                  {item.total.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold text-gray-900">
                Walkway Total
              </TableCell>
              <TableCell colSpan={2} align="right" className="font-semibold text-gray-900">
                ₹ {walkwayTotal.toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default Walkway;
