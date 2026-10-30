'use client';

import { useState, useEffect } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import { dcCableSizes } from '@/components/sections/cables/data';

const DcCableCalculator = () => {
  const [numberOfFloors, setNumberOfFloors] = useState<number>(3);
  const [lengthPerFloor, setLengthPerFloor] = useState<number>(4);
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('4 sqmm');

  const calculatedTotal = numberOfFloors * lengthPerFloor + extraCable;
  const [requiredLength, setRequiredLength] = useState<number>(calculatedTotal);

  useEffect(() => {
    setRequiredLength(calculatedTotal);
  }, [calculatedTotal]);

  return (
    <div className="overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header with shade of gray */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">DC Cable Calculator</h3>
      </div>

      <div className="flex flex-col gap-2 p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Number of Floors</span>
          <NumberInput
            value={numberOfFloors}
            onChange={setNumberOfFloors}
            min={1}
            className="w-20 px-2 py-1 text-right"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">DC Cable Length per Floor (m)</span>
          <NumberInput
            value={lengthPerFloor}
            onChange={setLengthPerFloor}
            min={0}
            className="w-20 px-2 py-1 text-right"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Extra Cable (m)</span>
          <NumberInput
            value={extraCable}
            onChange={setExtraCable}
            min={0}
            className="w-20 px-2 py-1 text-right"
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-1">
          <span className="font-medium text-gray-700">Total Length (m)</span>
          <span className="font-semibold text-gray-900">{calculatedTotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Cable Size</span>
          <div className="w-28">
            <Select
              value={cableSize}
              onChange={setCableSize}
              options={dcCableSizes}
              className="w-full px-2 py-1 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Required Length (m)</span>
          <NumberInput
            value={requiredLength}
            onChange={setRequiredLength}
            min={0}
            className="w-20 px-2 py-1 text-right"
          />
        </div>

        <span className="text-[11px] text-gray-400">(You can edit the calculated length)</span>
      </div>
    </div>
  );
};

export default DcCableCalculator;
