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
      brand: 'Vsole',
      models: ['15kW'],
    },
    {
      brand: 'SolarEdge',
      models: ['15kW 3ph'],
    },
  ],
  hybrid: [
    {
      brand: 'SolarEdge',
      models: ['15kW Hybrid'],
    },
    {
      brand: 'Vsole',
      models: ['15kW Hybrid'],
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

// Inverter prices calibrated with Maharudra Solar distributor quotes (PFI-311, PFI-364)
export const inverterModelPrices: Record<string, number> = {
  // On-Grid models
  '15kW': 55000, // Vsole 15kW On-Grid (PFI-364)
  '15kW 3ph': 86000, // SolarEdge 15kW 3-Phase (PFI-311)
  // Hybrid models
  '15kW Hybrid': 110000,
};

export function getInverterPrice(brand: string, model: string): number {
  if (brand === 'SolarEdge' && (model === '15kW 3ph' || model === '15kW')) return 86000;
  if (brand === 'Vsole' && model === '15kW') return 55000;
  return inverterModelPrices[model] ?? 55000;
}

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
