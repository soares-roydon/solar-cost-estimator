'use client';

import { useState, useMemo } from 'react';
import DcCableCalculator from '@/components/sections/cables/dc-cable-calculator';
import AcCableCalculator from '@/components/sections/cables/ac-cable-calculator';
import LaCableCalculator from '@/components/sections/cables/la-cable-calculator';
import StructureEarthingCalculator from '@/components/sections/cables/structure-earthing-calculator';
import {
  totalVerticalDistance,
  type FloorCableDistance,
} from '@/components/sections/project-details/data';

interface Props {
  numberOfFloors: number;
  floorDistances: FloorCableDistance[];
}

const Cables = ({ numberOfFloors, floorDistances }: Props) => {
  const [inverterFloor, setInverterFloor] = useState<number>(0); // Ground by default

  // Ensure inverter floor is never higher than the available floors
  const safeInverterFloor = Math.min(inverterFloor, numberOfFloors);

  const totalVertical = useMemo(() => totalVerticalDistance(floorDistances), [floorDistances]);

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">5. Cables</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DcCableCalculator
          numberOfFloors={numberOfFloors}
          floorDistances={floorDistances}
          inverterFloor={safeInverterFloor}
          onInverterFloorChange={setInverterFloor}
        />
        <AcCableCalculator
          numberOfFloors={numberOfFloors}
          floorDistances={floorDistances}
          inverterFloor={safeInverterFloor}
        />
        <LaCableCalculator totalVertical={totalVertical} />
        <StructureEarthingCalculator totalVertical={totalVertical} />
      </div>
    </section>
  );
};

export default Cables;
