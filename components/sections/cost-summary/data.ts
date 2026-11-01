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

// Default baseline values calibrated with Maharudra Solar distributor invoices
export const defaultMaterialCosts: MaterialCosts = {
  panels: 239250, // 20 x Premier Energies 550Wp Bifacial @ ₹11,962.50
  inverter: 55000, // 1 x Vsole 15kW On-Grid @ ₹55,000
  mounting: 21828,
  dcCable: 4486,
  acCable: 0,
  laCable: 396,
  structureEarthing: 3150,
  acdbDcdb: 20845, // ACDB 12-20kW (₹14,245) + DCDB 3-in-3-out (₹6,600)
  walkway: 6241,
  piping: 1278,
  hardware: 3350,
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

// Statutory GST rates from solar tax invoices (INV-68, INV-391)
export const SOLAR_EQUIPMENT_GST_RATE = 0.05; // 5% GST on Solar PV Modules & Inverters
export const BOS_SERVICES_GST_RATE = 0.18; // 18% GST on BOS, Structure, Cables & Services
