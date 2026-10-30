export interface PanelModel {
  model: string;
  wattage: number;
}

export interface PanelBrand {
  brand: string;
  models: PanelModel[];
}

// Dummy data — will come from Excel sheet later
export const panelBrandsData: PanelBrand[] = [
  {
    brand: 'Longi',
    models: [
      { model: 'LR5-72HTH-550M', wattage: 550 },
      { model: 'LR5-72HBD-545M', wattage: 545 },
      { model: 'LR5-54HTB-430M', wattage: 430 },
    ],
  },
  {
    brand: 'Canadian Solar',
    models: [
      { model: 'HiKu6 CS6W-550MS', wattage: 550 },
      { model: 'BiHiKu7 CS7N-660MS', wattage: 660 },
    ],
  },
  {
    brand: 'Jinko Solar',
    models: [
      { model: 'Tiger Pro 72HC 540M', wattage: 540 },
      { model: 'Tiger Neo 78HL4 620M', wattage: 620 },
    ],
  },
];
