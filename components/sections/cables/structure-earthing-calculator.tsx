'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import {
  CableCard,
  CableRow,
  CableDistanceDisplay,
  cableSelectClass,
  cableNumberInputClass,
} from '@/components/sections/cables/cable-card';
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
    <CableCard
      title="Structure Earthing"
      totalLabel="Total Earthing Cable"
      totalValue={`${cableLength} m`}
    >
      <CableRow label="Roof → Ground Distance (m)">
        <CableDistanceDisplay distance={totalVertical} />
      </CableRow>

      <CableRow label="Extra Cable (m)">
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
          options={structureEarthingCableSizes}
          className={cableSelectClass}
        />
      </CableRow>
    </CableCard>
  );
};

export default StructureEarthingCalculator;
