export interface MaterialCosts {
  panels: number;
  inverter: number;
  mounting: number;
  dcCable: number;
  acCable: number;
  laCable: number;
  structureEarthing: number;
  acdbDcdb: number;
  walkway: number;
  piping: number;
  hardware: number;
}

export interface OtherCostsBreakdown {
  labour: number;
  transport: number;
  other: number;
}

export interface CostCategoryItem {
  id: string;
  key: keyof MaterialCosts;
  category: string;
  total: number;
}

// Default estimated baseline values
export const defaultMaterialCosts: MaterialCosts = {
  panels: 200000,
  inverter: 75000,
  mounting: 22172,
  dcCable: 4320,
  acCable: 0,
  laCable: 1260,
  structureEarthing: 3150,
  acdbDcdb: 13500,
  walkway: 900,
  piping: 3520,
  hardware: 3250,
};

export const defaultMaterialSummary: CostCategoryItem[] = [
  { id: 'panels', key: 'panels', category: 'Panels', total: defaultMaterialCosts.panels },
  { id: 'inverter', key: 'inverter', category: 'Inverter', total: defaultMaterialCosts.inverter },
  { id: 'mounting', key: 'mounting', category: 'Mounting', total: defaultMaterialCosts.mounting },
  { id: 'dc-cable', key: 'dcCable', category: 'DC Cable', total: defaultMaterialCosts.dcCable },
  { id: 'ac-cable', key: 'acCable', category: 'AC Cable', total: defaultMaterialCosts.acCable },
  { id: 'la-cable', key: 'laCable', category: 'LA Cable', total: defaultMaterialCosts.laCable },
  {
    id: 'structure-earthing',
    key: 'structureEarthing',
    category: 'Structure Earthing Cable',
    total: defaultMaterialCosts.structureEarthing,
  },
  {
    id: 'acdb-dcdb',
    key: 'acdbDcdb',
    category: 'ACDB / DCDB',
    total: defaultMaterialCosts.acdbDcdb,
  },
  { id: 'walkway', key: 'walkway', category: 'Walkway', total: defaultMaterialCosts.walkway },
  { id: 'piping', key: 'piping', category: 'Piping', total: defaultMaterialCosts.piping },
  {
    id: 'hardware',
    key: 'hardware',
    category: 'Hardware & Other',
    total: defaultMaterialCosts.hardware,
  },
];

export const defaultOtherCostSummary: OtherCostsBreakdown = {
  labour: 25000,
  transport: 10000,
  other: 5000,
};

export const GST_RATE = 0.18; // 18% GST
