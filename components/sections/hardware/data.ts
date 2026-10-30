export interface HardwareItem {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  isCustom?: boolean;
}

// Dummy data — will come from Excel sheet later
export const defaultHardwareItems: HardwareItem[] = [
  { id: 'mc4', name: 'MC4 Connectors (Extra)', qty: 10, unitPrice: 50 },
  { id: 'nut-bolts', name: 'Nut Bolts', qty: 10, unitPrice: 15 },
  { id: 'zip-metal', name: 'Zip Ties (Metal)', qty: 100, unitPrice: 10 },
  { id: 'zip-white', name: 'Zip Ties (White)', qty: 100, unitPrice: 8 },
  { id: 'zip-black', name: 'Zip Ties (Black)', qty: 100, unitPrice: 8 },
];
