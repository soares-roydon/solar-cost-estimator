'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import InfoTooltip from '@/components/ui/info-tooltip';
import { useUpdateEffect } from '@/lib/hooks/use-update-effect';
import {
  CableCard,
  CableRow,
  CableDistanceDisplay,
  cableSelectClass,
  cableNumberInputClass,
} from '@/components/sections/cables/cable-card';
import {
  acCableSizes,
  phaseTypeOptions,
  acCablePricePerMeter,
} from '@/components/sections/cables/data';
import { floorToGround, type FloorCableDistance } from '@/components/sections/project-details/data';

interface Props {
  numberOfFloors: number;
  floorDistances: FloorCableDistance[];
  inverterFloor: number;
  onCostChange?: (cost: number) => void;
}

const AcCableCalculator = ({
  numberOfFloors,
  floorDistances,
  inverterFloor,
  onCostChange,
}: Props) => {
  const [phaseType, setPhaseType] = useState<string>('4'); // Three Phase default
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('6 sqmm');

  // Vertical distance from inverter floor down to ground (main meter)
  const inverterToGroundDistance = floorToGround(inverterFloor, numberOfFloors, floorDistances);

  // AC Cable Calculation:
  // Three Phase = 4 wires (3L + N), Single Phase = 2 wires (L + N)
  const numberOfWires = Number(phaseType) || 4;
  const totalExtraCable = extraCable * numberOfWires;

  // AC Cable Length = (Vertical + Extra per wire) × number of wires
  const cableLength = (inverterToGroundDistance + extraCable) * numberOfWires;
  const unitPrice = acCablePricePerMeter[cableSize] ?? 105;
  const totalCost = Math.round(cableLength * unitPrice);

  useUpdateEffect(() => {
    onCostChange?.(totalCost);
  }, [totalCost]);

  return (
    <CableCard
      title="AC Cable"
      totalLabel="Total AC Cable"
      totalValue={`${cableLength} m • ₹ ${totalCost.toLocaleString('en-IN')}`}
    >
      <CableRow label="Phase Type">
        <Select
          value={phaseType}
          onChange={setPhaseType}
          options={phaseTypeOptions}
          className={cableSelectClass}
        />
      </CableRow>

      <CableRow label="Inverter → Main Meter (m)">
        <CableDistanceDisplay distance={inverterToGroundDistance} />
      </CableRow>

      <CableRow
        label={
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600">Extra Cable per Wire (m)</span>
            <InfoTooltip
              text={
                extraCable > 0
                  ? `${numberOfWires} wires × ${extraCable} m = ${totalExtraCable} m extra`
                  : `${numberOfWires} wires (${numberOfWires === 4 ? 'Three Phase' : 'Single Phase'})`
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
          options={acCableSizes}
          className={cableSelectClass}
        />
      </CableRow>
    </CableCard>
  );
};

export default AcCableCalculator;
