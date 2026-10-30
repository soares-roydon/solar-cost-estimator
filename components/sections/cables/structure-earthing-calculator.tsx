'use client';

import { useState, useEffect } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import { structureEarthingCableSizes } from '@/components/sections/cables/data';

const StructureEarthingCalculator = () => {
  const [numberOfFloors, setNumberOfFloors] = useState<number>(3);
  const [distancePerFloor, setDistancePerFloor] = useState<number>(4);
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('16 sqmm');

  const calculatedTotal = numberOfFloors * distancePerFloor + extraCable;
  const [requiredLength, setRequiredLength] = useState<number>(calculatedTotal);

  useEffect(() => {
    setRequiredLength(calculatedTotal);
  }, [calculatedTotal]);

  return (
    <div className="overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header with shade of gray */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">Structure Earthing Cable Calculator</h3>
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
          <span className="text-gray-600">Distance per Floor (m)</span>
          <NumberInput
            value={distancePerFloor}
            onChange={setDistancePerFloor}
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
              options={structureEarthingCableSizes}
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
      </div>
    </div>
  );
};

export default StructureEarthingCalculator;
