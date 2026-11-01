'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import { structureEarthingCableSizes } from '@/components/sections/cables/data';

interface Props {
  totalVertical: number;
}

const StructureEarthingCalculator = ({ totalVertical }: Props) => {
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('16 sqmm');

  // Structure earthing bonds panel frames/mounting structure to the earth pit
  const cableLength = totalVertical + extraCable;

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">Structure Earthing</h3>
      </div>

      {/* Inputs Form */}
      <div className="flex flex-1 flex-col justify-start gap-2.5 p-4 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Roof → Ground Distance (m)</span>
          <div className="flex h-8 w-[106px] items-center justify-end rounded border border-gray-200 bg-gray-50 px-2.5 text-xs font-medium text-gray-800">
            {totalVertical} m
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Extra Cable (m)</span>
          <NumberInput
            value={extraCable}
            onChange={setExtraCable}
            min={0}
            className="h-8 w-[106px] px-2.5 py-1 text-right text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Cable Size</span>
          <Select
            value={cableSize}
            onChange={setCableSize}
            options={structureEarthingCableSizes}
            className="h-8 w-[106px] px-2 text-xs"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-800">Total Earthing Cable</span>
          <span className="font-semibold text-gray-900">{cableLength} m</span>
        </div>
      </div>
    </div>
  );
};

export default StructureEarthingCalculator;
