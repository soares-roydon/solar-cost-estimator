export type SystemType = 'ongrid' | 'hybrid';
export type ArrangementType = 'string' | 'optimizer';

export interface SystemTypeOption {
  id: SystemType;
  title: string;
  description: string;
}

export const systemTypeOptions: SystemTypeOption[] = [
  {
    id: 'ongrid',
    title: 'On-Grid',
    description: 'Grid-tied without battery.',
  },
  {
    id: 'hybrid',
    title: 'Hybrid',
    description: 'With battery backup.',
  },
];

export interface ArrangementOption {
  id: ArrangementType;
  title: string;
  description: string;
}

export const arrangementOptions: ArrangementOption[] = [
  {
    id: 'string',
    title: 'String',
    description: 'Panels connected in strings.',
  },
  {
    id: 'optimizer',
    title: 'Optimizer',
    description: 'Optimisers on each panel.',
  },
];

export interface InverterBrandModels {
  brand: string;
  models: string[];
}

export const inverterBrandModelsByType: Record<SystemType, InverterBrandModels[]> = {
  ongrid: [
    {
      brand: 'Solis',
      models: ['3kW', '5kW', '6kW', '8kW', '10kW'],
    },
    {
      brand: 'Growatt',
      models: ['3kW', '5kW', '6kW', '10kW'],
    },
    {
      brand: 'Havells',
      models: ['3kW', '5kW', '8kW'],
    },
  ],
  hybrid: [
    {
      brand: 'Solis',
      models: ['3kW Hybrid', '5kW Hybrid', '6kW Hybrid', '8kW Hybrid', '10kW Hybrid'],
    },
    {
      brand: 'Growatt',
      models: ['3kW Hybrid', '5kW Hybrid', '6kW Hybrid', '10kW Hybrid'],
    },
    {
      brand: 'Deye',
      models: ['3.6kW Hybrid', '5kW Hybrid', '8kW Hybrid', '10kW Hybrid'],
    },
    {
      brand: 'GoodWe',
      models: ['3kW Hybrid', '5kW Hybrid', '6kW Hybrid', '10kW Hybrid'],
    },
  ],
};

export const batteryTypeOptions = [
  { label: 'Lithium (LiFePO4)', value: 'lithium' },
  { label: 'Tubular Lead-Acid', value: 'tubular' },
];

export interface BatteryCapacityOption {
  label: string;
  value: string;
}

export const batteryCapacityOptions: Record<string, BatteryCapacityOption[]> = {
  lithium: [
    { label: '5.12 kWh (100Ah)', value: '5.12' },
    { label: '10.24 kWh (200Ah)', value: '10.24' },
    { label: '15.36 kWh (300Ah)', value: '15.36' },
    { label: '20.48 kWh (400Ah)', value: '20.48' },
  ],
  tubular: [
    { label: '7.2 kWh (150Ah)', value: '7.2' },
    { label: '9.6 kWh (200Ah)', value: '9.6' },
  ],
};

// Estimated dummy inverter prices (₹)
export const inverterModelPrices: Record<string, number> = {
  // On-Grid models
  '3kW': 45000,
  '5kW': 75000,
  '6kW': 85000,
  '8kW': 105000,
  '10kW': 125000,
  // Hybrid models
  '3kW Hybrid': 75000,
  '3.6kW Hybrid': 82000,
  '5kW Hybrid': 110000,
  '6kW Hybrid': 125000,
  '8kW Hybrid': 155000,
  '10kW Hybrid': 185000,
};

// Estimated dummy battery prices (₹)
export const batteryPrices: Record<string, Record<string, number>> = {
  lithium: {
    '5.12': 120000,
    '10.24': 230000,
    '15.36': 340000,
    '20.48': 450000,
  },
  tubular: {
    '7.2': 35000,
    '9.6': 45000,
  },
};
