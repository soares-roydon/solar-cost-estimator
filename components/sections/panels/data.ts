export interface PanelModel {
  model: string;
  wattage: number;
  pricePerPanel: number;
}

export interface PanelBrand {
  brand: string;
  models: PanelModel[];
}

// Dummy data with estimated prices — will come from Excel sheet later
export const panelBrandsData: PanelBrand[] = [
  {
    brand: 'Longi',
    models: [
      { model: 'LR5-72HTH-550M', wattage: 550, pricePerPanel: 10000 },
      { model: 'LR5-72HBD-545M', wattage: 545, pricePerPanel: 10100 },
      { model: 'LR5-54HTB-430M', wattage: 430, pricePerPanel: 8400 },
    ],
  },
  {
    brand: 'Canadian Solar',
    models: [
      { model: 'HiKu6 CS6W-550MS', wattage: 550, pricePerPanel: 10200 },
      { model: 'BiHiKu7 CS7N-660MS', wattage: 660, pricePerPanel: 11900 },
    ],
  },
  {
    brand: 'Jinko Solar',
    models: [
      { model: 'Tiger Pro 72HC 540M', wattage: 540, pricePerPanel: 10000 },
      { model: 'Tiger Neo 78HL4 620M', wattage: 620, pricePerPanel: 11300 },
    ],
  },
];
