'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import { acCableSizes, phaseTypeOptions } from '@/components/sections/cables/data';
import { floorToGround, type FloorCableDistance } from '@/components/sections/project-details/data';

interface Props {
  numberOfFloors: number;
  floorDistances: FloorCableDistance[];
  inverterFloor: number;
}

const AcCableCalculator = ({ numberOfFloors, floorDistances, inverterFloor }: Props) => {
  const [phaseType, setPhaseType] = useState<string>('4'); // Three Phase default
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('6 sqmm');

  // Vertical distance from inverter floor down to ground (main meter)
  const inverterToGroundDistance = floorToGround(inverterFloor, numberOfFloors, floorDistances);

  // Total wire run per core = vertical + horizontal (extra cable covers horizontal distance)
  const wireRunPerCore = inverterToGroundDistance + extraCable;

  // AC Cable Length = wire run × phase multiplier
  // Single Phase = 2 (L + N), Three Phase = 4 (3L + N)
  const phaseMultiplier = Number(phaseType) || 4;
  const cableLength = wireRunPerCore * phaseMultiplier;

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">AC Cable</h3>
      </div>

      {/* Inputs Form */}
      <div className="flex flex-1 flex-col justify-start gap-2.5 p-4 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Phase Type</span>
          <Select
            value={phaseType}
            onChange={setPhaseType}
            options={phaseTypeOptions}
            className="h-8 w-28 px-2 text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Inverter → Main Meter (m)</span>
          <div className="flex h-8 w-28 items-center justify-end rounded border border-gray-200 bg-gray-50 px-2.5 text-xs font-medium text-gray-800">
            {inverterToGroundDistance} m
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Extra Cable (m)</span>
          <NumberInput
            value={extraCable}
            onChange={setExtraCable}
            min={0}
            className="h-8 w-28 px-2.5 py-1 text-right text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Cable Size</span>
          <Select
            value={cableSize}
            onChange={setCableSize}
            options={acCableSizes}
            className="h-8 w-28 px-2 text-xs"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-800">Total AC Cable</span>
          <span className="font-semibold text-gray-900">{cableLength} m</span>
        </div>
      </div>
    </div>
  );
};

export default AcCableCalculator;
