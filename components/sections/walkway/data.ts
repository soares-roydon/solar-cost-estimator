export interface WalkwayMaterial {
  id: string;
  name: string;
  qtyPerWalkway: number;
  unitPrice: number;
}

// Dummy data — will come from Excel sheet later
export const defaultWalkwayMaterials: WalkwayMaterial[] = [
  { id: 'clamps', name: 'Clamps', qtyPerWalkway: 6, unitPrice: 40 },
  { id: 'self-tapping-bolts', name: 'Self-tapping bolts', qtyPerWalkway: 6, unitPrice: 10 },
];
