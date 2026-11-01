'use client';

import { useState } from 'react';
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
import { ratingOptions, defaultDistributionPrices } from '@/components/sections/acdb-dcdb/data';

const AcdbDcdb = () => {
  const [acdbRating, setAcdbRating] = useState('5');
  const [dcdbRating, setDcdbRating] = useState('5');

  const acdbTotal = Number(acdbRating) * defaultDistributionPrices.acdb;
  const dcdbTotal = Number(dcdbRating) * defaultDistributionPrices.dcdb;
  const grandTotal = acdbTotal + dcdbTotal;

  const items = [
    {
      id: 'acdb',
      name: 'ACDB',
      pricePerKw: defaultDistributionPrices.acdb,
      total: acdbTotal,
    },
    {
      id: 'dcdb',
      name: 'DCDB',
      pricePerKw: defaultDistributionPrices.dcdb,
      total: dcdbTotal,
    },
  ];

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">7. ACDB / DCDB</h2>

      <div className="flex flex-col gap-4">
        {/* Rating Selectors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="ACDB Rating"
            value={acdbRating}
            onChange={setAcdbRating}
            options={ratingOptions}
          />
          <Select
            label="DCDB Rating"
            value={dcdbRating}
            onChange={setDcdbRating}
            options={ratingOptions}
          />
        </div>

        {/* Pricing Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead align="center">Price / kW (₹)</TableHead>
              <TableHead align="right">Total (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell align="center" className="text-gray-700">
                  {item.pricePerKw.toLocaleString('en-IN')}
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
