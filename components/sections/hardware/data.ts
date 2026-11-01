export interface HardwareItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  isCustom?: boolean;
}

// Real hardware & balance of system items from Maharudra Solar invoices (INV-68, INV-391)
export const defaultHardwareItems: HardwareItem[] = [
  { id: 'mc4', name: 'MC4 Connectors', qty: 10, unitPrice: 30 },
  { id: 'nut-bolts', name: 'Nut Bolts', qty: 10, unitPrice: 15 },
  { id: 'ss-ties', name: 'S.S Cable Ties (Pack)', qty: 2, unitPrice: 300 },
  { id: 'copper-la', name: 'Pure Copper Lightning Arrester (Hollow)', qty: 1, unitPrice: 1500 },
  { id: 'zip-uv', name: 'Zip Ties (UV Nylon)', qty: 100, unitPrice: 8 },
];
