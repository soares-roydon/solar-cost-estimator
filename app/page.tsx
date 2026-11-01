'use client';

import { useState, useCallback } from 'react';
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
import CostSummary, {
  type MaterialCosts,
  type OtherCostsBreakdown,
} from '@/components/sections/cost-summary/cost-summary';
import {
  defaultMaterialCosts,
  defaultOtherCostSummary,
} from '@/components/sections/cost-summary/data';
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

  // Dynamic cost state synced across all components
  const [materialCosts, setMaterialCosts] = useState<MaterialCosts>(defaultMaterialCosts);
  const [otherCosts, setOtherCosts] = useState<OtherCostsBreakdown>(defaultOtherCostSummary);

  const updateMaterialCost = useCallback((key: keyof MaterialCosts, cost: number) => {
    setMaterialCosts((prev) => (prev[key] === cost ? prev : { ...prev, [key]: cost }));
  }, []);

  const updateCableCost = useCallback(
    (type: 'dcCable' | 'acCable' | 'laCable' | 'structureEarthing', cost: number) => {
      setMaterialCosts((prev) => (prev[type] === cost ? prev : { ...prev, [type]: cost }));
    },
    []
  );

  const handlePanelsChange = useCallback((val: number) => {
    setNumberOfPanels(val);
  }, []);

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
          <InverterArrangement onCostChange={(cost) => updateMaterialCost('inverter', cost)} />
          <Panels
            numberOfPanels={numberOfPanels}
            onNumberOfPanelsChange={handlePanelsChange}
            onCostChange={(cost) => updateMaterialCost('panels', cost)}
          />
          <Mounting
            numberOfPanels={numberOfPanels}
            onCostChange={(cost) => updateMaterialCost('mounting', cost)}
          />
          <Cables
            numberOfFloors={Number(numberOfFloors)}
            floorDistances={floorDistances}
            onCableCostChange={updateCableCost}
          />
          <Walkway onCostChange={(cost) => updateMaterialCost('walkway', cost)} />
          <AcdbDcdb onCostChange={(cost) => updateMaterialCost('acdbDcdb', cost)} />
          <Piping onCostChange={(cost) => updateMaterialCost('piping', cost)} />
          <Hardware onCostChange={(cost) => updateMaterialCost('hardware', cost)} />
          <OtherCosts onCostsChange={setOtherCosts} />
        </div>

        {/* Right Column: Material Cost Summary Sidebar (11) */}
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-80 xl:w-96">
          <CostSummary materialCosts={materialCosts} otherCosts={otherCosts} />
        </aside>
      </div>
    </main>
  );
}
