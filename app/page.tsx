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
  SOLAR_EQUIPMENT_GST_RATE,
  BOS_SERVICES_GST_RATE,
} from '@/components/sections/cost-summary/data';
import {
  generateFloorDistances,
  type FloorCableDistance,
} from '@/components/sections/project-details/data';
import { downloadQuotationDocx, type QuotationData } from '@/quotation';
import type { SystemType, ArrangementType } from '@/components/sections/inverter-arrangement/data';

export default function Home() {
  const [clientName, setClientName] = useState<string>('Client');
  const [numberOfPanels, setNumberOfPanels] = useState<number>(20);
  const [numberOfFloors, setNumberOfFloors] = useState<string>('3');
  const [floorDistances, setFloorDistances] = useState<FloorCableDistance[]>(() =>
    generateFloorDistances(3)
  );

  const [panelDetails, setPanelDetails] = useState({
    brand: 'Premier Energies',
    model: '550Wp Bifacial',
    wattage: 550,
  });

  const [inverterDetails, setInverterDetails] = useState<{
    systemType: SystemType;
    brand: string;
    model: string;
    arrangementType: ArrangementType;
  }>({
    systemType: 'ongrid',
    brand: 'Vsole',
    model: '15kW',
    arrangementType: 'string',
  });

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

  const handleExportQuotation = useCallback(async () => {
    const plantCapacityKw = Number(
      (((panelDetails.wattage || 550) * (numberOfPanels || 20)) / 1000).toFixed(2)
    );
    const invCapacityKw = Number(inverterDetails.model.replace(/[^0-9.]/g, '')) || 15;
    const invTypeStr = `${inverterDetails.brand} Inverter with ${
      inverterDetails.arrangementType === 'optimizer' ? 'Optimizer' : 'String'
    }`;

    // Calculate system cost and GST
    const materialTotal = Object.values(materialCosts).reduce((sum, v) => sum + (v || 0), 0);
    const otherCostsSum = otherCosts.labour + otherCosts.transport + otherCosts.other;
    const projectCost = materialTotal + otherCostsSum;

    const equipmentCost = (materialCosts.panels || 0) + (materialCosts.inverter || 0);
    const equipmentGst = Math.round(equipmentCost * SOLAR_EQUIPMENT_GST_RATE);
    const bosAndServicesCost = projectCost - equipmentCost;
    const bosGst = Math.round(bosAndServicesCost * BOS_SERVICES_GST_RATE);
    const totalGst = equipmentGst + bosGst;
    const finalCost = projectCost + totalGst;

    const quotationData: QuotationData = {
      client: {
        name: clientName || 'Client',
      },
      system: {
        plantCapacityKw,
        panelBrand: panelDetails.brand,
        panelModel: panelDetails.model,
        panelWattage: panelDetails.wattage,
        numberOfPanels,
        inverterCapacityKw: invCapacityKw,
        inverterBrand: inverterDetails.brand,
        inverterType: invTypeStr,
        systemType: inverterDetails.systemType === 'hybrid' ? 'Hybrid' : 'On-Grid',
      },
      commercials: {
        systemCost: projectCost,
        gstRatePct: Number(((totalGst / projectCost) * 100).toFixed(2)),
        gstAmount: totalGst,
        totalSystemCost: finalCost,
      },
    };

    await downloadQuotationDocx(quotationData);
  }, [clientName, panelDetails, inverterDetails, numberOfPanels, materialCosts, otherCosts]);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left Column: Form & Material Sections (1 to 10) */}
        <div className="min-w-0 flex-1 space-y-4">
          <ProjectDetails
            projectName={clientName}
            onProjectNameChange={setClientName}
            numberOfFloors={numberOfFloors}
            onNumberOfFloorsChange={handleFloorsChange}
            floorDistances={floorDistances}
            onUpdateDistance={updateDistance}
          />
          <InverterArrangement
            onCostChange={(cost) => updateMaterialCost('inverter', cost)}
            onInverterDetailsChange={setInverterDetails}
          />
          <Panels
            numberOfPanels={numberOfPanels}
            onNumberOfPanelsChange={handlePanelsChange}
            onCostChange={(cost) => updateMaterialCost('panels', cost)}
            onPanelDetailsChange={setPanelDetails}
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
          <CostSummary
            materialCosts={materialCosts}
            otherCosts={otherCosts}
            onExportQuotation={handleExportQuotation}
          />
        </aside>
      </div>
    </main>
  );
}
