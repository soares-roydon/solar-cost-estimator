'use client';

import { useState } from 'react';
import RadioCard from '@/components/sections/inverter-arrangement/radio-card';
import Select from '@/components/ui/select';
import NumberInput from '@/components/ui/number-input';
import {
  arrangementOptions,
  inverterBrandModels,
  type ArrangementType,
} from '@/components/sections/inverter-arrangement/data';

const InverterArrangement = () => {
  const [selectedType, setSelectedType] = useState<ArrangementType>('string');
  const [selectedBrand, setSelectedBrand] = useState(inverterBrandModels[0].brand);
  const [selectedModel, setSelectedModel] = useState(inverterBrandModels[0].models[1]);
  const [numberOfInverters, setNumberOfInverters] = useState(2);

  // Get available models for current brand
  const currentBrand = inverterBrandModels.find((b) => b.brand === selectedBrand);
  const availableModels = currentBrand?.models ?? [];

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const newBrand = inverterBrandModels.find((b) => b.brand === brand);
    if (newBrand && newBrand.models.length > 0) {
      setSelectedModel(newBrand.models[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Inverter Arrangement card */}
      <section className="flex-1 rounded border border-gray-200 p-5">
        <h2 className="mb-4 text-sm font-semibold">1. Inverter Arrangement</h2>
        <div className="grid auto-rows-min grid-cols-3 gap-3">
          {arrangementOptions.map((option) => (
            <RadioCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={selectedType === option.id}
              onSelect={() => setSelectedType(option.id)}
            />
          ))}
        </div>
      </section>

      {/* Inverter Details card */}
      <section className="w-full rounded border border-gray-200 p-5 lg:w-72">
        <h3 className="mb-3 text-sm font-semibold">Inverter Details</h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <Select
              label="Inverter Brand"
              value={selectedBrand}
              onChange={handleBrandChange}
              options={inverterBrandModels.map((b) => ({ label: b.brand, value: b.brand }))}
            />
          </div>
          <div className="flex-1">
            <Select
              label="Inverter Model"
              value={selectedModel}
              onChange={setSelectedModel}
              options={availableModels.map((m) => ({ label: m, value: m }))}
            />
          </div>
        </div>

        <div className="mt-3">
          <NumberInput
            label="Number of Inverters"
            value={numberOfInverters}
            onChange={setNumberOfInverters}
            min={1}
            hint="(Auto calculated / can be edited)"
          />
        </div>
      </section>
    </div>
  );
};

export default InverterArrangement;
