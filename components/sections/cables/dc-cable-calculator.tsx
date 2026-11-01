'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import InfoTooltip from '@/components/ui/info-tooltip';
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
  const [customDistance, setCustomDistance] = useState<number | null>(null);
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('4 sqmm');

  const inverterFloorOptions = getInverterFloorOptions(numberOfFloors);

  // Auto-calculated distance from Roof to inverter floor
  const autoCalculatedDistance = roofToFloor(inverterFloor, numberOfFloors, floorDistances);
  const panelToInverterDistance = customDistance ?? autoCalculatedDistance;

  // DC Cable Calculation (Option A):
  // Each string has 2 wires (positive + negative).
  // Total wires = No. of Strings × 2
  // Total DC Cable = (Panel to Inverter distance + Extra Cable per wire) × Total wires
  const numberOfStrings = Number(strings) || 1;
  const numberOfWires = numberOfStrings * 2;
  const totalExtraCable = extraCable * numberOfWires;
  const cableLength = (panelToInverterDistance + extraCable) * numberOfWires;

  const handleInverterFloorChange = (floor: number) => {
    setCustomDistance(null);
    onInverterFloorChange(floor);
  };

  const handleDistanceChange = (val: number) => {
    setCustomDistance(val === autoCalculatedDistance ? null : val);
  };

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
            className="h-8 w-[106px] px-2 text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Inverter Floor</span>
          <Select
            value={String(inverterFloor)}
            onChange={(val) => handleInverterFloorChange(Number(val))}
            options={inverterFloorOptions}
            className="h-8 w-[106px] px-2 text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Panel → Inverter Distance (m)</span>
          <NumberInput
            value={panelToInverterDistance}
            onChange={handleDistanceChange}
            min={0}
            className="h-8 w-[106px] px-2.5 py-1 text-right text-xs"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600">Extra Cable per Wire (m)</span>
            <InfoTooltip
              text={
                extraCable > 0
                  ? `${numberOfWires} wires × ${extraCable} m = ${totalExtraCable} m extra`
                  : `${numberOfWires} wires (${numberOfStrings} ${numberOfStrings === 1 ? 'string' : 'strings'} × 2)`
              }
            />
          </div>
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
            options={dcCableSizes}
            className="h-8 w-[106px] px-2 text-xs"
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
