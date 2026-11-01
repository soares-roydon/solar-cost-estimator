'use client';

import { useState } from 'react';
import ProjectDetails from '@/components/sections/project-details/project-details';
import InverterArrangement from '@/components/sections/inverter-arrangement/arrangement';
import Panels from '@/components/sections/panels/panels';
import Mounting from '@/components/sections/mounting/mounting';
import Cables from '@/components/sections/cables/cables';
import Walkway from '@/components/sections/walkway/walkway';
import AcdbDcdb from '@/components/sections/acdb-dcdb/acdb-dcdb';
import Piping from '@/components/sections/piping/piping';
import Hardware from '@/components/sections/hardware/hardware';
import OtherCosts from '@/components/sections/other-costs/other-costs';
import CostSummary from '@/components/sections/cost-summary/cost-summary';
import {
  generateFloorDistances,
  type FloorCableDistance,
} from '@/components/sections/project-details/data';

export default function Home() {
  const [numberOfPanels, setNumberOfPanels] = useState<number>(20);
  const [numberOfFloors, setNumberOfFloors] = useState<string>('3');
  const [floorDistances, setFloorDistances] = useState<FloorCableDistance[]>(() =>
    generateFloorDistances(3)
  );

  const handleFloorsChange = (value: string) => {
    setNumberOfFloors(value);
    setFloorDistances(generateFloorDistances(Number(value)));
  };

  const updateDistance = (index: number, field: 'distance' | 'extraCable', value: number) => {
    setFloorDistances((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left Column: Form & Material Sections (1 to 10) */}
        <div className="min-w-0 flex-1 space-y-4">
          <ProjectDetails
            numberOfFloors={numberOfFloors}
            onNumberOfFloorsChange={handleFloorsChange}
            floorDistances={floorDistances}
            onUpdateDistance={updateDistance}
          />
          <InverterArrangement />
          <Panels numberOfPanels={numberOfPanels} onNumberOfPanelsChange={setNumberOfPanels} />
          <Mounting numberOfPanels={numberOfPanels} />
          <Cables numberOfFloors={Number(numberOfFloors)} floorDistances={floorDistances} />
          <Walkway />
          <AcdbDcdb />
          <Piping />
          <Hardware />
          <OtherCosts />
        </div>

        {/* Right Column: Material Cost Summary Sidebar (11) */}
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-80 xl:w-96">
          <CostSummary />
        </aside>
      </div>
    </main>
  );
}
