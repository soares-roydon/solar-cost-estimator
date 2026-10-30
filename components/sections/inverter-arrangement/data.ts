export type ArrangementType = 'string' | 'microinverter' | 'optimiser';

export interface ArrangementOption {
  id: ArrangementType;
  title: string;
  description: string;
}

export const arrangementOptions: ArrangementOption[] = [
  {
    id: 'string',
    title: 'String',
    description: 'Panels connected in strings to string inverter.',
  },
  {
    id: 'microinverter',
    title: 'Microinverter',
    description: 'Each panel has a microinverter.',
  },
  {
    id: 'optimiser',
    title: 'Optimiser',
    description: 'Optimisers on each panel (with string inverter).',
  },
];

export interface InverterBrandModels {
  brand: string;
  models: string[];
}

// Dummy data — will come from Excel later
export const inverterBrandModels: InverterBrandModels[] = [
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
];
