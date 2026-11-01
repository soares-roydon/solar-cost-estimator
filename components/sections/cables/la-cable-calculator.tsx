'use client';

import { useState } from 'react';
import NumberInput from '@/components/ui/number-input';
import Select from '@/components/ui/select';
import { useUpdateEffect } from '@/lib/hooks/use-update-effect';
import {
  CableCard,
  CableRow,
  CableDistanceDisplay,
  cableSelectClass,
  cableNumberInputClass,
} from '@/components/sections/cables/cable-card';
import { laCableSizes, laCablePricePerMeter } from '@/components/sections/cables/data';

interface Props {
  totalVertical: number;
  onCostChange?: (cost: number) => void;
}

const LaCableCalculator = ({ totalVertical, onCostChange }: Props) => {
  const [extraCable, setExtraCable] = useState<number>(0);
  const [cableSize, setCableSize] = useState<string>('6 sqmm');

  // LA cable runs from the lightning arrestor tip (above roof) down to the earth pit
  const cableLength = totalVertical + extraCable;
  const unitPrice = laCablePricePerMeter[cableSize] ?? 70;
  const totalCost = cableLength * unitPrice;

  useUpdateEffect(() => {
    onCostChange?.(totalCost);
  }, [totalCost]);

  return (
    <CableCard
      title="LA Cable"
      totalLabel="Total LA Cable"
      totalValue={`${cableLength} m • ₹ ${totalCost.toLocaleString('en-IN')}`}
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
          options={laCableSizes}
          className={cableSelectClass}
        />
      </CableRow>
    </CableCard>
  );
};

export default LaCableCalculator;
