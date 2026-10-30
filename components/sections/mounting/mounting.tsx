'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  mountingTypeOptions,
  defaultMountingItems,
  type MountingItem,
} from '@/components/sections/mounting/data';

const Mounting = () => {
  const [mountingType, setMountingType] = useState('patra');
  const [items] = useState<MountingItem[]>(defaultMountingItems);

  const mountingTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  }, [items]);

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">4. Mounting</h2>

      <div className="flex flex-col gap-4">
        {/* Mounting Type Dropdown */}
        <div className="w-full sm:w-64">
          <Select
            label="Mounting Type"
            value={mountingType}
            onChange={setMountingType}
            options={mountingTypeOptions}
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
            {items.map((item) => {
              const itemTotal = item.qty * item.unitPrice;
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-700">{item.material}</TableCell>
                  <TableCell align="center" className="text-gray-700">
                    {item.qty}
                  </TableCell>
                  <TableCell align="center" className="text-gray-700">
                    {item.unitPrice.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell align="right" className="font-medium text-gray-900">
                    {itemTotal.toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold text-gray-900">
                Mounting Total
              </TableCell>
              <TableCell colSpan={2} align="right" className="font-semibold text-gray-900">
                ₹ {mountingTotal.toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default Mounting;
