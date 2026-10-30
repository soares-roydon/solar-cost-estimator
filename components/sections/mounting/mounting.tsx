'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/select';
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
import {
  mountingTypeOptions,
  getMountingItems,
  type MountingType,
} from '@/components/sections/mounting/data';

interface Props {
  numberOfPanels?: number;
}

const Mounting = ({ numberOfPanels = 20 }: Props) => {
  const [mountingType, setMountingType] = useState<MountingType>('patra');
  const [groups, setGroups] = useState<number>(2);
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});
  const [prevKey, setPrevKey] = useState(`${mountingType}-${groups}-${numberOfPanels}`);

  const currentKey = `${mountingType}-${groups}-${numberOfPanels}`;
  if (prevKey !== currentKey) {
    setPrevKey(currentKey);
    setCustomQuantities({});
  }

  const baseItems = useMemo(
    () => getMountingItems(mountingType, groups, numberOfPanels),
    [mountingType, groups, numberOfPanels]
  );

  const items = useMemo(() => {
    return baseItems.map((item) => ({
      ...item,
      qty: customQuantities[item.id] !== undefined ? customQuantities[item.id] : item.qty,
    }));
  }, [baseItems, customQuantities]);

  const handleUpdateQty = (id: string, qty: number) => {
    setCustomQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, qty || 0),
    }));
  };

  const mountingTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.qty || 0) * (item.unitPrice || 0), 0);
  }, [items]);

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">4. Mounting</h2>

      <div className="flex flex-col gap-4">
        {/* Top Controls: Mounting Type & Groups */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full sm:w-64">
            <Select
              label="Mounting Type"
              value={mountingType}
              onChange={(val) => setMountingType(val as MountingType)}
              options={mountingTypeOptions}
            />
          </div>
          <div className="w-full sm:w-32">
            <NumberInput
              label="Groups"
              value={groups}
              onChange={setGroups}
              min={1}
              className="w-full px-3 py-1.5"
            />
          </div>
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
              const itemTotal = (item.qty || 0) * (item.unitPrice || 0);
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-700">{item.material}</TableCell>
                  <TableCell align="center">
                    <NumberInput
                      value={item.qty}
                      onChange={(val) => handleUpdateQty(item.id, val)}
                      min={0}
                      className="w-16 px-2 py-1 text-center"
                    />
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
