export interface CostCategoryItem {
  id: string;
  category: string;
  total: number;
}

// Dummy summary data — will come from Excel sheet later
export const defaultMaterialSummary: CostCategoryItem[] = [
  { id: 'panels', category: 'Panels', total: 200000 },
  { id: 'inverter', category: 'Inverter', total: 75000 },
  { id: 'mounting', category: 'Mounting', total: 10780 },
  { id: 'dc-cable', category: 'DC Cable', total: 9600 },
  { id: 'ac-cable', category: 'AC Cable', total: 9600 },
  { id: 'la-cable', category: 'LA Cable', total: 9600 },
  { id: 'structure-earthing', category: 'Structure Earthing Cable', total: 9600 },
  { id: 'acdb-dcdb', category: 'ACDB / DCDB', total: 13500 },
  { id: 'walkway', category: 'Walkway', total: 900 },
  { id: 'piping', category: 'Piping', total: 3520 },
  { id: 'hardware', category: 'Hardware & Other', total: 3250 },
];

export const defaultOtherCostSummary = {
  labour: 25000,
  transport: 10000,
  other: 5000,
};

export const GST_RATE = 0.18; // 18% GST
