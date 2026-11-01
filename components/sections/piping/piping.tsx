'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/ui/number-input';
import { useUpdateEffect } from '@/lib/hooks/use-update-effect';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { defaultPipingItems } from '@/components/sections/piping/data';

interface Props {
  onCostChange?: (cost: number) => void;
}

const Piping = ({ onCostChange }: Props) => {
  const [totalCableLength, setTotalCableLength] = useState<number>(48);
  const [pipeLength, setPipeLength] = useState<number>(3);

  const numberOfPipes = useMemo(() => {
    if (!pipeLength || pipeLength <= 0) return 0;
    return Math.ceil((totalCableLength || 0) / pipeLength);
  }, [totalCableLength, pipeLength]);

  const items = useMemo(() => {
    return defaultPipingItems.map((item) => {
      const qty = item.isPipeQty ? numberOfPipes : (item.defaultQty ?? 0);
      const total = qty * item.unitPrice;
      return {
        ...item,
        qty,
        total,
      };
    });
  }, [numberOfPipes]);

  const pipingTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  useUpdateEffect(() => {
    onCostChange?.(pipingTotal);
  }, [pipingTotal]);

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">8. Piping</h2>

      <div className="flex flex-col gap-4">
        {/* Top Parameters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberInput
            label="Total Cable Length (m)"
            value={totalCableLength}
            onChange={setTotalCableLength}
            min={0}
            className="w-full px-3 py-1.5"
          />
          <NumberInput
            label="Pipe Length (m)"
            value={pipeLength}
            onChange={setPipeLength}
            min={1}
            className="w-full px-3 py-1.5"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Number of Pipes</span>
            <span className="flex h-8.5 items-center rounded border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900">
              {numberOfPipes}
            </span>
          </div>
        </div>

        {/* Materials Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
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
                Piping Total
              </TableCell>
              <TableCell colSpan={2} align="right" className="font-semibold text-gray-900">
                ₹ {pipingTotal.toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default Piping;
