'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import {
  dcCableSizes,
  stringOptions,
  getInverterFloorOptions,
} from '@/components/sections/cables/data';
import { roofToFloor, type FloorCableDistance } from '@/components/sections/project-details/data';

interface Props {
  numberOfFloors: number;
  floorDistances: FloorCableDistance[];
  inverterFloor: number;
  onInverterFloorChange: (floor: number) => void;
}

const DcCableCalculator = ({
  numberOfFloors,
  floorDistances,
  inverterFloor,
  onInverterFloorChange,
}: Props) => {
  const [strings, setStrings] = useState<string>('2');
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('4 sqmm');

  const inverterFloorOptions = getInverterFloorOptions(numberOfFloors);

  // Panel to Inverter = vertical distance from Roof to inverter floor
  const panelToInverterDistance = roofToFloor(inverterFloor, numberOfFloors, floorDistances);

  // Cable length = (Panel to Inverter distance × 2) × No. of Strings + Extra Cable
  // ×2 accounts for positive and negative DC runs per string
  const numberOfStrings = Number(strings) || 1;
  const cableLength = panelToInverterDistance * 2 * numberOfStrings + extraCable;

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <h3 className="text-xs font-semibold text-gray-800">DC Cable</h3>
      </div>

      {/* Inputs Form */}
      <div className="flex flex-1 flex-col justify-start gap-2.5 p-4 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">No. of Strings</span>
          <Select
            value={strings}
            onChange={setStrings}
            options={stringOptions}
            className="h-8 w-28 px-2 text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Inverter Floor</span>
          <Select
            value={String(inverterFloor)}
            onChange={(val) => onInverterFloorChange(Number(val))}
            options={inverterFloorOptions}
            className="h-8 w-28 px-2 text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Panel → Inverter Distance (m)</span>
          <div className="flex h-8 w-28 items-center justify-end rounded border border-gray-200 bg-gray-50 px-2.5 text-xs font-medium text-gray-800">
            {panelToInverterDistance} m
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
            options={dcCableSizes}
            className="h-8 w-28 px-2 text-xs"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-800">Total DC Cable</span>
          <span className="font-semibold text-gray-900">{cableLength} m</span>
        </div>
      </div>
    </div>
  );
};

export default DcCableCalculator;
