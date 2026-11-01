export interface PanelModel {
  model: string;
  wattage: number;
  pricePerPanel: number;
}

export interface PanelBrand {
  brand: string;
  models: PanelModel[];
}

// Real panel brands & models from Maharudra Solar distributor invoices (INV-68, PFI-322)
export const panelBrandsData: PanelBrand[] = [
  {
    brand: 'Premier Energies',
    models: [
      { model: '550Wp Bifacial', wattage: 550, pricePerPanel: 11962.5 },
      { model: '620Wp DCR TopCon', wattage: 620, pricePerPanel: 15500 },
    ],
  },
];
