'use client';

import { useState } from 'react';
import Select from '@/components/ui/select';
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
import { acdbOptions, dcdbOptions } from '@/components/sections/acdb-dcdb/data';

interface Props {
  onCostChange?: (cost: number) => void;
}

const AcdbDcdb = ({ onCostChange }: Props) => {
  const [selectedAcdbId, setSelectedAcdbId] = useState<string>(acdbOptions[0].id);
  const [selectedDcdbId, setSelectedDcdbId] = useState<string>(dcdbOptions[0].id);

  const selectedAcdb = acdbOptions.find((opt) => opt.id === selectedAcdbId) ?? acdbOptions[0];
  const selectedDcdb = dcdbOptions.find((opt) => opt.id === selectedDcdbId) ?? dcdbOptions[0];

  const grandTotal = selectedAcdb.price + selectedDcdb.price;

  useUpdateEffect(() => {
    onCostChange?.(grandTotal);
  }, [grandTotal]);

  const items = [
    {
      id: 'acdb',
      category: 'ACDB',
      specification: selectedAcdb.name,
      price: selectedAcdb.price,
    },
    {
      id: 'dcdb',
      category: 'DCDB',
      specification: selectedDcdb.name,
      price: selectedDcdb.price,
    },
  ];

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">7. ACDB / DCDB</h2>

      <div className="flex flex-col gap-4">
        {/* Model & Config Selectors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="ACDB Model"
            value={selectedAcdbId}
            onChange={setSelectedAcdbId}
            options={acdbOptions.map((opt) => ({
              label: opt.shortName,
              value: opt.id,
            }))}
          />
          <Select
            label="DCDB Configuration"
            value={selectedDcdbId}
            onChange={setSelectedDcdbId}
            options={dcdbOptions.map((opt) => ({
              label: opt.shortName,
              value: opt.id,
            }))}
          />
        </div>

        {/* Pricing Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Specification</TableHead>
              <TableHead align="right">Unit Price (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-900">{item.category}</TableCell>
                <TableCell className="text-gray-700">{item.specification}</TableCell>
                <TableCell align="right" className="text-gray-700">
                  {item.price.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold text-gray-900">
                Total
              </TableCell>
              <TableCell align="right" className="font-semibold text-gray-900">
                ₹ {grandTotal.toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default AcdbDcdb;
