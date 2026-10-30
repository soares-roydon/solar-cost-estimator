'use client';

import { useState } from 'react';
import Select from '@/components/ui/select';
import NumberInput from '@/components/ui/number-input';
import { panelBrandsData } from '@/components/sections/panels/data';

interface Props {
  numberOfPanels?: number;
  onNumberOfPanelsChange?: (val: number) => void;
}

const Panels = ({ numberOfPanels: controlledPanels, onNumberOfPanelsChange }: Props) => {
  const [selectedBrand, setSelectedBrand] = useState(panelBrandsData[0].brand);
  const [selectedModel, setSelectedModel] = useState(panelBrandsData[0].models[0].model);
  const [wattage, setWattage] = useState<number>(panelBrandsData[0].models[0].wattage);
  const [internalPanels, setInternalPanels] = useState<number>(20);

  const numberOfPanels = controlledPanels ?? internalPanels;

  const handlePanelsChange = (val: number) => {
    if (onNumberOfPanelsChange) {
      onNumberOfPanelsChange(val);
    } else {
      setInternalPanels(val);
    }
  };

  const currentBrand = panelBrandsData.find((b) => b.brand === selectedBrand);
  const availableModels = currentBrand?.models ?? [];

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const newBrand = panelBrandsData.find((b) => b.brand === brand);
    if (newBrand && newBrand.models.length > 0) {
      const firstModel = newBrand.models[0];
      setSelectedModel(firstModel.model);
      setWattage(firstModel.wattage);
    }
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    const foundModel = availableModels.find((m) => m.model === modelName);
    if (foundModel) {
      setWattage(foundModel.wattage);
    }
  };

  const totalCapacityKW = (((wattage || 0) * (numberOfPanels || 0)) / 1000).toFixed(2);

  return (
    <section className="rounded border border-gray-200 p-5">
      <h2 className="mb-4 text-sm font-semibold">3. Panels</h2>

      <div className="flex flex-col gap-4">
        {/* Row 1: Brand & Model */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            options={panelBrandsData.map((b) => ({ label: b.brand, value: b.brand }))}
          />
          <Select
            label="Model"
            value={selectedModel}
            onChange={handleModelChange}
            options={availableModels.map((m) => ({ label: m.model, value: m.model }))}
          />
        </div>

        {/* Row 2: Panel Wattage (W) & Number of Panels */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberInput
            label="Panel Wattage (W)"
            value={wattage}
            onChange={setWattage}
            min={0}
            className="w-full px-3 py-1.5"
          />
          <NumberInput
            label="Number of Panels"
            value={numberOfPanels}
            onChange={handlePanelsChange}
            min={1}
            className="w-full px-3 py-1.5"
          />
        </div>

        {/* Total Panel Capacity Banner */}
        <div className="flex items-center gap-3 rounded border border-gray-200 bg-gray-50 p-3">
          <svg
            className="h-5 w-5 text-gray-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Total Panel Capacity</span>
            <span className="text-base font-semibold">{totalCapacityKW} kW</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panels;
