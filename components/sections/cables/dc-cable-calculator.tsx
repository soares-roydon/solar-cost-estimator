'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import InfoTooltip from '@/components/ui/info-tooltip';
import {
  CableCard,
  CableRow,
  cableSelectClass,
  cableNumberInputClass,
} from '@/components/sections/cables/cable-card';
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
    <CableCard title="DC Cable" totalLabel="Total DC Cable" totalValue={`${cableLength} m`}>
      <CableRow label="No. of Strings">
        <Select
          value={strings}
          onChange={setStrings}
          options={stringOptions}
          className={cableSelectClass}
        />
      </CableRow>

      <CableRow label="Inverter Floor">
        <Select
          value={String(inverterFloor)}
          onChange={(val) => handleInverterFloorChange(Number(val))}
          options={inverterFloorOptions}
          className={cableSelectClass}
        />
      </CableRow>

      <CableRow label="Panel → Inverter Distance (m)">
        <NumberInput
          value={panelToInverterDistance}
          onChange={handleDistanceChange}
          min={0}
          className={cableNumberInputClass}
        />
      </CableRow>

      <CableRow
        label={
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
        }
      >
        <NumberInput
          value={extraCable}
          onChange={setExtraCable}
          min={0}
          className={cableNumberInputClass}
        />
      </CableRow>

      <CableRow label="Cable Size">
        <Select
          value={cableSize}
          onChange={setCableSize}
          options={dcCableSizes}
          className={cableSelectClass}
        />
      </CableRow>
    </CableCard>
  );
};

export default DcCableCalculator;
