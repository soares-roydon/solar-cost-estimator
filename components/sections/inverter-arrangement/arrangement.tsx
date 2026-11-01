'use client';

import { useState } from 'react';
import RadioCard from '@/components/sections/inverter-arrangement/radio-card';
import Select from '@/components/ui/select';
import NumberInput from '@/components/ui/number-input';
import { useUpdateEffect } from '@/lib/hooks/use-update-effect';
import {
  systemTypeOptions,
  arrangementOptions,
  inverterBrandModelsByType,
  batteryTypeOptions,
  batteryCapacityOptions,
  getInverterPrice,
  batteryPrices,
  type SystemType,
  type ArrangementType,
} from '@/components/sections/inverter-arrangement/data';

interface Props {
  onCostChange?: (cost: number) => void;
}

const InverterArrangement = ({ onCostChange }: Props) => {
  const [systemType, setSystemType] = useState<SystemType>('ongrid');
  const [arrangementType, setArrangementType] = useState<ArrangementType>('string');
  const [showBatteryDetails, setShowBatteryDetails] = useState(false);

  // Inverter selection
  const availableBrands = inverterBrandModelsByType[systemType];
  const [selectedBrand, setSelectedBrand] = useState(availableBrands[0].brand);
  const currentBrand = availableBrands.find((b) => b.brand === selectedBrand) ?? availableBrands[0];
  const availableModels = currentBrand.models;
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);
  const [numberOfInverters, setNumberOfInverters] = useState(1);

  // Battery selection (for Hybrid)
  const [batteryType, setBatteryType] = useState('lithium');
  const currentCapacityOptions =
    batteryCapacityOptions[batteryType] ?? batteryCapacityOptions.lithium;
  const [batteryCapacity, setBatteryCapacity] = useState(currentCapacityOptions[0].value);
  const [numberOfBatteries, setNumberOfBatteries] = useState(1);

  const calculateCost = (
    sType: SystemType,
    brand: string,
    model: string,
    numInv: number,
    bType: string,
    bCap: string,
    numBat: number
  ) => {
    const invPrice = getInverterPrice(brand, model);
    let total = (numInv || 0) * invPrice;
    if (sType === 'hybrid') {
      const batPrice = batteryPrices[bType]?.[bCap] ?? 120000;
      total += (numBat || 0) * batPrice;
    }
    return total;
  };

  const currentTotalCost = calculateCost(
    systemType,
    selectedBrand,
    selectedModel,
    numberOfInverters,
    batteryType,
    batteryCapacity,
    numberOfBatteries
  );

  useUpdateEffect(() => {
    onCostChange?.(currentTotalCost);
  }, [currentTotalCost]);

  const handleSystemTypeChange = (val: string) => {
    const newSystem = val as SystemType;
    setSystemType(newSystem);
    const newBrands = inverterBrandModelsByType[newSystem];
    const newBrand = newBrands[0];
    const newModel = newBrand.models[0];
    setSelectedBrand(newBrand.brand);
    setSelectedModel(newModel);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const found = availableBrands.find((b) => b.brand === brand);
    if (found && found.models.length > 0) {
      setSelectedModel(found.models[0]);
    }
  };

  const handleBatteryTypeChange = (type: string) => {
    setBatteryType(type);
    const newCaps = batteryCapacityOptions[type] ?? batteryCapacityOptions.lithium;
    setBatteryCapacity(newCaps[0].value);
  };

  return (
    <section className="rounded border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold">2. Inverter Arrangement</h2>

      <div className="flex flex-col gap-5">
        {/* System Type */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">System Type</span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {systemTypeOptions.map((opt) => (
              <RadioCard
                key={opt.id}
                name="system-type"
                title={opt.title}
                description={opt.description}
                selected={systemType === opt.id}
                onSelect={() => handleSystemTypeChange(opt.id)}
              />
            ))}
          </div>
        </div>

        {/* Inverter Technology */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">Inverter Technology</span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {arrangementOptions.map((option) => (
              <RadioCard
                key={option.id}
                name="arrangement-type"
                title={option.title}
                description={option.description}
                selected={arrangementType === option.id}
                onSelect={() => setArrangementType(option.id)}
              />
            ))}
          </div>
        </div>

        {/* Inverter Details */}
        <div className="border-t border-gray-200 pt-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Inverter Details</h3>

          <div className="flex flex-col gap-4">
            {/* Row 1: Brand & Model */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Inverter Brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                options={availableBrands.map((b) => ({ label: b.brand, value: b.brand }))}
              />
              <Select
                label="Inverter Model"
                value={selectedModel}
                onChange={setSelectedModel}
                options={availableModels.map((m) => ({ label: m, value: m }))}
              />
            </div>

            {/* Row 2: Number of Inverters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <NumberInput
                label="Number of Inverters"
                value={numberOfInverters}
                onChange={setNumberOfInverters}
                min={1}
                hint="(Auto calculated / can be edited)"
                className="w-full px-3 py-1.5"
              />
            </div>
          </div>
        </div>

        {/* Collapsible Battery Options (when Hybrid is selected) */}
        {systemType === 'hybrid' && (
          <div className="border-t border-gray-200 pt-3">
            <button
              type="button"
              onClick={() => setShowBatteryDetails(!showBatteryDetails)}
              className="flex items-center gap-1.5 self-start text-xs text-gray-500 hover:text-gray-700"
            >
              <svg
                className={`h-3 w-3 transition-transform ${showBatteryDetails ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Battery Options
            </button>

            {showBatteryDetails && (
              <div className="mt-4 flex flex-col gap-4">
                {/* Row 1: Battery Type & Battery Capacity */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select
                    label="Battery Type"
                    value={batteryType}
                    onChange={handleBatteryTypeChange}
                    options={batteryTypeOptions}
                  />
                  <Select
                    label="Battery Capacity"
                    value={batteryCapacity}
                    onChange={setBatteryCapacity}
                    options={currentCapacityOptions}
                  />
                </div>

                {/* Row 2: Number of Batteries */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberInput
                    label="Number of Batteries"
                    value={numberOfBatteries}
                    onChange={setNumberOfBatteries}
                    min={1}
                    className="w-full px-3 py-1.5"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estimated Inverter Cost Banner */}
        <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-3">
          <span className="text-xs text-gray-500">
            Estimated Inverter {systemType === 'hybrid' ? '& Battery ' : ''}Cost
          </span>
          <span className="text-base font-semibold text-gray-900">
            ₹ {currentTotalCost.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default InverterArrangement;
