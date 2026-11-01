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
import { laCableSizes } from '@/components/sections/cables/data';

interface Props {
  totalVertical: number;
}

const LaCableCalculator = ({ totalVertical }: Props) => {
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('6 sqmm');

  // LA cable runs from the lightning arrestor tip (above roof) down to the earth pit
  const cableLength = totalVertical + extraCable;

  return (
    <CableCard title="LA Cable" totalLabel="Total LA Cable" totalValue={`${cableLength} m`}>
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
          options={laCableSizes}
          className={cableSelectClass}
        />
      </CableRow>
    </CableCard>
  );
};

export default LaCableCalculator;
