export interface MountingItem {
  id: string;
  material: string;
  qty: number;
  unitPrice: number;
}

export const mountingTypeOptions = [
  { label: 'Patra', value: 'patra' },
  { label: 'RCC', value: 'rcc' },
  { label: 'Tile', value: 'tile' },
  { label: 'Ground Mount', value: 'ground-mount' },
];

// Dummy data — will come from Excel sheet later
export const defaultMountingItems: MountingItem[] = [
  { id: 'rail-mount', material: 'Rail mount', qty: 20, unitPrice: 350 },
  { id: 'mid-clamps', material: 'Mid clamps', qty: 40, unitPrice: 30 },
  { id: 'end-clamps', material: 'End clamps', qty: 20, unitPrice: 35 },
  { id: 'spring-nuts', material: 'Spring nuts', qty: 40, unitPrice: 9 },
  { id: 'allen-bolts', material: 'Allen bolts', qty: 60, unitPrice: 6 },
  { id: 'rivets', material: 'Rivets', qty: 80, unitPrice: 2 },
];
