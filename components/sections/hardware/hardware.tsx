'use client';

import { useState, useMemo } from 'react';
import NumberInput from '@/components/ui/number-input';
import TextInput from '@/components/ui/text-input';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { defaultHardwareItems, type HardwareItem } from '@/components/sections/hardware/data';

const Hardware = () => {
  const [items, setItems] = useState<HardwareItem[]>(defaultHardwareItems);

  const handleAddItem = () => {
    const newItem: HardwareItem = {
      id: `custom-${Date.now()}`,
      name: '',
      qty: 1,
      unitPrice: 0,
      isCustom: true,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: 'name' | 'qty' | 'unitPrice',
    value: string | number
  ) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const hardwareTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.qty || 0) * (item.unitPrice || 0), 0);
  }, [items]);

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">9. Hardware & Other</h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Hardware Items Table */}
        <div className="flex-1">
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
              {items.map((item) => {
                const itemTotal = (item.qty || 0) * (item.unitPrice || 0);

                if (item.isCustom) {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TextInput
                            value={item.name}
                            onChange={(val) => handleUpdateItem(item.id, 'name', val)}
                            placeholder="Item name"
                            className="px-2 py-1 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-xs text-gray-400 hover:text-red-500"
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <NumberInput
                          value={item.qty}
                          onChange={(val) => handleUpdateItem(item.id, 'qty', val)}
                          min={0}
                          className="w-16 px-2 py-1 text-center"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <NumberInput
                          value={item.unitPrice}
                          onChange={(val) => handleUpdateItem(item.id, 'unitPrice', val)}
                          min={0}
                          className="w-20 px-2 py-1 text-center"
                        />
                      </TableCell>
                      <TableCell align="right" className="font-medium text-gray-900">
                        {itemTotal.toLocaleString('en-IN')}
                      </TableCell>
                    </TableRow>
                  );
                }

                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-gray-700">{item.name}</TableCell>
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
                  Hardware & Other Total
                </TableCell>
                <TableCell colSpan={2} align="right" className="font-semibold text-gray-900">
                  ₹ {hardwareTotal.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Additional Items Panel */}
        <div className="flex w-full flex-col gap-3 rounded border border-gray-200 bg-gray-50/50 p-4 lg:w-48">
          <span className="text-xs font-semibold text-gray-700">Additional Items</span>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center justify-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-100"
          >
            <span>+</span>
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hardware;
